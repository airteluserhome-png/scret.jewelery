"use client";

import { useState, useEffect } from "react";
import LuxuryLoader from "./luxury-loader";
import { ToastProvider } from "./toast-notification";
import BackToTop from "./back-to-top";
import FloatingContact from "./floating-contact";

interface AuthGateProps {
    children: React.ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
    const [showLoader, setShowLoader] = useState(true);

    // Show loader on initial load
    useEffect(() => {
        const loaderTimer = setTimeout(() => {
            setShowLoader(false);
        }, 800);

        return () => clearTimeout(loaderTimer);
    }, []);

    // Show loader first
    if (showLoader) {
        return <LuxuryLoader />;
    }

    // Site is now open - with all features
    return (
        <ToastProvider>
            {children}
            <BackToTop />
            <FloatingContact />
        </ToastProvider>
    );
}
