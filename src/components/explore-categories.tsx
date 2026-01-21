"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ExploreCategories() {
    const categories = [
        {
            name: "Plain Watches",
            href: "/shop?category=plain",
            bgColor: "bg-white",
            textColor: "text-black",
            description: "CLASSIC LUXURY"
        },
        {
            name: "Iced Out",
            href: "/shop?category=iced",
            bgColor: "bg-hot-pink",
            textColor: "text-white",
            description: "VS/VVS DIAMONDS"
        },
        {
            name: "Accessories",
            href: "/accessories",
            bgColor: "bg-black",
            textColor: "text-white",
            description: "BRACELETS & GLASSES"
        }
    ];

    return (
        <div className="w-full px-4 md:px-8 lg:px-10 py-12 md:py-16 bg-off-white">
            <div className="max-w-[1400px] mx-auto">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-brutalist text-black brutalist-border-b pb-4 mb-8 tracking-[0.05em] leading-none">
                    EXPLORE CATEGORIES
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.name}
                            href={cat.href}
                            className={`group relative h-[300px] flex flex-col justify-between p-8 border-[3px] border-black transition-transform hover:-translate-y-2 active:scale-95 shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#000] ${cat.bgColor} ${cat.textColor}`}
                        >
                            <div>
                                <h3 className="font-brutalist text-3xl md:text-4xl mb-2 leading-none uppercase">
                                    {cat.name}
                                </h3>
                                <p className="font-mono text-xs uppercase tracking-widest opacity-80">
                                    {cat.description}
                                </p>
                            </div>

                            <div className="flex justify-between items-end">
                                <span className="font-bold text-sm uppercase tracking-widest border-b-2 border-current pb-1">
                                    View Collection
                                </span>
                                <ArrowRight className="transform transition-transform group-hover:translate-x-2" size={32} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
