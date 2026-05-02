# SUPPLYHOUSE — Your Department Store

A modern, responsive single-page application built for the CS3404 GUI Programming mini project.

## Tech Stack

- **Vue 3** (Composition API)
- **TypeScript** (Strict mode, zero `any`)
- **Vite** (Build tool)
- **Tailwind CSS v4** (Utility-first styling)
- **Pinia** (State management)
- **Vue Router 4** (Client-side routing)
- **Axios** (HTTP client)
- **DummyJSON API** (Data source)

## Features

- Product listing with responsive grid
- Real-time search & category filtering
- Dynamic product detail page with image gallery
- Shopping cart with localStorage persistence
- Authentication simulation (JWT) with login/register tabs
- User profile page with account overview, orders & settings
- Admin dashboard with product management
- Dark / light mode toggle (toggle switch)
- **Liquid Glass UI** design (backdrop blur, glass orbs, gradient overlays)
- Smooth page transitions & animations
- Fully responsive (mobile-first)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── api/          # Axios instance & typed API services
├── components/   # Reusable Vue components
│   ├── layout/   # NavBar, Footer, MobileMenu
│   ├── ui/       # GlassCard, GlassButton, Modal, Loader, etc.
│   ├── product/  # ProductCard, ProductGrid, ProductFilter, etc.
│   ├── cart/     # CartDrawer, CartItem, CartSummary
│   └── dashboard/# AdminStats, AdminProductTable
├── composables/  # Business logic (useProducts, useCart, etc.)
├── router/       # Vue Router config & guards
├── stores/       # Pinia stores (auth, cart, ui)
├── types/        # TypeScript interfaces
├── views/        # Page-level components
├── App.vue       # Root component
└── main.ts       # Application entry point
```

## Demo Credentials

- **Username:** `emilys`
- **Password:** `emilyspass`
