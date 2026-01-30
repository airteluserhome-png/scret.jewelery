export interface Product {
    id: number;
    name: string;
    category: "plain-watches" | "iced-watches" | "accessories";
    brand: string;
    price: string;
    priceNum: number;
    image: string;
    images?: string[]; // Multiple angles
    badge?: string;
    description: string;
    specs: {
        movement: string;
        quality: string;
        includes: string;
    };
}

export const products: Product[] = [
    // PLAIN WATCHES
    {
        id: 1,
        name: "ROLEX DAYDATE OLIVE",
        category: "plain-watches",
        brand: "Rolex",
        price: "$0",
        priceNum: 0,
        image: "/ROLEX/Rolex Daydate Olive.jpg",
        badge: "FREE",
        description: "5A Swiss movement Rolex with box and papers",
        specs: { movement: "5A Swiss Movement", quality: "AAA+ Quality", includes: "Box & Papers" }
    },

    {
        id: 2,
        name: "AP SKELETON",
        category: "plain-watches",
        brand: "Audemars Piguet",
        price: "$550",
        priceNum: 550,
        image: "/AP/AP Skeleton.jpg",
        badge: "5A SWISS",
        description: "5A Swiss movement AP Skeleton with box and papers",
        specs: { movement: "5A Swiss Movement", quality: "AAA+ Quality", includes: "Box & Papers" }
    },
    {
        id: 3,
        name: "AP ROSE GOLD",
        category: "plain-watches",
        brand: "Audemars Piguet",
        price: "$550",
        priceNum: 550,
        image: "/AP/AP rose gold.jpg",
        badge: "5A SWISS",
        description: "5A Swiss movement AP Rose Gold with box and papers",
        specs: { movement: "5A Swiss Movement", quality: "AAA+ Quality", includes: "Box & Papers" }
    },
    {
        id: 4,
        name: "AP WHITE GOLD",
        category: "plain-watches",
        brand: "Audemars Piguet",
        price: "$550",
        priceNum: 550,
        image: "/AP/AP white gold.jpg",
        badge: "5A SWISS",
        description: "5A Swiss movement AP White Gold with box and papers",
        specs: { movement: "5A Swiss Movement", quality: "AAA+ Quality", includes: "Box & Papers" }
    },
    {
        id: 5,
        name: "WHITE RICHARD MILLE BUBBA WATSON",
        category: "plain-watches",
        brand: "Richard Mille",
        price: "$650",
        priceNum: 650,
        image: "/RM/White Richard Mille Bubba Watson.jpg",
        badge: "5A SWISS",
        description: "5A Swiss movement Richard Mille with box and papers",
        specs: { movement: "5A Swiss Movement", quality: "AAA+ Quality", includes: "Box & Papers" }
    },
    {
        id: 6,
        name: "CARTIER SANTOS WHITE GOLD",
        category: "plain-watches",
        brand: "Cartier",
        price: "$450",
        priceNum: 450,
        image: "/Cartier/Cartier Santos White Gold.jpg",
        badge: "5A SWISS", description: "5A Swiss movement Cartier Santos with box and papers",
        specs: { movement: "5A Swiss Movement", quality: "AAA+ Quality", includes: "Box & Papers" }
    },

    // ICED OUT WATCHES
    {
        id: 7,
        name: "AP ICED OUT ROSE GOLD",
        category: "iced-watches",
        brand: "Audemars Piguet",
        price: "$750",
        priceNum: 750,
        image: "/ICED OUT AP/AP iced out rose gold.jpg",
        badge: "ICED OUT",
        description: "5A Swiss movement AP Iced Out with box and papers",
        specs: { movement: "5A Swiss Movement", quality: "AAA+ Quality", includes: "Box & Papers" }
    },
    {
        id: 8,
        name: "AP ICED OUT",
        category: "iced-watches",
        brand: "Audemars Piguet",
        price: "$750",
        priceNum: 750,
        image: "/ICED OUT AP/AP iced out.jpg",
        badge: "ICED OUT",
        description: "5A Swiss movement AP Iced Out with box and papers",
        specs: { movement: "5A Swiss Movement", quality: "AAA+ Quality", includes: "Box & Papers" }
    },
    {
        id: 9,
        name: "ICED OUT CARTIER SANTOS ROSE GOLD",
        category: "iced-watches",
        brand: "Cartier",
        price: "$700",
        priceNum: 700,
        image: "/ICED OUT CARTIER/Iced out Cartier Santos rose good.jpg",
        badge: "ICED OUT",
        description: "5A Swiss movement Iced Cartier Santos with box and papers",
        specs: { movement: "5A Swiss Movement", quality: "AAA+ Quality", includes: "Box & Papers" }
    },
    {
        id: 10,
        name: "ICED OUT CARTIER SANTOS WHITE GOLD",
        category: "iced-watches",
        brand: "Cartier",
        price: "$700",
        priceNum: 700,
        image: "/ICED OUT CARTIER/Iced out Cartier Santos white gold.jpg",
        badge: "ICED OUT",
        description: "5A Swiss movement Iced Cartier Santos with box and papers",
        specs: { movement: "5A Swiss Movement", quality: "AAA+ Quality", includes: "Box & Papers" }
    },
    {
        id: 17,
        name: "ROLEX DAYDATE ICED OUT ROSE GOLD",
        category: "iced-watches",
        brand: "Rolex",
        price: "$650", // Estimated price
        priceNum: 650,
        image: "/ICED OUT ROLEX/Iced out Rolex Day date rose gold.jpg",
        badge: "ICED OUT",
        description: "5A Swiss movement Rolex Iced Out Rose Gold",
        specs: { movement: "5A Swiss Movement", quality: "AAA+ Quality", includes: "Box & Papers" }
    },
    {
        id: 18,
        name: "ROLEX DAYDATE ICED OUT WHITE GOLD",
        category: "iced-watches",
        brand: "Rolex",
        price: "$650", // Estimated price
        priceNum: 650,
        image: "/ICED OUT ROLEX/Iced out Rolex Day date white gold.jpg",
        badge: "ICED OUT",
        description: "5A Swiss movement Rolex Iced Out White Gold",
        specs: { movement: "5A Swiss Movement", quality: "AAA+ Quality", includes: "Box & Papers" }
    },

    // ACCESSORIES
    {
        id: 11,
        name: "VVS CROSS BRACELET ROSE GOLD",
        category: "accessories",
        brand: "VVS",
        price: "$350",
        priceNum: 350,
        image: "/VVS Cross Bracelet rose gold/cross-bracelet-rose-gold.jpg",
        badge: "VVS QUALITY",
        description: "VVS quality cross bracelet in rose gold",
        specs: { movement: "N/A", quality: "VVS Quality", includes: "Premium Packaging" }
    },
    {
        id: 12,
        name: "VVS CROSS BRACELET WHITE GOLD",
        category: "accessories",
        brand: "VVS",
        price: "$350",
        priceNum: 350,
        image: "/VVS Cross Bracelet white gold/cross-bracelet-white-gold.jpg",
        badge: "VVS QUALITY",
        description: "VVS quality cross bracelet in white gold",
        specs: { movement: "N/A", quality: "VVS Quality", includes: "Premium Packaging" }
    },
    {
        id: 13,
        name: "VAN CLEEF BLUE DIAMONDS",
        category: "accessories",
        brand: "Van Cleef",
        price: "$200",
        priceNum: 200,
        image: "/VVS FLOWER BRACALET BLUE DIAMONDS/van-cleef-blue.jpg",
        badge: "VVS",
        description: "Van Cleef bracelet with blue diamonds",
        specs: { movement: "N/A", quality: "VVS Diamonds", includes: "Premium Packaging" }
    },
    {
        id: 14,
        name: "VAN CLEEF PINK DIAMONDS",
        category: "accessories",
        brand: "Van Cleef",
        price: "$200",
        priceNum: 200,
        image: "/VVS FLOWER BRACALET PINK DIAMONDS/van-cleef-pink.jpg",
        badge: "VVS",
        description: "Van Cleef bracelet with pink diamonds",
        specs: { movement: "N/A", quality: "VVS Diamonds", includes: "Premium Packaging" }
    },
    {
        id: 15,
        name: "VVS CARTIER GLASSES (TAN)",
        category: "accessories",
        brand: "Cartier",
        price: "$650",
        priceNum: 650,
        image: "/VVS CARTIER GLASSES (TAN)/glasses-tan-1.jpg",
        images: [
            "/VVS CARTIER GLASSES (TAN)/glasses-tan-1.jpg",
            "/VVS CARTIER GLASSES (TAN)/glasses-tan-2.jpg",
            "/VVS CARTIER GLASSES (TAN)/glasses-tan-3.jpg"
        ],
        badge: "LUXURY",
        description: "VVS quality Cartier glasses in tan",
        specs: { movement: "N/A", quality: "VVS Quality", includes: "Case & Cloth" }
    },
    {
        id: 16,
        name: "VVS CARTIER GLASSES (BLACK)",
        category: "accessories",
        brand: "Cartier",
        price: "$650",
        priceNum: 650,
        image: "/VVS CARTIER GLASSES (BLACK)/glasses-black-1.jpg",
        images: [
            "/VVS CARTIER GLASSES (BLACK)/glasses-black-1.jpg",
            "/VVS CARTIER GLASSES (BLACK)/glasses-black-2.jpg",
            "/VVS CARTIER GLASSES (BLACK)/glasses-black-3.jpg"
        ],
        badge: "LUXURY",
        description: "VVS quality Cartier glasses in black",
        specs: { movement: "N/A", quality: "VVS Quality", includes: "Case & Cloth" }
    }
];

// Helper functions
export function getProductById(id: number): Product | undefined {
    return products.find(p => p.id === id);
}

export function getProductsByCategory(category: "plain-watches" | "iced-watches" | "accessories"): Product[] {
    return products.filter(p => p.category === category);
}

export function getAllCategories(): string[] {
    return ["plain-watches", "iced-watches", "accessories"];
}

export function getFeaturedProducts(count: number = 6): Product[] {
    // Return a mix of products from different categories
    const featured = [
        ...products.filter(p => p.category === "plain-watches").slice(0, 2),
        ...products.filter(p => p.category === "iced-watches").slice(0, 2),
        ...products.filter(p => p.category === "accessories").slice(0, 2)
    ];
    return featured.slice(0, count);
}
