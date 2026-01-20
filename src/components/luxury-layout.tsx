"use client";

import { Lenis as ReactLenis } from "@studio-freight/react-lenis";

export default function LuxuryLayout({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true, wheelMultiplier: 1.0 }}>
            <div className="relative min-h-screen bg-stone-50 text-gray-950 selection:bg-black selection:text-white transform-gpu">
                {/* Content */}
                <div className="relative z-0">
                    {children}
                </div>
            </div>
        </ReactLenis>
    );
}
