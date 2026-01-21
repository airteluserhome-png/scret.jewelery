"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ScrambleText from "@/components/scramble-text";
import { getProductById } from "@/data/products";

export default function ProductPage({ params }: { params: { id: string } }) {
    const product = getProductById(params.id);
    const [ctaHovered, setCtaHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-luxury-white">
                <div className="text-center">
                    <h1 className="font-serif text-4xl mb-4 text-pink-black">Product Not Found</h1>
                    <Link href="/" className="text-deep-pink hover:underline">Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-soft-pink overflow-x-hidden">
            <div className="flex flex-col md:grid md:grid-cols-[1.5fr_1fr]">

                {/* Image Gallery - First on Mobile, Right on Desktop */}
                <div className="relative bg-luxury-white will-change-transform transform-gpu order-1 md:order-2">
                    <motion.div
                        className="relative w-full h-[60vh] md:h-screen will-change-transform"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain md:object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </motion.div>
                </div>

                {/* Details Panel */}
                <div className="md:sticky md:top-0 md:h-screen flex flex-col justify-between p-4 md:p-8 lg:p-12 bg-luxury-white md:border-r border-rose-pink/20 md:overflow-y-auto order-2 md:order-1 pb-32 md:pb-8">

                    {/* Breadcrumbs */}
                    <div>
                        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-rose-gold mb-6 md:mb-8">
                            <Link href="/" className="hover:text-deep-pink transition-colors">Home</Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link href="/" className="hover:text-deep-pink transition-colors">{product.category}</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-pink-black truncate">{product.name}</span>
                        </div>

                        {/* Header */}
                        <div className="mb-6">
                            {product.badge && (
                                <span className="inline-block bg-deep-pink text-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest mb-3">
                                    {product.badge}
                                </span>
                            )}
                            <h2 className="font-serif text-xl md:text-2xl mb-2 text-rose-gold">
                                {isMobile ? product.brand : <ScrambleText text={product.brand} revealSpeed={120} delay={300} />}
                            </h2>
                            <h1 className="font-sans text-2xl md:text-3xl lg:text-4xl leading-tight mb-4 text-pink-black">
                                {isMobile ? product.name : <ScrambleText text={product.name} revealSpeed={150} delay={600} as="span" />}
                            </h1>
                            <p className="hidden md:block font-mono text-2xl font-semibold text-deep-pink">
                                {isMobile ? product.price : <ScrambleText text={product.price} revealSpeed={200} delay={900} />}
                            </p>
                        </div>

                        <p className="font-sans text-sm leading-relaxed text-gray-600 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-rose-pink/20">
                            {product.description}
                        </p>

                        {/* Specifications */}
                        <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-rose-pink/20">
                            <h3 className="font-mono text-[11px] uppercase tracking-widest text-pink-black mb-4 font-semibold">
                                Specifications
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="font-sans text-sm text-gray-500">Movement</span>
                                    <span className="font-sans text-sm text-pink-black">{product.specs.movement}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-sans text-sm text-gray-500">Quality</span>
                                    <span className="font-sans text-sm text-pink-black">{product.specs.quality}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-sans text-sm text-gray-500">Includes</span>
                                    <span className="font-sans text-sm text-pink-black">{product.specs.includes}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop CTA Buttons */}
                    <div className="hidden md:block space-y-3">
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

                        <button className="w-full bg-soft-pink text-pink-black py-4 font-mono text-xs uppercase tracking-widest hover:bg-rose-pink transition-colors">
                            Contact for Details
                        </button>

                        <p className="font-mono text-[10px] text-center text-rose-gold uppercase tracking-widest pt-2">
                            Worldwide Shipping — Secure Payment
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile Fixed Bottom Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-luxury-white border-t border-rose-pink/20 p-4 safe-area-inset-bottom">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <p className="font-mono text-xs text-rose-gold uppercase tracking-widest">Price</p>
                        <p className="font-mono text-2xl font-semibold text-deep-pink">{product.price}</p>
                    </div>
                    <motion.button
                        className="bg-deep-pink text-white px-8 py-4 font-mono text-xs uppercase tracking-widest"
                        whileTap={{ scale: 0.95 }}
                    >
                        Add to Cart
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
