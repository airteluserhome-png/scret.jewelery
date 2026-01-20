"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";

export default function HeroMagazine() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax
    const yVideo = useTransform(scrollY, [0, 1000], [0, 400]);

    // Magnetic Button Cursor Follower
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 50); // Center adjustment
            mouseY.set(e.clientY - 50);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black text-white">
            {/* Magnetic Shop Button - Visible on Hover/Move */}
            <motion.div
                className="fixed z-50 pointer-events-none hidden md:flex items-center justify-center w-24 h-24 rounded-full bg-white text-black mix-blend-difference"
                style={{ x: springX, y: springY }}
            >
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-mono uppercase tracking-widest">Shop</span>
                    <span className="text-[10px] font-mono uppercase tracking-widest">Now</span>
                </div>
            </motion.div>

            {/* Video/Image Background */}
            <motion.div
                style={{ y: yVideo }}
                className="absolute inset-0 z-0 opacity-80"
            >
                {/* Using a high-end luxury mechanical video/cinemagraph or image */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1600&q=90"
                >
                    {/* Fallback to image if video not provided/loaded */}
                    <source src="/hero-mechanism.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/30" />
            </motion.div>

            {/* Huge Overlay Title - Bottom Aligned & Cut Off */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end pb-0 pointer-events-none mix-blend-overlay">
                <h1 className="font-serif text-[15vw] leading-[0.8] tracking-tighter text-white/90 text-center translate-y-[2vw]">
                    SECRETLY
                </h1>
            </div>

            {/* Top Bar Info */}
            <div className="absolute top-0 left-0 right-0 z-20 flex justify-between p-6 md:p-12 mix-blend-difference">
                <span className="font-mono text-xs uppercase tracking-widest">Est. 1924</span>
                <span className="font-mono text-xs uppercase tracking-widest">Geneva, CH</span>
            </div>

            {/* Bottom Metadata */}
            <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-between px-6 md:px-12 items-end">
                <div className="max-w-xs">
                    <p className="font-mono text-xs uppercase text-white/70 mb-2">[ New Arrival ]</p>
                    <p className="font-sans text-sm leading-relaxed text-white/90">
                        The culmination of a century of mechanical innovation.
                        Precision that defies time itself.
                    </p>
                </div>
                {/* Scroll Indicator */}
                <div className="hidden md:block">
                    <span className="block w-[1px] h-24 bg-white/50 mx-auto mb-2" />
                    <span className="font-mono text-[10px] uppercase tracking-widest -rotate-90 block">Scroll</span>
                </div>
            </div>
        </section>
    );
}
