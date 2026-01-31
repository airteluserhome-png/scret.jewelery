"use client";

import { useState, useEffect } from "react";

interface LiveViewersProps {
    productId: number;
    minViewers?: number;
    maxViewers?: number;
}

export default function LiveViewers({ 
    productId, 
    minViewers = 3, 
    maxViewers = 12 
}: LiveViewersProps) {
    const [viewers, setViewers] = useState(0);
    const [isBlinking, setIsBlinking] = useState(false);

    useEffect(() => {
        // Generate initial viewer count based on product ID for consistency
        const baseViewers = (productId % 7) + minViewers;
        const variation = Math.floor(Math.random() * 3);
        setViewers(Math.min(baseViewers + variation, maxViewers));

        // Randomly fluctuate viewers every 8-15 seconds
        const interval = setInterval(() => {
            setViewers(prev => {
                const change = Math.random() > 0.5 ? 1 : -1;
                const newCount = prev + change;
                return Math.max(minViewers, Math.min(newCount, maxViewers));
            });
        }, 8000 + Math.random() * 7000);

        // Blink animation every 3 seconds
        const blinkInterval = setInterval(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 200);
        }, 3000);

        return () => {
            clearInterval(interval);
            clearInterval(blinkInterval);
        };
    }, [productId, minViewers, maxViewers]);

    return (
        <div 
            className="inline-flex items-center gap-3 px-4 py-2 bg-black text-white"
            style={{
                border: "3px solid #000",
                boxShadow: "4px 4px 0px #FF0099"
            }}
        >
            {/* Animated Eye */}
            <div className="relative w-6 h-6 flex items-center justify-center">
                <svg 
                    viewBox="0 0 24 24" 
                    className="w-6 h-6 text-[#FF0099]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    {/* Eye outline */}
                    <path 
                        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                        className="transition-all duration-100"
                        style={{
                            transform: isBlinking ? "scaleY(0.1)" : "scaleY(1)",
                            transformOrigin: "center"
                        }}
                    />
                    {/* Pupil */}
                    <circle 
                        cx="12" 
                        cy="12" 
                        r="3"
                        fill="currentColor"
                        className="transition-all duration-100"
                        style={{
                            opacity: isBlinking ? 0 : 1
                        }}
                    />
                </svg>
                
                {/* Live pulse indicator */}
                <span 
                    className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF0099] rounded-full"
                    style={{
                        animation: "pulse 2s ease-in-out infinite"
                    }}
                />
            </div>

            {/* Viewer count */}
            <div className="flex items-center gap-2">
                <span 
                    className="font-brutalist text-xl tracking-wider"
                    style={{
                        transition: "transform 0.2s ease",
                        transform: isBlinking ? "scale(1.1)" : "scale(1)"
                    }}
                >
                    {viewers}
                </span>
                <span className="text-xs uppercase tracking-widest opacity-80 font-bold">
                    WATCHING NOW
                </span>
            </div>
        </div>
    );
}
