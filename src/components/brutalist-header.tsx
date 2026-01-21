"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/cart-context";

export default function BrutalistHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { setIsOpen, itemsCount } = useCart();

    const navLinks = [
        { label: "HOME", href: "/" },
        { label: "PLAIN WATCHES", href: "/shop?category=plain" },
        { label: "ICED WATCHES", href: "/shop?category=iced" },
        { label: "ACCESSORIES", href: "/accessories" },
    ];

    return (
        <>
            {/* Single Navigation */}
            <nav className="flex justify-between items-center px-4 md:px-6 lg:px-8 py-4 brutalist-border-b font-bold tracking-wider uppercase bg-white">
                <button
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="hover:bg-hot-pink hover:text-white px-3 py-2 transition-colors tracking-wide"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <Link href="/" className="md:hidden text-3xl font-brutalist tracking-[0.05em] text-hot-pink hero-3d-text" style={{ textShadow: '2px 2px 0px #000' }}>
                    SECRETLY
                </Link>

                <div className="flex items-center gap-4">
                    <Link href="/shop" className="flex items-center justify-center hover:opacity-70 transition-opacity" aria-label="Account">
                        <User size={20} />
                    </Link>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="relative flex items-center justify-center hover:opacity-70 transition-opacity"
                        aria-label="Cart"
                    >
                        <ShoppingBag size={20} />
                        {itemsCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-hot-pink text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-none border border-black shadow-[2px_2px_0_black]">
                                {itemsCount}
                            </span>
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-40 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        <motion.div
                            className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white border-r-[3px] border-black z-50 md:hidden overflow-y-auto"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween", duration: 0.3 }}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-8 border-b-[3px] border-black pb-4">
                                    <h2 className="text-2xl font-brutalist tracking-[0.05em]">SECRETLY</h2>
                                    <button onClick={() => setMobileMenuOpen(false)}>
                                        <X size={24} />
                                    </button>
                                </div>

                                <nav className="flex flex-col gap-4">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            className="text-lg font-bold border-b-[3px] border-black pb-3 hover:bg-hot-pink hover:text-white px-2 transition-colors"
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

            {/* HERO with 3D Text Shadow */}
            <header className="hidden md:block brutalist-border-b brutalist-border-t text-center py-6 md:py-8 lg:py-12 px-4 bg-white">
                <h1
                    className="font-brutalist leading-[0.8] tracking-[0.05em] text-hot-pink hero-3d-text"
                    style={{ fontSize: '14vw' }}
                >
                    SECRETLY
                </h1>
            </header>
        </>
    );
}
