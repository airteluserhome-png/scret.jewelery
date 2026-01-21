"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
    fallback?: string;
    className?: string;
}

export default function BackButton({ fallback = "/shop", className = "" }: BackButtonProps) {
    const router = useRouter();

    const goBack = () => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
            router.back();
        } else {
            router.push(fallback);
        }
    };

    return (
        <button
            onClick={goBack}
            className={`back-btn ${className}`}
        >
            ← BACK
        </button>
    );
}
