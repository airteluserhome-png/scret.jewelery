"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LuxuryLoader() {
    const [isVisible, setIsVisible] = useState(true);

    // Minimum "Luxury Pause" Duration
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2000); // 2s delay for proper branding moment

        return () => clearTimeout(timer);
    }, []);

    // Noise texture SVG
    const noiseSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E`;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "circIn" }}
                >
                    {/* Global Noise Overlay */}
                    <div
                        style={{ backgroundImage: `url(${noiseSvg})` }}
                        className="absolute inset-0 z-0 opacity-[0.05] mix-blend-multiply pointer-events-none"
                    />

                    <div className="relative z-10 flex flex-col items-center">
                        {/* BRUTALIST BRANDING */}
                        <div className="relative">
                            {/* Pink Shadow Layer */}
                            <motion.h1
                                className="absolute top-1 left-1 font-brutalist text-6xl md:text-8xl uppercase tracking-tighter text-hot-pink select-none"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                SECRETLY
                            </motion.h1>

                            {/* Main Black Text */}
                            <motion.h1
                                className="relative font-brutalist text-6xl md:text-8xl uppercase tracking-tighter text-black select-none z-10"
                                initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                                animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                            >
                                SECRETLY
                            </motion.h1>
                        </div>

                        {/* LOADING STATUS */}
                        <div className="mt-8 flex items-center gap-4">
                            <motion.div
                                className="w-3 h-3 bg-hot-pink"
                                animate={{
                                    scale: [1, 0, 1],
                                    rotate: [0, 90, 180]
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    ease: "steps(1)"
                                }}
                            />
                            <motion.p
                                className="font-mono text-xs uppercase tracking-widest text-black"
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                            >
                                LOADING_ASSETS
                            </motion.p>
                        </div>

                        {/* Thicker Progress Bar */}
                        <div className="w-64 h-2 bg-black/10 mt-4 overflow-hidden border border-black">
                            <motion.div
                                className="h-full bg-hot-pink"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{
                                    duration: 1.8,
                                    ease: "easeInOut"
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
