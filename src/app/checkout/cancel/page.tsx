"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
    markPendingAsAbandoned, 
    getRecentFailedAttempts,
    getCheckoutHistory 
} from "@/lib/checkout-tracker";

export default function CheckoutCancel() {
    const [failedCount, setFailedCount] = useState(0);
    const [lastProduct, setLastProduct] = useState<string | null>(null);

    useEffect(() => {
        // Mark pending checkouts as abandoned
        markPendingAsAbandoned();
        
        // Get failed attempt count
        const failed = getRecentFailedAttempts();
        setFailedCount(failed.length);
        
        // Get the last attempted product
        const history = getCheckoutHistory();
        if (history.attempts.length > 0) {
            const last = history.attempts[history.attempts.length - 1];
            setLastProduct(last.productName);
        }
    }, []);

    const showAssistance = failedCount >= 2;

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-lg text-center"
            >
                {/* Cancel Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                    className={`w-24 h-24 mx-auto mb-8 flex items-center justify-center ${showAssistance ? 'bg-[#FF0099]' : 'bg-white'}`}
                    style={{ border: "3px solid #000", boxShadow: showAssistance ? "6px 6px 0px #000" : "6px 6px 0px #000" }}
                >
                    {showAssistance ? (
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    ) : (
                        <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                </motion.div>

                {/* Title */}
                <h1 
                    className="font-brutalist text-4xl md:text-5xl text-black mb-4 uppercase tracking-wider"
                    style={{ textShadow: "3px 3px 0px #FF0099" }}
                >
                    {showAssistance ? "Need Help?" : "Order Cancelled"}
                </h1>

                {/* Message */}
                <p className="font-bold text-black/60 text-sm uppercase tracking-widest mb-4">
                    {showAssistance 
                        ? "We noticed you're having trouble checking out"
                        : "Your payment was not processed"
                    }
                </p>

                {lastProduct && (
                    <p className="text-black/50 text-sm mb-6">
                        Product: <span className="font-bold text-black">{lastProduct}</span>
                        {failedCount > 1 && (
                            <span className="block text-xs mt-1">({failedCount} checkout attempts)</span>
                        )}
                    </p>
                )}

                {/* Info Card - Different content based on failed attempts */}
                {showAssistance ? (
                    <div 
                        className="bg-gray-50 p-6 mb-8 text-left"
                        style={{ border: "3px solid #000" }}
                    >
                        <h3 className="font-brutalist text-lg text-black uppercase tracking-wider mb-3">
                            Common Solutions
                        </h3>
                        <ul className="space-y-2 text-sm text-black/70">
                            <li className="flex items-start gap-2">
                                <span className="text-[#FF0099] font-bold">1.</span>
                                <span><strong>Try a different card</strong> - Some cards block international purchases</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[#FF0099] font-bold">2.</span>
                                <span><strong>Contact your bank</strong> - They may have flagged the transaction</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[#FF0099] font-bold">3.</span>
                                <span><strong>Check card details</strong> - Verify expiry date and CVV</span>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div 
                        className="bg-gray-50 p-8 mb-8"
                        style={{ border: "3px solid #000" }}
                    >
                        <p className="text-black/70 text-sm leading-relaxed">
                            No worries! Your cart items are still saved. 
                            You can return to checkout whenever you&apos;re ready.
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-4">
                    <Link href="/shop">
                        <motion.button
                            whileHover={{ x: -3, y: -3 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full font-brutalist text-xl py-4 bg-black text-white uppercase tracking-wider"
                            style={{ border: "3px solid #000", boxShadow: "5px 5px 0px #FF0099" }}
                        >
                            {showAssistance ? "Try with Different Card" : "Return to Shop"}
                        </motion.button>
                    </Link>

                    {showAssistance && (
                        <motion.button
                            onClick={() => {
                                const contactBtn = document.querySelector('[aria-label="Contact us"]') as HTMLButtonElement;
                                if (contactBtn) contactBtn.click();
                            }}
                            whileHover={{ x: -2, y: -2 }}
                            className="w-full font-brutalist text-lg py-4 bg-white text-black uppercase tracking-wider"
                            style={{ border: "3px solid #000", boxShadow: "4px 4px 0px #000" }}
                        >
                            Contact Support
                        </motion.button>
                    )}

                    <Link href="/">
                        <button className="w-full font-bold text-sm py-3 text-black/60 uppercase tracking-widest hover:text-[#FF0099] transition-colors">
                            Back to Home
                        </button>
                    </Link>
                </div>

                {/* Help Link */}
                {!showAssistance && (
                    <p className="mt-8 text-xs text-black/40 uppercase tracking-widest">
                        Need help? <span className="text-[#FF0099] cursor-pointer hover:underline">Contact us</span>
                    </p>
                )}
            </motion.div>
        </div>
    );
}
