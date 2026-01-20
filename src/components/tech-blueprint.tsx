"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const specs = [
    { label: "Caliber", value: "9001 Automatic" },
    { label: "Jewels", value: "42 Rubies" },
    { label: "Frequency", value: "28,800 VPH" },
    { label: "Power Reserve", value: "72 Hours" },
    { label: "Water Resistance", value: "100 Meters" },
    { label: "Case Material", value: "18k Rose Gold" },
    { label: "Crystal", value: "Domed Sapphire" },
    { label: "Strap", value: "Alligator Leather" },
];

export default function TechnicalBlueprint() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative min-h-[150vh] bg-stone-50 border-t border-black/5">
            <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row">

                {/* Col 1: Title (Sticky) */}
                <div className="w-full md:w-1/4 p-6 md:p-12 border-b md:border-b-0 md:border-r border-black/5 flex flex-col justify-between">
                    <div>
                        <h2 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-4">[ Specification ]</h2>
                        <h3 className="font-serif text-5xl md:text-7xl leading-none tracking-tighter text-gray-900">
                            CALIBER<br />9001
                        </h3>
                    </div>
                    <div className="font-mono text-[10px] text-gray-400 uppercase hidden md:block">
                        Ref. 2499-A/X
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

                    <motion.div
                        className="relative w-[300px] md:w-[500px] aspect-square"
                        style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 90]) }}
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1587836374608-f94ae1c72ec5?w=1000&q=90" // Close up mechanism or transparent watch
                            alt="Watch Mechanism"
                            fill
                            className="object-contain mix-blend-multiplycontrast-125 grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </motion.div>
                </div>

                {/* Col 3: Scrolling Specs */}
                <div className="w-full md:w-1/4 h-full overflow-hidden relative bg-white">
                    <div className="absolute inset-0 flex flex-col">
                        {specs.map((spec, i) => (
                            <motion.div
                                key={i}
                                className="flex-1 flex flex-col justify-center px-8 border-b border-black/5 hover:bg-rose-400 hover:text-white transition-colors duration-300 group"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-1 group-hover:text-white/50">{spec.label}</span>
                                <span className="font-sans text-xl md:text-2xl font-medium tracking-tight group-hover:pl-4 transition-all duration-300">{spec.value}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
