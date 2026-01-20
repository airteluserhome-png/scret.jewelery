"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";

export default function HeroEditorial() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax effects
    const yText = useTransform(scrollY, [0, 1000], [0, 400]);
    const yImage = useTransform(scrollY, [0, 1000], [0, 150]);
    const scaleImage = useTransform(scrollY, [0, 1000], [1, 1.1]);

    // Mouse interaction for the watch
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 40, damping: 15 });
    const springY = useSpring(mouseY, { stiffness: 40, damping: 15 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX - innerWidth / 2) / 25; // Gentle move
            const y = (e.clientY - innerHeight / 2) / 25;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F5] via-white to-[#FDF5E6]" />

            {/* Huge Typography Layer - BEHIND Watch */}
            <motion.div
                style={{ y: yText }}
                className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
            >
                <h1 className="font-serif text-[12vw] md:text-[14vw] leading-[0.8] text-rose-950/20 text-center tracking-tighter mix-blend-multiply">
                    <AnimatedText text="TIMELESS" delay={0} />
                    <br />
                    <AnimatedText text="PRECISION" delay={0.2} />
                </h1>
            </motion.div>

            {/* Watch Layer - FRONT */}
            <motion.div
                style={{
                    y: yImage,
                    scale: scaleImage,
                    x: springX,
                    rotateX: springY, // Subtle 3D tilt
                }}
                className="relative z-20 w-[80vw] max-w-[500px] aspect-[2/3] md:aspect-square will-change-transform"
            >
                {/* Shadow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-rose-900/10 blur-[100px] rounded-full" />

                {/* Watch Image - Using a transparent PNG style image or close cut */}
                <Image
                    src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=95" // High res watch
                    alt="Luxury Floating Watch"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                />
            </motion.div>

            {/* Bottom Info */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-12 left-0 right-0 z-30 flex justify-between px-6 md:px-12 items-end"
            >
                <div className="text-xs font-sans tracking-[0.2em] font-medium text-rose-900/60 uppercase">
                    Scrolldown
                </div>
                <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl text-rose-950 italic">Collection 2026</p>
                    <p className="text-xs font-sans tracking-widest text-rose-900/60 mt-1 uppercase">Crafted in Geneva</p>
                </div>
            </motion.div>
        </section>
    );
}

function AnimatedText({ text, delay }: { text: string, delay: number }) {
    const letters = Array.from(text);
    return (
        <span className="inline-block overflow-hidden">
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1], // Apple-like ease
                        delay: delay + index * 0.05
                    }}
                    className="inline-block"
                >
                    {letter}
                </motion.span>
            ))}
        </span>
    );
}
