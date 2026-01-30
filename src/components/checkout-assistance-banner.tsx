"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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
    const hasChecked = useRef(false);

    const checkFailedAttempts = useCallback(() => {
        console.log("[Checkout Banner] Checking failed attempts...");
        
        // Mark any pending (started but not completed) checkouts as abandoned
        markPendingAsAbandoned();
        
        // Small delay to ensure localStorage is synced
        setTimeout(() => {
            // Get failed attempts - check ALL products if no productId, or specific product
            const failed = getRecentFailedAttempts(productId);
            const allFailed = getRecentFailedAttempts(); // Also check all
            
            // Debug logs
            console.log("[Checkout Banner] Product ID:", productId);
            console.log("[Checkout Banner] Failed for product:", failed.length);
            console.log("[Checkout Banner] Failed total:", allFailed.length);
            console.log("[Checkout Banner] Full history:", getCheckoutHistory());
            console.log("[Checkout Banner] isDismissed:", isDismissed);
            
            // Use all failed attempts if productId filtering returns less
            const attemptsToUse = failed.length >= 2 ? failed : allFailed;
            setFailedAttempts(attemptsToUse);
            
            // Show popup if 2+ failed attempts
            if (attemptsToUse.length >= 2 && !isDismissed) {
                console.log("[Checkout Banner] SHOWING POPUP!");
                setIsVisible(true);
            }
        }, 150);
    }, [productId, isDismissed]);

    useEffect(() => {
        // Immediate check on mount
        if (!hasChecked.current) {
            hasChecked.current = true;
            checkFailedAttempts();
        }
        
        // Also check when page becomes visible (user returns from another tab/Stripe)
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                console.log("[Checkout Banner] Visibility changed to visible");
                checkFailedAttempts();
            }
        };
        
        // Check when user navigates back (popstate)
        const handlePopState = () => {
            console.log("[Checkout Banner] PopState event");
            checkFailedAttempts();
        };
        
        // pageshow event fires even when page is loaded from bfcache (browser back/forward cache)
        const handlePageShow = (event: PageTransitionEvent) => {
            console.log("[Checkout Banner] PageShow event, persisted:", event.persisted);
            if (event.persisted) {
                // Page was restored from bfcache
                checkFailedAttempts();
            }
        };
        
        // Focus event when window gains focus
        const handleFocus = () => {
            console.log("[Checkout Banner] Focus event");
            checkFailedAttempts();
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('popstate', handlePopState);
        window.addEventListener('pageshow', handlePageShow);
        window.addEventListener('focus', handleFocus);
        
        // Also check after a short delay in case of race conditions
        const delayedCheck = setTimeout(checkFailedAttempts, 500);
        
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('pageshow', handlePageShow);
            window.removeEventListener('focus', handleFocus);
            clearTimeout(delayedCheck);
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
            {/* Full screen overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
                onClick={handleDismiss}
            >
                {/* Popup Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="bg-white w-full max-w-lg relative"
                    style={{ 
                        border: "4px solid #000",
                        boxShadow: "12px 12px 0px #FF0099"
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={handleDismiss}
                        className="absolute -top-3 -right-3 w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-[#FF0099] transition-colors z-10"
                        style={{ border: "3px solid #000" }}
                        aria-label="Close"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Header */}
                    <div className="bg-[#FF0099] text-white p-4 md:p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white/20 flex items-center justify-center flex-shrink-0">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-brutalist text-2xl md:text-3xl uppercase tracking-wider">
                                    Need Help?
                                </h3>
                                <p className="text-white/80 text-sm mt-1">
                                    {failedAttempts.length} checkout attempt{failedAttempts.length > 1 ? 's' : ''} didn&apos;t complete
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-6">
                        <p className="text-black/70 text-sm mb-5">
                            We noticed you had trouble completing your purchase. Here are some quick fixes:
                        </p>

                        <ul className="space-y-3 mb-6">
                            <li className="flex items-start gap-3 p-3 bg-gray-50" style={{ border: "2px solid #eee" }}>
                                <span className="w-6 h-6 bg-[#FF0099] text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">1</span>
                                <span className="text-sm text-black/80"><strong>Try a different card</strong> — Some banks block international purchases</span>
                            </li>
                            <li className="flex items-start gap-3 p-3 bg-gray-50" style={{ border: "2px solid #eee" }}>
                                <span className="w-6 h-6 bg-[#FF0099] text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">2</span>
                                <span className="text-sm text-black/80"><strong>Call your bank</strong> — Ask them to approve the transaction</span>
                            </li>
                            <li className="flex items-start gap-3 p-3 bg-gray-50" style={{ border: "2px solid #eee" }}>
                                <span className="w-6 h-6 bg-[#FF0099] text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">3</span>
                                <span className="text-sm text-black/80"><strong>Verify card details</strong> — Check number, expiry, and CVV</span>
                            </li>
                        </ul>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleClearHistory}
                                className="w-full bg-black text-white font-brutalist text-lg py-4 uppercase tracking-wider hover:bg-[#FF0099] transition-colors"
                                style={{ border: "3px solid #000", boxShadow: "4px 4px 0px #FF0099" }}
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => {
                                    // Try to open contact form
                                    const contactBtn = document.querySelector('[aria-label="Contact us"]') as HTMLButtonElement;
                                    if (contactBtn) contactBtn.click();
                                    handleDismiss();
                                }}
                                className="w-full bg-white text-black font-bold text-sm py-3 uppercase tracking-wider hover:bg-gray-100 transition-colors"
                                style={{ border: "3px solid #000" }}
                            >
                                Contact Support
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
