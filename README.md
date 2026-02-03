# SECRETLY

> **Premium Luxury E-Commerce Platform**  
> A brutalist-style high-end watch and accessories store built with Next.js

![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-FF0055?style=flat-square)

🌐 **Live Site:** [secretly.jewelry](https://secretly.jewelry)

---

## 🎨 Design Philosophy

**"Pink Brutalism"** - An aggressive, industrial luxury aesthetic combining Swiss design precision with streetwear hype.

| Element | Style |
|---------|-------|
| Primary Color | Hot Pink `#FF0099` |
| Secondary | Pitch Black `#000000` |
| Background | Off-White / Pure White |
| Borders | 3px solid black |
| Shadows | Hard offset (8px 8px) |
| Typography | Anton (headlines) + Space Grotesk (body) |

---

## ✨ Current Features

### 🤖 FAQ Chatbot
- Pre-selected quick questions (8 FAQs)
- Auto-responses with typing animation
- Questions include: order tracking, returns, shipping, payment, etc.
- Direct email and Instagram contact buttons

### 🛒 E-Commerce
- Full product catalog with dynamic pages
- Shopping cart with slide-out drawer
- Stripe checkout integration
- Category pages: Plain Watches, Iced Watches, Accessories

### 📱 Social Integration
- **Footer with owner info:** "OWNER: @secretly ON TIKTOK"
- Instagram: [@skhh](https://instagram.com/skhh)
- TikTok: [@quicksaler](https://tiktok.com/@quicksaler)

### 🔐 Security
- Password-protected site access
- SHA-256 password hashing
- Rate limiting (5 attempts before lockout)
- Session timeout after 30 minutes
- Kill switch for emergency site lockdown

### 🎭 Animations & UX
- Lenis smooth scrolling
- Scroll reveal animations
- 3D card hover effects
- Custom cursor (desktop)
- Page transition animations
- Cross-tape decorative dividers

### 📦 Product Features
- Dynamic product pages with image gallery
- Zoom modal for product images
- Live viewer count simulation
- Countdown timers for limited editions
- Full packaging included badges

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

## 📁 Project Structure

```
secretly/
├── public/                 # Static assets (images, icons)
│   ├── AP/                 # Audemars Piguet watches
│   ├── ROLEX/              # Rolex watches
│   ├── PATEK PHILLIPE/     # Patek Philippe
│   ├── RM/                 # Richard Mille
│   └── new items/          # Latest additions
│
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── page.tsx        # Homepage
│   │   ├── shop/           # Shop page
│   │   ├── accessories/    # Accessories page
│   │   ├── product/[id]/   # Dynamic product pages
│   │   └── globals.css     # Global styles
│   │
│   ├── components/         # React components (40+)
│   │   ├── floating-contact.tsx  # FAQ Chatbot
│   │   ├── brutalist-footer.tsx  # Social links footer
│   │   ├── cart-drawer.tsx       # Shopping cart
│   │   ├── lock-overlay.tsx      # Password protection
│   │   ├── kill-switch.tsx       # Emergency lockdown
│   │   └── ...
│   │
│   ├── context/
│   │   └── cart-context.tsx # Cart state management
│   │
│   └── data/
│       └── products.ts     # Product catalog
│
└── package.json
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations |
| **Lenis** | Smooth scrolling |
| **Stripe** | Payment processing |
| **Lucide Icons** | Icon library |

---

## 📦 Deployment

Hosted on **Vercel** with automatic deployments from the `main` branch.

```bash
# Deploy with Vercel CLI
npx vercel --prod
```

---

## 📧 Contact

- **Email:** hello@secretly.jewelry
- **Instagram:** [@skhh](https://instagram.com/skhh)
- **TikTok:** [@secretly](https://tiktok.com/@secretly)

---

## 📝 License

Private repository - All rights reserved.

---

<p align="center">
  <strong>SECRETLY</strong> • Premium Luxury Goods • 5A Swiss Quality
</p>
