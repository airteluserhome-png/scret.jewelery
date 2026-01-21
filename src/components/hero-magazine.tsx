"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrambleText from "./scramble-text";

export default function HeroMagazine() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax
    const yVideo = useTransform(scrollY, [0, 1000], [0, 400]);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black text-white">

            {/* Video/Image Background */}
            <motion.div
                style={{ y: yVideo }}
                className="absolute inset-0 z-0 will-change-transform transform-gpu"
            >
                {/* Using a high-end luxury mechanical video/cinemagraph or image */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-90"
                    poster="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1600&q=90"
                >
                    {/* Fallback to image if video not provided/loaded */}
                    <source src="/hero-mechanism.mp4" type="video/mp4" />
                </video>
                {/* Cleaner, Darker Overlay - No Pink Tint */}
                <div className="absolute inset-0 bg-black/20" />
            </motion.div>

            {/* Top Bar Info */}
            <div className="absolute top-0 left-0 right-0 z-20 flex justify-between p-6 md:p-12">
                <span className="font-mono text-xs uppercase tracking-widest text-white/90">Est. 1924</span>
                <span className="font-mono text-xs uppercase tracking-widest text-white/90">Geneva, CH</span>
            </div>

            {/* Centered Title - Bold, Simple, Huge */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 pointer-events-none">
                <h1 className="font-sans font-black text-[15vw] md:text-[18vw] leading-[0.8] tracking-tighter text-white text-center mb-8 drop-shadow-2xl">
                    <ScrambleText text="SECRETLY" revealSpeed={150} scrambleSpeed={50} delay={500} />
                </h1>
                <p className="font-mono text-sm md:text-base uppercase text-white/90 tracking-[0.5em] font-bold">Timeless Precision</p>
            </div>

            {/* Bottom Metadata - Moved higher to avoid overlap */}
            <div className="absolute bottom-8 md:bottom-12 left-0 right-0 z-20 px-6 md:px-12">
                <div className="flex justify-between items-end">
                    <div className="max-w-xs">
                        <p className="font-mono text-xs uppercase text-white/70 mb-2">[ New Arrival ]</p>
                        <p className="font-sans text-sm leading-relaxed text-white/90 hidden md:block">
                            The culmination of a century of mechanical innovation.
                        </p>
                    </div>
                    {/* Scroll Indicator */}
                    <div className="hidden md:flex flex-col items-center">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/70 mb-2">Scroll</span>
                        <span className="block w-[1px] h-16 bg-white/30" />
                    </div>
                </div>
            </div>
        </section>
    );
}
