"use client";

import { motion } from "framer-motion";

export default function CrossTape() {
    return (
        <div className="relative h-[300px] overflow-hidden flex items-center justify-center my-12 md:my-16">
            {/* Black Tape - Tilted Down */}
            <div
                className="absolute w-[120%] bg-black text-white py-4 font-brutalist text-xl md:text-2xl lg:text-3xl uppercase whitespace-nowrap border-y-[3px] border-white shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                style={{ transform: 'rotate(-4deg)', zIndex: 1 }}
            >
                <motion.div
                    className="inline-block"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20
                    }}
                >
                    <span className="px-4">
                        ARCHIVE SALE ✽ 60% OFF OLDER COLLECTIONS ✽ ARCHIVE SALE ✽ 60% OFF OLDER COLLECTIONS ✽ ARCHIVE SALE ✽ 60% OFF OLDER COLLECTIONS
                    </span>
                </motion.div>
            </div>

            {/* Pink Tape - Tilted Up */}
            <div
                className="absolute w-[120%] bg-hot-pink text-white py-4 font-brutalist text-xl md:text-2xl lg:text-3xl uppercase whitespace-nowrap border-y-[3px] border-white shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                style={{ transform: 'rotate(4deg)', zIndex: 2 }}
            >
                <motion.div
                    className="inline-block"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 25
                    }}
                >
                    <span className="px-4">
                        MEN&apos;S ARCHIVE ✽ LIMITED EDITION DROPS ✽ MEN&apos;S ARCHIVE ✽ LIMITED EDITION DROPS ✽ MEN&apos;S ARCHIVE ✽ LIMITED EDITION DROPS
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
