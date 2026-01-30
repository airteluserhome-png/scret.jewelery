"use client";

import { ToastProvider } from "./toast-notification";
import BackToTop from "./back-to-top";
import FloatingContact from "./floating-contact";

interface AuthGateProps {
    children: React.ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
    // No loader here - handled by template.tsx for all page transitions
    return (
        <ToastProvider>
            {children}
            <BackToTop />
            <FloatingContact />
        </ToastProvider>
    );
}
