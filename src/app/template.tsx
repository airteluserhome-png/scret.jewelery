"use client";

import { useEffect, useState } from "react";
import LuxuryLoader from "@/components/luxury-loader";

export default function Template({ children }: { children: React.ReactNode }) {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        // Show loader for exactly 0.8 seconds on every page navigation
        setShowLoader(true);
        
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [children]); // Re-run when page changes

    return (
        <>
            {showLoader && <LuxuryLoader />}
            <div className={`transition-opacity duration-300 ${showLoader ? 'opacity-0' : 'opacity-100'}`}>
                {children}
            </div>
        </>
    );
}
