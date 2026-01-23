"use client";

import { motion } from "framer-motion";

export default function CrossTape() {
    return (
        <div className="relative h-[180px] md:h-[250px] overflow-hidden flex items-center justify-center my-12 md:my-16 lg:my-20 bg-transparent">
            {/* Black Tape - Trust & Credentials */}
            <div
                className="absolute w-[120%] bg-black text-white py-[12px] md:py-[18px] font-brutalist text-lg md:text-2xl lg:text-3xl uppercase whitespace-nowrap border-y-[3px] border-white shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
                style={{ transform: 'rotate(-5deg)', zIndex: 2, letterSpacing: '1px' }}
            >
                <motion.div
                    className="inline-block pl-[100%]"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 8 // Faster
                    }}
                >
                    <span className="px-4">
                        SECRETLY JEWELRY ✦ PREMIUM QUALITY ✦ FULL PACKAGING INCLUDED ✦ 100% SECURE CHECKOUT ✦ SECRETLY JEWELRY ✦ PREMIUM QUALITY ✦ FULL PACKAGING INCLUDED ✦ 100% SECURE CHECKOUT
                    </span>
                </motion.div>
            </div>

            {/* Pink Tape - New Drops & Hype */}
            <div
                className="absolute w-[120%] bg-hot-pink text-white py-[12px] md:py-[18px] font-brutalist text-lg md:text-2xl lg:text-3xl uppercase whitespace-nowrap border-y-[3px] border-white shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
                style={{ transform: 'rotate(5deg)', zIndex: 1, letterSpacing: '1px' }}
            >
                <motion.div
                    className="inline-block pl-[100%]"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 8 // Faster
                    }}
                >
                    <span className="px-4">
                        NEW DROPS: ROLEX, AP, PATEK ✦ ICED OUT COLLECTION RESTOCKED ✦ WORLDWIDE SHIPPING ✦ NEW DROPS: ROLEX, AP, PATEK ✦ ICED OUT COLLECTION RESTOCKED ✦ WORLDWIDE SHIPPING
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
