"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function RetroBackground() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    // Generate random spark positions
    const sparks = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
        duration: 1 + Math.random() * 2
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Retro Grid Background */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Floating Arcade Symbols */}
            {sparks.map((spark) => (
                <motion.div
                    key={spark.id}
                    className="absolute text-hot-pink font-bold text-xl md:text-2xl"
                    style={{ top: spark.top, left: spark.left }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.2, 0.5],
                        rotate: [0, 90, 180]
                    }}
                    transition={{
                        duration: spark.duration,
                        repeat: Infinity,
                        delay: spark.delay,
                        ease: "easeInOut"
                    }}
                >
                    {["+", "×", "★", "⚡"][spark.id % 4]}
                </motion.div>
            ))}

            {/* "INSERT COIN" Blinking Text - Retro Arcade Feel */}
            <motion.div
                className="absolute top-4 right-4 font-brutalist text-xs md:text-sm tracking-widest text-black/20"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                INSERT COIN
            </motion.div>

            {/* "HIGH SCORE" Text */}
            <div className="absolute bottom-4 left-4 font-brutalist text-xs md:text-sm tracking-widest text-black/20">
                HIGH SCORE: 999999
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-hot-pink" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-hot-pink" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-hot-pink" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-hot-pink" />
        </div>
    );
}
