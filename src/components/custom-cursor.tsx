"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        // Check if mobile/touch device
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches || 
                        "ontouchstart" in window ||
                        navigator.maxTouchPoints > 0);
        };
        
        checkMobile();
        window.addEventListener("resize", checkMobile);

        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const updateCursorType = () => {
            const hoveredElement = document.elementFromPoint(position.x, position.y);
            if (hoveredElement) {
                const computedStyle = window.getComputedStyle(hoveredElement);
                const isClickable = 
                    computedStyle.cursor === "pointer" ||
                    hoveredElement.tagName === "A" ||
                    hoveredElement.tagName === "BUTTON" ||
                    hoveredElement.closest("a") ||
                    hoveredElement.closest("button") ||
                    hoveredElement.getAttribute("role") === "button";
                setIsPointer(isClickable);
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);
        const handleMouseLeave = () => setIsHidden(true);
        const handleMouseEnter = () => setIsHidden(false);

        window.addEventListener("mousemove", updatePosition);
        window.addEventListener("mousemove", updateCursorType);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", updatePosition);
            window.removeEventListener("mousemove", updateCursorType);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
            window.removeEventListener("resize", checkMobile);
        };
    }, [position.x, position.y]);

    // Don't render on mobile or when hidden
    if (isMobile || isHidden) return null;

    return (
        <>
            {/* Hide default cursor */}
            <style jsx global>{`
                @media (min-width: 769px) {
                    * {
                        cursor: none !important;
                    }
                }
            `}</style>

            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference"
                animate={{
                    x: position.x - 6,
                    y: position.y - 6,
                    scale: isClicking ? 0.8 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                }}
            >
                <div 
                    className="w-3 h-3 bg-white"
                    style={{ 
                        transform: isPointer ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease"
                    }}
                />
            </motion.div>

            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[99998]"
                animate={{
                    x: position.x - 20,
                    y: position.y - 20,
                    scale: isPointer ? 1.5 : 1,
                    opacity: isPointer ? 0.5 : 0.3,
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1,
                }}
            >
                <div 
                    className="w-10 h-10 border-2 border-[#FF0099]"
                    style={{
                        transition: "border-color 0.2s ease",
                    }}
                />
            </motion.div>
        </>
    );
}
