"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function InitialLoader() {
    const [isVisible, setIsVisible] = useState(true);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        // Only show on initial mount
        if (!hasLoaded) {
            setHasLoaded(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [hasLoaded]);

    // Noise texture SVG
    const noiseSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E`;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F9F9F9]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    {/* Global Noise Overlay */}
                    <div
                        style={{ backgroundImage: `url(${noiseSvg})` }}
                        className="absolute inset-0 z-0 opacity-[0.03] mix-blend-multiply pointer-events-none"
                    />

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Pulsing Brand Text */}
                        <motion.h1
                            className="font-serif text-sm uppercase tracking-[0.5em] text-black"
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            Secretly
                        </motion.h1>

                        {/* Progress Line */}
                        <div className="w-full h-[1px] bg-black/10 mt-4 overflow-hidden w-24">
                            <motion.div
                                className="h-full bg-black"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{
                                    duration: 0.8,
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
