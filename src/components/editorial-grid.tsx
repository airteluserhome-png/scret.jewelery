"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const collections = [
    {
        id: 1,
        title: "The Rose Gold Era",
        subtitle: "Collection 2024",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=90",
        size: "large", // 2 rows
    },
    {
        id: 2,
        title: "Midnight Diamond",
        subtitle: "Rare Edition",
        image: "https://images.unsplash.com/photo-1611591437764-0f82e48c4707?w=600&q=90",
        size: "small",
    },
    {
        id: 3,
        title: "Bridal Heritage",
        subtitle: "Vows & Veils",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=90",
        size: "small",
    },
];

export default function EditorialGrid() {
    return (
        <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto w-full">
            <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[90vh] min-h-[600px]">

                {/* Large Card (Left) - Takes up 60% of width on desktop */}
                <div className="md:w-[60%] h-[50vh] md:h-full relative">
                    <EditorialCard item={collections[0]} />
                </div>

                {/* Right Column (2 Small Cards) - Takes up 40% of width on desktop */}
                <div className="md:w-[40%] flex flex-col gap-6 h-[50vh] md:h-full">
                    <div className="flex-1 relative h-full">
                        <EditorialCard item={collections[1]} />
                    </div>
                    <div className="flex-1 relative h-full">
                        <EditorialCard item={collections[2]} />
                    </div>
                </div>

            </div>
        </section>
    );
}

function EditorialCard({ item }: { item: typeof collections[0] }) {
    return (
        <motion.div
            className="group relative w-full h-full overflow-hidden bg-rose-50 cursor-pointer"
            initial="initial"
            whileHover="hover"
        >
            <motion.div
                variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.1 },
                }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
            >
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </motion.div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-700" />

            {/* Content */}
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between z-10">
                <div className="flex justify-end">
                    <motion.div
                        variants={{
                            initial: { opacity: 0, x: -20 },
                            hover: { opacity: 1, x: 0 }
                        }}
                        className="bg-white/90 backdrop-blur-md p-3 rounded-full"
                    >
                        <ArrowUpRight className="w-5 h-5 text-gray-900" />
                    </motion.div>
                </div>

                <div className="text-white mix-blend-normal">
                    <p className="text-xs font-sans tracking-[0.2em] mb-3 uppercase opacity-90 font-medium">{item.subtitle}</p>
                    <h3 className="font-serif text-3xl md:text-5xl leading-tight drop-shadow-lg">{item.title}</h3>
                </div>
            </div>
        </motion.div>
    );
}
