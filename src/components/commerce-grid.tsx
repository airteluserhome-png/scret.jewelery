"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Plus } from "lucide-react";
import Link from "next/link";

const products = [
    {
        id: 1,
        name: "Daytona Rose Gold",
        price: "$42,000",
        image: "/rolex-daytona.png",
        badge: "Low Stock",
    },
    {
        id: 2,
        name: "Royal Oak Steel",
        price: "$34,150",
        image: "/ap-royal-oak.png",
        badge: "New",
    },
    {
        id: 3,
        name: "Carrera Calibre",
        price: "$6,300",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=90",
    },
    {
        id: 4,
        name: "Heritage Chrono",
        price: "$8,900",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=90",
    },
];

export default function CommerceGrid() {
    return (
        <section className="bg-stone-50 border-t border-black/5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <div className="py-24 text-center border-t border-black/5">
                <button className="border border-black px-12 py-4 font-mono text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300">
                    View Full Collection
                </button>
            </div>
        </section>
    );
}

function ProductCard({ product }: { product: typeof products[0] }) {
    return (
        <Link href={`/product/${product.id}`} className="block">
            <motion.div
                className="group relative h-[600px] border-b border-r border-black/5 bg-white overflow-hidden"
                initial="initial"
                whileHover="hover"
            >
                {/* Badge */}
                {product.badge && (
                    <div className="absolute top-4 left-4 z-20">
                        <span className="bg-black text-white px-2 py-1 font-mono text-[10px] uppercase tracking-widest">
                            {product.badge}
                        </span>
                    </div>
                )}

                {/* Image Area - 85% height */}
                <div className="h-[85%] w-full relative overflow-hidden bg-stone-100">
                    <motion.div
                        layoutId={`image-${product.id}`}
                        className="w-full h-full relative"
                        variants={{
                            initial: { scale: 1 },
                            hover: { scale: 1.05 }
                        }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover object-center"
                        />
                    </motion.div>
                </div>

                {/* Bottom Bar - Strict Black Bar Interaction */}
                <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-white border-t border-black/5 flex flex-col justify-end overflow-hidden">
                    {/* Default State: Name & Price */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-between px-6"
                        variants={{
                            initial: { y: 0 },
                            hover: { y: "-100%" }
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <div className="flex flex-col">
                            <span className="font-serif text-lg leading-none mb-1">{product.name}</span>
                            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Ref. 2024</span>
                        </div>
                        <span className="font-mono text-sm tracking-tight">{product.price}</span>
                    </motion.div>

                    {/* Hover State: Add to Bag */}
                    <motion.div
                        className="absolute inset-0 bg-black text-white flex items-center justify-between px-6"
                        variants={{
                            initial: { y: "100%" },
                            hover: { y: 0 }
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <span className="font-mono text-xs uppercase tracking-widest">Add to Bag</span>
                        <Plus className="w-4 h-4" />
                    </motion.div>
                </div>
            </motion.div>
        </Link>
    );
}
