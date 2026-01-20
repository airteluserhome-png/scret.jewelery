"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

const products = [
    {
        id: 1,
        name: "Lange & Söhne 1",
        price: "$42,000",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=90",
        badge: "Low Stock",
    },
    {
        id: 2,
        name: "Royal Black Bay",
        price: "$4,150",
        image: "https://images.unsplash.com/photo-1611591437764-0f82e48c4707?w=800&q=90",
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

            {/* Bottom Bar - Product Info */}
            <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-white border-t border-black/5 flex items-center justify-between px-6">
                <div className="flex flex-col">
                    <span className="font-serif text-lg leading-none mb-1">{product.name}</span>
                    <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Ref. 2024</span>
                </div>
                <span className="font-mono text-sm tracking-tight">{product.price}</span>
            </div>

            {/* Hover Overlay - Add to Cart Button */}
            <motion.div
                className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
            >
                <motion.button
                    className="bg-rose-400 text-white px-8 py-4 rounded-full flex items-center gap-3 font-mono text-sm uppercase tracking-widest hover:bg-rose-500 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
