"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Truck, ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";

const textVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2,
        },
    },
};

const wordVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            damping: 25,
            stiffness: 100,
        },
    },
};

export default function SplitHeroUltra() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Parallax effect - image moves slower than text
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const headline = "TIMELESS PRECISION.";
    const words = headline.split(" ");

    return (
        <section ref={containerRef} className="relative min-h-screen bg-white overflow-hidden">
            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: "200px 200px",
                }}
            />

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text Content with Parallax */}
                    <motion.div
                        style={{ y: textY, opacity }}
                        className="space-y-8 z-10 relative"
                    >
                        <div>
                            {/* Staggered word animation */}
                            <motion.h1
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                                className="font-serif text-5xl md:text-7xl text-gray-900 leading-tight mb-6"
                            >
                                {words.map((word, index) => (
                                    <motion.span
                                        key={index}
                                        variants={wordVariants}
                                        className="inline-block mr-4"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="font-sans text-gray-600 text-lg leading-relaxed max-w-md"
                            >
                                Crafted with <span className="italic font-serif">meticulous attention</span> to detail, each piece embodies
                                the perfect marriage of Swiss precision and timeless elegance.
                            </motion.p>
                        </div>

                        {/* Magnetic Button */}
                        <MagneticButton />

                        {/* Feature Cards with stagger */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="grid grid-cols-2 gap-4 pt-8"
                        >
                            <FeatureCard
                                icon={Truck}
                                title="Swiss Movement"
                                description="Precision engineering"
                                delay={1.1}
                            />
                            <FeatureCard
                                icon={ShieldCheck}
                                title="Certified Authenticity"
                                description="Guaranteed genuine"
                                delay={1.2}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Lifestyle Image with Parallax */}
                    <motion.div
                        style={{ y: imageY }}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                        className="relative h-[500px] md:h-[700px] group"
                    >
                        {/* Glassmorphic overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-soft-pink/40 to-rose-gold/20 rounded-sm transition-all duration-700 group-hover:from-soft-pink/30 group-hover:to-rose-gold/30" />
                        <div className="absolute inset-0 backdrop-blur-[1px] group-hover:backdrop-blur-0 transition-all duration-700" />

                        {/* High-quality product image */}
                        <div className="absolute inset-0 overflow-hidden rounded-sm">
                            <div className="relative w-full h-full">
                                <Image
                                    src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=90"
                                    alt="Luxury watch on wrist"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Border separator */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-rose-200" />
        </section>
    );
}

function MagneticButton() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="relative border-2 border-gray-900 px-8 py-4 text-sm font-sans tracking-widest uppercase overflow-hidden group"
        >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Explore Collection
            </span>
            <motion.div
                className="absolute inset-0 bg-gray-900"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
            />
        </motion.button>
    );
}

interface FeatureCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    delay: number;
}

function FeatureCard({ icon: Icon, title, description, delay }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6 }}
            className="bg-soft-pink/30 p-6 border border-rose-200 backdrop-blur-sm hover:bg-soft-pink/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
            <Icon className="w-6 h-6 text-rose-gold mb-3 stroke-[1.5px]" />
            <h3 className="font-sans text-sm font-semibold text-gray-900 mb-1">
                {title}
            </h3>
            <p className="font-sans text-xs text-gray-500">{description}</p>
        </motion.div>
    );
}
