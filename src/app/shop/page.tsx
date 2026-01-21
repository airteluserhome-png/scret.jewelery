"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products, getProductsByCategory, Product } from "@/data/products";

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState<"all" | Product["category"]>("all");

    const filteredProducts = activeCategory === "all"
        ? products
        : getProductsByCategory(activeCategory);

    return (
        <div className="min-h-screen bg-off-white">
            {/* Brutalist Header */}
            <div className="text-center py-12 md:py-16 px-4 brutalist-border-b">
                <h1
                    className="font-brutalist leading-[0.9] text-hot-pink hero-3d-text tracking-[0.05em] mb-4"
                    style={{ fontSize: '8vw' }}
                >
                    THE<br />COLLECTION
                </h1>
                <div className="font-bold text-sm md:text-base uppercase tracking-[0.2em] text-gray-700">
                    Curated Swiss Timepieces (5A)
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex justify-center gap-4 md:gap-8 p-5 brutalist-border-b bg-white">
                <button
                    onClick={() => setActiveCategory("all")}
                    className={`font-brutalist text-lg md:text-xl uppercase transition-all border-b-2 pb-1 ${activeCategory === "all"
                            ? "border-hot-pink text-hot-pink"
                            : "border-transparent text-black hover:border-hot-pink"
                        }`}
                >
                    All Items
                </button>
                <button
                    onClick={() => setActiveCategory("plain-watches")}
                    className={`font-brutalist text-lg md:text-xl uppercase transition-all border-b-2 pb-1 ${activeCategory === "plain-watches"
                            ? "border-hot-pink text-hot-pink"
                            : "border-transparent text-black hover:border-hot-pink"
                        }`}
                >
                    Plain Watches
                </button>
                <button
                    onClick={() => setActiveCategory("iced-watches")}
                    className={`font-brutalist text-lg md:text-xl uppercase transition-all border-b-2 pb-1 ${activeCategory === "iced-watches"
                            ? "border-hot-pink text-hot-pink"
                            : "border-transparent text-black hover:border-hot-pink"
                        }`}
                >
                    Iced Out
                </button>
            </div>

            {/* 3D Product Grid (Matching Homepage) */}
            <div className="px-4 md:px-8 lg:px-10 py-8 md:py-12">
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1400px] mx-auto"
                >
                    <AnimatePresence mode="wait">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="card-3d flex flex-col"
                            >
                                {/* Image Area */}
                                <div className="bg-white h-[300px] md:h-[350px] flex items-center justify-center brutalist-border-b overflow-hidden relative">
                                    <div className="relative w-[65%] h-[65%]">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-contain mix-blend-multiply product-img-card"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>

                                    {/* Badge */}
                                    <div className="absolute top-3 left-3 bg-hot-pink text-white px-3 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider border-[2px] border-black">
                                        {product.badge || "NEW"}
                                    </div>
                                </div>

                                {/* Card Info */}
                                <div className="p-5 md:p-6 bg-white flex flex-col gap-4">
                                    <div>
                                        <div className="font-bold uppercase text-lg md:text-xl leading-none text-dark">
                                            {product.name}
                                        </div>
                                        <div className="text-base md:text-xl font-black text-dark mt-3">
                                            {product.price}
                                        </div>
                                    </div>

                                    <Link href={`/product/${product.id}`} className="mt-auto">
                                        <button className="buy-btn-card w-full py-3 md:py-3 font-brutalist text-base md:text-xl tracking-widest uppercase">
                                            VIEW
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="font-brutalist text-2xl text-gray-400">NO PRODUCTS FOUND</p>
                    </div>
                )}
            </div>
        </div>
    );
}
