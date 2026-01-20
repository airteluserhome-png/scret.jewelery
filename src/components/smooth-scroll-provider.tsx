"use client";

import { ReactNode, useEffect } from "react";

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        // Smooth scroll implementation using native CSS
        document.documentElement.style.scrollBehavior = "smooth";

        return () => {
            document.documentElement.style.scrollBehavior = "auto";
        };
    }, []);

    return <>{children}</>;
}
