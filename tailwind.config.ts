import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Pink Theme Palette
                'luxury-white': '#FFF5F7',        // Soft pink white
                'soft-pink': '#FFE4E9',           // Light pink
                'rose-pink': '#FFB6C8',           // Medium pink
                'rose-gold': '#E88BA8',           // Rose gold pink
                'deep-pink': '#D4527A',           // Deep pink
                'dark-pink': '#A83E5E',           // Dark pink
                'pink-black': '#4A1F2E',          // Almost black pink
            },
            fontFamily: {
                serif: ['var(--font-playfair)', 'serif'],
                sans: ['var(--font-inter)', 'sans-serif'],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "pink-gradient": "linear-gradient(135deg, #FFE4E9 0%, #FFB6C8 100%)",
            },
        },
    },
    plugins: [],
};
export default config;
