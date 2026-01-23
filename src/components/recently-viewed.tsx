"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock } from "lucide-react";

interface ViewedProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    viewedAt: number;
}

const STORAGE_KEY = "secretly_recently_viewed";
const MAX_ITEMS = 6;

// Helper functions to manage recently viewed
export function addToRecentlyViewed(product: { id: string; name: string; price: number; image: string }) {
    if (typeof window === "undefined") return;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    let items: ViewedProduct[] = stored ? JSON.parse(stored) : [];
    
    // Remove if already exists
    items = items.filter(item => item.id !== product.id);
    
    // Add to front with timestamp
    items.unshift({
        ...product,
        viewedAt: Date.now(),
    });
    
    // Keep only last MAX_ITEMS
    items = items.slice(0, MAX_ITEMS);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getRecentlyViewed(): ViewedProduct[] {
    if (typeof window === "undefined") return [];
    
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

export function clearRecentlyViewed() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
}

// Floating Recently Viewed Component
export default function RecentlyViewed() {
    const [items, setItems] = useState<ViewedProduct[]>([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setItems(getRecentlyViewed());

        // Listen for storage changes
        const handleStorage = () => setItems(getRecentlyViewed());
        window.addEventListener("storage", handleStorage);
        
        // Also check periodically for same-tab updates
        const interval = setInterval(handleStorage, 2000);
        
        return () => {
            window.removeEventListener("storage", handleStorage);
            clearInterval(interval);
        };
    }, []);

    if (!mounted || items.length === 0) return null;

    return (
        <>
            {/* Floating Toggle Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="fixed left-6 bottom-24 z-50 w-12 h-12 bg-white flex items-center justify-center group"
                style={{
                    border: "3px solid #000",
                    boxShadow: "4px 4px 0px #000",
                }}
                whileHover={{ x: -2, y: -2, boxShadow: "6px 6px 0px #FF0099" }}
            >
                <Clock className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#FF0099] text-white text-xs font-bold flex items-center justify-center">
                    {items.length}
                </span>
            </motion.button>

            {/* Expanded Panel */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed left-6 bottom-40 z-50 w-72 bg-white"
                        style={{
                            border: "3px solid #000",
                            boxShadow: "8px 8px 0px #FF0099",
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b-3 border-black">
                            <h3 className="font-brutalist text-lg uppercase tracking-wider">
                                Recently Viewed
                            </h3>
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="w-8 h-8 bg-black text-white flex items-center justify-center hover:bg-[#FF0099] transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="max-h-80 overflow-y-auto">
                            {items.map((item, index) => (
                                <Link
                                    key={item.id}
                                    href={`/product/${item.id}`}
                                    onClick={() => setIsExpanded(false)}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex items-center gap-4 p-4 hover:bg-black/5 transition-colors border-b border-black/10 last:border-b-0"
                                    >
                                        <div className="w-16 h-16 bg-white flex items-center justify-center flex-shrink-0 border-2 border-black">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={50}
                                                height={50}
                                                className="object-contain"
                                                style={{ mixBlendMode: "multiply" }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm uppercase tracking-wider truncate">
                                                {item.name}
                                            </p>
                                            <p className="text-[#FF0099] font-bold text-sm">
                                                ${item.price.toLocaleString()}
                                            </p>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>

                        {/* Clear Button */}
                        <div className="p-3 border-t-3 border-black">
                            <button
                                onClick={() => {
                                    clearRecentlyViewed();
                                    setItems([]);
                                    setIsExpanded(false);
                                }}
                                className="w-full py-2 text-xs font-bold uppercase tracking-widest text-black/50 hover:text-red-500 transition-colors"
                            >
                                Clear History
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
