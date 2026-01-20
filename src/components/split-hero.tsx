"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck } from "lucide-react";

export default function SplitHero() {
    return (
        <section className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="font-serif text-5xl md:text-7xl text-gray-900 leading-tight mb-6"
                            >
                                TIMELESS
                                <br />
                                PRECISION.
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="font-sans text-gray-600 text-lg leading-relaxed max-w-md"
                            >
                                Crafted with meticulous attention to detail, each piece embodies
                                the perfect marriage of Swiss precision and timeless elegance.
                            </motion.p>
                        </div>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="border-2 border-gray-900 px-8 py-4 text-sm font-sans tracking-widest uppercase hover:bg-gray-900 hover:text-white transition-all duration-300"
                        >
                            Explore Collection
                        </motion.button>

                        {/* Feature Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="grid grid-cols-2 gap-4 pt-8"
                        >
                            <div className="bg-soft-pink/30 p-6 border border-gray-100">
                                <Truck className="w-6 h-6 text-rose-gold mb-3 stroke-[1.5px]" />
                                <h3 className="font-sans text-sm font-semibold text-gray-900 mb-1">
                                    Swiss Movement
                                </h3>
                                <p className="font-sans text-xs text-gray-500">
                                    Precision engineering
                                </p>
                            </div>
                            <div className="bg-soft-pink/30 p-6 border border-gray-100">
                                <ShieldCheck className="w-6 h-6 text-rose-gold mb-3 stroke-[1.5px]" />
                                <h3 className="font-sans text-sm font-semibold text-gray-900 mb-1">
                                    Certified Authenticity
                                </h3>
                                <p className="font-sans text-xs text-gray-500">
                                    Guaranteed genuine
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Lifestyle Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                        className="relative h-[500px] md:h-[700px]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-soft-pink/40 to-rose-gold/20 rounded-sm" />
                        {/* Placeholder for lifestyle image - replace with actual image */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="font-serif text-2xl text-gray-400">
                                [Lifestyle Image]
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
