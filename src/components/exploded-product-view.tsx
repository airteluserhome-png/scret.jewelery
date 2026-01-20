"use client";

import { motion } from "framer-motion";
import { Droplet, Watch, Gem, Sparkles } from "lucide-react";

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

export default function ExplodedProductView() {
    return (
        <section className="py-24 md:py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="font-serif text-4xl md:text-6xl text-gray-900 mb-4">
                        Precision Engineering
                    </h2>
                    <p className="font-sans text-gray-500 uppercase tracking-widest text-sm">
                        Every Detail Matters
                    </p>
                </motion.div>

                {/* Exploded View Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                    {/* Left Features */}
                    <div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
                        {features
                            .filter((f) => f.position.startsWith("left"))
                            .map((feature, index) => (
                                <FeatureCard
                                    key={feature.id}
                                    feature={feature}
                                    index={index}
                                    align="right"
                                />
                            ))}
                    </div>

                    {/* Center Product Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-6 flex justify-center order-1 lg:order-2"
                    >
                        <div className="relative w-full max-w-md aspect-square">
                            {/* Accent circles */}
                            <div className="absolute inset-0 bg-gradient-to-br from-soft-pink/30 to-rose-gold/20 rounded-full blur-3xl" />

                            {/* Product placeholder - replace with actual image */}
                            <div className="relative z-10 w-full h-full bg-gradient-to-br from-gray-50 to-soft-pink/40 rounded-full flex items-center justify-center border-2 border-rose-gold/20">
                                <p className="font-serif text-3xl text-gray-400">
                                    [Watch Image]
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Features */}
                    <div className="lg:col-span-3 space-y-8 order-3">
                        {features
                            .filter((f) => f.position.startsWith("right"))
                            .map((feature, index) => (
                                <FeatureCard
                                    key={feature.id}
                                    feature={feature}
                                    index={index + 2}
                                    align="left"
                                />
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

interface FeatureCardProps {
    feature: typeof features[0];
    index: number;
    align: "left" | "right";
}

function FeatureCard({ feature, index, align }: FeatureCardProps) {
    const Icon = feature.icon;

    return (
        <motion.div
            initial={{ opacity: 0, x: align === "right" ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className={`bg-soft-pink/20 border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300 ${align === "right" ? "text-right" : "text-left"
                }`}
        >
            <div className={`flex ${align === "right" ? "justify-end" : "justify-start"} mb-3`}>
                <Icon className="w-8 h-8 text-rose-gold stroke-[1.5px]" />
            </div>
            <h3 className="font-serif text-xl text-gray-900 mb-2">{feature.title}</h3>
            <p className="font-sans text-sm text-gray-600 leading-relaxed">
                {feature.description}
            </p>
        </motion.div>
    );
}
