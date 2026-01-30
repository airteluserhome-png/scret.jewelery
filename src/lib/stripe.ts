import Stripe from "stripe";

// Server-side Stripe instance (lazy initialization to avoid build errors)
let stripeInstance: Stripe | null = null;

export function getStripeServer(): Stripe {
    if (!stripeInstance) {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error("STRIPE_SECRET_KEY is not set");
        }
        stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2026-01-28.clover",
            typescript: true,
        });
    }
    return stripeInstance;
}

// Legacy export for backwards compatibility
export const stripe = {
    get checkout() {
        return getStripeServer().checkout;
    },
};

// Product configuration for Stripe
// Maps product IDs to Stripe price configuration with images
export const PRODUCT_PRICES: Record<number, { name: string; price: number; description: string; image: string }> = {
    // PLAIN WATCHES
    1: { name: "ROLLY DAYDATE OLIVE", price: 45000, description: "Swiss Movement • Box & Papers Included • 5A+ Quality", image: "/ROLEX/Rolex Daydate Olive.jpg" },
    2: { name: "AP SKELETON", price: 55000, description: "Swiss Movement • Box & Papers Included • 5A+ Quality", image: "/AP/AP Skeleton.jpg" },
    3: { name: "AP ROSE GOLD", price: 55000, description: "Swiss Movement • Box & Papers Included • 5A+ Quality", image: "/AP/AP rose gold.jpg" },
    4: { name: "AP WHITE GOLD", price: 55000, description: "Swiss Movement • Box & Papers Included • 5A+ Quality", image: "/AP/AP white gold.jpg" },
    5: { name: "WHITE RM BUBBA WATSON", price: 65000, description: "Swiss Movement • Box & Papers Included • 5A+ Quality", image: "/RM/White Richard Mille Bubba Watson.jpg" },
    6: { name: "CARTI SANTOS WHITE GOLD", price: 45000, description: "Swiss Movement • Box & Papers Included • 5A+ Quality", image: "/Cartier/Cartier Santos White Gold.jpg" },
    19: { name: "PATEK NAUTILUS X TIFFANY", price: 75000, description: "Swiss Movement • Box & Papers Included • 5A+ Quality", image: "/PATEK/Patek Philippe Nautilus x Tiffany And Co.jpg" },
    20: { name: "PATEK ROSE GOLD", price: 75000, description: "Swiss Movement • Box & Papers Included • 5A+ Quality", image: "/PATEK/Patek Philippe Rose Gold.jpg" },
    
    // ICED OUT WATCHES
    7: { name: "AP ICED OUT ROSE GOLD", price: 75000, description: "Swiss Movement • VVS Diamonds • Box & Papers Included • 5A+ Quality", image: "/ICED OUT AP/AP iced out rose gold.jpg" },
    8: { name: "AP ICED OUT", price: 75000, description: "Swiss Movement • VVS Diamonds • Box & Papers Included • 5A+ Quality", image: "/ICED OUT AP/AP iced out.jpg" },
    9: { name: "ICED OUT CARTI SANTOS ROSE GOLD", price: 70000, description: "Swiss Movement • VVS Diamonds • Box & Papers Included • 5A+ Quality", image: "/ICED OUT CARTIER/Iced out Cartier Santos rose good.jpg" },
    10: { name: "ICED OUT CARTI SANTOS WHITE GOLD", price: 70000, description: "Swiss Movement • VVS Diamonds • Box & Papers Included • 5A+ Quality", image: "/ICED OUT CARTIER/Iced out Cartier Santos white gold.jpg" },
    17: { name: "ROLLY DAYDATE ICED OUT ROSE GOLD", price: 65000, description: "Swiss Movement • VVS Diamonds • Box & Papers Included • 5A+ Quality", image: "/ICED OUT ROLEX/Iced out Rolex Day date rose gold.jpg" },
    18: { name: "ROLLY DAYDATE ICED OUT WHITE GOLD", price: 65000, description: "Swiss Movement • VVS Diamonds • Box & Papers Included • 5A+ Quality", image: "/ICED OUT ROLEX/Iced out Rolex Day date white gold.jpg" },
    21: { name: "PATEK ICED OUT ROSE GOLD", price: 85000, description: "Swiss Movement • VVS Diamonds • Box & Papers Included • 5A+ Quality", image: "/ICET OUT Patek philipe/Iced out Patek Phillipe Nautilus ROSE GOLD.jpg" },
    22: { name: "PATEK ICED OUT NAUTILUS", price: 85000, description: "Swiss Movement • VVS Diamonds • Box & Papers Included • 5A+ Quality", image: "/ICET OUT Patek philipe/Patek Phillipe Iced out Nautilus.jpg" },
    
    // ACCESSORIES
    11: { name: "VVS CROSS BRACELET ROSE GOLD", price: 35000, description: "VVS Quality Diamonds • Premium Rose Gold Plating", image: "/VVS Cross Bracelet rose gold/cross-bracelet-rose-gold.jpg" },
    12: { name: "VVS CROSS BRACELET WHITE GOLD", price: 35000, description: "VVS Quality Diamonds • Premium White Gold Plating", image: "/VVS Cross Bracelet white gold/cross-bracelet-white-gold.jpg" },
    13: { name: "6 CLOVER ICED BRACELET (BLUE)", price: 20000, description: "VVS Blue Diamonds • Premium Craftsmanship", image: "/VVS FLOWER BRACALET BLUE DIAMONDS/van-cleef-blue.jpg" },
    14: { name: "6 CLOVER ICED BRACELET (PINK)", price: 20000, description: "VVS Pink Diamonds • Premium Craftsmanship", image: "/VVS FLOWER BRACALET PINK DIAMONDS/van-cleef-pink.jpg" },
    15: { name: "VVS CARTI GLASSES (TAN)", price: 65000, description: "VVS Quality • Authentic Carti Style • Luxury Eyewear", image: "/VVS CARTIER GLASSES (TAN)/glasses-tan-1.jpg" },
    16: { name: "VVS CARTI GLASSES (BLACK)", price: 65000, description: "VVS Quality • Authentic Carti Style • Luxury Eyewear", image: "/VVS CARTIER GLASSES (BLACK)/glasses-black-1.jpg" },
};

// Get product price in cents for Stripe
export function getProductPriceInCents(productId: number): number | null {
    const product = PRODUCT_PRICES[productId];
    return product ? product.price : null;
}

// Format cents to display price
export function formatPriceFromCents(cents: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    }).format(cents / 100);
}
