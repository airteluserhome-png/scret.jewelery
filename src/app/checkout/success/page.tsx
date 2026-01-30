"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CheckoutSuccess() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Clear cart on successful checkout
        if (typeof window !== "undefined") {
            localStorage.removeItem("secretly_cart");
        }
    }, []);

    if (!mounted) return null;

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
                    Thank you for your purchase
                </p>

                {/* Order Details Card */}
                <div 
                    className="bg-white p-8 mb-8"
                    style={{ border: "3px solid #000", boxShadow: "6px 6px 0px #FF0099" }}
                >
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3" style={{ borderBottom: "2px dashed #eee" }}>
                            <span className="font-bold text-black/50 text-xs uppercase tracking-widest">Status</span>
                            <span className="font-bold text-[#FF0099] text-sm uppercase tracking-wider">Paid</span>
                        </div>
                        
                        <div className="flex justify-between items-center py-3" style={{ borderBottom: "2px dashed #eee" }}>
                            <span className="font-bold text-black/50 text-xs uppercase tracking-widest">What&apos;s Next</span>
                            <span className="font-bold text-black text-sm uppercase tracking-wider">Processing</span>
                        </div>

                        {sessionId && (
                            <div className="pt-3">
                                <span className="font-bold text-black/50 text-xs uppercase tracking-widest block mb-2">Order Reference</span>
                                <span className="font-mono text-xs text-black/40 break-all">{sessionId.slice(0, 20)}...</span>
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
