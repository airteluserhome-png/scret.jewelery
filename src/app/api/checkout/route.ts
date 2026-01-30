import { NextRequest, NextResponse } from "next/server";
import { getStripeServer, PRODUCT_PRICES } from "@/lib/stripe";

interface CartItem {
    id: number;
    quantity: number;
}

export async function POST(req: NextRequest) {
    try {
        const { items, successUrl, cancelUrl } = await req.json();

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: "No items provided" },
                { status: 400 }
            );
        }

        // Build line items for Stripe
        const lineItems = items.map((item: CartItem) => {
            const product = PRODUCT_PRICES[item.id];
            
            if (!product) {
                throw new Error(`Product ${item.id} not found`);
            }

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.name,
                        description: product.description,
                    },
                    unit_amount: product.price,
                },
                quantity: item.quantity,
            };
        });

        // Create Stripe checkout session
        const stripe = getStripeServer();
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: successUrl || `${req.headers.get("origin")}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: cancelUrl || `${req.headers.get("origin")}/checkout/cancel`,
            shipping_address_collection: {
                allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR", "IT", "ES", "NL", "BE"],
            },
            billing_address_collection: "required",
            phone_number_collection: {
                enabled: true,
            },
            metadata: {
                productIds: items.map((i: CartItem) => i.id).join(","),
            },
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (error) {
        console.error("Stripe checkout error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Checkout failed" },
            { status: 500 }
        );
    }
}
