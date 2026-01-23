"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category?: string;
    description?: string;
}

interface QuickViewModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart?: (product: Product) => void;
    onViewDetails?: (product: Product) => void;
}

export default function QuickViewModal({ 
    product, 
    isOpen, 
    onClose, 
    onAddToCart,
    onViewDetails 
}: QuickViewModalProps) {
    if (!product) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-hidden"
                        style={{
                            border: "3px solid #000",
                            boxShadow: "12px 12px 0px #FF0099",
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-[#FF0099] transition-colors"
                            style={{ border: "2px solid #000" }}
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Content */}
                        <div className="grid md:grid-cols-2 gap-0">
                            {/* Image */}
                            <div className="relative aspect-square bg-white p-8 flex items-center justify-center border-r-0 md:border-r-3 border-black">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={400}
                                    height={400}
                                    className="object-contain max-h-[300px] w-auto"
                                    style={{ mixBlendMode: "multiply" }}
                                />
                                
                                {/* Corner Brackets */}
                                <div className="absolute top-4 left-4 w-8 h-8 border-t-3 border-l-3 border-black"></div>
                                <div className="absolute top-4 right-4 w-8 h-8 border-t-3 border-r-3 border-black"></div>
                                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-3 border-l-3 border-black"></div>
                                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-3 border-r-3 border-black"></div>
                            </div>

                            {/* Details */}
                            <div className="p-8 flex flex-col">
                                {/* Category */}
                                {product.category && (
                                    <span className="inline-block self-start px-3 py-1 bg-[#FF0099] text-white text-xs font-bold uppercase tracking-widest mb-4">
                                        {product.category}
                                    </span>
                                )}

                                {/* Name */}
                                <h2 className="font-brutalist text-3xl md:text-4xl uppercase tracking-wider mb-4">
                                    {product.name}
                                </h2>

                                {/* Price */}
                                <p className="font-brutalist text-2xl text-[#FF0099] mb-6">
                                    ${product.price.toLocaleString()}
                                </p>

                                {/* Description */}
                                {product.description && (
                                    <p className="text-black/60 text-sm leading-relaxed mb-8">
                                        {product.description}
                                    </p>
                                )}

                                {/* Spacer */}
                                <div className="flex-grow"></div>

                                {/* Actions */}
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={() => onAddToCart?.(product)}
                                        className="w-full py-4 bg-black text-white font-brutalist text-xl uppercase tracking-wider hover:bg-[#FF0099] transition-colors"
                                        style={{
                                            border: "3px solid #000",
                                            boxShadow: "4px 4px 0px #FF0099",
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                    
                                    <button
                                        onClick={() => onViewDetails?.(product)}
                                        className="w-full py-4 bg-white text-black font-brutalist text-xl uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
                                        style={{
                                            border: "3px solid #000",
                                            boxShadow: "4px 4px 0px #000",
                                        }}
                                    >
                                        View Details
                                    </button>
                                </div>

                                {/* Quick Info */}
                                <div className="mt-6 pt-6 border-t-2 border-black/10">
                                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-black/50">
                                        <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-green-500"></span>
                                            In Stock
                                        </span>
                                        <span>•</span>
                                        <span>Free Shipping</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
