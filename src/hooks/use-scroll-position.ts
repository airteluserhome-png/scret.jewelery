"use client";

import { useState, useEffect, useCallback } from "react";
import { throttle } from "@/lib/utils";

interface ScrollPosition {
    x: number;
    y: number;
    direction: "up" | "down" | null;
    isAtTop: boolean;
    isAtBottom: boolean;
}

export function useScrollPosition(throttleMs = 100): ScrollPosition {
    const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
        x: 0,
        y: 0,
        direction: null,
        isAtTop: true,
        isAtBottom: false,
    });

    const handleScroll = useCallback(() => {
        const currentY = window.scrollY;
        const currentX = window.scrollX;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        
        setScrollPosition((prev) => ({
            x: currentX,
            y: currentY,
            direction: currentY > prev.y ? "down" : currentY < prev.y ? "up" : prev.direction,
            isAtTop: currentY <= 0,
            isAtBottom: currentY >= maxScroll - 10,
        }));
    }, []);

    useEffect(() => {
        const throttledHandler = throttle(handleScroll, throttleMs);
        
        window.addEventListener("scroll", throttledHandler, { passive: true });
        
        // Initial call
        handleScroll();
        
        return () => window.removeEventListener("scroll", throttledHandler);
    }, [handleScroll, throttleMs]);

    return scrollPosition;
}

// Hook to detect if user has scrolled past a threshold
export function useScrolledPast(threshold: number): boolean {
    const { y } = useScrollPosition();
    return y > threshold;
}

// Hook to detect scroll direction only
export function useScrollDirection(): "up" | "down" | null {
    const { direction } = useScrollPosition();
    return direction;
}
