"use client";

import { Lenis as ReactLenis } from "@studio-freight/react-lenis";

export default function LuxuryLayout({ children }: { children: React.ReactNode }) {
    // Noise texture SVG
    const noiseSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E`;

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            <div className="relative min-h-screen bg-stone-50 text-gray-950 selection:bg-black selection:text-white">
                {/* Global Noise Overlay */}
                <div
                    className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-multiply"
                    style={{ backgroundImage: `url("${noiseSvg}")` }}
                />

                {/* Content */}
                <div className="relative z-0">
                    {children}
                </div>
            </div>
        </ReactLenis>
    );
}
