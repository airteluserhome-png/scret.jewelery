"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function PixelLoader() {
    const [hidden, setHidden] = useState(false);
    const [percent, setPercent] = useState(0);
    const router = useRouter();
    const pathname = usePathname();

    // 1. COUNT UP & CURTAIN UP (HIDE LOADER) LOGIC
    useEffect(() => {
        // Reset state when path changes (Curtain Up logic)
        setPercent(0);
        setHidden(false); // Make sure it's visible initially if we want a fresh load feel, 
        // BUT since we slide it UP (hidden), "false" means it's DOWN (visible).
        // Wait, if we navigated, we want it to start DOWN then slide UP.

        // Actually, if we just navigated, we want the loader to be visible (Active) then slide up.
        // The previous logic setHidden(true) slides it UP.

        const interval = setInterval(() => {
            setPercent(prev => {
                const next = prev + Math.floor(Math.random() * 8) + 2;
                if (next >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return next;
            });
        }, 30);

        // Hide loader after delay
        const timer = setTimeout(() => {
            setHidden(true); // Slide up (Hide)
        }, 800);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [pathname]);

    // 2. CURTAIN DOWN (SHOW LOADER) LOGIC
    useEffect(() => {
        // Intercept links to show loader before navigating
        const handleLinkClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');

            if (link) {
                const href = link.getAttribute('href');
                // Check if it's a valid internal link
                if (href && href.startsWith('/') && !href.startsWith('#') && !link.getAttribute('target')) {
                    // Prevent immediate navigation
                    e.preventDefault();

                    // Show loader (Curtain Down)
                    setHidden(false);

                    // Wait for curtain to fall, then push route
                    setTimeout(() => {
                        router.push(href);
                    }, 600);
                }
            }
        };

        document.addEventListener('click', handleLinkClick);
        return () => document.removeEventListener('click', handleLinkClick);
    }, [router]);

    return (
        <div
            id="brutalist-loader"
            className={hidden ? "loader-hidden" : "loader-active"}
        >
            <div className="loader-content text-center">

                <div className="pixel-eater-wrapper mx-auto">
                    <div className="pixel-jaw jaw-top"></div>
                    <div className="pixel-jaw jaw-bottom"></div>

                    <div className="pixel-food"></div>
                    <div className="pixel-food"></div>
                    <div className="pixel-food"></div>
                    <div className="pixel-food"></div>
                </div>

                <div className="loader-text flex justify-center items-center">
                    SYSTEM LOADING <span id="load-percent" className="ml-2 w-[3ch] text-left">{percent}</span>%
                </div>
            </div>
        </div>
    );
}
