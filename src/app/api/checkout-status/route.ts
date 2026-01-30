import { NextRequest, NextResponse } from "next/server";
import { getStripeServer } from "@/lib/stripe";

export async function GET(req: NextRequest) {
    try {
        const sessionId = req.nextUrl.searchParams.get("session_id");

        if (!sessionId) {
            return NextResponse.json(
                { error: "Session ID is required" },
                { status: 400 }
            );
        }

        const stripe = getStripeServer();
        
        // Fetch the checkout session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["payment_intent", "line_items"],
        });

        // Determine the status
        let status: "paid" | "unpaid" | "expired" | "canceled" | "processing" | "requires_action";
        let message: string;

        switch (session.payment_status) {
            case "paid":
                status = "paid";
                message = "Payment successful! Your order has been placed.";
                break;
            case "unpaid":
                if (session.status === "expired") {
                    status = "expired";
                    message = "This checkout session has expired. Please try again.";
                } else {
                    status = "unpaid";
                    message = "Payment is pending. Please complete your payment.";
                }
                break;
            default:
                status = "processing";
                message = "Payment is being processed. Please wait.";
        }

        // Check if session was canceled
        if (session.status === "expired") {
            status = "expired";
            message = "This checkout session has expired.";
        }

        // Get customer details if available
        const customerEmail = session.customer_details?.email || null;
        const customerName = session.customer_details?.name || null;

        // Get line items summary
        const items = session.line_items?.data.map((item) => ({
            name: item.description,
            quantity: item.quantity,
            amount: item.amount_total,
        })) || [];

        // Calculate total
        const total = session.amount_total || 0;
        const currency = session.currency?.toUpperCase() || "USD";

        return NextResponse.json({
            status,
            message,
            paymentStatus: session.payment_status,
            sessionStatus: session.status,
            customer: {
                email: customerEmail,
                name: customerName,
            },
            order: {
                items,
                total,
                currency,
            },
            createdAt: new Date(session.created * 1000).toISOString(),
        });
    } catch (error) {
        console.error("Checkout status error:", error);
        
        // Handle specific Stripe errors
        if (error instanceof Error && error.message.includes("No such checkout.session")) {
            return NextResponse.json(
                { 
                    status: "invalid",
                    error: "Invalid or expired session",
                    message: "This checkout session doesn't exist or has expired."
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { 
                status: "error",
                error: "Failed to verify payment status",
                message: "Unable to verify payment. Please contact support."
            },
            { status: 500 }
        );
    }
}
