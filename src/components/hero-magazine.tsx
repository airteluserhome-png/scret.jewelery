"use client";

import { motion } from "framer-motion";
import ScrambleText from "./scramble-text";

export default function HeroMagazine() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#0a0a0a] text-white flex items-center justify-center">

            {/* Background Animation - Abstract 'Spotlight' / Gradient Flow */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    className="absolute top-[-20%] left-[-20%] w-[70vw] h-[70vw] bg-deep-pink/20 rounded-full blur-[120px] mix-blend-screen"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-rose-gold/20 rounded-full blur-[100px] mix-blend-screen"
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 60, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </div>

            {/* Central Content - Minimal & Elegant */}
            <div className="relative z-10 text-center px-4">
                <h1 className="font-serif text-[15vw] md:text-[18vw] leading-none tracking-tighter text-white mix-blend-overlay opacity-90">
                    <ScrambleText text="SECRETLY" revealSpeed={150} scrambleSpeed={50} delay={500} />
                </h1>

                {/* Floating Abstract Illustration / Element */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    {/* A simple, elegant line or shape to delineate the space without being 'jewelry' */}
                    <div className="w-[1px] h-[150px] bg-gradient-to-b from-transparent via-white/50 to-transparent mx-auto mt-12" />
                </motion.div>
            </div>

        </section>
    );
}
