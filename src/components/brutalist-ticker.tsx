"use client";

import { motion } from "framer-motion";

export default function BrutalistTicker({
    text = "ALL 5 A SWISS MOVEMENT ✽ COMES WITH BOX AND PAPERS ✽ GLOBAL SHIPPING",
    rotated = false
}: { text?: string, rotated?: boolean }) {

    return (
        <div
            className={`w-full overflow-hidden bg-hot-pink text-white py-4 whitespace-nowrap border-y-2 border-hot-pink ${rotated ? 'transform -rotate-1 scale-[1.02] border-2 border-white my-10' : ''}`}
        >
            <motion.div
                className="inline-block font-bold text-xl md:text-2xl uppercase tracking-widest"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 20
                }}
            >
                {/* Repeat text to ensure continuous loop */}
                <span className="px-4">{text} ✽ {text} ✽ {text} ✽ {text}</span>
            </motion.div>
        </div>
    );
}
