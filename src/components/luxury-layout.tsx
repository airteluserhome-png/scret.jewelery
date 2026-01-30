"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function LuxuryLayout({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1,
            duration: 1.5,
            smoothWheel: true,
            wheelMultiplier: 1.0,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div className="relative min-h-screen bg-stone-50 text-gray-950 selection:bg-black selection:text-white transform-gpu">
            {/* Content */}
            <div className="relative z-0">
                {children}
            </div>
        </div>
    );
}
