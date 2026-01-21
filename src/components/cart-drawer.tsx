"use client";

import { useCart } from "@/context/cart-context";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
    const { items, removeItem, updateQuantity, total, isOpen, setIsOpen, clearCart } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/50 z-[9998]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l-[4px] border-black z-[9999] flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.2)]"
                    >
                        {/* Header */}
                        <div className="p-6 bg-hot-pink text-white border-b-[4px] border-black flex justify-between items-center">
                            <h2 className="font-brutalist text-3xl uppercase tracking-wider">Your Cart</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-black hover:text-white p-1 transition-colors border-2 border-transparent hover:border-white"
                            >
                                <X size={32} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                    <h3 className="font-brutalist text-4xl mb-4 text-gray-400">EMPTY</h3>
                                    <p className="font-bold uppercase tracking-widest">Your bag is needing drip</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4 border-[3px] border-black p-4 shadow-[5px_5px_0_black] bg-white hover:translate-x-1 transition-transform">
                                        {/* Image */}
                                        <div className="relative w-24 h-24 border-2 border-black flex-shrink-0 bg-white">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-bold uppercase text-sm leading-relaxed mb-1 tracking-widest">{item.name}</h3>
                                                <p className="font-brutalist text-xl text-hot-pink tracking-wide text-highlight">{item.price}</p>
                                            </div>

                                            <div className="flex justify-between items-end">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center border-2 border-black bg-gray-100">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:bg-black hover:text-white transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:bg-black hover:text-white transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>

                                                {/* Remove */}
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-gray-400 hover:text-hot-pink transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer / Checkout */}
                        {items.length > 0 && (
                            <div className="p-6 border-t-[4px] border-black bg-gray-50">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="font-bold uppercase tracking-widest text-lg">Subtotal</span>
                                    <span className="font-brutalist text-4xl">${total.toLocaleString()}</span>
                                </div>

                                <button
                                    className="w-full bg-black text-white font-brutalist text-2xl py-4 hover:bg-hot-pink hover:shadow-[0_5px_0_black] hover:-translate-y-1 transition-all uppercase mb-3 border-2 border-black"
                                    onClick={() => alert("Checkout System Under Construction!")}
                                >
                                    Checkout Now
                                </button>

                                <button
                                    onClick={clearCart}
                                    className="w-full text-xs uppercase font-bold tracking-widest text-gray-400 hover:text-hot-pink text-center"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
