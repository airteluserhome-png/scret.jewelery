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
                'hot-pink': '#FF0099',
                'neon-pink': '#FF0099',
                'dark': '#111',
                'off-white': '#ffffff',
            },
            fontFamily: {
                sans: ['"Space Grotesk"', '"Inter"', 'sans-serif'], // Wider, more readable
                brutalist: ['"Anton"', 'sans-serif'],
            },
            boxShadow: {
                'brutalist': '8px 8px 0px #111',
                'brutalist-hover': '15px 15px 0px #FF0099',
            },
        },
    },
    plugins: [],
};
export default config;
