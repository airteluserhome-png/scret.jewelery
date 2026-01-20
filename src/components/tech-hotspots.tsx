"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";

const hotspots = [
    {
        id: 1,
        x: "35%",
        y: "25%",
        label: "Sapphire Crystal",
        description: "Domed, anti-reflective, scratch-resistant coating.",
    },
    {
        id: 2,
        x: "65%",
        y: "40%",
        label: "Guilloché Dial",
        description: "Hand-engraved rose gold dial with sunburst finish.",
    },
    {
        id: 3,
        x: "50%",
        y: "75%",
        label: "Caliber 3235",
        description: "Self-winding mechanical movement. 70h power reserve.",
    },
];

export default function TechHotspots() {
    const [activeSpot, setActiveSpot] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <section
            className="relative py-32 bg-[#FFF0F5] overflow-hidden"
            onMouseMove={handleMouseMove}
            ref={containerRef}
        >
            {/* Dimming Overlay */}
            <motion.div
                className="absolute inset-0 bg-rose-950/20 pointer-events-none z-10"
                animate={{ opacity: activeSpot ? 1 : 0 }}
                transition={{ duration: 0.5 }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-0 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p className="font-sans text-xs tracking-[0.3em] text-rose-900 uppercase mb-4">Interactive</p>
                    <h2 className="font-serif text-5xl md:text-7xl text-rose-950">Grand Complications</h2>
                </motion.div>

                {/* Watch Container */}
                <div className="relative w-[500px] h-[500px] md:w-[600px] md:h-[600px]">
                    {/* Watch Image - Framed in a soft circle gradient if it has a background, or transparent */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white to-rose-50 shadow-2xl border border-white/50 overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1000&q=90" // Close up apple watch style or similar clean face
                            alt="Watch Mechanism"
                            fill
                            className="object-cover scale-110"
                        />
                    </div>

                    {/* Hotspots */}
                    {hotspots.map((spot) => (
                        <button
                            key={spot.id}
                            className="absolute w-8 h-8 rounded-full z-20 flex items-center justify-center group focus:outline-none"
                            style={{ top: spot.y, left: spot.x }}
                            onMouseEnter={() => setActiveSpot(spot.id)}
                            onMouseLeave={() => setActiveSpot(null)}
                        >
                            {/* Pulsing ring */}
                            <span className="absolute inset-0 rounded-full border border-white animate-ping opacity-75" />
                            {/* Core dot */}
                            <span className="relative block w-3 h-3 bg-white rounded-full shadow-lg group-hover:scale-150 transition-transform duration-300" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Floating Info Card using Mouse Position */}
            <AnimatePresence>
                {activeSpot && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 20 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        style={{
                            position: "absolute",
                            top: mousePos.y,
                            left: mousePos.x,
                            pointerEvents: "none",
                        }}
                        className="z-50 w-64 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-lg shadow-2xl text-rose-950"
                    >
                        <h3 className="font-serif text-xl mb-2">
                            {hotspots.find(h => h.id === activeSpot)?.label}
                        </h3>
                        <p className="font-sans text-sm leading-relaxed opacity-80">
                            {hotspots.find(h => h.id === activeSpot)?.description}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-rose-900/5 mx-12" />
        </section>
    );
}
