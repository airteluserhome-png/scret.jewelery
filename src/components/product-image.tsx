import Image from "next/image";
import { ComponentProps } from "react";

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
    return (
        <div className="product-image-wrap">
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`product-image ${className}`}
                style={{ backgroundColor: 'transparent' }}
                priority={priority}
                sizes={sizes}
                placeholder="empty"
            />
        </div>
    );
}
