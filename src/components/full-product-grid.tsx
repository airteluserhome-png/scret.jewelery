"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

export default function FullProductGrid() {
    return (
        <div className="px-4 md:px-8 lg:px-10 py-8 md:py-12">
            <div className="mb-8 md:mb-12">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-brutalist text-hot-pink brutalist-border-b pb-3 md:pb-4 tracking-[0.05em] leading-none uppercase">
                    The Collection
                </h2>
            </div>

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
                                        <div className="font-bold uppercase text-lg md:text-xl leading-none text-hot-pink">
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
        </div>
    );
}
