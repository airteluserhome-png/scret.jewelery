"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
    getCheckoutHistory, 
    updateLastAttemptStatus,
    clearCheckoutHistory,
    getRecentFailedAttempts 
} from "@/lib/checkout-tracker";

type VerificationStatus = 
    | "checking" 
    | "success" 
    | "declined" 
    | "abandoned" 
    | "no_session" 
    | "error"
    | "multiple_failures";

interface VerificationResult {
    status: VerificationStatus;
    message: string;
    details?: {
        email?: string;
        total?: number;
        productName?: string;
        failedAttempts?: number;
    };
}

function PaymentVerifyContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get("session_id");
    const productId = searchParams.get("product_id");
    
    const [result, setResult] = useState<VerificationResult>({
        status: "checking",
        message: "Verifying your payment status...",
    });

    useEffect(() => {
        async function verifyPayment() {
            // Check for multiple failed attempts first
            const failedAttempts = getRecentFailedAttempts(
                productId ? parseInt(productId) : undefined
            );
            
            if (failedAttempts.length >= 2 && !sessionId) {
                setResult({
                    status: "multiple_failures",
                    message: "We noticed you've had some trouble checking out.",
                    details: {
                        failedAttempts: failedAttempts.length,
                        productName: failedAttempts[0]?.productName,
                    },
                });
                return;
            }

            // If we have a session ID, verify it
            if (sessionId) {
                try {
                    const response = await fetch(`/api/checkout-status?session_id=${sessionId}`);
                    const data = await response.json();

                    if (data.status === "paid") {
                        updateLastAttemptStatus("completed", sessionId);
                        clearCheckoutHistory();
                        setResult({
                            status: "success",
                            message: "Payment successful! Your order is confirmed.",
                            details: {
                                email: data.customer?.email,
                                total: data.order?.total,
                            },
                        });
                    } else if (data.status === "expired" || data.status === "canceled") {
                        updateLastAttemptStatus("abandoned", sessionId);
                        setResult({
                            status: "abandoned",
                            message: "Your checkout session expired or was cancelled.",
                        });
                    } else {
                        updateLastAttemptStatus("declined", sessionId);
                        setResult({
                            status: "declined",
                            message: data.message || "Payment was not completed.",
                        });
                    }
                } catch (error) {
                    console.error("Verification error:", error);
                    setResult({
                        status: "error",
                        message: "Unable to verify payment. Please check your email for confirmation.",
                    });
                }
            } else {
                // No session ID - check if there's a pending session
                const history = getCheckoutHistory();
                const pendingAttempt = history.attempts.find(a => a.status === "started");
                
                if (pendingAttempt?.sessionId) {
                    // Verify the pending session
                    try {
                        const response = await fetch(`/api/checkout-status?session_id=${pendingAttempt.sessionId}`);
                        const data = await response.json();

                        if (data.status === "paid") {
                            updateLastAttemptStatus("completed", pendingAttempt.sessionId);
                            clearCheckoutHistory();
                            setResult({
                                status: "success",
                                message: "Great news! Your payment was successful.",
                                details: {
                                    email: data.customer?.email,
                                    total: data.order?.total,
                                },
                            });
                        } else {
                            updateLastAttemptStatus("abandoned", pendingAttempt.sessionId);
                            setResult({
                                status: "abandoned",
                                message: "Your previous checkout wasn't completed.",
                                details: {
                                    productName: pendingAttempt.productName,
                                },
                            });
                        }
                    } catch {
                        setResult({
                            status: "no_session",
                            message: "No recent checkout found to verify.",
                        });
                    }
                } else {
                    setResult({
                        status: "no_session",
                        message: "No checkout session found to verify.",
                    });
                }
            }
        }

        // Add a small delay for UX
        const timer = setTimeout(verifyPayment, 1500);
        return () => clearTimeout(timer);
    }, [sessionId, productId]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <AnimatePresence mode="wait">
                {/* CHECKING STATE */}
                {result.status === "checking" && (
                    <motion.div
                        key="checking"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                    >
                        <div className="relative w-24 h-24 mx-auto mb-8">
                            <div 
                                className="absolute inset-0 border-4 border-black border-t-[#FF0099] animate-spin"
                                style={{ animationDuration: "1s" }}
                            />
                            <div 
                                className="absolute inset-3 border-4 border-black/30 border-b-[#FF0099] animate-spin"
                                style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
                            />
                        </div>
                        <h1 
                            className="font-brutalist text-3xl md:text-4xl text-black mb-4 uppercase tracking-wider"
                            style={{ textShadow: "3px 3px 0px #FF0099" }}
                        >
                            Checking Payment
                        </h1>
                        <p className="font-bold text-black/60 text-sm uppercase tracking-widest">
                            {result.message}
                        </p>
                    </motion.div>
                )}

                {/* SUCCESS STATE */}
                {result.status === "success" && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-lg text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="w-24 h-24 mx-auto mb-8 bg-[#FF0099] flex items-center justify-center"
                            style={{ border: "3px solid #000", boxShadow: "6px 6px 0px #000" }}
                        >
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </motion.div>

                        <h1 
                            className="font-brutalist text-4xl md:text-5xl text-black mb-4 uppercase tracking-wider"
                            style={{ textShadow: "3px 3px 0px #FF0099" }}
                        >
                            Payment Confirmed
                        </h1>

                        <p className="font-bold text-black/60 text-sm uppercase tracking-widest mb-8">
                            {result.message}
                        </p>

                        {result.details?.total && (
                            <div
                                className="bg-white p-6 mb-8 inline-block"
                                style={{ border: "3px solid #000", boxShadow: "6px 6px 0px #FF0099" }}
                            >
                                <p className="font-brutalist text-3xl text-[#FF0099]">
                                    ${(result.details.total / 100).toLocaleString()}
                                </p>
                                {result.details.email && (
                                    <p className="font-mono text-xs text-black/50 mt-2">
                                        Receipt sent to {result.details.email}
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="flex flex-col gap-4">
                            <Link href="/shop">
                                <motion.button
                                    whileHover={{ x: -3, y: -3 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full font-brutalist text-xl py-4 bg-black text-white uppercase tracking-wider"
                                    style={{ border: "3px solid #000", boxShadow: "5px 5px 0px #FF0099" }}
                                >
                                    Continue Shopping
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                )}

                {/* DECLINED / ABANDONED / ERROR STATES */}
                {(result.status === "declined" || result.status === "abandoned" || result.status === "error" || result.status === "no_session") && (
                    <motion.div
                        key="failed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-lg text-center"
                    >
                        <div
                            className="w-24 h-24 mx-auto mb-8 bg-white flex items-center justify-center"
                            style={{ border: "3px solid #000", boxShadow: "6px 6px 0px #ef4444" }}
                        >
                            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>

                        <h1 
                            className="font-brutalist text-3xl md:text-4xl text-black mb-4 uppercase tracking-wider"
                            style={{ textShadow: "3px 3px 0px #ef4444" }}
                        >
                            {result.status === "declined" ? "Payment Declined" : 
                             result.status === "abandoned" ? "Checkout Incomplete" : 
                             "Verification Issue"}
                        </h1>

                        <p className="font-bold text-black/60 text-sm uppercase tracking-widest mb-8">
                            {result.message}
                        </p>

                        <div
                            className="bg-gray-50 p-6 mb-8 text-left"
                            style={{ border: "3px solid #000" }}
                        >
                            <h3 className="font-brutalist text-lg text-black uppercase tracking-wider mb-3">
                                What You Can Do
                            </h3>
                            <ul className="space-y-2 text-sm text-black/70">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF0099] font-bold">•</span>
                                    <span>Try a different card or payment method</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF0099] font-bold">•</span>
                                    <span>Check your card has sufficient funds</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF0099] font-bold">•</span>
                                    <span>Contact your bank if the issue persists</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <Link href="/shop">
                                <motion.button
                                    whileHover={{ x: -3, y: -3 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full font-brutalist text-xl py-4 bg-black text-white uppercase tracking-wider"
                                    style={{ border: "3px solid #000", boxShadow: "5px 5px 0px #FF0099" }}
                                >
                                    Try Again
                                </motion.button>
                            </Link>
                            <button 
                                onClick={() => router.push("/")}
                                className="font-bold text-sm py-3 text-black/60 uppercase tracking-widest hover:text-[#FF0099] transition-colors"
                            >
                                Back to Home
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* MULTIPLE FAILURES STATE - Special Assistance */}
                {result.status === "multiple_failures" && (
                    <motion.div
                        key="assistance"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-lg text-center"
                    >
                        <div
                            className="w-24 h-24 mx-auto mb-8 bg-[#FF0099] flex items-center justify-center"
                            style={{ border: "3px solid #000", boxShadow: "6px 6px 0px #000" }}
                        >
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>

                        <h1 
                            className="font-brutalist text-3xl md:text-4xl text-black mb-4 uppercase tracking-wider"
                            style={{ textShadow: "3px 3px 0px #FF0099" }}
                        >
                            Need Help?
                        </h1>

                        <p className="font-bold text-black/60 text-sm uppercase tracking-widest mb-4">
                            {result.message}
                        </p>

                        {result.details?.productName && (
                            <p className="text-black/50 text-sm mb-8">
                                Product: <span className="font-bold text-black">{result.details.productName}</span>
                                <br />
                                <span className="text-xs">({result.details.failedAttempts} checkout attempts)</span>
                            </p>
                        )}

                        <div
                            className="bg-gray-50 p-6 mb-8 text-left"
                            style={{ border: "3px solid #000" }}
                        >
                            <h3 className="font-brutalist text-lg text-black uppercase tracking-wider mb-3">
                                Common Solutions
                            </h3>
                            <ul className="space-y-3 text-sm text-black/70">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF0099] font-bold">1.</span>
                                    <span><strong>Try a different card</strong> - Some cards have restrictions on international purchases</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF0099] font-bold">2.</span>
                                    <span><strong>Check your bank</strong> - They may have blocked the transaction for security</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF0099] font-bold">3.</span>
                                    <span><strong>Verify card details</strong> - Ensure expiry date and CVV are correct</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF0099] font-bold">4.</span>
                                    <span><strong>Contact us</strong> - We can help with alternative payment options</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <motion.button
                                onClick={() => {
                                    clearCheckoutHistory();
                                    router.push("/shop");
                                }}
                                whileHover={{ x: -3, y: -3 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full font-brutalist text-xl py-4 bg-black text-white uppercase tracking-wider"
                                style={{ border: "3px solid #000", boxShadow: "5px 5px 0px #FF0099" }}
                            >
                                Try Again with New Card
                            </motion.button>
                            
                            <motion.button
                                onClick={() => {
                                    // Open contact form
                                    const contactBtn = document.querySelector('[aria-label="Contact us"]') as HTMLButtonElement;
                                    if (contactBtn) contactBtn.click();
                                }}
                                whileHover={{ x: -2, y: -2 }}
                                className="w-full font-brutalist text-lg py-4 bg-white text-black uppercase tracking-wider"
                                style={{ border: "3px solid #000", boxShadow: "4px 4px 0px #000" }}
                            >
                                Contact Support
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function PaymentVerify() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 border-4 border-black border-t-[#FF0099] animate-spin" />
                    <p className="font-bold text-black/60 text-sm uppercase tracking-widest">
                        Loading...
                    </p>
                </div>
            </div>
        }>
            <PaymentVerifyContent />
        </Suspense>
    );
}
