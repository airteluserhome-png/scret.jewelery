"use client";

import { useEffect, useState } from "react";

export default function LuxuryLoader() {
    const [isVisible, setIsVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Start fade out
        const fadeTimer = setTimeout(() => {
            setIsFading(true);
        }, 600);

        // Remove from DOM
        const hideTimer = setTimeout(() => {
            setIsVisible(false);
        }, 900);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div 
            className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white transition-opacity duration-400 ${isFading ? 'opacity-0' : 'opacity-100'}`}
        >
            <div className="relative flex flex-col items-center">
                {/* BRUTALIST BRANDING */}
                <div className="relative">
                    {/* Pink Shadow Layer */}
                    <h1 className="absolute top-1 left-1 font-brutalist text-6xl md:text-8xl uppercase tracking-tighter text-hot-pink select-none loader-text-reveal">
                        SECRETLY
                    </h1>

                    {/* Main Black Text */}
                    <h1 className="relative font-brutalist text-6xl md:text-8xl uppercase tracking-tighter text-black select-none z-10 loader-text-reveal">
                        SECRETLY
                    </h1>
                </div>

                {/* LOADING STATUS */}
                <div className="mt-8 flex items-center gap-4">
                    <div className="w-3 h-3 bg-hot-pink loader-pulse" />
                    <p className="font-mono text-xs uppercase tracking-widest text-black loader-blink">
                        LOADING
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-64 h-2 bg-black/10 mt-4 overflow-hidden border border-black">
                    <div className="h-full bg-hot-pink loader-progress" />
                </div>
            </div>

            <style jsx>{`
                .loader-text-reveal {
                    animation: textReveal 0.6s ease-out forwards;
                }
                .loader-pulse {
                    animation: pulse 0.6s ease-in-out infinite;
                }
                .loader-blink {
                    animation: blink 0.8s ease-in-out infinite;
                }
                .loader-progress {
                    animation: progress 1.6s ease-out forwards;
                }
                @keyframes textReveal {
                    from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
                    to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(0.5); opacity: 0.5; }
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
                @keyframes progress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
                @keyframes textReveal {
                    from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
                    to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
                }
                .loader-text-reveal {
                    animation: textReveal 0.4s ease-out forwards;
                }
                .loader-progress {
                    animation: progress 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
