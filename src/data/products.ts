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
        name: "Patek Nautilus",
        category: "plain-watches",
        brand: "Patek Philippe",
        price: "$600",
        priceNum: 600,
        image: "/patek-plain-1.jpg",
        badge: "5A Swiss",
        description: "5A Swiss movement Patek Philippe. Comes with box and papers.",
        specs: {
            movement: "5A Swiss Movement",
            quality: "AAA+ Quality",
            includes: "Box & Papers"
        }
    },
    {
        id: 7,
        name: "Patek Aquanaut",
        category: "plain-watches",
        brand: "Patek Philippe",
        price: "$600",
        priceNum: 600,
        image: "/patek-plain-2.jpg",
        badge: "5A Swiss",
        description: "5A Swiss movement Patek Philippe. Comes with box and papers.",
        specs: {
            movement: "5A Swiss Movement",
            quality: "AAA+ Quality",
            includes: "Box & Papers"
        }
    },
    {
        id: 8,
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
        id: 9,
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
        id: 10,
        name: "Iced Out Rolex I",
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
        id: 11,
        name: "Iced Out Rolex II",
        category: "iced-watches",
        brand: "Rolex",
        price: "$700",
        priceNum: 700,
        image: "/iced-rolex-2.jpg",
        badge: "Iced Out",
        description: "5A Swiss movement Iced Out Rolex. Comes with box and papers.",
        specs: {
            movement: "5A Swiss Movement",
            quality: "AAA+ Iced Quality",
            includes: "Box & Papers"
        }
    },
    {
        id: 12,
        name: "Iced Out AP",
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
        id: 13,
        name: "Iced Out Patek I",
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
        id: 14,
        name: "Iced Out Patek II",
        category: "iced-watches",
        brand: "Patek Philippe",
        price: "$800",
        priceNum: 800,
        image: "/iced-patek-2.jpg",
        badge: "Iced Out",
        description: "5A Swiss movement Iced Out Patek. Comes with box and papers.",
        specs: {
            movement: "5A Swiss Movement",
            quality: "AAA+ Iced Quality",
            includes: "Box & Papers"
        }
    },
    {
        id: 15,
        name: "Iced Out Cartier",
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
        id: 16,
        name: "Iced Out RM",
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
        { id: "accessories", name: "Accessories", count: products.filter(p => p.category === "accessories").length },
        { id: "plain-watches", name: "Plain Watches (5A)", count: products.filter(p => p.category === "plain-watches").length },
        { id: "iced-watches", name: "Iced Out Watches (5A)", count: products.filter(p => p.category === "iced-watches").length },
    ];
};
