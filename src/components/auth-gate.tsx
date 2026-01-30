"use client";

import { useState, useEffect, useRef } from "react";
import LuxuryLoader from "./luxury-loader";
import Lenis from "lenis";
import BackToTop from "./back-to-top";
import CustomCursor from "./custom-cursor";
import RecentlyViewed from "./recently-viewed";
import FloatingContact from "./floating-contact";
import { ToastProvider } from "./toast-notification";

interface AuthGateProps {
    children: React.ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
    const [showLoader, setShowLoader] = useState(true);
    const lenisRef = useRef<Lenis | null>(null);

    // Show loader on initial load
    useEffect(() => {
        const loaderTimer = setTimeout(() => {
            setShowLoader(false);
        }, 2000);

        return () => clearTimeout(loaderTimer);
    }, []);

    // Initialize Lenis smooth scrolling
    useEffect(() => {
        if (showLoader) return;

        const lenis = new Lenis({
            lerp: 0.1,
            duration: 1.4,
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, [showLoader]);

    // Show loader first
    if (showLoader) {
        return <LuxuryLoader />;
    }

    // Site is now open - render content with premium features
    return (
        <ToastProvider>
            <CustomCursor />
            {children}
            <BackToTop />
            <RecentlyViewed />
            <FloatingContact />
        </ToastProvider>
    );
}
