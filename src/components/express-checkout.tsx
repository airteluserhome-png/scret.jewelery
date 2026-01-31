"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// This component shows crypto payment options
// Users can click to pay with Bitcoin, Ethereum, or Solana

interface ExpressCheckoutProps {
    onCryptoSelect?: (crypto: "bitcoin" | "ethereum" | "solana") => void;
}

export default function ExpressCheckout({ onCryptoSelect }: ExpressCheckoutProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCrypto, setSelectedCrypto] = useState<"bitcoin" | "ethereum" | "solana" | null>(null);
    
    const handleCryptoClick = (crypto: "bitcoin" | "ethereum" | "solana") => {
        if (onCryptoSelect) onCryptoSelect(crypto);
        setSelectedCrypto(crypto);
        setIsModalOpen(true);
    };

    return (
        <div className="w-full">
            {/* Crypto Payment Section */}
            <div 
                className="flex flex-col items-center gap-4 py-5 px-6 bg-white"
                style={{
                    border: "3px solid #000",
                }}
            >
                <span className="font-brutalist text-lg md:text-xl uppercase tracking-[0.1em] text-black">
                    Pay With Crypto
                </span>
                
                {/* Crypto Buttons - ALL LOGOS LARGE */}
                <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center w-full">
                    {/* Bitcoin - Large Logo + Text */}
                    <motion.button
                        onClick={() => handleCryptoClick("bitcoin")}
                        whileHover={{ y: -4, boxShadow: "8px 8px 0px #FF0099" }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-4 px-6 py-4 bg-white text-black select-none cursor-pointer transition-all"
                        style={{ 
                            border: "3px solid #000",
                            boxShadow: "5px 5px 0px #FF0099"
                        }}
                        aria-label="Pay with Bitcoin"
                    >
                        <Image 
                            src="/crypto/bitcoin.png" 
                            alt="Bitcoin" 
                            width={48} 
                            height={48}
                            className="object-contain"
                        />
                        <span className="font-brutalist text-xl md:text-2xl uppercase tracking-wider">Bitcoin</span>
                    </motion.button>

                    {/* Ethereum - Logo + Text */}
                    <motion.button
                        onClick={() => handleCryptoClick("ethereum")}
                        whileHover={{ y: -4, boxShadow: "8px 8px 0px #FF0099" }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-4 px-6 py-4 bg-white text-black select-none cursor-pointer transition-all"
                        style={{ 
                            border: "3px solid #000",
                            boxShadow: "5px 5px 0px #FF0099"
                        }}
                        aria-label="Pay with Ethereum"
                    >
                        <Image 
                            src="/crypto/ethereum.png" 
                            alt="Ethereum" 
                            width={48} 
                            height={48}
                            className="object-contain"
                        />
                        <span className="font-brutalist text-xl md:text-2xl uppercase tracking-wider">Ethereum</span>
                    </motion.button>

                    {/* Solana - Large Logo + Text */}
                    <motion.button
                        onClick={() => handleCryptoClick("solana")}
                        whileHover={{ y: -4, boxShadow: "8px 8px 0px #FF0099" }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-4 px-6 py-4 bg-white text-black select-none cursor-pointer transition-all"
                        style={{ 
                            border: "3px solid #000",
                            boxShadow: "5px 5px 0px #FF0099"
                        }}
                        aria-label="Pay with Solana"
                    >
                        <Image 
                            src="/crypto/solana.png" 
                            alt="Solana" 
                            width={48} 
                            height={48}
                            className="object-contain"
                        />
                        <span className="font-brutalist text-xl md:text-2xl uppercase tracking-wider">Solana</span>
                    </motion.button>
                </div>

            {/* Reassurance: multiple payment methods available */}
            <div className="mt-3 w-full text-center">
                <p className="text-[10px] uppercase tracking-[0.15em] text-black/50 font-bold">
                    Secure checkout also available with cards, Apple Pay, Google Pay, and Amazon Pay
                </p>
            </div>
            </div>

            {/* Crypto Gateway Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 10 }}
                            transition={{ type: "spring", duration: 0.4 }}
                            className="bg-white w-full max-w-lg relative"
                            style={{ border: "4px solid #000", boxShadow: "12px 12px 0px #FF0099" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute -top-3 -right-3 w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-[#FF0099] transition-colors z-10"
                                style={{ border: "3px solid #000" }}
                                aria-label="Close"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="bg-[#FF0099] text-white p-4 md:p-6">
                                <h3 className="font-brutalist text-2xl md:text-3xl uppercase tracking-wider">
                                    Crypto Gateway Incoming
                                </h3>
                                <p className="text-white/80 text-sm mt-1 uppercase tracking-widest">
                                    {selectedCrypto ? selectedCrypto.toUpperCase() : "CRYPTO"} Payments
                                </p>
                            </div>

                            <div className="p-5 md:p-6">
                                <p className="text-black/70 text-sm mb-4">
                                    We are finalizing a secure blockchain payment gateway to accept crypto
                                    seamlessly. This checkout method will be available very soon.
                                </p>
                                <div className="bg-gray-50 p-4" style={{ border: "2px solid #eee" }}>
                                    <p className="text-sm text-black/80">
                                        In the meantime, please use card, Apple Pay, Google Pay, or Amazon Pay.
                                    </p>
                                </div>

                                <div className="mt-5">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="w-full bg-black text-white font-brutalist text-lg py-4 uppercase tracking-wider hover:bg-[#FF0099] transition-colors"
                                        style={{ border: "3px solid #000", boxShadow: "4px 4px 0px #FF0099" }}
                                    >
                                        Got It
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
