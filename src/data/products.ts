// Product Catalog Data
// STRICT CATALOG: Only the 6 Specific Watches provided by user

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
    // ========== PLAIN WATCHES (5A) ==========
    {
        id: 1,
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
        id: 2,
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

    // ========== ICED OUT WATCHES (5A) ==========
    {
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        { id: "plain-watches", name: "Plain Watches (5A)", count: products.filter(p => p.category === "plain-watches").length },
        { id: "iced-watches", name: "Iced Out Watches (5A)", count: products.filter(p => p.category === "iced-watches").length },
    ];
};
