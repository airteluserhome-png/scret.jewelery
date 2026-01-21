"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Plus } from "lucide-react";
import Link from "next/link";
import ScrambleText from "./scramble-text";
import { useState, useEffect } from "react";
import { products } from "@/data/products";

export default function CommerceGrid() {
    // Show first 8 products on homepage
    const featuredProducts = products.slice(0, 8);

    return (
        <section className="bg-soft-pink border-t border-rose-pink/20">
            {/* Responsive Grid: 1 col mobile, 2 cols tablet, 4 cols desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <div className="py-16 md:py-24 text-center border-t border-rose-pink/20 px-4">
                <Link href="/shop">
                    <button className="border border-deep-pink px-8 md:px-12 py-3 md:py-4 font-mono text-xs uppercase tracking-widest hover:bg-deep-pink hover:text-white transition-colors duration-300">
                        View Full Collection
                    </button>
                </Link>
            </div>
        </section>
    );
}

function ProductCard({ product }: { product: typeof products[0] }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <Link href={`/product/${product.id}`} className="block">
            <motion.div
                className="group relative h-[500px] md:h-[600px] border-b border-r border-rose-pink/20 bg-luxury-white overflow-hidden"
                initial="initial"
                whileHover="hover"
            >
                {/* Badge */}
                {product.badge && (
                    <div className="absolute top-4 left-4 z-20">
                        <span className="bg-deep-pink text-white px-2 py-1 font-mono text-[10px] uppercase tracking-widest">
                            {product.badge}
                        </span>
                    </div>
                )}

                {/* Image Area - 85% height */}
                <div className="h-[85%] w-full relative overflow-hidden bg-soft-pink">
                    <motion.div
                        layoutId={`image-${product.id}`}
                        className="w-full h-full relative"
                        variants={{
                            initial: { scale: 1 },
                            hover: { scale: 1.05 }
                        }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                    </motion.div>
                </div>

                {/* Bottom Bar - Product Info */}
                <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-luxury-white border-t border-rose-pink/20 flex flex-col justify-end overflow-hidden">
                    {/* Default State: Name & Price */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-between px-4 md:px-6"
                        variants={{
                            initial: { y: 0 },
                            hover: { y: "-100%" }
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <div className="flex flex-col min-w-0 flex-1">
                            <span className="font-serif text-base md:text-lg leading-none mb-1 truncate text-pink-black">
                                {isMobile ? product.name : <ScrambleText text={product.name} revealSpeed={120} delay={200} />}
                            </span>
                            <span className="font-mono text-[10px] text-rose-gold uppercase tracking-widest">{product.brand}</span>
                        </div>
                        <span className="font-mono text-sm tracking-tight ml-2 flex-shrink-0 text-pink-black">
                            {isMobile ? product.price : <ScrambleText text={product.price} revealSpeed={180} delay={500} />}
                        </span>
                    </motion.div>

                    {/* Hover State: Add to Bag */}
                    <motion.div
                        className="absolute inset-0 bg-deep-pink text-white flex items-center justify-between px-4 md:px-6"
                        variants={{
                            initial: { y: "100%" },
                            hover: { y: 0 }
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <span className="font-mono text-xs uppercase tracking-widest">Add to Bag</span>
                        <Plus className="w-4 h-4" />
                    </motion.div>
                </div>
            </motion.div>
        </Link>
    );
}
