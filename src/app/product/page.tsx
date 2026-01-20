"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Check } from "lucide-react";

const productImages = [
    "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=90", // Hero shot
    "https://images.unsplash.com/photo-1611591437764-0f82e48c4707?w=1200&q=90", // Detail shot
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1200&q=90", // Lifestyle shot
    "https://images.unsplash.com/photo-1587836374608-f94ae1c72ec5?w=1200&q=90", // Mechanism shot
];

const colors = [
    { name: "Rose Gold", value: "#B76E79" },
    { name: "Yellow Gold", value: "#D4AF37" },
    { name: "White Gold", value: "#E5E4E2" },
    { name: "Platinum", value: "#C0C0C0" },
];

const straps = ["ALLIGATOR", "STEEL", "RUBBER"];

export default function ProductDetailPage() {
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedStrap, setSelectedStrap] = useState(0);
    const [ctaHovered, setCtaHovered] = useState(false);

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Main Grid: 60/40 Split */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] min-h-screen">

                {/* LEFT: Scrollable Image Gallery */}
                <div className="relative border-r border-black/10">
                    <div className="space-y-0">
                        {productImages.map((img, i) => (
                            <motion.div
                                key={i}
                                className="relative w-full h-screen"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                <Image
                                    src={img}
                                    alt={`Product view ${i + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="60vw"
                                    priority={i === 0}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Sticky Control Panel */}
                <div className="sticky top-0 h-screen flex flex-col justify-between p-8 lg:p-12 bg-white">

                    {/* Header */}
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="font-serif text-5xl lg:text-6xl leading-none tracking-tight mb-2">
                                    Caliber<br />9001
                                </h1>
                                <p className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                                    REF. 9001-A/X
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-mono text-3xl tracking-tight">$42,000</p>
                            </div>
                        </div>

                        <p className="font-sans text-sm leading-relaxed text-gray-600 mb-8 border-t border-black/5 pt-6">
                            The culmination of a century of mechanical innovation.
                            Precision that defies time itself. Hand-assembled in Geneva
                            by master horologists.
                        </p>

                        {/* Color Selector - Square Swatches */}
                        <div className="mb-8 border-t border-black/5 pt-6">
                            <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-4 block">
                                Case Material
                            </label>
                            <div className="flex gap-3">
                                {colors.map((color, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedColor(i)}
                                        className="relative w-16 h-16 border border-black/20 hover:border-black/40 transition-colors group"
                                        style={{ backgroundColor: color.value }}
                                    >
                                        {selectedColor === i && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute inset-2 bg-black/80 flex items-center justify-center"
                                            >
                                                <Check className="w-6 h-6 text-white" />
                                            </motion.div>
                                        )}
                                        <span className="sr-only">{color.name}</span>
                                    </button>
                                ))}
                            </div>
                            <p className="font-sans text-xs text-gray-500 mt-2">{colors[selectedColor].name}</p>
                        </div>

                        {/* Strap Selector - Architectural Buttons */}
                        <div className="mb-8 border-t border-black/5 pt-6">
                            <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-4 block">
                                Strap Type
                            </label>
                            <div className="flex items-center divide-x divide-black/20 border border-black/20">
                                {straps.map((strap, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedStrap(i)}
                                        className={`flex-1 py-3 font-mono text-xs uppercase tracking-widest transition-colors ${selectedStrap === i
                                                ? "bg-black text-white"
                                                : "bg-white text-black hover:bg-stone-100"
                                            }`}
                                    >
                                        {strap}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div>
                        <motion.button
                            className="w-full bg-black text-white py-6 font-mono text-sm uppercase tracking-widest relative overflow-hidden"
                            onHoverStart={() => setCtaHovered(true)}
                            onHoverEnd={() => setCtaHovered(false)}
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.span
                                className="block"
                                animate={{ y: ctaHovered ? -30 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                Add to Bag
                            </motion.span>
                            <motion.span
                                className="absolute inset-0 flex items-center justify-center"
                                animate={{ y: ctaHovered ? 0 : 30 }}
                                transition={{ duration: 0.3 }}
                            >
                                Secure Checkout
                            </motion.span>
                        </motion.button>

                        <p className="font-mono text-[10px] text-center text-gray-400 uppercase tracking-widest mt-4">
                            Free Shipping — 30-Day Returns
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
