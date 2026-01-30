"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    getRecentFailedAttempts, 
    markPendingAsAbandoned,
    clearCheckoutHistory,
    getCheckoutHistory,
    CheckoutAttempt 
} from "@/lib/checkout-tracker";

interface CheckoutAssistanceBannerProps {
    productId?: number;
}

export default function CheckoutAssistanceBanner({ productId }: CheckoutAssistanceBannerProps) {
    const [failedAttempts, setFailedAttempts] = useState<CheckoutAttempt[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    const checkFailedAttempts = useCallback(() => {
        // Mark any pending (started but not completed) checkouts as abandoned
        markPendingAsAbandoned();
        
        // Small delay to ensure state is updated
        setTimeout(() => {
            // Get failed attempts for this product or all products
            const failed = getRecentFailedAttempts(productId);
            setFailedAttempts(failed);
            
            // Debug log
            console.log("[Checkout Tracker] Failed attempts:", failed.length, failed);
            console.log("[Checkout Tracker] Full history:", getCheckoutHistory());
            
            // Show banner if 2+ failed attempts
            if (failed.length >= 2 && !isDismissed) {
                setIsVisible(true);
            }
        }, 100);
    }, [productId, isDismissed]);

    useEffect(() => {
        // Check on mount
        checkFailedAttempts();
        
        // Also check when page becomes visible (user returns from another tab/Stripe)
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                checkFailedAttempts();
            }
        };
        
        // Check when user navigates back
        const handlePopState = () => {
            checkFailedAttempts();
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('popstate', handlePopState);
        window.addEventListener('focus', checkFailedAttempts);
        
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('focus', checkFailedAttempts);
        };
    }, [checkFailedAttempts]);

    const handleDismiss = () => {
        setIsDismissed(true);
        setIsVisible(false);
    };

    const handleClearHistory = () => {
        clearCheckoutHistory();
        setFailedAttempts([]);
        setIsVisible(false);
    };

    if (!isVisible || failedAttempts.length < 2) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                className="w-full mb-6"
            >
                <div 
                    className="bg-[#FF0099] text-white p-4 md:p-6 relative"
                    style={{ 
                        border: "3px solid #000",
                        boxShadow: "6px 6px 0px #000"
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={handleDismiss}
                        className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-8 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors"
                        aria-label="Dismiss"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="hidden md:flex w-12 h-12 bg-white/20 items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        {/* Content */}
                        <div className="flex-1 pr-8">
                            <h3 className="font-brutalist text-lg md:text-xl uppercase tracking-wider mb-2">
                                Having Trouble Checking Out?
                            </h3>
                            <p className="text-white/90 text-sm mb-4">
                                We noticed {failedAttempts.length} checkout attempt{failedAttempts.length > 1 ? 's' : ''} didn&apos;t complete. 
                                Here are some common solutions:
                            </p>

                            <ul className="text-sm text-white/80 space-y-1 mb-4">
                                <li className="flex items-center gap-2">
                                    <span className="text-white">→</span>
                                    <span>Try a different card (some banks block international purchases)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-white">→</span>
                                    <span>Call your bank to approve the transaction</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-white">→</span>
                                    <span>Double-check card number, expiry, and CVV</span>
                                </li>
                            </ul>

                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={handleClearHistory}
                                    className="bg-white text-[#FF0099] font-bold text-sm uppercase tracking-wider px-4 py-2 hover:bg-black hover:text-white transition-all"
                                    style={{ border: "2px solid #000" }}
                                >
                                    Try Again with New Card
                                </button>
                                <button
                                    onClick={() => {
                                        // Try to open contact form
                                        const contactBtn = document.querySelector('[aria-label="Contact us"]') as HTMLButtonElement;
                                        if (contactBtn) contactBtn.click();
                                        handleDismiss();
                                    }}
                                    className="bg-black/20 text-white font-bold text-sm uppercase tracking-wider px-4 py-2 hover:bg-black/40 transition-all"
                                    style={{ border: "2px solid rgba(0,0,0,0.3)" }}
                                >
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
