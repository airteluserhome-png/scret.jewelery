"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    variant?: "up" | "left" | "right" | "scale" | "stagger";
    delay?: number;
    threshold?: number;
}

export default function ScrollReveal({ 
    children, 
    className = "", 
    variant = "up",
    delay = 0,
    threshold = 0.12 
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            element.classList.add("is-visible");
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Add delay if specified
                        if (delay > 0) {
                            setTimeout(() => {
                                entry.target.classList.add("is-visible");
                            }, delay);
                        } else {
                            entry.target.classList.add("is-visible");
                        }
                        // Unobserve after revealing (only animate once)
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold, rootMargin: "0px 0px -50px 0px" }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [delay, threshold]);

    const variantClass = {
        up: "reveal",
        left: "reveal-left",
        right: "reveal-right",
        scale: "reveal-scale",
        stagger: "reveal-stagger",
    }[variant];

    return (
        <div ref={ref} className={`${variantClass} ${className}`}>
            {children}
        </div>
    );
}

// Hook for manual scroll reveal
export function useScrollReveal(threshold = 0.12) {
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        
        const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger");
        
        if (prefersReducedMotion) {
            elements.forEach(el => el.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold, rootMargin: "0px 0px -50px 0px" }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [threshold]);
}
