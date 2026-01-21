import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Secretly - Luxury Goods",
    description: "Premium Accessories and Collectibles",
};

import { CartProvider } from "@/context/cart-context";
import CartDrawer from "@/components/cart-drawer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Google Fonts - Anton + Space Grotesk */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
            </head>
            <body>
                <CartProvider>
                    <CartDrawer />
                    {children}
                </CartProvider>
            </body>
        </html>
    );
}
