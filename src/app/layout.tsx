import type { Metadata } from "next";
import "./globals.css";
import PasscodeLock from "@/components/passcode-lock";

export const metadata: Metadata = {
    title: "Secretly - Luxury Timepieces",
    description: "5A Swiss Movement Watches with Box and Papers",
};

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
                <PasscodeLock>
                    {children}
                </PasscodeLock>
            </body>
        </html>
    );
}
