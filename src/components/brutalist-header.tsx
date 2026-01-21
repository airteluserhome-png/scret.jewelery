"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BrutalistHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: "GIFTS", href: "/shop" },
        { label: "JEWELRY", href: "/shop" },
        { label: "HIGH JEWELRY", href: "/shop" },
        { label: "WATCHES", href: "/shop" },
        { label: "HOME", href: "/" },
        { label: "ACCESSORIES", href: "/shop" },
        { label: "WORLD OF SECRETLY", href: "/shop" },
    ];

    return (
        <>
            {/* Top Bar */}
            <div className="flex justify-between items-center px-4 md:px-5 py-3 border-b-2 border-hot-pink font-bold text-[10px] md:text-sm tracking-widest uppercase">
                <button
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
                <span className="hidden md:inline">Assistance</span>
                <span className="text-center flex-1 md:flex-none">Collection 2026</span>
                <span>Log In</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex justify-center items-center gap-6 lg:gap-8 px-5 py-4 border-b-2 border-hot-pink text-xs lg:text-sm font-bold tracking-wider uppercase flex-wrap">
                {navLinks.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className="hover:bg-hot-pink hover:text-white px-2 py-1 transition-colors"
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-40 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.div
                            className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white border-r-2 border-hot-pink z-50 md:hidden overflow-y-auto"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween", duration: 0.3 }}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-black uppercase">Menu</h2>
                                    <button onClick={() => setMobileMenuOpen(false)}>
                                        <X size={24} />
                                    </button>
                                </div>

                                <nav className="flex flex-col gap-4">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            className="text-lg font-bold uppercase border-b-2 border-hot-pink pb-3 hover:bg-hot-pink hover:text-white px-2 transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Header Title */}
            <header className="border-b-2 border-hot-pink text-center py-8 md:py-12 lg:py-24 px-4">
                <h1 className="text-[18vw] md:text-[12vw] leading-[0.8] font-black uppercase tracking-tighter">
                    Accessory<br />Archive
                </h1>
            </header>
        </>
    );
}
