"use client";

import { useState, useEffect } from "react";
import LuxuryLoader from "./luxury-loader";
import { Lenis as ReactLenis } from "@studio-freight/react-lenis";
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

    // Show loader on initial load
    useEffect(() => {
        const loaderTimer = setTimeout(() => {
            setShowLoader(false);
        }, 2000);

        return () => clearTimeout(loaderTimer);
    }, []);

    // Show loader first
    if (showLoader) {
        return <LuxuryLoader />;
    }

    // Site is now open - render content with premium features
    return (
        <ToastProvider>
            <ReactLenis root options={{ 
                lerp: 0.1, 
                duration: 1.4, 
                smoothWheel: true, 
                wheelMultiplier: 1.0,
                touchMultiplier: 2,
                infinite: false
            }}>
                <CustomCursor />
                {children}
                <BackToTop />
                <RecentlyViewed />
                <FloatingContact />
            </ReactLenis>
        </ToastProvider>
    );
}
