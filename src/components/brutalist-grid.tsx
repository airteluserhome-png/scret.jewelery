"use client";

import Link from "next/link";
import Image from "next/image";
import { getProductsByCategory } from "@/data/products";

export default function BrutalistGrid({
    category,
    ctaCard
}: {
    category: "plain-watches" | "iced-watches";
    ctaCard?: { text: string; href?: string };
}) {
    const products = getProductsByCategory(category);

    return (
        <div className="w-full px-4 md:px-8 lg:px-10 py-8 md:py-12">
            {/* 3D Trading Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1400px] mx-auto">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="card-3d flex flex-col"
                    >
                        {/* Image Area */}
                        <div className="bg-white h-[350px] flex items-center justify-center brutalist-border-b overflow-hidden relative">
                            <div className="relative w-[70%] h-[70%]">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain mix-blend-multiply product-img-card"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>

                            {/* Badge */}
                            <div className="absolute top-3 left-3 bg-neon-pink text-white px-3 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider border-[2px] border-black">
                                {product.badge || "NEW ARRIVAL"}
                            </div>
                        </div>

                        {/* Card Info - Space Grotesk Font */}
                        <div className="p-5 md:p-6 bg-white flex flex-col gap-4">
                            {/* Product Title */}
                            <div>
                                <div className="font-bold uppercase text-lg md:text-2xl leading-none text-dark">
                                    {product.name}
                                </div>
                                <div className="text-sm md:text-base text-gray-600 mt-2 capitalize">
                                    {product.category === "iced-watches" ? "Iced Out (5A)" : "5A Swiss Movement"}
                                </div>
                            </div>

                            {/* Price Row */}
                            <div className="flex justify-between items-center mt-auto">
                                <span className="font-black text-2xl md:text-3xl text-dark">
                                    {product.price}
                                </span>

                                <Link href={`/product/${product.id}`}>
                                    <button className="buy-btn-card px-5 md:px-6 py-3 md:py-3 font-brutalist text-sm md:text-base tracking-widest uppercase">
                                        ADD TO CART
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}

                {/* CTA Card */}
                {ctaCard && (
                    <Link
                        href={ctaCard.href || "/shop"}
                        className="card-3d flex flex-col justify-center items-center bg-dark text-white p-8 md:p-12 min-h-[350px] cursor-pointer"
                    >
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-brutalist text-center leading-none tracking-[0.05em]">
                            {ctaCard.text.split(' ').map((word, i) => (
                                <span key={i}>{word}<br /></span>
                            ))}
                        </h3>
                    </Link>
                )}
            </div>
        </div>
    );
}
