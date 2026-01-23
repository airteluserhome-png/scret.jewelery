# SECRETLY — Design System

> **Brand:** Secretly  
> **Style:** Pink Brutalism / High-End Fashion E-Commerce  
> **Last Updated:** January 2026

---

## 1. Core Aesthetic: "Pink Brutalism"

**Vibe:** Aggressive, industrial luxury, high-contrast, and "in your face." Mixes Swiss design precision with streetwear hype.

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| **Hot Pink** | `#FF0099` | Primary accent, buttons, shadows, lasers |
| **Pitch Black** | `#000000` | Borders, typography, hard shadows |
| **Pure White** | `#FFFFFF` | Background (forced for image blending) |
| **Dark** | `#111111` | Secondary dark, footer backgrounds |
| **Electric Red** | `#FF3300` | Neon logo animation |
| **High-Viz Yellow** | `#FAFF00` | Neon logo animation |

### CSS Variables
```css
:root {
    --neon-pink: #FF0099;
    --hot-pink: #FF0099;
    --dark: #111;
    --off-white: #ffffff;
}
```

---

## 2. Typography

### Headlines — "The Loud Font"
- **Font:** `'Anton', sans-serif`
- **Class:** `font-brutalist`
- **Style:** Tall, condensed, uppercase, blocky
- **Letter-spacing:** `0.05em` (prevents "sticky" letters)
- **Usage:** Main titles, navigation, prices, logo, buttons

### Body — "The Specs Font"
- **Font:** `'Space Grotesk', sans-serif`
- **Class:** `font-sans`
- **Style:** Wide, geometric, modern
- **Usage:** Product descriptions, body text

### Technical Labels
- **Font:** `'Courier New', monospace`
- **Style:** Monospaced, receipt/blueprint aesthetic
- **Usage:** Tech specs, "VERIFIED" badges, reference numbers

### Typography Rules
```css
h1, h2, h3, .brutalist-text {
    font-family: 'Anton', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}
```

---

## 3. UI Components

### The "Tactical Vault" Frame
Products sit inside a **viewfinder box** with heavy L-shaped corner brackets.

```css
.corner {
    position: absolute;
    width: 40px;
    height: 40px;
    border: 5px solid black;
}

/* Hover: Brackets grow + turn pink */
.tactical-frame:hover .corner {
    width: 50px;
    height: 50px;
    border-color: var(--neon-pink);
}
```

### The "Hard" Shadow
**No soft/blurry shadows.** Use solid color blocks offset by 5-10px.

```css
/* Standard brutalist shadow */
box-shadow: 8px 8px 0px #FF0099;

/* Hover state */
box-shadow: 12px 12px 0px #FF0099;

/* Dark variant */
box-shadow: 5px 5px 0px #000;
```

### Tailwind Shadow Classes
```js
boxShadow: {
    'brutalist': '8px 8px 0px #111',
    'brutalist-hover': '15px 15px 0px #FF0099',
}
```

### Borders
- **Standard:** `3px solid black`
- **Accent:** `3px solid #FF0099`
- **Always sharp corners** — no `border-radius`

### Cards (card-3d)
```css
.card-3d {
    background: white;
    border: 3px solid #000;
    box-shadow: 8px 8px 0px var(--neon-pink);
}

.card-3d:hover {
    transform: translate(-5px, -5px);
    box-shadow: 12px 12px 0px var(--neon-pink);
}
```

### The "X-Tape" Banners
Two scrolling ticker tapes crossing over each other:
- One **Black** background
- One **Pink** background
- Used to separate page sections

---

## 4. Buttons

### Primary Button (Buy/Add to Cart)
```css
.add-cart-btn {
    background: black;
    color: white;
    font-family: 'Anton', sans-serif;
    padding: 20px;
    border: 3px solid black;
    text-transform: uppercase;
    box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.2);
}

.add-cart-btn:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0px var(--neon-pink);
}
```

### Secondary Button
```css
.buy-now-btn {
    background: white;
    color: black;
    border: 3px solid black;
    box-shadow: 5px 5px 0px #000;
}

.buy-now-btn:hover {
    background: var(--neon-pink);
    color: white;
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0px black;
}
```

### Back Button
```css
.back-btn {
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 700;
    border: 3px solid #000;
    background: #fff;
    padding: 12px 20px;
}

.back-btn:hover {
    background: var(--dark);
    color: #fff;
}
```

---

## 5. Animations & Effects

### The "Pixel Eater" Loader
- Square, mechanical Pac-Man with pink jaws
- Eats black square dots while loading
- Screen slides up like a garage door when complete

### The "Laser Scan"
- Faint pink laser line scans behind products
- "Quality Control" / "Security Scan" vibe

### The "Neon Glitch" Logo
```css
@keyframes neon-cycle {
    0%, 32% { color: #FF0055; text-shadow: 4px 4px 0px #000, 0 0 20px #FF0055; }
    33%, 65% { color: #FF3300; text-shadow: 4px 4px 0px #000, 0 0 20px #FF3300; }
    66%, 100% { color: #FAFF00; text-shadow: 4px 4px 0px #000, 0 0 20px #FAFF00; }
}

.logo-neon-v2 {
    animation: neon-cycle 0.8s step-end infinite;
}
```

### Glitch Text Effect
- Cyan (`#00fff9`) and Magenta (`#ff00c1`) offset layers
- Uses `clip: rect()` animation for glitch effect

### Hover Animations
- **Cards:** `translate(-5px, -5px)` + shadow grows
- **Buttons:** `translate(-2px, -2px)` + shadow changes color
- **Images:** `scale(1.05) rotate(-2deg)` subtle pop

---

## 6. Technical Requirements

### The "Camouflage" Fix
Force white backgrounds so JPG white boxes become invisible:

```css
body, html, main, .min-h-screen {
    background-color: #ffffff !important;
}

.product-image {
    mix-blend-mode: multiply;
    background: transparent !important;
}
```

### Image Treatment
```css
img {
    background: transparent !important;
}

.main-watch-img {
    filter: drop-shadow(0px 20px 30px rgba(0, 0, 0, 0.25));
    mix-blend-mode: multiply;
}
```

### Mobile Optimization
- Touch targets minimum 44px height
- Brackets shrink on mobile (25px × 25px, 3px border)
- Font size scales down on small screens
- Safe area insets for notched devices

---

## 7. Component Checklist

When building new pages/components, ensure:

- [ ] White background (`#FFFFFF`)
- [ ] 3px solid black borders
- [ ] Pink offset shadow (`8px 8px 0px #FF0099`)
- [ ] Anton font for headings (uppercase)
- [ ] No rounded corners
- [ ] Hover states with translate + shadow change
- [ ] Corner brackets on featured items
- [ ] Uppercase text with letter-spacing

---

## 8. File References

| Component | File |
|-----------|------|
| Global Styles | `src/app/globals.css` |
| Tailwind Config | `tailwind.config.ts` |
| Header | `src/components/header.tsx` |
| Product Cards | `src/components/brutalist-grid.tsx` |
| Auth Gate | `src/components/auth-gate.tsx` |
| Ticker | `src/components/brutalist-ticker.tsx` |
| Cross Tape | `src/components/cross-tape.tsx` |
| Back to Top | `src/components/back-to-top.tsx` |
| Toast System | `src/components/toast-notification.tsx` |
| Custom Cursor | `src/components/custom-cursor.tsx` |
| Quick View Modal | `src/components/quick-view-modal.tsx` |
| Recently Viewed | `src/components/recently-viewed.tsx` |
| Floating Contact | `src/components/floating-contact.tsx` |
| Scroll Reveal | `src/components/scroll-reveal.tsx` |

---

## 9. Premium Features

### Back to Top Button
- Appears after scrolling 400px
- Brutalist style with pink shadow
- Smooth scroll animation

### Toast Notifications
```jsx
import { useToast } from "@/components/toast-notification";

const { showToast } = useToast();
showToast("Item added to cart!", "success");
showToast("Error occurred", "error");
showToast("Info message", "info");
```

### Custom Cursor (Desktop Only)
- White square dot follows mouse
- Pink ring expands on hover
- Automatically hidden on mobile/touch

### Product Quick View
```jsx
import QuickViewModal from "@/components/quick-view-modal";

<QuickViewModal
    product={selectedProduct}
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    onAddToCart={(product) => addToCart(product)}
/>
```

### Recently Viewed Products
```jsx
import { addToRecentlyViewed } from "@/components/recently-viewed";

// Call when user views a product
addToRecentlyViewed({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
});
```

### Scroll Reveal Animations
```jsx
// CSS classes
<div className="reveal">Fades up</div>
<div className="reveal-left">Slides from left</div>
<div className="reveal-right">Slides from right</div>
<div className="reveal-scale">Scales up</div>

// Or use component
import ScrollReveal from "@/components/scroll-reveal";
<ScrollReveal variant="left" delay={200}>
    <Content />
</ScrollReveal>
```

### Smooth Scrolling (Lenis)
- Automatically enabled for authenticated users
- Duration: 1.4s
- Buttery smooth Apple-like feel

---

## 10. Password Protection

The site uses a secure lock screen:
- **Password:** `Secretly@2024!`
- **Features:** SHA-256 hashing, rate limiting, session timeout
- **Style:** Matches brutalist design system

---

## Quick Reference

```
COLORS:     Pink #FF0099 | Black #000 | White #FFF
FONTS:      Anton (headlines) | Space Grotesk (body)
BORDERS:    3px solid black
SHADOWS:    8px 8px 0px #FF0099
CORNERS:    Sharp (no radius)
HOVER:      translate(-5px, -5px) + shadow grows
```

---

*This document should be referenced when creating new pages, components, or making design changes to maintain consistency across the Secretly brand.*
