"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/cart-context";

interface CartCheckoutButtonProps {
    className?: string;
    onCheckoutStart?: () => void;
}

export default function CartCheckoutButton({ className = "", onCheckoutStart }: CartCheckoutButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { items: cartItems } = useCart();

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty");
            return;
        }

        setIsLoading(true);
        onCheckoutStart?.();

        try {
            const items = cartItems.map((item) => ({
                id: item.id,
                quantity: item.quantity,
            }));

            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items }),
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

    const isDisabled = isLoading || cartItems.length === 0;

    return (
        <motion.button
            onClick={handleCheckout}
            disabled={isDisabled}
            whileHover={!isDisabled ? { x: -3, y: -3 } : {}}
            whileTap={!isDisabled ? { scale: 0.98 } : {}}
            className={`
                w-full font-brutalist text-xl py-4 uppercase tracking-wider
                transition-all duration-200
                ${isDisabled 
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                    : "bg-black text-white hover:bg-[#FF0099]"
                }
                ${className}
            `}
            style={{
                border: isDisabled ? "3px solid #d1d5db" : "3px solid #000",
                boxShadow: isDisabled ? "none" : "5px 5px 0px #FF0099",
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
                "Checkout"
            )}
        </motion.button>
    );
}
