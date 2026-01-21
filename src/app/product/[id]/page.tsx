"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ScrambleText from "@/components/scramble-text";

// Mock Product Data
// Optimized for O(1) Lookup
const products: Record<string, any> = {
    "1": {
        id: "1",
        collection: "Cosmograph",
        name: "Daytona Rose Gold",
        price: "$42,000",
        ref: "116505",
        description: "The ultimate tool watch for those with a passion for driving and speed. Features a 40mm 18 ct Everose gold case and an Oyster bracelet.",
        images: [
            "/rolex-daytona.png",
            "/rolex-daytona.png",
            "/rolex-daytona.png",
        ],
        materials: [
            {
                name: "18k Rose Gold",
                color: "#B76E79",
                image: "/rolex-daytona.png"
            },
            {
                name: "18k Yellow Gold",
                color: "#D4AF37",
                image: "/rolex-daytona.png"
            },
        ],
        sizes: ["40mm"],
    },
    "2": {
        id: "2",
        collection: "Royal Oak",
        name: "Selfwinding 41mm",
        price: "$34,150",
        ref: "15500ST",
        description: "Stainless steel case, glareproofed sapphire crystal and caseback, screw-locked crown.",
        images: [
            "/ap-royal-oak.png",
            "/ap-royal-oak.png",
            "/ap-royal-oak.png",
        ],
        materials: [
            {
                name: "Stainless Steel",
                color: "#C0C0C0",
                image: "/ap-royal-oak.png"
            },
        ],
        sizes: ["41mm"],
    },
};

export default function ProductPage({ params }: { params: { id: string } }) {
    // Robust Data Fetching: Fast O(1) Lookup with Safe Fallback
    const product = products[params.id] || products["1"];

    // UI State
    const [selectedMaterial, setSelectedMaterial] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);
    const [ctaHovered, setCtaHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile for performance optimizations
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="min-h-screen bg-stone-50 overflow-x-hidden">
            {/* Mobile-First Layout: Stack on mobile, Grid on desktop */}
            <div className="flex flex-col md:grid md:grid-cols-[1.5fr_1fr]">

                {/* Image Gallery - First on Mobile, Right on Desktop */}
                <div className="relative bg-stone-100 will-change-transform transform-gpu order-1 md:order-2">
                    {product.images?.map((img: string, i: number) => (
                        <motion.div
                            key={i}
                            layoutId={i === 0 ? `image-${product.id}` : undefined}
                            className="relative w-full h-[60vh] md:h-screen will-change-transform"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                            <Image
                                src={img}
                                alt={`${product.name} view ${i + 1}`}
                                fill
                                className="object-contain md:object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={i === 0}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Details Panel - Second on Mobile, Left (Sticky) on Desktop */}
                <div className="md:sticky md:top-0 md:h-screen flex flex-col justify-between p-4 md:p-8 lg:p-12 bg-white md:border-r border-black/10 md:overflow-y-auto will-change-transform transform-gpu order-2 md:order-1 pb-32 md:pb-8">

                    {/* Breadcrumbs */}
                    <div>
                        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-6 md:mb-8">
                            <Link href="/" className="hover:text-black transition-colors">Home</Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link href="/" className="hover:text-black transition-colors">Watches</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-black truncate">{product.name}</span>
                        </div>

                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="font-serif text-xl md:text-2xl mb-2 text-gray-600">
                                {isMobile ? product.collection : <ScrambleText text={product.collection} revealSpeed={120} delay={300} />}
                            </h2>
                            <h1 className="font-sans text-2xl md:text-3xl lg:text-4xl leading-tight mb-4">
                                {isMobile ? product.name : <ScrambleText text={product.name} revealSpeed={150} delay={600} as="span" />}
                            </h1>
                            {/* Price hidden on mobile (shows in fixed bottom bar) */}
                            <p className="hidden md:block font-mono text-2xl font-semibold">
                                {isMobile ? product.price : <ScrambleText text={product.price} revealSpeed={200} delay={900} />}
                            </p>
                        </div>

                        <p className="font-sans text-sm leading-relaxed text-gray-600 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-black/5">
                            {product.description}
                        </p>

                        {/* Material Selector */}
                        <div className="mb-6 md:mb-8">
                            <label className="font-mono text-[11px] uppercase tracking-widest text-gray-900 mb-4 block font-semibold">
                                Material
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {product.materials?.map((material: any, i: number) => (
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
                                                {material.name?.split(' ')[1] || 'Gold'}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <p className="font-sans text-xs text-gray-500 mt-3">{product.materials?.[selectedMaterial]?.name}</p>
                        </div>

                        {/* Size Selector */}
                        <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-black/5">
                            <div className="flex items-center gap-2 mb-4">
                                <label className="font-mono text-[11px] uppercase tracking-widest text-gray-900 font-semibold">
                                    Size
                                </label>
                                <button className="font-mono text-[10px] uppercase tracking-widest text-gray-400 underline hover:text-black">
                                    Size Guide
                                </button>
                            </div>
                            <div className="flex gap-6">
                                {product.sizes?.map((size: string, i: number) => (
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

                    {/* Desktop CTA Buttons (Hidden on Mobile) */}
                    <div className="hidden md:block space-y-3">
                        {/* Primary CTA */}
                        <motion.button
                            className="w-full bg-deep-pink text-white py-4 font-mono text-xs uppercase tracking-widest relative overflow-hidden"
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
                        <button className="w-full bg-soft-pink text-pink-black py-4 font-mono text-xs uppercase tracking-widest hover:bg-rose-pink transition-colors">
                            Contact Your Advisor
                        </button>

                        <p className="font-mono text-[10px] text-center text-gray-400 uppercase tracking-widest pt-2">
                            Complimentary Shipping — 30-Day Returns
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile Fixed Bottom Bar (Thumb Zone) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#F9F9F9] border-t border-black/10 p-4 safe-area-inset-bottom">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">Total</p>
                        <p className="font-mono text-2xl font-semibold">{product.price}</p>
                    </div>
                    <motion.button
                        className="bg-deep-pink text-white px-8 py-4 font-mono text-xs uppercase tracking-widest"
                        whileTap={{ scale: 0.95 }}
                    >
                        Acquire Object
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
