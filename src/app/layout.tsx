import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Secretly - Luxury Goods",
    description: "Premium Accessories and Collectibles",
    icons: {
        icon: "/icon.svg",
        apple: "/apple-icon.svg", // Note: iOS prefers PNG, but this links the resource.
    },
};

import { CartProvider } from "@/context/cart-context";
import CartDrawer from "@/components/cart-drawer";
import LockOverlay from "@/components/lock-overlay";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover" />
                {/* Google Fonts - Anton + Space Grotesk */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
            </head>
            <body>
                <LockOverlay />
                <CartProvider>
                    <CartDrawer />
                    {children}
                </CartProvider>
            </body>
        </html>
    );
}
