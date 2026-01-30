"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LuxuryLoader from "@/components/luxury-loader";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        // Show loader for exactly 0.8 seconds on every route change
        setShowLoader(true);
        
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [pathname]); // Only re-run when route actually changes

    return (
        <>
            {showLoader && <LuxuryLoader />}
            <div className={`transition-opacity duration-300 ${showLoader ? 'opacity-0' : 'opacity-100'}`}>
                {children}
            </div>
        </>
    );
}
