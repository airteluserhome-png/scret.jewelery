"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
    sizes?: string;
}

/**
 * Unified product image component
 * Ensures transparent backgrounds across all pages
 * Uses mix-blend-multiply to hide white JPG backgrounds
 * Includes fallback for missing images
 */
export default function ProductImage({
    src,
    alt,
    width = 800,
    height = 800,
    className = "",
    priority = false,
    sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
}: ProductImageProps) {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        if (!hasError) {
            setHasError(true);
            // Use a placeholder or the icon as fallback
            setImgSrc("/icon.svg");
        }
    };

    return (
        <div className="product-image-wrap relative">
            <Image
                src={imgSrc}
                alt={alt}
                width={width}
                height={height}
                className={`product-image ${className} ${hasError ? "opacity-50" : ""}`}
                style={{ backgroundColor: 'transparent' }}
                priority={priority}
                sizes={sizes}
                placeholder="empty"
                onError={handleError}
            />
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-brutalist text-xs uppercase tracking-widest text-black/40">
                        Image Loading...
                    </span>
                </div>
            )}
        </div>
    );
}
