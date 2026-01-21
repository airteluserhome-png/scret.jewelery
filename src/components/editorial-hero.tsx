"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EditorialHero() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="relative min-h-screen overflow-hidden bg-off-white">
            {/* Diagonal Lines - Background Energy */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute w-[140%] h-[1px] bg-black top-[20%] left-[-20%] -rotate-6" />
                <div className="absolute w-[140%] h-[1px] bg-black top-[50%] left-[-20%] -rotate-6" />
                <div className="absolute w-[140%] h-[1px] bg-black top-[80%] left-[-20%] -rotate-6" />
            </div>

            {/* Main Composition - NO GRID */}
            <div className="relative px-6 md:px-16 lg:px-24 py-20 md:py-32">

                {/* Typography First - Massive Headline */}
                <motion.h1
                    className="font-brutalist uppercase text-black relative z-20"
                    style={{
                        fontSize: 'clamp(4rem, 12vw, 11rem)',
                        lineHeight: 0.88,
                        letterSpacing: '-0.05em',
                        maxWidth: '85%'
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    OWN THE<br />
                    <span className="text-hot-pink">MOMENT*</span><br />
                    SECRETLY
                </motion.h1>

                {/* Subtitle - Editorial Style */}
                <motion.p
                    className="mt-8 text-lg md:text-xl max-w-md relative z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    Premium Quality • Full Packaging<br />
                    <span className="text-hot-pink font-bold">Limited Availability</span>
                </motion.p>

                {/* CTA - Bold */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="relative z-20"
                >
                    <Link href="/shop">
                        <button className="mt-12 bg-black text-white px-10 py-5 font-brutalist text-xl uppercase hover:bg-hot-pink transition-colors duration-300 shadow-[8px_8px_0_#FF55BB]">
                            EXPLORE COLLECTION →
                        </button>
                    </Link>
                </motion.div>

                {/* Watch Images - Manual Positioning (Art Director Style) */}

                {/* Main Watch - Large, Slight Rotation */}
                <motion.div
                    className="absolute right-[15%] top-[15%] w-[35%] max-w-[500px] z-10"
                    style={{
                        transform: `rotate(-4deg) translateY(${scrollY * 0.1}px)`,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                >
                    <div className="relative drop-shadow-2xl">
                        <Image
                            src="/ICED OUT AP/AP iced out rose gold.jpg"
                            alt="Featured Watch"
                            width={500}
                            height={600}
                            className="w-full h-auto mix-blend-multiply"
                        />
                    </div>
                </motion.div>

                {/* Secondary Watch - Smaller, Different Angle */}
                <motion.div
                    className="absolute right-[5%] bottom-[10%] w-[25%] max-w-[350px] z-15"
                    style={{
                        transform: `rotate(5deg) translateY(${scrollY * 0.15}px)`,
                    }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                >
                    <div className="relative drop-shadow-xl">
                        <Image
                            src="/AP/AP Skeleton.jpg"
                            alt="AP Skeleton"
                            width={350}
                            height={450}
                            className="w-full h-auto mix-blend-multiply"
                        />
                    </div>
                </motion.div>

                {/* Floating Accent Badge */}
                <motion.div
                    className="absolute left-[45%] top-[60%] bg-hot-pink text-white px-6 py-3 font-brutalist text-sm uppercase border-4 border-black shadow-[6px_6px_0_black] z-25"
                    style={{
                        transform: 'rotate(-8deg)',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                >
                    NEW DROP
                </motion.div>
            </div>

            {/* Bottom Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
            >
                <div className="text-xs uppercase tracking-widest mb-2">Scroll</div>
                <div className="w-[1px] h-12 bg-black mx-auto" />
            </motion.div>
        </section>
    );
}
