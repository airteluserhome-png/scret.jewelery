"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { getProductById } from "@/data/products";

export default function ProductPage({ params }: { params: { id: string } }) {
    const product = getProductById(parseInt(params.id));

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-off-white">
                <div className="text-center">
                    <h1 className="font-brutalist text-4xl mb-4 text-black">PRODUCT NOT FOUND</h1>
                    <Link href="/" className="text-hot-pink hover:underline font-bold">Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-off-white">
            {/* Split Screen Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh] brutalist-border-b">

                {/* LEFT: Product Details */}
                <div className="p-8 md:p-12 lg:p-16 lg:brutalist-border-r bg-white flex flex-col justify-center brutalist-border-b lg:border-b-0">
                    {/* Brand Tag */}
                    <div className="font-bold text-gray-500 uppercase tracking-[0.2em] text-sm">
                        {product.brand}
                    </div>

                    {/* Product Headline */}
                    <h1 className="font-brutalist text-5xl md:text-6xl lg:text-7xl leading-[0.9] my-4 md:my-6 text-dark uppercase">
                        {product.name}
                    </h1>

                    {/* Price Badge */}
                    <div className="my-6">
                        <span className="inline-block bg-hot-pink text-white font-brutalist text-3xl md:text-4xl px-6 py-3 transform -rotate-2 shadow-[5px_5px_0px_#111]">
                            {product.price}
                        </span>
                    </div>

                    {/* Specs Table */}
                    <div className="border-[2px] border-black my-8">
                        <div className="flex border-b-[2px] border-black">
                            <div className="w-2/5 p-4 bg-gray-100 font-bold border-r-[2px] border-black uppercase text-sm">
                                Movement
                            </div>
                            <div className="w-3/5 p-4">{product.specs.movement}</div>
                        </div>
                        <div className="flex border-b-[2px] border-black">
                            <div className="w-2/5 p-4 bg-gray-100 font-bold border-r-[2px] border-black uppercase text-sm">
                                Includes
                            </div>
                            <div className="w-3/5 p-4">{product.specs.includes}</div>
                        </div>
                        <div className="flex">
                            <div className="w-2/5 p-4 bg-gray-100 font-bold border-r-[2px] border-black uppercase text-sm">
                                Quality
                            </div>
                            <div className="w-3/5 p-4">{product.specs.quality}</div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-dark text-white font-brutalist text-2xl md:text-3xl py-5 md:py-6 hover:bg-hot-pink transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_0_black] active:translate-y-0 active:shadow-none">
                        ADD TO CART →
                    </button>

                    <p className="text-center mt-4 text-xs opacity-60 uppercase tracking-widest">
                        Secure Checkout • Worldwide Shipping
                    </p>
                </div>

                {/* RIGHT: Product Image */}
                <div
                    className="relative flex items-center justify-center overflow-hidden min-h-[400px] lg:min-h-0"
                    style={{ background: 'radial-gradient(circle, #ffe6f2 0%, #fff 70%)' }}
                >
                    {/* Floating Watch Image with Animated Shadow */}
                    <motion.div
                        className="relative w-[90%] max-w-[600px] z-10"
                        animate={{
                            y: [0, -25, 0],
                        }}
                        transition={{
                            duration: 6,
                            ease: "easeInOut",
                            repeat: Infinity
                        }}
                    >
                        <motion.div
                            animate={{
                                filter: [
                                    'drop-shadow(0px 25px 30px rgba(0,0,0,0.3))',
                                    'drop-shadow(0px 50px 50px rgba(0,0,0,0.15))',
                                    'drop-shadow(0px 25px 30px rgba(0,0,0,0.3))'
                                ]
                            }}
                            transition={{
                                duration: 6,
                                ease: "easeInOut",
                                repeat: Infinity
                            }}
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={600}
                                height={600}
                                className="w-full h-auto mix-blend-multiply"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Background Text Watermark */}
                    <div
                        className="absolute bottom-5 font-brutalist text-[8rem] md:text-[10rem] text-black/[0.03] whitespace-nowrap z-0 select-none"
                        style={{ letterSpacing: '0.1em' }}
                    >
                        {product.category === "iced-watches" ? "ICED ICED" : "SWISS SWISS"}
                    </div>
                </div>
            </div>

            {/* Back Link */}
            <div className="p-6 text-center">
                <Link href="/shop" className="font-bold text-hot-pink hover:underline uppercase tracking-wider">
                    ← Back to Collection
                </Link>
            </div>
        </div>
    );
}
