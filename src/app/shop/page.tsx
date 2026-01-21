"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getAllCategories, getProductsByCategory, products, Product } from "@/data/products";
import ScrambleText from "@/components/scramble-text";

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState<"all" | Product["category"]>("all");
    const categories = getAllCategories();

    const filteredProducts = useMemo(() => {
        if (activeCategory === "all") return products;
        return getProductsByCategory(activeCategory);
    }, [activeCategory]);

    return (
        <div className="min-h-screen bg-soft-pink pt-28 pb-20 px-4 md:px-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-pink-black mb-4">
                    <ScrambleText text="The Collection" revealSpeed={100} delay={0} />
                </h1>
                <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-rose-gold max-w-lg mx-auto">
                    Curated selection of fine Swiss timepieces and luxury accessories.
                </p>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto mb-12 flex flex-wrap justify-center gap-4">
                <button
                    onClick={() => setActiveCategory("all")}
                    className={`px-6 py-2 rounded-full font-mono text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 ${activeCategory === "all"
                        ? "bg-deep-pink text-white shadow-lg"
                        : "bg-luxury-white text-pink-black hover:bg-rose-pink hover:text-white"
                        }`}
                >
                    All Items ({products.length})
                </button>
                {categories.map((cat) => {
                    const categoryProducts = getProductsByCategory(cat as Product["category"]);
                    const displayName = cat === "plain-watches" ? "Plain Watches" : "Iced Out";
                    return (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat as Product["category"])}
                            className={`px-6 py-2 rounded-full font-mono text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 ${activeCategory === cat
                                ? "bg-deep-pink text-white shadow-lg"
                                : "bg-luxury-white text-pink-black hover:bg-rose-pink hover:text-white"
                                }`}
                        >
                            {displayName} ({categoryProducts.length})
                        </button>
                    );
                })}
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto">
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                >
                    <AnimatePresence>
                        {filteredProducts.map((product) => (
                            <motion.div
                                layout
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="font-serif text-xl text-gray-400">No products found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function ProductCard({ product }: { product: Product }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={`/product/${product.id}`} className="block h-full">
            <motion.div
                className="group relative h-[450px] bg-luxury-white overflow-hidden border border-rose-pink/20 rounded-sm hover:shadow-xl transition-shadow duration-500"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                {/* Badge */}
                {product.badge && (
                    <div className="absolute top-4 left-4 z-20">
                        <span className="bg-deep-pink text-white px-2 py-1 font-mono text-[10px] uppercase tracking-widest shadow-sm">
                            {product.badge}
                        </span>
                    </div>
                )}

                {/* Image */}
                <div className="h-[75%] w-full relative overflow-hidden bg-soft-pink">
                    <motion.div
                        className="w-full h-full relative"
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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

                {/* Details */}
                <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-luxury-white p-4 flex flex-col justify-between border-t border-rose-pink/20">
                    <div>
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="font-serif text-lg text-pink-black leading-none truncate pr-2">{product.name}</h3>
                            <span className="font-mono text-sm font-semibold text-deep-pink">{product.price}</span>
                        </div>
                        <p className="font-mono text-[10px] text-rose-gold uppercase tracking-widest">{product.brand}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-sans text-[10px] text-gray-500 truncate max-w-[70%]">{product.specs.movement}</span>
                        <span className="text-xs text-deep-pink font-bold">→</span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
