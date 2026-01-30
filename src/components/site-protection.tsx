"use client";

import { useEffect, useState } from "react";

export default function SiteProtection() {
    const [isLocked, setIsLocked] = useState(false);

    useEffect(() => {
        // ===== ANTI-INSPECTION MEASURES =====
        
        // Disable right-click context menu
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };

        // Disable keyboard shortcuts for DevTools
        const handleKeyDown = (e: KeyboardEvent) => {
            // F12
            if (e.key === "F12") {
                e.preventDefault();
                return false;
            }
            // Ctrl+Shift+I (DevTools)
            if (e.ctrlKey && e.shiftKey && e.key === "I") {
                e.preventDefault();
                return false;
            }
            // Ctrl+Shift+J (Console)
            if (e.ctrlKey && e.shiftKey && e.key === "J") {
                e.preventDefault();
                return false;
            }
            // Ctrl+Shift+C (Inspect Element)
            if (e.ctrlKey && e.shiftKey && e.key === "C") {
                e.preventDefault();
                return false;
            }
            // Ctrl+U (View Source)
            if (e.ctrlKey && e.key === "u") {
                e.preventDefault();
                return false;
            }
            // Cmd+Option+I (Mac DevTools)
            if (e.metaKey && e.altKey && e.key === "i") {
                e.preventDefault();
                return false;
            }
            // Cmd+Option+J (Mac Console)
            if (e.metaKey && e.altKey && e.key === "j") {
                e.preventDefault();
                return false;
            }
            // Cmd+Option+U (Mac View Source)
            if (e.metaKey && e.altKey && e.key === "u") {
                e.preventDefault();
                return false;
            }
        };

        // Detect DevTools opening via debugger timing
        let devToolsOpen = false;
        const detectDevTools = () => {
            const threshold = 160;
            const start = performance.now();
            // debugger statement causes delay when DevTools is open
            // Using console.log timing instead (less intrusive)
            const element = new Image();
            Object.defineProperty(element, "id", {
                get: function () {
                    devToolsOpen = true;
                    handleDevToolsDetected();
                }
            });
            console.log("%c", element);
        };

        const handleDevToolsDetected = () => {
            if (!isLocked) {
                setIsLocked(true);
            }
        };

        // Check periodically for DevTools
        const devToolsInterval = setInterval(detectDevTools, 1000);

        // Detect window resize (DevTools docked detection)
        let windowWidth = window.outerWidth;
        let windowHeight = window.outerHeight;
        const handleResize = () => {
            const widthDiff = window.outerWidth - window.innerWidth;
            const heightDiff = window.outerHeight - window.innerHeight;
            // If significant difference, DevTools might be open
            if (widthDiff > 200 || heightDiff > 200) {
                handleDevToolsDetected();
            }
        };

        // Disable text selection
        const handleSelectStart = (e: Event) => {
            e.preventDefault();
            return false;
        };

        // Disable drag
        const handleDragStart = (e: DragEvent) => {
            e.preventDefault();
            return false;
        };

        // Add event listeners
        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("selectstart", handleSelectStart);
        document.addEventListener("dragstart", handleDragStart);
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("selectstart", handleSelectStart);
            document.removeEventListener("dragstart", handleDragStart);
            window.removeEventListener("resize", handleResize);
            clearInterval(devToolsInterval);
        };
    }, [isLocked]);

    // DevTools detected overlay
    if (isLocked) {
        return (
            <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center">
                <div className="text-center p-8">
                    <h1 
                        className="font-brutalist text-4xl md:text-6xl text-hot-pink mb-4"
                        style={{ textShadow: "3px 3px 0px #fff" }}
                    >
                        ACCESS DENIED
                    </h1>
                    <p className="text-white font-bold uppercase tracking-widest text-sm">
                        Unauthorized access detected
                    </p>
                    <p className="text-white/50 text-xs mt-4 uppercase tracking-wider">
                        This incident has been logged
                    </p>
                </div>
            </div>
        );
    }

    return null;
}
