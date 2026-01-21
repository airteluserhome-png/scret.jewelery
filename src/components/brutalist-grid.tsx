"use client";

import Link from "next/link";
import Image from "next/image";
import { getProductsByCategory, type Product } from "@/data/products";

export default function BrutalistGrid({
    category,
    ctaCard
}: {
    category: "plain-watches" | "iced-watches";
    ctaCard?: { text: string; href?: string };
}) {
    const products = getProductsByCategory(category);

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 border-b-2 border-hot-pink">
                {products.map((product, index) => (
                    <div
                        key={product.id}
                        className={`
                            flex flex-col border-b-2 md:border-b-0 border-hot-pink
                            ${(index + 1) % 3 !== 0 ? 'md:border-r-2' : ''} 
                        `}
                    >
                        {/* Image Area */}
                        <div className="relative aspect-[3/4] bg-pink-white w-full border-b-2 border-hot-pink overflow-hidden group">
                            <div className="relative w-full h-full">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain mix-blend-multiply p-8 group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="absolute top-2 left-2 bg-hot-pink text-white px-2 py-1 text-xs font-bold uppercase">
                                {product.badge || "5A SWISS"}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-4 flex justify-between items-center font-bold uppercase text-sm md:text-lg bg-white h-20">
                            <span className="truncate pr-4">{product.name}</span>
                            <Link href={`/product/${product.id}`}>
                                <button className="bg-hot-pink text-white px-3 md:px-4 py-1 hover:bg-black transition-colors text-sm md:text-base">
                                    {product.price}
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}

                {/* CTA Card at the end */}
                {ctaCard && (
                    <Link href={ctaCard.href || "/shop"} className="flex flex-col justify-center items-center bg-hot-pink text-white p-12 min-h-[300px] hover:bg-black transition-colors cursor-pointer">
                        <h3 className="text-3xl md:text-4xl font-black uppercase text-center leading-none">
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
