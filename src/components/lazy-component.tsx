"use client";

import { Suspense, lazy, ComponentType } from "react";
import { motion } from "framer-motion";

interface LazyComponentProps {
    loader: () => Promise<{ default: ComponentType<unknown> }>;
    fallback?: React.ReactNode;
}

// Default loading skeleton
function DefaultSkeleton() {
    return (
        <motion.div
            className="w-full h-48 bg-gray-100 animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ border: "2px solid #eee" }}
        >
            <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
            </div>
        </motion.div>
    );
}

// Lazy load wrapper for heavy components
export function LazyLoad({ loader, fallback }: LazyComponentProps) {
    const Component = lazy(loader);
    
    return (
        <Suspense fallback={fallback || <DefaultSkeleton />}>
            <Component />
        </Suspense>
    );
}

// Image skeleton for product images
export function ImageSkeleton({ className = "" }: { className?: string }) {
    return (
        <div 
            className={`bg-gray-100 animate-pulse ${className}`}
            style={{ aspectRatio: "1/1" }}
        >
            <div className="flex items-center justify-center h-full">
                <svg 
                    className="w-12 h-12 text-gray-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1} 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                </svg>
            </div>
        </div>
    );
}

// Card skeleton for product cards
export function CardSkeleton() {
    return (
        <div 
            className="bg-white p-4 animate-pulse"
            style={{ border: "3px solid #eee", boxShadow: "4px 4px 0px #f5f5f5" }}
        >
            <ImageSkeleton className="mb-4" />
            <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-8 bg-gray-200 rounded w-full mt-4" />
            </div>
        </div>
    );
}

// Grid skeleton for product grids
export function GridSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <CardSkeleton key={i} />
            ))}
        </div>
    );
}
