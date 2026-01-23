"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Toast {
    id: string;
    message: string;
    type: "success" | "error" | "info";
    duration?: number;
}

interface ToastContextType {
    showToast: (message: string, type?: Toast["type"], duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: Toast["type"] = "success", duration = 3000) => {
        const id = Math.random().toString(36).substring(7);
        const newToast: Toast = { id, message, type, duration };

        setToasts((prev) => [...prev, newToast]);

        // Auto-remove toast after duration
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 100, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 100, scale: 0.9 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="pointer-events-auto"
                        >
                            <div
                                onClick={() => removeToast(toast.id)}
                                className={`
                                    flex items-center gap-3 px-5 py-4 bg-white cursor-pointer
                                    font-bold text-sm uppercase tracking-wider
                                    ${toast.type === "success" ? "text-black" : ""}
                                    ${toast.type === "error" ? "text-red-500" : ""}
                                    ${toast.type === "info" ? "text-black" : ""}
                                `}
                                style={{
                                    border: "3px solid #000",
                                    boxShadow: toast.type === "success" 
                                        ? "4px 4px 0px #FF0099" 
                                        : toast.type === "error"
                                        ? "4px 4px 0px #ef4444"
                                        : "4px 4px 0px #000",
                                    minWidth: "280px",
                                }}
                            >
                                {/* Icon */}
                                {toast.type === "success" && (
                                    <div className="w-6 h-6 bg-[#FF0099] flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                                {toast.type === "error" && (
                                    <div className="w-6 h-6 bg-red-500 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                )}
                                {toast.type === "info" && (
                                    <div className="w-6 h-6 bg-black flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                )}

                                <span>{toast.message}</span>

                                {/* Close hint */}
                                <svg className="w-4 h-4 ml-auto opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}
