"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Mock Product Data
const products: Record<string, any> = {
    "1": {
        id: "1",
        collection: "Secretly Collection",
        name: "Caliber 9001 Automatic",
        price: "$42,000",
        ref: "9001-A/X",
        description: "The culmination of a century of mechanical innovation. Precision that defies time itself. Hand-assembled in Geneva by master horologists.",
        images: [
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=90",
            "https://images.unsplash.com/photo-1611591437764-0f82e48c4707?w=1200&q=90",
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1200&q=90",
            "https://images.unsplash.com/photo-1587836374608-f94ae1c72ec5?w=1200&q=90",
        ],
        materials: [
            {
                name: "18k Rose Gold",
                color: "#B76E79",
                image: "https://images.unsplash.com/photo-1611591437764-0f82e48c4707?w=200&q=90"
            },
            {
                name: "18k Yellow Gold",
                color: "#D4AF37",
                image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200&q=90"
            },
            {
                name: "18k White Gold",
                color: "#E5E4E2",
                image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&q=90"
            },
        ],
        sizes: ["Small", "Medium", "Large"],
    },
    "2": {
        id: "2",
        collection: "Heritage Collection",
        name: "Royal Black Bay Diver",
        price: "$4,150",
        ref: "2024-B/Y",
        description: "A modern interpretation of classic dive watch design. Built for those who demand both form and function.",
        images: [
            "https://images.unsplash.com/photo-1611591437764-0f82e48c4707?w=1200&q=90",
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=90",
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1200&q=90",
        ],
        materials: [
            {
                name: "Stainless Steel",
                color: "#C0C0C0",
                image: "https://images.unsplash.com/photo-1611591437764-0f82e48c4707?w=200&q=90"
            },
            {
                name: "Black PVD",
                color: "#1a1a1a",
                image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200&q=90"
            },
        ],
        sizes: ["Small", "Medium", "Large"],
    },
};

export default function ProductPage({ params }: { params: { id: string } }) {
    const product = products[params.id] || products["1"];
    const [selectedMaterial, setSelectedMaterial] = useState(0);
    const [selectedSize, setSelectedSize] = useState(1);
    const [ctaHovered, setCtaHovered] = useState(false);

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Flipped Grid: LEFT = Details (40%), RIGHT = Images (60%) */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]">

                {/* LEFT: Sticky Configurator Panel */}
                <div className="sticky top-0 h-screen flex flex-col justify-between p-8 lg:p-12 bg-white border-r border-black/10 overflow-y-auto">

                    {/* Breadcrumbs */}
                    <div>
                        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-8">
                            <Link href="/" className="hover:text-black transition-colors">Home</Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link href="/" className="hover:text-black transition-colors">Watches</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-black">{product.name}</span>
                        </div>

                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="font-serif text-2xl mb-2 text-gray-600">{product.collection}</h2>
                            <h1 className="font-sans text-3xl lg:text-4xl leading-tight mb-4">
                                {product.name}
                            </h1>
                            <p className="font-mono text-2xl font-semibold">{product.price}</p>
                        </div>

                        <p className="font-sans text-sm leading-relaxed text-gray-600 mb-8 pb-8 border-b border-black/5">
                            {product.description}
                        </p>

                        {/* Material Selector - Thumbnail Cards (Tiffany Style) */}
                        <div className="mb-8">
                            <label className="font-mono text-[11px] uppercase tracking-widest text-gray-900 mb-4 block font-semibold">
                                Material
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {product.materials.map((material: any, i: number) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedMaterial(i)}
                                        className={`relative aspect-square border-2 transition-all ${selectedMaterial === i
                                                ? "border-black"
                                                : "border-gray-200 hover:border-gray-400"
                                            }`}
                                    >
                                        <div
                                            className="w-full h-full"
                                            style={{ backgroundColor: material.color }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-white mix-blend-difference">
                                                {material.name.split(' ')[1]}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <p className="font-sans text-xs text-gray-500 mt-3">{product.materials[selectedMaterial].name}</p>
                        </div>

                        {/* Size Selector - Minimalist Underline Style */}
                        <div className="mb-8 pb-8 border-b border-black/5">
                            <div className="flex items-center gap-2 mb-4">
                                <label className="font-mono text-[11px] uppercase tracking-widest text-gray-900 font-semibold">
                                    Size
                                </label>
                                <button className="font-mono text-[10px] uppercase tracking-widest text-gray-400 underline hover:text-black">
                                    Size Guide
                                </button>
                            </div>
                            <div className="flex gap-6">
                                {product.sizes.map((size: string, i: number) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedSize(i)}
                                        className={`font-sans text-sm pb-1 transition-all ${selectedSize === i
                                                ? "border-b-2 border-black font-medium"
                                                : "text-gray-400 hover:text-black"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stacked Action Buttons (Tiffany Style) */}
                    <div className="space-y-3">
                        {/* Primary CTA */}
                        <motion.button
                            className="w-full bg-black text-white py-4 font-mono text-xs uppercase tracking-widest relative overflow-hidden"
                            onHoverStart={() => setCtaHovered(true)}
                            onHoverEnd={() => setCtaHovered(false)}
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.span
                                className="block"
                                animate={{ y: ctaHovered ? -30 : 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                Add to Cart
                            </motion.span>
                            <motion.span
                                className="absolute inset-0 flex items-center justify-center"
                                animate={{ y: ctaHovered ? 0 : 30 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                Secure Checkout
                            </motion.span>
                        </motion.button>

                        {/* Secondary CTA */}
                        <button className="w-full bg-stone-100 text-black py-4 font-mono text-xs uppercase tracking-widest hover:bg-stone-200 transition-colors">
                            Contact Your Advisor
                        </button>

                        <p className="font-mono text-[10px] text-center text-gray-400 uppercase tracking-widest pt-2">
                            Complimentary Shipping — 30-Day Returns
                        </p>
                    </div>
                </div>

                {/* RIGHT: Scrollable Image Gallery */}
                <div className="relative bg-stone-100">
                    {product.images.map((img: string, i: number) => (
                        <motion.div
                            key={i}
                            layoutId={i === 0 ? `image-${product.id}` : undefined}
                            className="relative w-full h-screen"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                            <Image
                                src={img}
                                alt={`${product.name} view ${i + 1}`}
                                fill
                                className="object-cover"
                                sizes="60vw"
                                priority={i === 0}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
