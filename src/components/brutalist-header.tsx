"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BrutalistHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: "PLAIN WATCHES", href: "/shop" },
        { label: "ICED WATCHES", href: "/shop" },
        { label: "HOME", href: "/" },
        { label: "ABOUT SECRETLY", href: "/shop" },
    ];

    return (
        <>
            {/* Single Pink Navigation Bar */}
            <nav className="flex justify-between items-center px-4 md:px-6 lg:px-8 py-4 border-b-2 border-hot-pink font-bold tracking-wider uppercase bg-white">

                {/* Mobile: Hamburger */}
                <button
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                {/* Center: Brand Logo / Nav Links */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="hover:bg-hot-pink hover:text-white px-3 py-2 transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Center on Mobile: Brand */}
                <Link href="/" className="md:hidden text-xl font-black tracking-tighter">
                    SECRETLY
                </Link>

                {/* Right: Icons */}
                <div className="flex items-center gap-4">
                    <Link href="/shop" className="hover:opacity-70 transition-opacity">
                        <User size={20} />
                    </Link>
                    <Link href="/shop" className="hover:opacity-70 transition-opacity">
                        <ShoppingBag size={20} />
                    </Link>
                </div>
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
                                <div className="flex justify-between items-center mb-8 border-b-2 border-hot-pink pb-4">
                                    <h2 className="text-2xl font-black uppercase tracking-tighter">SECRETLY</h2>
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

            {/* Main Header Title - SECRETLY Branding */}
            <header className="border-b-2 border-hot-pink text-center py-8 md:py-12 lg:py-24 px-4">
                <h1 className="text-[18vw] md:text-[12vw] leading-[0.8] font-black uppercase tracking-tighter">
                    SECRETLY
                </h1>
                <p className="text-xs md:text-sm uppercase tracking-[0.3em] mt-4 font-bold opacity-70">
                    Luxury Timepieces
                </p>
            </header>
        </>
    );
}
