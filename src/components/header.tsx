"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const megaMenus: Record<string, { categories: string[], collections: string[], featuredImage: string }> = {
    "Gifts": {
        categories: ["For Her", "For Him", "For the Couple", "Wedding Gifts", "Anniversary Gifts", "Baby Gifts"],
        collections: ["Under $500", "Under $1,000", "Under $2,500", "Luxury Gifts", "Personalized Gifts"],
        featuredImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=90"
    },
    "Jewelry": {
        categories: ["Necklaces & Pendants", "Earrings", "Rings", "Bracelets", "Brooches"],
        collections: ["Secretly T", "Secretly HardWear", "Secretly Lock", "Secretly Eternity", "Return to Secretly"],
        featuredImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=90"
    },
    "High Jewelry": {
        categories: ["Blue Book 2024", "Jean Schlumberger", "Elsa Peretti", "Paloma Picasso"],
        collections: ["Bird on a Rock", "The Schlumberger Collection", "Masterpieces", "High Jewelry Necklaces"],
        featuredImage: "https://images.unsplash.com/photo-1605100804763-ebea2407a51d?w=800&q=90"
    },
    "Watches": {
        categories: ["Women's Watches", "Men's Watches", "Patek Philippe", "All Fine Watches"],
        collections: ["Secretly HardWear", "Secretly Eternity", "Union Square", "Atlas®", "Secretly Rope", "High Jewelry Watches"],
        featuredImage: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=90"
    },
    "Home": {
        categories: ["Tableware", "Drinkware", "Decor", "Desk Accessories", "Games & Novelties"],
        collections: ["Color Block", "Diamond Point", "Elsa Peretti", "Everyday Objects"],
        featuredImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=90"
    },
    "Accessories": {
        categories: ["Eyewear", "Fragrance", "Leather Goods", "Key Rings", "Writing Instruments"],
        collections: ["Secretly Blue", "Return to Secretly", "Bean Design"],
        featuredImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=90"
    },
    "World of Secretly": {
        categories: ["The Secretly Foundation", "Sustainability", "Arts & Culture", "Exhibitions"],
        collections: ["Legacy", "The Blue Box Cafe", "Careers", "Newsroom"],
        featuredImage: "https://images.unsplash.com/photo-1534126511373-51db05373d43?w=800&q=90"
    }
};

const navLinks = Object.keys(megaMenus).map(name => ({ name, href: "#" }));

export default function Header() {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    return (
        <header
            className="sticky top-0 z-[40] bg-white text-black border-b border-black/5"
            onMouseLeave={() => setHoveredLink(null)}
        >
            {/* Top Bar */}
            <div className="relative z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-white">
                {/* Left: Search */}
                <div className="flex items-center gap-4">
                    <Search className="w-5 h-5 stroke-[1.5]" />
                    <span className="hidden md:block font-mono text-[10px] uppercase tracking-widest text-gray-400">Search</span>
                </div>

                {/* Center: Logo */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Link href="/">
                        <h1 className="font-serif text-3xl tracking-wide">SECRETLY</h1>
                    </Link>
                </div>

                {/* Right: Icons */}
                <div className="flex items-center gap-6">
                    <User className="w-5 h-5 stroke-[1.5]" />
                    <Link href="/cart">
                        <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                    </Link>
                </div>
            </div>

            {/* Nav Bar */}
            <div className="relative z-50 hidden md:flex justify-center border-t border-black/5 bg-white">
                <nav className="flex space-x-12 px-6">
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            onMouseEnter={() => setHoveredLink(link.name)}
                            className="relative"
                        >
                            <Link
                                href={link.href}
                                className={`block py-4 font-sans text-xs uppercase tracking-widest transition-colors ${hoveredLink === link.name ? "text-black border-b-2 border-black" : "text-gray-500 hover:text-black"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        </div>
                    ))}
                </nav>
            </div>

            {/* Mega Menu Overlay */}
            <AnimatePresence>
                {hoveredLink && megaMenus[hoveredLink] && (
                    <motion.div
                        key="mega-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-full left-0 right-0 bg-white border-b border-black/5 overflow-hidden shadow-sm pt-4"
                    >
                        <div className="grid grid-cols-[1fr_1fr_2fr] gap-12 px-12 py-12 max-w-7xl mx-auto">
                            {/* Categories */}
                            <div className="space-y-6">
                                <h3 className="font-serif text-lg text-gray-500 italic">Explore {hoveredLink}</h3>
                                <ul className="space-y-3">
                                    {megaMenus[hoveredLink].categories.map((item) => (
                                        <li key={item}>
                                            <a href="#" className="font-sans text-sm hover:underline hover:text-black text-gray-700 transition-colors block py-0.5">{item}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Collections */}
                            <div className="space-y-6">
                                <h3 className="font-serif text-lg text-gray-500 italic">Featured Collections</h3>
                                <ul className="space-y-3">
                                    {megaMenus[hoveredLink].collections.map((item) => (
                                        <li key={item}>
                                            <a href="#" className="font-sans text-sm hover:underline hover:text-black text-gray-700 transition-colors block py-0.5">{item}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Featured Image */}
                            <div className="relative aspect-[16/9] bg-stone-100 group cursor-pointer overflow-hidden">
                                <Image
                                    src={megaMenus[hoveredLink].featuredImage}
                                    alt={`Featured ${hoveredLink}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                                <div className="absolute bottom-6 left-6">
                                    <span className="bg-white/90 backdrop-blur-sm px-4 py-2 font-mono text-[10px] uppercase tracking-widest">
                                        Discover {hoveredLink}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
