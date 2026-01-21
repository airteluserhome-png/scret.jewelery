"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { getProductById } from "@/data/products";
import BackButton from "@/components/back-button";
import PaymentModal from "@/components/payment-modal";
import { useCart } from "@/context/cart-context";
import RetroBackground from "@/components/retro-background";
import CrossTape from "@/components/cross-tape";

export default function ProductPage({ params }: { params: { id: string } }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeImage, setActiveImage] = useState(product?.image);

    if (!product) {
        // ... (error handling)
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Back Button */}
            <div className="px-6 md:px-12 pt-6 md:pt-8">
                <BackButton fallback="/shop" />
            </div>

            {/* Split Screen Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh] brutalist-border-b">

                {/* LEFT: Product Details (Bottom on Mobile, Left on Desktop) */}
                <div className="order-2 lg:order-1 p-8 md:p-12 lg:p-16 lg:brutalist-border-r bg-white flex flex-col justify-center brutalist-border-b lg:border-b-0">
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

                    {/* IMAGE GALLERY THUMBNAILS (Only if multiple images exist) */}
                    {product.images && product.images.length > 1 && (
                        <div className="mb-8">
                            <p className="font-bold text-xs uppercase tracking-widest mb-3 text-gray-500">Select View</p>
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImage(img)}
                                        className={`relative w-20 h-20 border-[3px] flex-shrink-0 transition-all ${activeImage === img ? "border-hot-pink shadow-[3px_3px_0_black]" : "border-black/20 hover:border-black"
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} view ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA Button */}
                    {/* Action Buttons Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            className="bg-white text-black font-brutalist text-xl md:text-2xl py-4 border-[3px] border-black hover:bg-black hover:text-white transition-all uppercase"
                            onClick={() => addItem({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.image
                            })}
                        >
                            ADD TO CART
                        </button>
                        <button
                            className="bg-hot-pink text-white font-brutalist text-xl md:text-2xl py-4 border-[3px] border-black shadow-[5px_5px_0_black] hover:translate-y-1 hover:shadow-none transition-all uppercase"
                            onClick={() => setModalOpen(true)}
                        >
                            BUY NOW ⚡
                        </button>
                    </div>

                    {/* Modal */}
                    <PaymentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

                    <p className="text-center mt-4 text-xs opacity-60 uppercase tracking-widest">
                        Secure Checkout • Worldwide Shipping
                    </p>
                </div>

                {/* RIGHT: Product Image with Floor Shadow (Top on Mobile, Right on Desktop) */}
                <div
                    className="order-1 lg:order-2 relative flex items-center justify-center overflow-hidden min-h-[400px] lg:min-h-0 bg-white"
                >
                    {/* RETRO ARCADE BACKGROUND */}
                    <RetroBackground />
                    {/* Floor Shadow - Oval underneath */}
                    <div
                        className="absolute top-[65%] left-1/2 -translate-x-1/2 w-[300px] h-[40px] z-10"
                        style={{
                            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)',
                        }}
                    >
                        <motion.div
                            className="w-full h-full"
                            animate={{
                                transform: ['scale(1)', 'scale(0.8)', 'scale(1)'],
                                opacity: [1, 0.5, 1]
                            }}
                            transition={{
                                duration: 6,
                                ease: "easeInOut",
                                repeat: Infinity
                            }}
                            style={{
                                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)',
                            }}
                        />
                    </div>

                    {/* Floating Watch Image */}
                    <motion.div
                        key={activeImage} // Key change triggers animation on image switch
                        className="relative w-[90%] max-w-[600px] z-20"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: [0, -25, 0],
                        }}
                        transition={{
                            opacity: { duration: 0.3 },
                            scale: { duration: 0.3 },
                            y: {
                                duration: 6,
                                ease: "easeInOut",
                                repeat: Infinity
                            }
                        }}
                    >
                        <Image
                            src={activeImage || product.image}
                            alt={product.name}
                            width={600}
                            height={600}
                            className="w-full h-auto"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Back Link */}
            <div className="p-6 text-center">
                <Link href="/shop" className="font-bold text-hot-pink hover:underline uppercase tracking-wider">
                    ← Back to Collection
                </Link>
            </div>
            {/* Cross Tape for Hype */}
            <CrossTape />
        </div>
    );
}
