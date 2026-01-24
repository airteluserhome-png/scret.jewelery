import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { CartProvider } from "@/context/cart-context";
import CartDrawer from "@/components/cart-drawer";
import AuthGate from "@/components/auth-gate";

// Enhanced SEO Metadata
export const metadata: Metadata = {
    title: {
        default: "Secretly - Luxury Goods",
        template: "%s | Secretly",
    },
    description: "Premium luxury watches, jewelry, and accessories. Exclusive collections from Rolex, Audemars Piguet, Patek Philippe, Cartier, and Richard Mille.",
    keywords: ["luxury watches", "designer jewelry", "Rolex", "Audemars Piguet", "Patek Philippe", "Cartier", "Richard Mille", "VVS diamonds", "premium accessories"],
    authors: [{ name: "Secretly" }],
    creator: "Secretly",
    publisher: "Secretly",
    icons: {
        icon: "/icon.svg",
        apple: "/apple-icon.svg",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://secretly.jewelry",
        siteName: "Secretly",
        title: "Secretly - Luxury Goods",
        description: "Premium luxury watches, jewelry, and accessories. Exclusive collections.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Secretly - Luxury Goods",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Secretly - Luxury Goods",
        description: "Premium luxury watches, jewelry, and accessories.",
        images: ["/og-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        // Add your verification codes here when ready
        // google: "your-google-verification-code",
    },
};

// Viewport configuration (separated from metadata in Next.js 14)
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#000000" },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Preconnect to external resources for faster loading */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link 
                    href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@500;700&display=swap" 
                    rel="stylesheet" 
                />
                {/* DNS Prefetch for performance */}
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
            </head>
            <body className="antialiased">
                <AuthGate>
                    <CartProvider>
                        <CartDrawer />
                        {children}
                    </CartProvider>
                </AuthGate>
                
                {/* Vercel Analytics & Speed Insights */}
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
