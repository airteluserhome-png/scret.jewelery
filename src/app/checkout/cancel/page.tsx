"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CheckoutCancel() {
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
                    className="w-24 h-24 mx-auto mb-8 bg-white flex items-center justify-center"
                    style={{ border: "3px solid #000", boxShadow: "6px 6px 0px #000" }}
                >
                    <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </motion.div>

                {/* Title */}
                <h1 
                    className="font-brutalist text-4xl md:text-5xl text-black mb-4 uppercase tracking-wider"
                    style={{ textShadow: "3px 3px 0px #FF0099" }}
                >
                    Order Cancelled
                </h1>

                {/* Message */}
                <p className="font-bold text-black/60 text-sm uppercase tracking-widest mb-8">
                    Your payment was not processed
                </p>

                {/* Info Card */}
                <div 
                    className="bg-gray-50 p-8 mb-8"
                    style={{ border: "3px solid #000" }}
                >
                    <p className="text-black/70 text-sm leading-relaxed">
                        No worries! Your cart items are still saved. 
                        You can return to checkout whenever you&apos;re ready.
                    </p>
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
                            Return to Shop
                        </motion.button>
                    </Link>

                    <Link href="/">
                        <button className="w-full font-bold text-sm py-3 text-black/60 uppercase tracking-widest hover:text-[#FF0099] transition-colors">
                            Back to Home
                        </button>
                    </Link>
                </div>

                {/* Help Link */}
                <p className="mt-8 text-xs text-black/40 uppercase tracking-widest">
                    Need help? <span className="text-[#FF0099] cursor-pointer hover:underline">Contact us</span>
                </p>
            </motion.div>
        </div>
    );
}
