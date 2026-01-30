import { NextRequest, NextResponse } from "next/server";
import { getStripeServer, PRODUCT_PRICES } from "@/lib/stripe";
import { sendOrderConfirmationEmail } from "@/lib/email";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    const stripe = getStripeServer();
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
        console.error("[Webhook] No signature found");
        return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        
        if (!webhookSecret) {
            // If no webhook secret, still process but log warning
            console.warn("[Webhook] STRIPE_WEBHOOK_SECRET not set - skipping signature verification");
            event = JSON.parse(body) as Stripe.Event;
        } else {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        }
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        console.error(`[Webhook] Error: ${errorMessage}`);
        return NextResponse.json({ error: `Webhook Error: ${errorMessage}` }, { status: 400 });
    }

    console.log(`[Webhook] Received event: ${event.type}`);

    // Handle successful checkout
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        
        console.log(`[Webhook] Processing checkout session: ${session.id}`);

        // Only process if payment was successful
        if (session.payment_status === "paid") {
            try {
                // Get customer details
                const customerEmail = session.customer_details?.email;
                const customerName = session.customer_details?.name;
                // shipping_details might not be in type but exists at runtime
                const shippingDetails = (session as Stripe.Checkout.Session & { shipping_details?: { address?: Stripe.Address } }).shipping_details;
                const shippingAddress = shippingDetails?.address;

                // Get product details from metadata
                const productId = session.metadata?.productId;
                const productName = session.metadata?.productName || 
                    (productId ? PRODUCT_PRICES[parseInt(productId)]?.name : "Product");
                
                // Calculate price
                const amountTotal = session.amount_total || 0;
                const productPrice = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(amountTotal / 100);

                // Generate order number
                const orderNumber = session.id.slice(-8).toUpperCase();

                console.log(`[Webhook] Order details:`, {
                    email: customerEmail,
                    name: customerName,
                    product: productName,
                    price: productPrice,
                    orderNumber,
                });

                // Send confirmation email
                if (customerEmail) {
                    const emailResult = await sendOrderConfirmationEmail({
                        customerEmail,
                        customerName: customerName || "",
                        productName: productName || "Your Order",
                        productPrice,
                        orderNumber,
                        shippingAddress: shippingAddress ? {
                            line1: shippingAddress.line1 || undefined,
                            line2: shippingAddress.line2 || undefined,
                            city: shippingAddress.city || undefined,
                            state: shippingAddress.state || undefined,
                            postal_code: shippingAddress.postal_code || undefined,
                            country: shippingAddress.country || undefined,
                        } : undefined,
                    });

                    if (emailResult.success) {
                        console.log(`[Webhook] Confirmation email sent to ${customerEmail}`);
                    } else {
                        console.error(`[Webhook] Failed to send email:`, emailResult.error);
                    }
                } else {
                    console.warn("[Webhook] No customer email found");
                }
            } catch (emailError) {
                console.error("[Webhook] Error processing order:", emailError);
            }
        }
    }

    return NextResponse.json({ received: true });
}

// Health check
export async function GET() {
    return NextResponse.json({ 
        status: "Stripe webhook endpoint active",
        timestamp: new Date().toISOString()
    });
}
