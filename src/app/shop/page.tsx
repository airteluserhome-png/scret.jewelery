"use client";

import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import BrutalistPagination from "@/components/brutalist-pagination";
import BackButton from "@/components/back-button";

function ShopContent() {
    // Filter logic removed per user request - showing all items

    return (
        <div className="min-h-screen bg-off-white">
            {/* Back Button */}
            <div className="px-4 md:px-8 lg:px-10 pt-6 md:pt-8 bg-white/0 z-50 relative">
                <BackButton fallback="/" />
            </div>

            {/* Brutalist Header */}
            <div className="text-center py-8 md:py-8 px-4 brutalist-border-b">
                <h1
                    className="font-brutalist leading-[0.9] text-hot-pink hero-3d-text tracking-[0.05em] mb-4"
                    style={{ fontSize: 'clamp(3rem, 9vw, 6rem)' }}
                >
                    THE<br />COLLECTION
                </h1>
                <div className="font-bold text-xs md:text-base uppercase tracking-[0.2em] text-gray-700">
                    Curated Luxury Collection
                </div>
            </div>

            {/* 3D Product Grid (Matching Homepage) */}
            <div className="px-4 md:px-8 lg:px-10 py-8 md:py-12">
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1400px] mx-auto"
                >
                    <AnimatePresence mode="wait">
                        {products.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="card-3d flex flex-col"
                            >
                                <Link href={`/product/${product.id}`} className="flex flex-col h-full text-inherit no-underline">
                                    {/* Image Area */}
                                    <div className="bg-white h-[300px] md:h-[350px] lg:h-[450px] flex items-center justify-center brutalist-border-b overflow-hidden relative">
                                        <div className="relative w-[85%] h-[85%]">
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
                                    <div className="p-5 md:p-6 bg-white flex flex-col gap-4 flex-grow">
                                        <div>
                                            <div className="font-bold uppercase text-lg md:text-xl leading-none text-hot-pink text-highlight">
                                                {product.name}
                                            </div>
                                            <div className="text-base md:text-xl font-black text-dark mt-3">
                                                {product.price}
                                            </div>
                                        </div>

                                        <div className="mt-auto">
                                            <button className="buy-btn-card w-full py-3 md:py-3 font-brutalist text-base md:text-xl tracking-widest uppercase">
                                                VIEW
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {products.length === 0 && (
                    <div className="text-center py-20">
                        <p className="font-brutalist text-2xl text-gray-400">NO PRODUCTS FOUND</p>
                    </div>
                )}
            </div>

            {/* Brutalist Pagination */}
            <BrutalistPagination currentPage={1} totalPages={4} />
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">LOADING...</div>}>
            <ShopContent />
        </Suspense>
    );
}
