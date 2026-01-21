"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

// Dynamic Blueprint Data - Updated images to match new catalog
const blueprintData = [
    {
        id: "rolex",
        title: "ROLEX\nICED",
        ref: "Ref. 116505",
        image: "/iced-rolex-1.jpg",
        specs: [
            { label: "Caliber", value: "4130 Manufacture" },
            { label: "Jewels", value: "44 Rubies" },
            { label: "Frequency", value: "28,800 VPH" },
            { label: "Power Reserve", value: "72 Hours" },
            { label: "Water Resistance", value: "100 Meters" },
            { label: "Case Material", value: "18k Everose Gold" },
            { label: "Crystal", value: "Scratch-resistant Sapphire" },
            { label: "Strap", value: "Oyster Bracelet" },
        ]
    },
    {
        id: "patek",
        title: "PATEK\nPLAIN",
        ref: "Ref. 5711/1A",
        image: "/patek-plain-1.jpg",
        specs: [
            { label: "Caliber", value: "26-330 SC" },
            { label: "Jewels", value: "30 Rubies" },
            { label: "Frequency", value: "28,800 VPH" },
            { label: "Power Reserve", value: "45 Hours" },
            { label: "Water Resistance", value: "120 Meters" },
            { label: "Case Material", value: "Stainless Steel" },
            { label: "Crystal", value: "Sapphire Crystal" },
            { label: "Strap", value: "Steel Bracelet" },
        ]
    },
    {
        id: "patek-iced",
        title: "PATEK\nICED",
        ref: "Ref. 5719/10G",
        image: "/iced-patek-1.jpg",
        specs: [
            { label: "Movement", value: "Self-winding Mechanical" },
            { label: "Setting", value: "Full Diamond Pave" },
            { label: "Frequency", value: "28,800 VPH" },
            { label: "Case Width", value: "40mm" },
            { label: "Water Resistance", value: "120 Meters" },
            { label: "Case Material", value: "18k White Gold" },
            { label: "Crystal", value: "Sapphire Crystal" },
            { label: "Strap", value: "Diamond Set Gold" },
        ]
    }
];

// Typewriter Text Component
const TypewriterText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
    // Split text into characters, preserving spaces
    const characters = Array.from(text);

    return (
        <span className="inline-block">
            {characters.map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, display: "none" }}
                    animate={{ opacity: 1, display: "inline" }}
                    transition={{
                        duration: 0.01,
                        delay: delay + (i * 0.03), // Fast typing speed
                        ease: "linear"
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
};

export default function TechnicalBlueprint() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Auto-Cycle Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % blueprintData.length);
        }, 5000); // 5 Seconds per product

        return () => clearInterval(interval);
    }, []);

    const currentProduct = blueprintData[currentIndex];

    return (
        <section ref={containerRef} className="relative min-h-[150vh] bg-stone-50 border-t border-black/5">
            <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row">

                {/* Col 1: Title (Sticky) */}
                <div className="w-full md:w-1/4 p-6 md:p-12 border-b md:border-b-0 md:border-r border-black/5 flex flex-col justify-between">
                    <div>
                        <h2 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-4 h-4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentProduct.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <TypewriterText text="[ SPECIFICATION ]" />
                                </motion.div>
                            </AnimatePresence>
                        </h2>
                        <div className="min-h-[120px]"> {/* Fixed height container to prevent jumps */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentProduct.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h3 className="font-sans font-black text-5xl md:text-7xl leading-none tracking-tighter text-gray-900 whitespace-pre-line uppercase">
                                        <TypewriterText text={currentProduct.title} delay={0.2} />
                                    </h3>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="font-mono text-[10px] text-gray-400 uppercase hidden md:block">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentProduct.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <TypewriterText text={currentProduct.ref} delay={0.5} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Col 2: Watch Image (Centered & blueprint style) */}
                <div className="w-full md:w-1/2 relative bg-stone-100/50 border-b md:border-b-0 md:border-r border-black/5 flex items-center justify-center overflow-hidden">
                    {/* Grid Lines Background */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                            backgroundSize: "40px 40px"
                        }}
                    />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentProduct.id}
                            className="relative w-[300px] md:w-[400px] aspect-square"
                            initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 1.1, rotate: 10 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 45]) }} // Subtle scroll rotation
                        >
                            <Image
                                src={currentProduct.image}
                                alt={currentProduct.title}
                                fill
                                className="object-cover rounded-md drop-shadow-2xl"
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Col 3: Scrolling Specs */}
                <div className="w-full md:w-1/4 h-full overflow-hidden relative bg-white">
                    <div className="absolute inset-0 flex flex-col">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentProduct.id}
                                className="w-full h-full flex flex-col"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ staggerChildren: 0.1 }}
                            >
                                {currentProduct.specs.map((spec, i) => (
                                    <div
                                        key={spec.label}
                                        className="flex-1 flex flex-col justify-center px-8 border-b border-black/5 hover:bg-deep-pink hover:text-white transition-colors duration-300 group"
                                    >
                                        <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-1 group-hover:text-white/50 block h-4">
                                            <TypewriterText text={spec.label} delay={0.6 + (i * 0.1)} />
                                        </span>
                                        <span className="font-sans text-xl md:text-2xl font-black uppercase tracking-tighter group-hover:pl-4 transition-all duration-300 block">
                                            <TypewriterText text={spec.value} delay={0.8 + (i * 0.1)} />
                                        </span>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </section>
    );
}
