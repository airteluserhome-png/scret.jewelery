"use client";

import { useState, useEffect } from "react";
import LuxuryLoader from "./luxury-loader";
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

    // Site is now open - clean and fast
    return (
        <ToastProvider>
            {children}
        </ToastProvider>
    );
}
