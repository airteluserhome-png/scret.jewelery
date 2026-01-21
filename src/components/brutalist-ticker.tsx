"use client";

import { motion } from "framer-motion";

export default function BrutalistTicker({
    text = "⚠ LIMITED STOCK ⚠ SECRETLY ✽ 5 A SWISS MOVEMENT ✽ WORLDWIDE SHIPPING ✽ ICED OUT COLLECTION",
    rotated = false
}: { text?: string, rotated?: boolean }) {

    return (
        <div
            className={`
                w-full overflow-hidden bg-hot-pink text-white 
                py-4 md:py-4 whitespace-nowrap 
                ${rotated ? 'transform -rotate-1 scale-[1.02] border-[3px] border-black my-6 md:my-10' : 'border-y-[3px] border-black'}
            `}
        >
            <motion.div
                className="inline-block font-brutalist text-lg md:text-2xl lg:text-2xl tracking-wide font-bold"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 15 // Faster for more energy
                }}
            >
                <span className="px-2 md:px-4">{text} ✽ {text} ✽ {text} ✽ {text}</span>
            </motion.div>
        </div>
    );
}
