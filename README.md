# SECRETLY

> **Premium Luxury E-Commerce Platform**  
> A brutalist-style high-end fashion and accessories store built with Next.js

![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-FF0055?style=flat-square)

---

## 🎨 Design Philosophy

**"Pink Brutalism"** - An aggressive, industrial luxury aesthetic combining Swiss design precision with streetwear hype.

| Element | Style |
|---------|-------|
| Primary Color | Hot Pink `#FF0099` |
| Secondary | Pitch Black `#000000` |
| Background | Pure White `#FFFFFF` |
| Borders | 3px solid black |
| Shadows | Hard offset (8px 8px) |
| Typography | Anton (headlines) + Space Grotesk (body) |

---

## ✨ Features

### Security
- 🔐 **Password-Protected Access** - Secure lock screen with SHA-256 hashing
- 🚫 **Rate Limiting** - 5 attempts before exponential lockout (5min → 10min → 20min...)
- ⏰ **Session Timeout** - Auto-locks after 30 minutes of inactivity
- 🛡️ **Content Protection** - Site content only renders after authentication

### User Experience
- 🖱️ **Custom Cursor** - Luxury cursor effect (desktop only)
- ⬆️ **Back to Top** - Brutalist-style scroll button
- 🔔 **Toast Notifications** - Feedback system for cart/actions
- 👁️ **Recently Viewed** - Tracks last 6 products viewed
- 💬 **Floating Contact** - Inquiry form with quick contact options
- 🔍 **Quick View Modal** - Fast product preview without page load

### Animations
- 🌊 **Lenis Smooth Scrolling** - Apple/Figma-like buttery scroll
- ✨ **Scroll Reveal** - Elements animate on scroll into view
- 🎭 **Glitch Effects** - Neon cycling logo animation
- 🔲 **3D Card Effects** - Hover transforms with shadow growth

### E-Commerce
- 🛒 **Shopping Cart** - Slide-out drawer with item management
- 📦 **Product Pages** - Dynamic routes with tactical frame design
- 🏷️ **Category Pages** - Shop, Accessories sections
- 💳 **Payment Modal** - (Coming soon)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/airteluserhome-png/scret.jewelery.git
cd secretly

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## 🔑 Access Credentials

| Environment | Password |
|-------------|----------|
| Production | `Secretly@2024!` |

---

## 📁 Project Structure

```
secretly/
├── public/                 # Static assets (images, icons)
│   ├── AP/                 # Audemars Piguet watches
│   ├── Cartier/            # Cartier products
│   ├── ICED OUT AP/        # Iced out AP collection
│   ├── ROLEX/              # Rolex watches
│   ├── RM/                 # Richard Mille
│   └── VVS */              # VVS accessories
│
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── page.tsx        # Homepage
│   │   ├── shop/           # Shop page
│   │   ├── accessories/    # Accessories page
│   │   ├── product/[id]/   # Dynamic product pages
│   │   ├── layout.tsx      # Root layout
│   │   ├── template.tsx    # Page transitions
│   │   └── globals.css     # Global styles
│   │
│   ├── components/         # React components
│   │   ├── auth-gate.tsx   # Authentication wrapper
│   │   ├── brutalist-*.tsx # Brutalist UI components
│   │   ├── cart-drawer.tsx # Shopping cart
│   │   ├── custom-cursor.tsx
│   │   ├── floating-contact.tsx
│   │   ├── luxury-loader.tsx
│   │   ├── quick-view-modal.tsx
│   │   ├── recently-viewed.tsx
│   │   ├── scroll-reveal.tsx
│   │   ├── toast-notification.tsx
│   │   └── ... (40+ components)
│   │
│   ├── context/
│   │   └── cart-context.tsx # Cart state management
│   │
│   └── data/
│       └── products.ts     # Product catalog
│
├── DESIGN-SYSTEM.md        # Complete design documentation
├── tailwind.config.ts      # Tailwind configuration
├── next.config.mjs         # Next.js configuration
└── package.json
```

---

## 🎨 Component Library

### Core Components

| Component | Description |
|-----------|-------------|
| `AuthGate` | Wraps entire app, handles authentication |
| `BrutalistHeader` | Main navigation with mega menu |
| `BrutalistGrid` | Product card grid layout |
| `BrutalistTicker` | Scrolling text banner |
| `CrossTape` | Decorative X-tape section dividers |

### UI Components

| Component | Description |
|-----------|-------------|
| `BackToTop` | Scroll-to-top button |
| `CartDrawer` | Slide-out shopping cart |
| `CustomCursor` | Luxury cursor (desktop) |
| `FloatingContact` | Contact form widget |
| `QuickViewModal` | Product preview modal |
| `RecentlyViewed` | Recently viewed tracker |
| `ScrollReveal` | Scroll animation wrapper |
| `ToastNotification` | Notification system |

### Loaders

| Component | Description |
|-----------|-------------|
| `LuxuryLoader` | Branded page loader |
| `PixelLoader` | Pac-man style loader |
| `InitialLoader` | Minimal pulse loader |

---

## 🎯 Usage Examples

### Toast Notifications

```tsx
import { useToast } from "@/components/toast-notification";

function MyComponent() {
    const { showToast } = useToast();
    
    const handleAddToCart = () => {
        showToast("Added to cart!", "success");
    };
    
    return <button onClick={handleAddToCart}>Add</button>;
}
```

### Scroll Reveal Animations

```tsx
// Using CSS classes
<div className="reveal">Fades up on scroll</div>
<div className="reveal-left">Slides from left</div>
<div className="reveal-right">Slides from right</div>
<div className="reveal-scale">Scales up</div>

// Using component
import ScrollReveal from "@/components/scroll-reveal";

<ScrollReveal variant="left" delay={200}>
    <YourContent />
</ScrollReveal>
```

### Recently Viewed Tracking

```tsx
import { addToRecentlyViewed } from "@/components/recently-viewed";

// Call when user views a product
addToRecentlyViewed({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
});
```

### Quick View Modal

```tsx
import QuickViewModal from "@/components/quick-view-modal";

<QuickViewModal
    product={selectedProduct}
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    onAddToCart={(product) => addToCart(product)}
    onViewDetails={(product) => router.push(`/product/${product.id}`)}
/>
```

---

## 🎨 CSS Variables

```css
:root {
    /* Colors */
    --neon-pink: #FF0099;
    --dark: #111;
    --off-white: #ffffff;
    
    /* Premium Easings */
    --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    --ease-soft: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 📱 Responsive Design

- **Desktop First** - Optimized for luxury browsing experience
- **Mobile Optimized** - Touch-friendly, no custom cursor
- **Safe Areas** - iOS notch/home indicator support
- **Touch Targets** - Minimum 44px hit areas

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations |
| **Lenis** | Smooth scrolling |
| **Lucide Icons** | Icon library |

---

## 📦 Deployment

### Vercel (Recommended)

The project is configured for automatic deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect Next.js settings
3. Deploy automatically on push to `main`

### Environment Variables

No environment variables required for basic deployment.

---

## 📄 Documentation

- **[DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)** - Complete design system documentation
- Colors, typography, components, animations
- Code examples and usage patterns

---

## 🔒 Security Notes

- Password is checked client-side (suitable for private/preview sites)
- For production e-commerce, implement server-side authentication
- Content is not rendered until authenticated (DevTools protection)
- Session data stored in localStorage

---

## 📝 License

Private repository - All rights reserved.

---

## 👤 Author

**Secretly**  
Premium Luxury Goods

---

<p align="center">
  <strong>SECRETLY</strong> • Luxury Goods • Private Access
</p>
