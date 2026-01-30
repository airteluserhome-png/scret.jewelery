/** @type {import('next').NextConfig} */
const nextConfig = {
    // Image Optimization
    images: {
        domains: ['images.unsplash.com'],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    
    // Compression
    compress: true,
    
    // Remove X-Powered-By header
    poweredByHeader: false,
    
    // React Strict Mode for better debugging
    reactStrictMode: true,
    
    // SWC minification (faster than Terser)
    swcMinify: true,
};

export default nextConfig;
