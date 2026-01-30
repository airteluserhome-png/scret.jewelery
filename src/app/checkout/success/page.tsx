"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

interface OrderStatus {
    status: "paid" | "unpaid" | "expired" | "canceled" | "processing" | "invalid" | "error" | "loading";
    message: string;
    customer?: {
        email: string | null;
        name: string | null;
    };
    order?: {
        items: Array<{ name: string; quantity: number; amount: number }>;
        total: number;
        currency: string;
    };
}

function CheckoutSuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [orderStatus, setOrderStatus] = useState<OrderStatus>({
        status: "loading",
        message: "Verifying your payment...",
    });

    useEffect(() => {
        async function verifyPayment() {
            if (!sessionId) {
                setOrderStatus({
                    status: "invalid",
                    message: "No session ID provided. Please complete checkout again.",
                });
                return;
            }

            try {
                const response = await fetch(`/api/checkout-status?session_id=${sessionId}`);
                const data = await response.json();

                setOrderStatus({
                    status: data.status,
                    message: data.message,
                    customer: data.customer,
                    order: data.order,
                });

                // Only clear cart if payment was successful
                if (data.status === "paid") {
                    localStorage.removeItem("secretly_cart");
                }
            } catch {
                setOrderStatus({
                    status: "error",
                    message: "Unable to verify payment status. Please contact support.",
                });
            }
        }

        verifyPayment();
    }, [sessionId]);

    // Loading state
    if (orderStatus.status === "loading") {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 border-4 border-black border-t-[#FF0099] animate-spin" />
                    <p className="font-bold text-black/60 text-sm uppercase tracking-widest">
                        Verifying payment...
                    </p>
                </div>
            </div>
        );
    }

    // Error/Invalid/Expired states
    if (["invalid", "error", "expired", "unpaid"].includes(orderStatus.status)) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-lg text-center"
                >
                    {/* Error Icon */}
                    <div
                        className="w-24 h-24 mx-auto mb-8 bg-white flex items-center justify-center"
                        style={{ border: "3px solid #000", boxShadow: "6px 6px 0px #ef4444" }}
                    >
                        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>

                    <h1
                        className="font-brutalist text-3xl md:text-4xl text-black mb-4 uppercase tracking-wider"
                        style={{ textShadow: "3px 3px 0px #ef4444" }}
                    >
                        {orderStatus.status === "expired" ? "Session Expired" : "Payment Issue"}
                    </h1>

                    <p className="font-bold text-black/60 text-sm uppercase tracking-widest mb-8">
                        {orderStatus.message}
                    </p>

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
                    </div>
                </motion.div>
            </div>
        );
    }

    // Success state (paid)
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-lg text-center"
            >
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                    className="w-24 h-24 mx-auto mb-8 bg-[#FF0099] flex items-center justify-center"
                    style={{ border: "3px solid #000", boxShadow: "6px 6px 0px #000" }}
                >
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </motion.div>

                {/* Title */}
                <h1
                    className="font-brutalist text-4xl md:text-5xl text-black mb-4 uppercase tracking-wider"
                    style={{ textShadow: "3px 3px 0px #FF0099" }}
                >
                    Order Confirmed
                </h1>

                {/* Message */}
                <p className="font-bold text-black/60 text-sm uppercase tracking-widest mb-8">
                    {orderStatus.message}
                </p>

                {/* Order Details Card */}
                <div
                    className="bg-white p-8 mb-8"
                    style={{ border: "3px solid #000", boxShadow: "6px 6px 0px #FF0099" }}
                >
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3" style={{ borderBottom: "2px dashed #eee" }}>
                            <span className="font-bold text-black/50 text-xs uppercase tracking-widest">Status</span>
                            <span className="font-bold text-green-500 text-sm uppercase tracking-wider">Paid ✓</span>
                        </div>

                        {orderStatus.customer?.email && (
                            <div className="flex justify-between items-center py-3" style={{ borderBottom: "2px dashed #eee" }}>
                                <span className="font-bold text-black/50 text-xs uppercase tracking-widest">Email</span>
                                <span className="font-bold text-black text-sm">{orderStatus.customer.email}</span>
                            </div>
                        )}

                        {orderStatus.order && orderStatus.order.total > 0 && (
                            <div className="flex justify-between items-center py-3" style={{ borderBottom: "2px dashed #eee" }}>
                                <span className="font-bold text-black/50 text-xs uppercase tracking-widest">Total</span>
                                <span className="font-brutalist text-2xl text-[#FF0099]">
                                    ${(orderStatus.order.total / 100).toLocaleString()}
                                </span>
                            </div>
                        )}

                        {sessionId && (
                            <div className="pt-3">
                                <span className="font-bold text-black/50 text-xs uppercase tracking-widest block mb-2">Order Reference</span>
                                <span className="font-mono text-xs text-black/40 break-all">{sessionId.slice(0, 24)}...</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Info Box */}
                <div
                    className="bg-gray-50 p-6 mb-8 text-left"
                    style={{ border: "3px solid #000" }}
                >
                    <h3 className="font-brutalist text-lg text-black uppercase tracking-wider mb-3">What Happens Now?</h3>
                    <ul className="space-y-2 text-sm text-black/70">
                        <li className="flex items-start gap-2">
                            <span className="text-[#FF0099] font-bold">1.</span>
                            <span>You&apos;ll receive a confirmation email shortly</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#FF0099] font-bold">2.</span>
                            <span>We&apos;ll prepare your order with care</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#FF0099] font-bold">3.</span>
                            <span>You&apos;ll get tracking info when shipped</span>
                        </li>
                    </ul>
                </div>

                {/* Actions */}
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

                    <Link href="/">
                        <button className="w-full font-bold text-sm py-3 text-black/60 uppercase tracking-widest hover:text-[#FF0099] transition-colors">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

export default function CheckoutSuccess() {
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
            <CheckoutSuccessContent />
        </Suspense>
    );
}
