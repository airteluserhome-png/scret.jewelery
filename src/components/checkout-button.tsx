"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface CheckoutButtonProps {
    productId: number;
    quantity?: number;
    className?: string;
    variant?: "primary" | "secondary";
    fullWidth?: boolean;
    children?: React.ReactNode;
}

export default function CheckoutButton({
    productId,
    quantity = 1,
    className = "",
    variant = "primary",
    fullWidth = false,
    children,
}: CheckoutButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        setIsLoading(true);

        try {
            const response = await fetch("/api/checkout/single", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, quantity }),
            });

            const { url, error } = await response.json();

            if (error) {
                console.error("Checkout error:", error);
                alert("Checkout failed. Please try again.");
                return;
            }

            // Redirect to Stripe Checkout
            if (url) {
                window.location.href = url;
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Checkout failed. Please try again.");
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
