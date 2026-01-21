"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { getProductById } from "@/data/products";
import BackButton from "@/components/back-button";
import PaymentModal from "@/components/payment-modal";
import { useCart } from "@/context/cart-context";
import CrossTape from "@/components/cross-tape";

export default function ProductPage({ params }: { params: { id: string } }) {
    const product = getProductById(parseInt(params.id));
    const { addItem } = useCart();
    const [modalOpen, setModalOpen] = useState(false);
    const [activeImage, setActiveImage] = useState(product?.image);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h1 className="font-brutalist text-4xl mb-4 text-black">PRODUCT NOT FOUND</h1>
                    <Link href="/shop" className="text-hot-pink hover:underline font-bold uppercase tracking-wider">Return to Shop</Link>
                </div>
            </div>
        );
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
                {/* RIGHT: Product Image with Tactical Vault Frame */}
                <div className="order-1 lg:order-2 product-visual min-h-[400px] lg:min-h-0 bg-white">

                    <div className="tactical-frame">

                        <div className="corner top-left"></div>
                        <div className="corner top-right"></div>
                        <div className="corner bottom-left"></div>
                        <div className="corner bottom-right"></div>

                        <div className="tech-label label-top">REF: {product.id.toString().padStart(6, '0')}</div>

                        {/* SMART LABEL LOGIC */}
                        {(() => {
                            const name = product.name.toUpperCase();
                            let labelText = "5A SWISS // VERIFIED";
                            let labelColorClass = "text-hot-pink border-hot-pink";

                            // 1. OPTICS (Black Label)
                            if (name.includes("GLASSES") || name.includes("CARTIER") || name.includes("SUNGLASSES") || name.includes("FRAME")) {
                                labelText = "VVS OPTICS // VERIFIED";
                                labelColorClass = "text-black border-black";

                                // 2. JEWELRY (Pink Label)
                            } else if (name.includes("BRACELET") || name.includes("CHAIN") || name.includes("NECKLACE") || name.includes("PENDANT") || name.includes("CROSS") || name.includes("CUBAN")) {
                                labelText = "VVS GEMS // VERIFIED";

                                // 3. RINGS (Pink Label)    
                            } else if (name.includes("RING") || name.includes("BAND")) {
                                labelText = "GOLD TESTED // VERIFIED";

                                // 4. WATCHES (Default Pink)
                            } else {
                                if (name.includes("ICED")) {
                                    labelText = "5A SWISS // VVS SET";
                                }
                            }

                            return (
                                <div className={`tech-label label-bottom ${labelColorClass}`}>
                                    {labelText}
                                </div>
                            );
                        })()}

                        <div className="scan-line"></div>

                        <Image
                            key={activeImage} // Re-renders on image switch
                            src={activeImage || product.image}
                            alt={product.name}
                            width={600}
                            height={600}
                            className="main-watch-img"
                        />

                    </div>

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
