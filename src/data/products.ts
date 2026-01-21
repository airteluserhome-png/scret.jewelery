export interface Product {
    id: number;
    name: string;
    category: "plain-watches" | "iced-watches";
    brand: string;
    price: string;
    priceNum: number;
    image: string;
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
        price: "$450",
        priceNum: 450,
        image: "/ROLEX/Rolex Daydate Olive.jpg",
        badge: "5A SWISS",
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
        badge: "5A SWISS",
        description: "5A Swiss movement Cartier Santos with box and papers",
        specs: { movement: "5A Swiss Movement", quality: "AAA+ Quality", includes: "Box & Papers" }
    },
    {
        id: 7,
        name: "PATEK PHILIPPE NAUTILUS X TIFFANY AND CO",
        category: "plain-watches",
        brand: "Patek Philippe",
        price: "$600",
        priceNum: 600,
        image: "/PATEK PHILLIPE /Patek Philippe Nautilus x Tiffany And Co.jpg",
        badge: "5A SWISS",
        description: "5A Swiss movement Patek Philippe with box and papers",
        specs: { movement: "5A Swiss Movement", quality: "AAA+ Quality", includes: "Box & Papers" }
    },
    {
        id: 8,
        name: "PATEK PHILIPPE ROSE GOLD",
        category: "plain-watches",
        brand: "Patek Philippe",
        price: "$600",
        priceNum: 600,
        image: "/PATEK PHILLIPE /Patek Philippe Rose Gold.jpg",
        badge: "5A SWISS",
        description: "5A Swiss movement Patek Philippe with box and papers",
        specs: { movement: "5A Swiss Movement", quality: "AAA+ Quality", includes: "Box & Papers" }
    },

    // ICED OUT WATCHES
    {
        id: 9,
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
        id: 10,
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
        id: 11,
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
        id: 12,
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
        id: 13,
        name: "ICED OUT PATEK PHILLIPE NAUTILUS ROSE GOLD",
        category: "iced-watches",
        brand: "Patek Philippe",
        price: "$800",
        priceNum: 800,
        image: "/ICET OUT Patek philipe/Iced out Patek Phillipe Nautilus ROSE GOLD.jpg",
        badge: "ICED OUT",
        description: "5A Swiss movement Iced Patek Philippe with box and papers",
        specs: { movement: "5A Swiss Movement", quality: "AAA+ Quality", includes: "Box & Papers" }
    },
    {
        id: 14,
        name: "PATEK PHILLIPE ICED OUT NAUTILUS",
        category: "iced-watches",
        brand: "Patek Philippe",
        price: "$800",
        priceNum: 800,
        image: "/ICET OUT Patek philipe/Patek Phillipe Iced out Nautilus.jpg",
        badge: "ICED OUT",
        description: "5A Swiss movement Iced Patek Philippe with box and papers",
        specs: { movement: "5A Swiss Movement", quality: "AAA+ Quality", includes: "Box & Papers" }
    },
    {
        id: 15,
        name: "ICED OUT ROLEX DAY DATE ROSE GOLD",
        category: "iced-watches",
        brand: "Rolex",
        price: "$700",
        priceNum: 700,
        image: "/ICE OUT ROLEX /Iced out Rolex Day date rose gold.jpg",
        badge: "ICED OUT",
        description: "5A Swiss movement Iced Rolex with box and papers",
        specs: { movement: "5A Swiss Movement", quality: "AAA+ Quality", includes: "Box & Papers" }
    },
    {
        id: 16,
        name: "ICED OUT ROLEX DAY DATE WHITE GOLD",
        category: "iced-watches",
        brand: "Rolex",
        price: "$700",
        priceNum: 700,
        image: "/ICE OUT ROLEX /Iced out Rolex Day date white gold.jpg",
        badge: "ICED OUT",
        description: "5A Swiss movement Iced Rolex with box and papers",
        specs: { movement: "5A Swiss Movement", quality: "AAA+ Quality", includes: "Box & Papers" }
    }
];

// Helper functions
export function getProductById(id: number): Product | undefined {
    return products.find(p => p.id === id);
}

export function getProductsByCategory(category: "plain-watches" | "iced-watches"): Product[] {
    return products.filter(p => p.category === category);
}

export function getAllCategories(): string[] {
    return ["plain-watches", "iced-watches"];
}
