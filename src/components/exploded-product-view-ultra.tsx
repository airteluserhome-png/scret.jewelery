"use client";

import { motion, useInView } from "framer-motion";
import { Droplet, Watch, Gem, Sparkles } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

const features = [
    {
        id: 1,
        icon: Gem,
        title: "Sapphire Crystal",
        description: "Scratch-resistant clarity with anti-reflective coating.",
        position: "left-top",
    },
    {
        id: 2,
        icon: Droplet,
        title: "Water Resistant",
        description: "Tested to 100m depth for everyday elegance.",
        position: "left-bottom",
    },
    {
        id: 3,
        icon: Sparkles,
        title: "Guilloché Dial",
        description: "Hand-engraved patterns creating mesmerizing depth.",
        position: "right-top",
    },
    {
        id: 4,
        icon: Watch,
        title: "Alligator Strap",
        description: "Premium leather with signature rose gold clasp.",
        position: "right-bottom",
    },
];

export default function ExplodedProductViewUltra() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    return (
        <section ref={sectionRef} className="relative py-24 md:py-32 bg-[#FFF0F5] overflow-hidden">
            {/* Noise texture */}
            <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: "200px 200px",
                }}
            />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="font-serif text-4xl md:text-6xl text-gray-900 mb-4">
                        Precision <span className="italic">Engineering</span>
                    </h2>
                    <p className="font-sans text-gray-500 uppercase tracking-widest text-sm">
                        Every Detail Matters
                    </p>
                </motion.div>

                {/* Exploded View Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center relative">
                    {/* SVG Connection Lines */}
                    {isInView && (
                        <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{ zIndex: 1 }}>
                            {/* Left lines */}
                            <motion.line
                                x1="25%" y1="30%" x2="45%" y2="50%"
                                stroke="#B76E79"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.3 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                            <motion.line
                                x1="25%" y1="70%" x2="45%" y2="50%"
                                stroke="#B76E79"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.3 }}
                                transition={{ duration: 1, delay: 0.6 }}
                            />
                            {/* Right lines */}
                            <motion.line
                                x1="75%" y1="30%" x2="55%" y2="50%"
                                stroke="#B76E79"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.3 }}
                                transition={{ duration: 1, delay: 0.7 }}
                            />
                            <motion.line
                                x1="75%" y1="70%" x2="55%" y2="50%"
                                stroke="#B76E79"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.3 }}
                                transition={{ duration: 1, delay: 0.8 }}
                            />
                        </svg>
                    )}

                    {/* Left Features */}
                    <div className="lg:col-span-3 space-y-8 order-2 lg:order-1 relative z-10">
                        {features
                            .filter((f) => f.position.startsWith("left"))
                            .map((feature, index) => (
                                <GlassmorphicFeatureCard
                                    key={feature.id}
                                    feature={feature}
                                    index={index}
                                    align="right"
                                />
                            ))}
                    </div>

                    {/* Center Product Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="lg:col-span-6 flex justify-center order-1 lg:order-2 relative z-10"
                    >
                        <div className="relative w-full max-w-md aspect-square">
                            {/* Glow effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-rose-gold/20 via-soft-pink/30 to-rose-gold/20 rounded-full blur-3xl"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* Product image */}
                            <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-2 border-rose-gold/20 shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1587836374608-f94ae1c72ec5?w=800&q=90"
                                    alt="Luxury watch close-up"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Features */}
                    <div className="lg:col-span-3 space-y-8 order-3 relative z-10">
                        {features
                            .filter((f) => f.position.startsWith("right"))
                            .map((feature, index) => (
                                <GlassmorphicFeatureCard
                                    key={feature.id}
                                    feature={feature}
                                    index={index + 2}
                                    align="left"
                                />
                            ))}
                    </div>
                </div>
            </div>

            {/* Border separator */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-rose-200" />
        </section>
    );
}

interface GlassmorphicFeatureCardProps {
    feature: typeof features[0];
    index: number;
    align: "left" | "right";
}

function GlassmorphicFeatureCard({ feature, index, align }: GlassmorphicFeatureCardProps) {
    const Icon = feature.icon;

    return (
        <motion.div
            initial={{ opacity: 0, x: align === "right" ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`backdrop-blur-md bg-white/40 border border-white/60 p-6 shadow-lg hover:shadow-xl transition-all duration-500 ${align === "right" ? "text-right" : "text-left"
                }`}
        >
            <div className={`flex ${align === "right" ? "justify-end" : "justify-start"} mb-3`}>
                <div className="p-2 bg-rose-gold/10 rounded-full">
                    <Icon className="w-6 h-6 text-rose-gold stroke-[1.5px]" />
                </div>
            </div>
            <h3 className="font-serif text-xl text-gray-900 mb-2">{feature.title}</h3>
            <p className="font-sans text-sm text-gray-600 leading-relaxed">
                {feature.description}
            </p>
        </motion.div>
    );
}
