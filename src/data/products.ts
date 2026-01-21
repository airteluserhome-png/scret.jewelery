// Product Catalog Data
// All products listed individually with exact pricing

export interface Product {
    id: number;
    name: string;
    category: "accessories" | "plain-watches" | "iced-watches";
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
    // ========== ACCESSORIES ==========
    {
        id: 1,
        name: "Cross Bracelet",
        category: "accessories",
        brand: "Luxury",
        price: "$350",
        priceNum: 350,
        image: "/vca-bracelet.png",
        badge: "New",
        description: "Premium cross bracelet with luxury finish",
        specs: {
            movement: "N/A",
            quality: "Premium Quality",
            includes: "Box & Certificate"
        }
    },
    {
        id: 2,
        name: "Van Cleef",
        category: "accessories",
        brand: "Van Cleef & Arpels",
        price: "$200",
        priceNum: 200,
        image: "/vca-bracelet.png",
        description: "Van Cleef & Arpels inspired bracelet",
        specs: {
            movement: "N/A",
            quality: "Premium Quality",
            includes: "Box & Certificate"
        }
    },
    {
        id: 3,
        name: "Cartier Glasses",
        category: "accessories",
        brand: "Cartier",
        price: "$650",
        priceNum: 650,
        image: "/hero-image.png",
        badge: "Luxury",
        description: "Cartier luxury eyewear",
        specs: {
            movement: "N/A",
            quality: "Premium Quality",
            includes: "Box & Certificate"
        }
    },

    // ========== PLAIN WATCHES (5A) ==========
    {
        id: 4,
        name: "Rolex",
        category: "plain-watches",
        brand: "Rolex",
        price: "$450",
        priceNum: 450,
        image: "/rolex-daytona.png",
        badge: "5A Swiss",
        description: "5A Swiss movement Rolex. Comes with box and papers.",
        specs: {
            movement: "5A Swiss Movement",
            quality: "AAA+ Quality",
            includes: "Box & Papers"
        }
    },
    {
        id: 5,
        name: "AP",
        category: "plain-watches",
        brand: "Audemars Piguet",
        price: "$550",
        priceNum: 550,
        image: "/ap-royal-oak.png",
        badge: "5A Swiss",
        description: "5A Swiss movement AP. Comes with box and papers.",
        specs: {
            movement: "5A Swiss Movement",
            quality: "AAA+ Quality",
            includes: "Box & Papers"
        }
    },
    {
        id: 6,
        name: "Patek",
        category: "plain-watches",
        brand: "Patek Philippe",
        price: "$600",
        priceNum: 600,
        image: "/patek-plain-1.jpg",
        badge: "5A Swiss",
        description: "5A Swiss movement Patek. Comes with box and papers.",
        specs: {
            movement: "5A Swiss Movement",
            quality: "AAA+ Quality",
            includes: "Box & Papers"
        }
    },
    {
        id: 7,
        name: "Cartier",
        category: "plain-watches",
        brand: "Cartier",
        price: "$450",
        priceNum: 450,
        image: "/prada-watch.png",
        badge: "5A Swiss",
        description: "5A Swiss movement Cartier. Comes with box and papers.",
        specs: {
            movement: "5A Swiss Movement",
            quality: "AAA+ Quality",
            includes: "Box & Papers"
        }
    },
    {
        id: 8,
        name: "RM",
        category: "plain-watches",
        brand: "Richard Mille",
        price: "$650",
        priceNum: 650,
        image: "/rolex-daytona.png",
        badge: "5A Swiss",
        description: "5A Swiss movement RM. Comes with box and papers.",
        specs: {
            movement: "5A Swiss Movement",
            quality: "AAA+ Quality",
            includes: "Box & Papers"
        }
    },

    // ========== ICED OUT WATCHES (5A) ==========
    {
        id: 9,
        name: "Rolex",
        category: "iced-watches",
        brand: "Rolex",
        price: "$700",
        priceNum: 700,
        image: "/iced-rolex-1.jpg",
        badge: "Iced Out",
        description: "5A Swiss movement Iced Out Rolex. Comes with box and papers.",
        specs: {
            movement: "5A Swiss Movement",
            quality: "AAA+ Iced Quality",
            includes: "Box & Papers"
        }
    },
    {
        id: 10,
        name: "AP",
        category: "iced-watches",
        brand: "Audemars Piguet",
        price: "$750",
        priceNum: 750,
        image: "/ap-royal-oak.png",
        badge: "Iced Out",
        description: "5A Swiss movement Iced Out AP. Comes with box and papers.",
        specs: {
            movement: "5A Swiss Movement",
            quality: "AAA+ Iced Quality",
            includes: "Box & Papers"
        }
    },
    {
        id: 11,
        name: "Patek",
        category: "iced-watches",
        brand: "Patek Philippe",
        price: "$800",
        priceNum: 800,
        image: "/iced-patek-1.jpg",
        badge: "Iced Out",
        description: "5A Swiss movement Iced Out Patek. Comes with box and papers.",
        specs: {
            movement: "5A Swiss Movement",
            quality: "AAA+ Iced Quality",
            includes: "Box & Papers"
        }
    },
    {
        id: 12,
        name: "Cartier",
        category: "iced-watches",
        brand: "Cartier",
        price: "$700",
        priceNum: 700,
        image: "/prada-watch.png",
        badge: "Iced Out",
        description: "5A Swiss movement Iced Out Cartier. Comes with box and papers.",
        specs: {
            movement: "5A Swiss Movement",
            quality: "AAA+ Iced Quality",
            includes: "Box & Papers"
        }
    },
    {
        id: 13,
        name: "RM",
        category: "iced-watches",
        brand: "Richard Mille",
        price: "$1,350",
        priceNum: 1350,
        image: "/rolex-daytona.png",
        badge: "Iced Out",
        description: "5A Swiss movement Iced Out RM. Comes with box and papers.",
        specs: {
            movement: "5A Swiss Movement",
            quality: "AAA+ Iced Quality",
            includes: "Box & Papers"
        }
    },
];

// Helper functions
export const getProductById = (id: string | number): Product | undefined => {
    return products.find(p => p.id === Number(id));
};

export const getProductsByCategory = (category: Product["category"]): Product[] => {
    return products.filter(p => p.category === category);
};

export const getAllCategories = () => {
    return [
        { id: "accessories", name: "Accessories", count: 3 },
        { id: "plain-watches", name: "Plain Watches (5A)", count: 5 },
        { id: "iced-watches", name: "Iced Out Watches (5A)", count: 5 },
    ];
};
