import { NextRequest, NextResponse } from "next/server";
import { getStripeServer, TEST_PRODUCT_ID } from "@/lib/stripe";
import Stripe from "stripe";

// Disable body parsing - Stripe requires raw body for webhook verification
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
        // Verify webhook signature
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        
        if (!webhookSecret) {
            console.error("[Webhook] STRIPE_WEBHOOK_SECRET not set");
            return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
        }

        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        console.error(`[Webhook] Signature verification failed: ${errorMessage}`);
        return NextResponse.json({ error: `Webhook Error: ${errorMessage}` }, { status: 400 });
    }

    // Handle the event
    console.log(`[Webhook] Received event: ${event.type}`);

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        
        console.log(`[Webhook] Checkout completed - Session ID: ${session.id}`);
        console.log(`[Webhook] Payment Intent: ${session.payment_intent}`);
        console.log(`[Webhook] Metadata:`, session.metadata);

        // Check if this is a test product that should be auto-refunded
        const productId = session.metadata?.productId;
        
        if (productId && parseInt(productId) === TEST_PRODUCT_ID) {
            console.log(`[Webhook] Test product detected (ID: ${productId}) - Processing auto-refund...`);
            
            try {
                // Get the payment intent to refund
                const paymentIntentId = session.payment_intent as string;
                
                if (paymentIntentId) {
                    // Create refund
                    const refund = await stripe.refunds.create({
                        payment_intent: paymentIntentId,
                        reason: "requested_by_customer",
                        metadata: {
                            auto_refund: "true",
                            reason: "Test purchase - automatic refund",
                            original_session: session.id,
                        },
                    });
                    
                    console.log(`[Webhook] Auto-refund successful - Refund ID: ${refund.id}`);
                    console.log(`[Webhook] Refund amount: $${(refund.amount / 100).toFixed(2)}`);
                } else {
                    console.error("[Webhook] No payment intent found for refund");
                }
            } catch (refundError) {
                console.error("[Webhook] Auto-refund failed:", refundError);
            }
        }
    }

    // Return success response
    return NextResponse.json({ received: true });
}

// Stripe sends GET to verify endpoint exists
export async function GET() {
    return NextResponse.json({ 
        status: "Stripe webhook endpoint active",
        timestamp: new Date().toISOString()
    });
}
