"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const products = [
    {
        id: 1,
        name: "Alhambra Watch",
        price: 12000,
        colors: ["#E6C200", "#C0C0C0", "#B76E79"], // Yellow Gold, Silver, Rose Gold
        colorNames: ["Yellow Gold", "Silver", "Rose Gold"],
        image: "bg-gradient-to-br from-gray-50 to-soft-pink/30",
    },
    {
        id: 2,
        name: "Rose Bracelet",
        price: 8900,
        colors: ["#B76E79", "#E6C200"], // Rose Gold, Yellow Gold
        colorNames: ["Rose Gold", "Yellow Gold"],
        image: "bg-gradient-to-br from-soft-pink/40 to-rose-gold/20",
    },
    {
        id: 3,
        name: "Eternity Ring",
        price: 6200,
        colors: ["#C0C0C0", "#E6C200", "#B76E79"],
        colorNames: ["Platinum", "Yellow Gold", "Rose Gold"],
        image: "bg-gradient-to-br from-gray-100 to-soft-pink/20",
    },
    {
        id: 4,
        name: "Pearl Necklace",
        price: 15400,
        colors: ["#E6C200", "#B76E79"],
        colorNames: ["Yellow Gold", "Rose Gold"],
        image: "bg-gradient-to-br from-soft-pink/30 to-gray-50",
    },
];

export default function ProductGrid() {
    return (
        <section className="py-24 md:py-32 bg-soft-pink/10">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="font-serif text-4xl md:text-6xl text-gray-900 mb-4">
                        COMPLETE THE LOOK.
                    </h2>
                    <p className="font-sans text-gray-500 uppercase tracking-widest text-sm">
                        Curated Essentials
                    </p>
                </motion.div>

                {/* 2x2 Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="group"
                        >
                            <div className="bg-white border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500">
                                {/* Product Image Area */}
                                <div className={`relative h-80 ${product.image} flex items-center justify-center overflow-hidden`}>
                                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
                                    <p className="font-serif text-2xl text-gray-400 relative z-10">
                                        [Product Image]
                                    </p>
                                </div>

                                {/* Product Details */}
                                <div className="p-6">
                                    <h3 className="font-serif text-2xl text-gray-900 mb-2">
                                        {product.name}
                                    </h3>

                                    {/* Color Swatches - The Key Feature! */}
                                    <div className="flex items-center gap-2 mb-4">
                                        {product.colors.map((color, idx) => (
                                            <button
                                                key={idx}
                                                className="w-6 h-6 rounded-full border-2 border-gray-200 hover:border-gray-900 transition-all duration-300 hover:scale-110"
                                                style={{ backgroundColor: color }}
                                                title={product.colorNames[idx]}
                                                aria-label={`Select ${product.colorNames[idx]} color`}
                                            />
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <p className="font-sans text-xl text-gray-900">
                                            ${product.price.toLocaleString()}
                                        </p>
                                        <button className="flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-widest text-gray-900 hover:text-rose-gold transition-colors duration-300">
                                            View <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
