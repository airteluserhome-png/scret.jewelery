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
// Maps product IDs to Stripe price configuration
export const PRODUCT_PRICES: Record<number, { name: string; price: number; description: string }> = {
    // PLAIN WATCHES
    1: { name: "ROLEX DAYDATE OLIVE", price: 45000, description: "5A Swiss movement Rolex with box and papers" },
    2: { name: "AP SKELETON", price: 55000, description: "5A Swiss movement AP Skeleton with box and papers" },
    3: { name: "AP ROSE GOLD", price: 55000, description: "5A Swiss movement AP Rose Gold with box and papers" },
    4: { name: "AP WHITE GOLD", price: 55000, description: "5A Swiss movement AP White Gold with box and papers" },
    5: { name: "WHITE RICHARD MILLE BUBBA WATSON", price: 65000, description: "5A Swiss movement Richard Mille with box and papers" },
    6: { name: "CARTIER SANTOS WHITE GOLD", price: 45000, description: "5A Swiss movement Cartier Santos with box and papers" },
    
    // ICED OUT WATCHES
    7: { name: "AP ICED OUT ROSE GOLD", price: 75000, description: "5A Swiss movement AP Iced Out with box and papers" },
    8: { name: "AP ICED OUT", price: 75000, description: "5A Swiss movement AP Iced Out with box and papers" },
    9: { name: "ICED OUT CARTIER SANTOS ROSE GOLD", price: 70000, description: "5A Swiss movement Iced Cartier Santos with box and papers" },
    10: { name: "ICED OUT CARTIER SANTOS WHITE GOLD", price: 70000, description: "5A Swiss movement Iced Cartier Santos with box and papers" },
    17: { name: "ROLEX DAYDATE ICED OUT ROSE GOLD", price: 65000, description: "5A Swiss movement Rolex Iced Out Rose Gold" },
    18: { name: "ROLEX DAYDATE ICED OUT WHITE GOLD", price: 65000, description: "5A Swiss movement Rolex Iced Out White Gold" },
    
    // ACCESSORIES
    11: { name: "VVS CROSS BRACELET ROSE GOLD", price: 35000, description: "VVS quality cross bracelet in rose gold" },
    12: { name: "VVS CROSS BRACELET WHITE GOLD", price: 35000, description: "VVS quality cross bracelet in white gold" },
    13: { name: "VAN CLEEF BLUE DIAMONDS", price: 20000, description: "Van Cleef bracelet with blue diamonds" },
    14: { name: "VAN CLEEF PINK DIAMONDS", price: 20000, description: "Van Cleef bracelet with pink diamonds" },
    15: { name: "VVS CARTIER GLASSES (TAN)", price: 65000, description: "VVS quality Cartier glasses in tan" },
    16: { name: "VVS CARTIER GLASSES (BLACK)", price: 65000, description: "VVS quality Cartier glasses in black" },
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
