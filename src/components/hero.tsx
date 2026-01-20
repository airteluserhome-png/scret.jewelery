"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-luxury-white"
        >
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0"
            >
                {/* Placeholder for Cinematic Video/Image - using a gradient for now or the model image if available */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-soft-pink/30 mix-blend-overlay" />
                {/* Ideally this would be <Image ... /> or <video ... /> */}
                <div className="w-full h-full bg-[url('/hero-image.png')] bg-cover bg-center opacity-80" />
            </motion.div>

            <div className="relative z-10 text-center px-4">
                <motion.h1
                    style={{ opacity }}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="font-serif text-6xl md:text-8xl lg:text-9xl text-gray-900 mb-6 tracking-tight"
                >
                    Timeless Elegance
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                    className="text-stone-500 text-lg md:text-xl font-sans tracking-widest uppercase"
                >
                    Secretly
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-16 bg-gray-300 mx-auto" />
            </motion.div>
        </section>
    );
}
