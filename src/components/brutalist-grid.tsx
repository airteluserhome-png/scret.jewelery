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
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 brutalist-border-b">
                {products.map((product, index) => (
                    <div
                        key={product.id}
                        className={`
                            flex flex-col border-b-[3px] border-hot-pink
                            md:border-b-0
                            ${(index + 1) % 3 !== 0 ? 'lg:border-r-[3px]' : ''} 
                            ${(index + 1) % 2 !== 0 ? 'md:border-r-[3px] lg:border-r-0' : ''} 
                            ${(index + 1) % 3 === 0 ? 'lg:border-r-0' : ''}
                        `}
                    >
                        {/* Image Area */}
                        <div className="relative aspect-[3/4] bg-pink-white w-full border-b-[3px] border-hot-pink overflow-hidden group">
                            <div className="relative w-full h-full">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain mix-blend-multiply p-6 md:p-8 group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                            <div className="absolute top-2 left-2 bg-hot-pink text-white px-2 py-1 text-[10px] md:text-xs font-bold uppercase font-brutalist">
                                {product.badge || "5A SWISS"}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-4 md:p-4 flex justify-between items-center font-bold uppercase text-sm md:text-base lg:text-lg bg-white min-h-[72px] md:min-h-[80px]">
                            <span className="truncate pr-3 md:pr-4 font-brutalist">{product.name}</span>
                            <Link href={`/product/${product.id}`}>
                                <button className="bg-hot-pink text-white px-4 md:px-4 py-2 md:py-1 hover:bg-black transition-colors text-sm md:text-base whitespace-nowrap font-brutalist">
                                    {product.price}
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}

                {/* CTA Card */}
                {ctaCard && (
                    <Link
                        href={ctaCard.href || "/shop"}
                        className="flex flex-col justify-center items-center bg-hot-pink text-white p-8 md:p-12 min-h-[250px] md:min-h-[300px] hover:bg-black transition-colors cursor-pointer active:scale-95"
                    >
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-brutalist text-center leading-none">
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
