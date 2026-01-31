"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// This component shows crypto payment options
// Users can click to pay with Bitcoin, Ethereum, or Solana

interface ExpressCheckoutProps {
    onCryptoSelect?: (crypto: "bitcoin" | "ethereum" | "solana") => void;
}

export default function ExpressCheckout({ onCryptoSelect }: ExpressCheckoutProps) {
    
    const handleCryptoClick = (crypto: "bitcoin" | "ethereum" | "solana") => {
        // For now, open a contact/DM flow for crypto payments
        // In the future, this can integrate with a crypto payment gateway
        if (onCryptoSelect) {
            onCryptoSelect(crypto);
        } else {
            // Default behavior: open contact for crypto payment
            const cryptoNames = {
                bitcoin: "Bitcoin (BTC)",
                ethereum: "Ethereum (ETH)", 
                solana: "Solana (SOL)"
            };
            
            // Try to open contact button if it exists
            const contactBtn = document.querySelector('[aria-label="Contact us"]') as HTMLButtonElement;
            if (contactBtn) {
                contactBtn.click();
            } else {
                // Fallback: show alert with crypto selection
                alert(`To pay with ${cryptoNames[crypto]}, please contact us via Instagram or Email. We'll provide the wallet address and confirm your order.`);
            }
        }
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

                    {/* Ethereum - Large Logo with text built-in */}
                    <motion.button
                        onClick={() => handleCryptoClick("ethereum")}
                        whileHover={{ y: -4, boxShadow: "8px 8px 0px #FF0099" }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-center px-6 py-4 bg-white text-black select-none cursor-pointer transition-all"
                        style={{ 
                            border: "3px solid #000",
                            boxShadow: "5px 5px 0px #FF0099"
                        }}
                        aria-label="Pay with Ethereum"
                    >
                        <Image 
                            src="/crypto/ethereum.png" 
                            alt="Ethereum" 
                            width={200} 
                            height={60}
                            className="object-contain"
                            style={{ height: "48px", width: "auto" }}
                        />
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
            </div>

            {/* Security Note */}
            <p className="text-center text-[10px] uppercase tracking-[0.15em] text-black/50 font-bold mt-3">
                🔐 Secure Crypto Payments • DM for Wallet Address
            </p>
        </div>
    );
}
