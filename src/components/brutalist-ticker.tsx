"use client";

import { motion } from "framer-motion";

export default function BrutalistTicker({
    text = "SECRETLY ✽ 5 A SWISS MOVEMENT ✽ BOX AND PAPERS INCLUDED ✽ WORLDWIDE SHIPPING",
    rotated = false
}: { text?: string, rotated?: boolean }) {

    return (
        <div
            className={`
                w-full overflow-hidden bg-hot-pink text-white 
                py-3 md:py-4 whitespace-nowrap 
                ${rotated ? 'transform -rotate-1 scale-[1.02] border-[3px] border-white my-6 md:my-10' : 'border-y-[3px] border-hot-pink'}
            `}
        >
            <motion.div
                className="inline-block font-brutalist text-base md:text-xl lg:text-2xl tracking-wide"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 20
                }}
            >
                <span className="px-2 md:px-4">{text} ✽ {text} ✽ {text} ✽ {text}</span>
            </motion.div>
        </div>
    );
}
