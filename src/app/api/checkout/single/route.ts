import { NextRequest, NextResponse } from "next/server";
import { getStripeServer, PRODUCT_PRICES } from "@/lib/stripe";

export async function POST(req: NextRequest) {
    try {
        const { productId, quantity = 1 } = await req.json();

        if (!productId) {
            return NextResponse.json(
                { error: "Product ID is required" },
                { status: 400 }
            );
        }

        const product = PRODUCT_PRICES[productId];
        
        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        // Create Stripe checkout session for single product
        const stripe = getStripeServer();
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product.name,
                            description: product.description,
                        },
                        unit_amount: product.price,
                    },
                    quantity: quantity,
                },
            ],
            mode: "payment",
            success_url: `${req.headers.get("origin")}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get("origin")}/product/${productId}`,
            shipping_address_collection: {
                allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR", "IT", "ES", "NL", "BE"],
            },
            billing_address_collection: "required",
            phone_number_collection: {
                enabled: true,
            },
            metadata: {
                productId: productId.toString(),
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
