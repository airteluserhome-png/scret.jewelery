"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
    recordCheckoutAttempt, 
    markPendingAsAbandoned,
    shouldShowPaymentAssistance,
    updateLastAttemptStatus
} from "@/lib/checkout-tracker";
import { useToast } from "./toast-notification";

interface CheckoutButtonProps {
    productId: number;
    productName?: string;
    price?: number;
    quantity?: number;
    className?: string;
    variant?: "primary" | "secondary";
    fullWidth?: boolean;
    children?: React.ReactNode;
}

export default function CheckoutButton({
    productId,
    productName = "Product",
    price = 0,
    quantity = 1,
    className = "",
    variant = "primary",
    fullWidth = false,
    children,
}: CheckoutButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { showToast } = useToast();

    // Mark any pending checkouts as abandoned when component mounts
    useEffect(() => {
        markPendingAsAbandoned();
    }, []);

    const handleCheckout = async () => {
        setIsLoading(true);

        // Check if user has multiple failed attempts - show assistance page
        if (shouldShowPaymentAssistance(productId)) {
            router.push(`/checkout/verify?product_id=${productId}`);
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/checkout/single", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, quantity }),
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                console.error("Checkout error:", data.error);
                updateLastAttemptStatus("declined");
                showToast(data.error || "Checkout failed. Please try again.", "error", 5000);
                return;
            }

            // Record this checkout attempt
            recordCheckoutAttempt(productId, productName, price, data.sessionId);

            // Redirect to Stripe Checkout
            if (data.url) {
                window.location.href = data.url;
            } else {
                showToast("Unable to start checkout. Please try again.", "error", 5000);
            }
        } catch (error) {
            console.error("Checkout error:", error);
            updateLastAttemptStatus("declined");
            showToast("Connection error. Please check your internet and try again.", "error", 5000);
        } finally {
            setIsLoading(false);
        }
    };

    const baseStyles = variant === "primary"
        ? "bg-black text-white hover:bg-[#FF0099]"
        : "bg-white text-black hover:bg-gray-100";

    return (
        <motion.button
            onClick={handleCheckout}
            disabled={isLoading}
            whileHover={{ x: -3, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className={`
                font-brutalist text-lg md:text-xl py-4 px-8 uppercase tracking-wider
                transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                ${baseStyles}
                ${fullWidth ? "w-full" : ""}
                ${className}
            `}
            style={{
                border: "3px solid #000",
                boxShadow: variant === "primary" ? "5px 5px 0px #FF0099" : "5px 5px 0px #000",
            }}
        >
            {isLoading ? (
                <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    Processing...
                </span>
            ) : (
                children || "Buy Now"
            )}
        </motion.button>
    );
}
