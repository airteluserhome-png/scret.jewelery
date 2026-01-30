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

        // Get the origin URL for image paths
        const origin = req.headers.get("origin") || "https://secretly.jewelry";
        
        // Build absolute image URL with proper encoding for spaces and special chars
        const encodedImagePath = product.image
            .split('/')
            .map(segment => encodeURIComponent(segment))
            .join('/');
        
        const imageUrl = product.image.startsWith("http") 
            ? product.image 
            : `${origin}${encodedImagePath}`;

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
                            images: [imageUrl],
                        },
                        unit_amount: product.price,
                    },
                    quantity: quantity,
                },
            ],
            mode: "payment",
            success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/product/${productId}`,
            shipping_address_collection: {
                allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR", "IT", "ES", "NL", "BE", "IN", "AE", "SG", "HK", "JP", "KR"],
            },
            billing_address_collection: "required",
            phone_number_collection: {
                enabled: true,
            },
            custom_text: {
                submit: {
                    message: "SECRETLY • Premium Quality • Secure Checkout",
                },
                shipping_address: {
                    message: "We ship worldwide with full tracking included.",
                },
            },
            metadata: {
                productId: productId.toString(),
                productName: product.name,
            },
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (error) {
        console.error("Stripe checkout error:", error);
        
        // Provide user-friendly error messages
        let errorMessage = "Checkout failed. Please try again.";
        
        if (error instanceof Error) {
            // Check for common Stripe errors
            if (error.message.includes("STRIPE_SECRET_KEY")) {
                errorMessage = "Payment system is being configured. Please try again later.";
            } else if (error.message.includes("Invalid API Key")) {
                errorMessage = "Payment configuration error. Please contact support.";
            } else if (error.message.includes("network") || error.message.includes("ENOTFOUND")) {
                errorMessage = "Connection issue. Please check your internet and try again.";
            } else if (error.message.includes("image")) {
                // Don't fail checkout for image issues - retry without image
                console.log("Image issue detected, retrying without product image");
                try {
                    const stripe = getStripeServer();
                    const { productId, quantity = 1 } = await req.clone().json();
                    const product = PRODUCT_PRICES[productId];
                    const origin = req.headers.get("origin") || "https://secretly.jewelry";
                    
                    const session = await stripe.checkout.sessions.create({
                        payment_method_types: ["card"],
                        line_items: [{
                            price_data: {
                                currency: "usd",
                                product_data: {
                                    name: product.name,
                                    description: product.description,
                                    // No images this time
                                },
                                unit_amount: product.price,
                            },
                            quantity: quantity,
                        }],
                        mode: "payment",
                        success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
                        cancel_url: `${origin}/product/${productId}`,
                        shipping_address_collection: {
                            allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR", "IT", "ES", "NL", "BE", "IN", "AE", "SG", "HK", "JP", "KR"],
                        },
                        billing_address_collection: "required",
                        phone_number_collection: { enabled: true },
                        metadata: { productId: productId.toString(), productName: product.name },
                    });
                    
                    return NextResponse.json({ sessionId: session.id, url: session.url });
                } catch (retryError) {
                    console.error("Retry also failed:", retryError);
                }
            }
        }
        
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
