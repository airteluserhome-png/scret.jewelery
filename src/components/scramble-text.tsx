"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface ScrambleTextProps {
    text: string;
    className?: string;
    revealSpeed?: number; // Speed of revealing characters (higher is slower)
    scrambleSpeed?: number; // Speed of shuffling characters (higher is slower)
    delay?: number;
    as?: React.ElementType; // Allow rendering as h1, h2, span, etc.
}

const CHARACTERS = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789_#@!/[]";

export default function ScrambleText({
    text,
    className = "",
    revealSpeed = 150, // Increased default for slower reveal
    scrambleSpeed = 50, // Increased default for slower scramble
    delay = 0,
    as: Component = "span",
}: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(true);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    // Split text into an array for easier manipulation
    const targetText = text.split("");
    const length = targetText.length;

    useEffect(() => {
        if (!isInView) return;

        let frame = 0;
        let revealIndex = 0;
        let timeoutId: NodeJS.Timeout;

        // Initial delay before starting
        const startTimeout = setTimeout(() => {
            const intervalId = setInterval(() => {
                let scopedDisplayText = "";

                // Logic:
                // 1. Characters before 'revealIndex' are fixed (the real text)
                // 2. Characters at and after 'revealIndex' are random
                // 3. Increment 'revealIndex' every N frames to slowly reveal the text

                for (let i = 0; i < length; i++) {
                    if (i < revealIndex) {
                        scopedDisplayText += targetText[i];
                    } else if (targetText[i] === " ") {
                        scopedDisplayText += " "; // Maintain spaces
                    } else {
                        // Random character
                        scopedDisplayText += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
                    }
                }

                setDisplayText(scopedDisplayText);

                // Speed of revealing: Every Nth frame, reveal another letter
                if (frame % Math.max(1, Math.floor(revealSpeed / scrambleSpeed)) === 0) {
                    if (revealIndex < length) {
                        revealIndex++;
                    } else {
                        clearInterval(intervalId);
                        setIsScrambling(false);
                    }
                }

                frame++;
            }, scrambleSpeed);

            return () => clearInterval(intervalId);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [isInView, text, revealSpeed, scrambleSpeed, delay, length]);

    return (
        <Component
            ref={ref}
            className={className}
        >
            {displayText}
        </Component>
    );
}
