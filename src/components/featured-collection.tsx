"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const products = [
    {
        id: 1,
        name: "Alhambra Watch",
        specs: "White Gold & Mother of Pearl",
        price: "$12,400",
        image: "bg-gray-100", // Placeholder class
        colSpan: "col-span-1 md:col-span-2",
    },
    {
        id: 2,
        name: "Rose Bracelet",
        specs: "Pink Diamond Accents",
        price: "$8,900",
        image: "bg-soft-pink/20", // Placeholder class
        colSpan: "col-span-1",
    },
    {
        id: 3,
        name: "Eternity Ring",
        specs: "Platinum & Pavé",
        price: "$6,200",
        image: "bg-gray-50", // Placeholder class
        colSpan: "col-span-1",
    },
];

export default function FeaturedCollection() {
    return (
        <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto bg-luxury-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
            >
                <h2 className="font-serif text-4xl md:text-5xl mb-4 text-gray-900">Curated Collection</h2>
                <p className="font-sans text-gray-500 uppercase tracking-widest text-sm">Exclusive Designs</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[80vh] min-h-[600px]">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`group relative overflow-hidden ${product.colSpan} bg-white border border-gray-100 p-8 flex flex-col justify-between hover:shadow-xl transition-shadow duration-500`}
                    >
                        <div className={`absolute inset-0 ${product.image} transition-transform duration-700 group-hover:scale-105`} />

                        <div className="relative z-10 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-sans tracking-widest">{product.price}</span>
                        </div>

                        <div className="relative z-10 bg-white/80 backdrop-blur-sm p-6 -mx-8 -mb-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                            <h3 className="font-serif text-2xl mb-1">{product.name}</h3>
                            <p className="font-sans text-sm text-gray-500 mb-4">{product.specs}</p>
                            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-rose-gold transition-colors">
                                Add to Bag <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
