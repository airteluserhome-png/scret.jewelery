"use client";

import LuxuryLoader from "@/components/luxury-loader";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            <LuxuryLoader />
            {children}
        </>
    );
}
