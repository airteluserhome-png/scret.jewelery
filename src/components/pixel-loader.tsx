"use client";

import { useEffect, useState } from "react";

export default function PixelLoader() {
    const [percent, setPercent] = useState(0);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        // 1. FAKE COUNT UP ANIMATION
        const interval = setInterval(() => {
            setPercent(prev => {
                const next = prev + Math.floor(Math.random() * 5) + 1;
                if (next >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return next;
            });
        }, 50); // Speed of counter

        // 2. HIDE LOADER WHEN PAGE IS READY
        // In Next.js/React, we can just use a timeout here to simulate "load" 
        // effectively for the preloader since pure "window load" might fire too early 
        // depending on how this is mounted.
        const handleLoad = () => {
            setTimeout(() => {
                setHidden(true);
            }, 1000); /* Keeps it visible for at least 1 second so users see the animation */
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => {
            clearInterval(interval);
            window.removeEventListener("load", handleLoad);
        };
    }, []);

    return (
        <div id="brutalist-loader" className={hidden ? "loader-hidden" : ""}>
            <div className="loader-content text-center">

                <div className="pixel-eater-wrapper mx-auto">
                    <div className="pixel-jaw jaw-top"></div>
                    <div className="pixel-jaw jaw-bottom"></div>

                    <div className="pixel-food"></div>
                    <div className="pixel-food"></div>
                    <div className="pixel-food"></div>
                </div>

                <div className="loader-text">
                    SYSTEM LOADING <span id="load-percent">{percent}</span>%
                </div>
            </div>
        </div>
    );
}
