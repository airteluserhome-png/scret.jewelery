"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const navLinks = [
    { name: "Gifts", href: "#" },
    { name: "Jewelry", href: "#" },
    { name: "High Jewelry", href: "#" },
    { name: "Watches", href: "/watches", megaMenu: true },
    { name: "Home", href: "#" },
    { name: "Accessories", href: "#" },
    { name: "World of Secretly", href: "#" },
];

const watchesMegaMenu = {
    categories: ["Women's Watches", "Men's Watches", "Patek Philippe", "All Fine Watches"],
    collections: ["Secretly HardWear", "Secretly Eternity", "Union Square", "Atlas®", "Secretly Rope", "High Jewelry Watches"],
    featuredImage: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=90",
};

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
                    <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
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
                                className="block py-4 font-sans text-xs uppercase tracking-widest hover:text-gray-600 transition-colors"
                            >
                                {link.name}
                            </Link>
                        </div>
                    ))}
                </nav>
            </div>

            {/* Mega Menu Overlay */}
            <AnimatePresence>
                {hoveredLink === "Watches" && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-full left-0 right-0 bg-white border-b border-black/5 overflow-hidden shadow-sm"
                    >
                        <div className="grid grid-cols-[1fr_1fr_2fr] gap-12 px-12 py-16 max-w-7xl mx-auto">
                            {/* Categories */}
                            <div className="space-y-6">
                                <h3 className="font-serif text-lg text-gray-500 italic">Shop By Category</h3>
                                <ul className="space-y-4">
                                    {watchesMegaMenu.categories.map((item) => (
                                        <li key={item}>
                                            <a href="#" className="font-sans text-sm hover:underline">{item}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Collections */}
                            <div className="space-y-6">
                                <h3 className="font-serif text-lg text-gray-500 italic">Shop By Collection</h3>
                                <ul className="space-y-4">
                                    {watchesMegaMenu.collections.map((item) => (
                                        <li key={item}>
                                            <a href="#" className="font-sans text-sm hover:underline">{item}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Featured Image */}
                            <div className="relative aspect-[4/3] bg-stone-100">
                                <Image
                                    src={watchesMegaMenu.featuredImage}
                                    alt="Featured Collection"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-sm px-4 py-2 font-mono text-[10px] uppercase tracking-widest">
                                        New Arrivals
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
