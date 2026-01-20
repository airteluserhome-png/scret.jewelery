"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const products = [
    {
        id: 1,
        name: "Alhambra Watch",
        price: 12000,
        colors: ["#E6C200", "#C0C0C0", "#B76E79"],
        colorNames: ["Yellow Gold", "Silver", "Rose Gold"],
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=90",
    },
    {
        id: 2,
        name: "Rose Bracelet",
        price: 8900,
        colors: ["#B76E79", "#E6C200"],
        colorNames: ["Rose Gold", "Yellow Gold"],
        image: "https://images.unsplash.com/photo-1611591437764-0f82e48c4707?w=600&q=90",
    },
    {
        id: 3,
        name: "Eternity Ring",
        price: 6200,
        colors: ["#C0C0C0", "#E6C200", "#B76E79"],
        colorNames: ["Platinum", "Yellow Gold", "Rose Gold"],
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=90",
    },
    {
        id: 4,
        name: "Pearl Necklace",
        price: 15400,
        colors: ["#E6C200", "#B76E79"],
        colorNames: ["Yellow Gold", "Rose Gold"],
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=90",
    },
];

export default function ProductGridUltra() {
    return (
        <section className="relative py-24 md:py-32 bg-white">
            {/* Noise texture */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: "200px 200px",
                }}
            />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="font-serif text-4xl md:text-6xl text-gray-900 mb-4">
                        COMPLETE THE <span className="italic">LOOK.</span>
                    </h2>
                    <p className="font-sans text-gray-500 uppercase tracking-widest text-sm">
                        Curated Essentials
                    </p>
                </motion.div>

                {/* 2x2 Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {products.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            </div>

            {/* Border separator */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-rose-200" />
        </section>
    );
}

interface ProductCardProps {
    product: typeof products[0];
    index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                delay: index * 0.1,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
            }}
            className="group"
        >
            {/* Card container - scales DOWN on hover */}
            <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="bg-soft-pink/20 border border-rose-200 overflow-hidden hover:shadow-2xl transition-shadow duration-500"
            >
                {/* Product Image Area - scales UP on hover (inverse effect) */}
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-soft-pink/30 to-white">
                    <motion.div
                        className="w-full h-full"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Product Details */}
                <div className="p-6 bg-white/60 backdrop-blur-sm">
                    <h3 className="font-serif text-2xl text-gray-900 mb-3">
                        {product.name}
                    </h3>

                    {/* Color Swatches with enhanced animations */}
                    <div className="flex items-center gap-2 mb-4">
                        {product.colors.map((color, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={{ scale: 1.3, y: -2 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className="relative w-6 h-6 rounded-full border-2 border-gray-200 hover:border-gray-900 transition-all duration-300 shadow-sm hover:shadow-md"
                                style={{ backgroundColor: color }}
                                title={product.colorNames[idx]}
                                aria-label={`Select ${product.colorNames[idx]} color`}
                            >
                                {/* Ring effect on hover */}
                                <motion.div
                                    className="absolute inset-0 rounded-full border-2 border-gray-900"
                                    initial={{ scale: 1, opacity: 0 }}
                                    whileHover={{ scale: 1.5, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.button>
                        ))}
                    </div>

                    <div className="flex items-center justify-between">
                        <motion.p
                            className="font-sans text-xl text-gray-900"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            ${product.price.toLocaleString()}
                        </motion.p>

                        {/* Animated arrow button */}
                        <motion.button
                            className="flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-widest text-gray-900 hover:text-rose-gold transition-colors duration-300"
                            whileHover={{ x: 5 }}
                        >
                            View
                            <motion.div
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ArrowRight className="w-4 h-4" />
                            </motion.div>
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
