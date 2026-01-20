"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Watch, Gem, Component } from "lucide-react"; // Using generic icons

const specs = [
    {
        icon: Watch,
        title: "Swiss Movement",
        desc: "Precision engineering for timeless accuracy.",
    },
    {
        icon: Component,
        title: "Guilloché Dial",
        desc: "Intricate patterns hand-engraved for depth.",
    },
    {
        icon: Gem,
        title: "18k Rose Gold",
        desc: "Sourced responsibly, radiating warmth.",
    },
];

export default function TechSpecs() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-30%"]);

    return (
        <section ref={targetRef} className="h-[200vh] bg-stone-50 relative">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                <motion.div style={{ x }} className="flex gap-24 px-24">
                    <div className="min-w-[400px]">
                        <h2 className="font-serif text-6xl text-gray-900 leading-tight">
                            Craftsmanship<br />In Detail
                        </h2>
                        <p className="mt-8 font-sans text-gray-500 max-w-md">
                            Every piece is a testament to the artisan's touch, combining heritage techniques with modern innovation.
                        </p>
                    </div>
                    {specs.map((spec, i) => (
                        <div key={i} className="min-w-[400px] h-[500px] bg-white border border-gray-100 p-12 flex flex-col justify-center border-t-4 border-rose-gold/20">
                            <spec.icon className="w-12 h-12 text-rose-gold mb-8 stroke-[1px]" />
                            <h3 className="font-serif text-3xl mb-4">{spec.title}</h3>
                            <p className="font-sans text-gray-500 leading-relaxed text-lg">{spec.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
