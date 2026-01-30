"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button when page is scrolled down 400px
            setIsVisible(window.scrollY > 400);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-black text-white flex items-center justify-center cursor-pointer group touch-manipulation active:scale-95"
                    style={{ 
                        border: "3px solid #000",
                        boxShadow: "4px 4px 0px #FF0099" 
                    }}
                    whileHover={{ 
                        y: -4,
                        boxShadow: "6px 6px 0px #FF0099"
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Back to top"
                >
                    <svg 
                        className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-y-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={3} 
                            d="M5 10l7-7m0 0l7 7m-7-7v18" 
                        />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
