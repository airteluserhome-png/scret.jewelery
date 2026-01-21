"use client";

import { motion } from "framer-motion";
import ScrambleText from "./scramble-text";

export default function HeroMagazine() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#050505] text-white flex items-center justify-center">

            {/* Background Animation - Subtle Pink Glow */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-deep-pink/10 rounded-full blur-[150px] mix-blend-screen"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Central Content */}
            <div className="relative z-10 text-center px-4">
                <h1 className="font-serif italic text-[15vw] md:text-[20vw] leading-none tracking-tighter text-deep-pink mix-blend-screen opacity-90 drop-shadow-2xl">
                    <ScrambleText text="SECRETLY" revealSpeed={150} scrambleSpeed={50} delay={500} />
                </h1>

                <motion.p
                    className="font-mono text-xs md:text-sm text-rose-gold tracking-[0.5em] mt-8 uppercase"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    Est. 2024
                </motion.p>
            </div>

        </section>
    );
}
