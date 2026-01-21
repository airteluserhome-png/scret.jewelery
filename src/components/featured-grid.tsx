"use client";

import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts } from "@/data/products";

export default function FeaturedGrid() {
    const products = getFeaturedProducts(6);

    // Urgency messages
    const urgencyMessages = ["SELLING FAST ⚡", "LOW STOCK", "HIGH DEMAND", "ALMOST GONE"];

    return (
        <div className="w-full px-4 md:px-8 lg:px-10 py-8 md:py-12">
            {/* 3D Trading Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1400px] mx-auto">
                {products.map((product, index) => (
                    <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="card-3d flex flex-col no-underline text-inherit cursor-pointer"
                    >
                        {/* Pulsing Urgency Badge */}
                        <div className="urgency-badge absolute top-4 right-4 bg-hot-pink text-white px-3 py-1.5 text-xs md:text-sm font-brutalist uppercase z-20 border-[2px] border-black shadow-[3px_3px_0_black]"
                            style={{ transform: 'rotate(5deg)' }}
                        >
                            {urgencyMessages[index % urgencyMessages.length]}
                        </div>

                        {/* Image Area with Technical Grid */}
                        <div className="card-image-grid h-[380px] flex items-center justify-center brutalist-border-b overflow-hidden relative">
                            <div className="relative w-[110%] h-[110%] flex items-center justify-center">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain mix-blend-multiply product-img-card"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                        </div>

                        {/* Card Info */}
                        <div className="p-5 md:p-6 bg-white flex flex-col gap-3 brutalist-border-t relative z-20">
                            {/* Product Title */}
                            <div>
                                <div className="font-brutalist uppercase text-xl md:text-2xl leading-[0.9] text-dark mb-1">
                                    {product.name.split(' ').slice(0, 2).join(' ')}
                                </div>
                                <div className="text-sm text-gray-600 uppercase tracking-wide font-normal">
                                    {product.name.split(' ').slice(2).join(' ')}
                                </div>
                            </div>

                            {/* Price & CTA */}
                            <div className="flex justify-between items-end mt-auto">
                                <span className="font-black text-2xl md:text-3xl text-dark">
                                    {product.price}
                                </span>
                            </div>

                            <div className="buy-btn-card w-full py-3 md:py-4 font-brutalist text-base md:text-xl uppercase flex justify-between items-center px-4">
                                <span>SECURE YOURS</span>
                                <span className="transition-transform duration-200 group-hover:translate-x-1">➔</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
