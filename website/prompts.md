# SUPPLYHOUSE — AI Prompts Log

> This document logs the AI prompts used during development of the SUPPLYHOUSE department store SPA.
> Format follows CS3404 submission requirements.

---

The aim 01: [Set up project architecture and folder structure]
Actual prompt: "Create a production-ready Vue 3 + TypeScript + Vite project with clean architecture. Set up folder structure with: api/, components/ (layout, ui, product, cart, dashboard), composables/, router/, stores/, types/, views/. Install vue-router@4, pinia, axios, @heroicons/vue, @vueuse/core, tailwindcss. Configure strict TypeScript with path aliases. No 'any' types allowed."

The aim 02: [Define strict TypeScript interfaces for API responses]
Actual prompt: "Create strict TypeScript interfaces for: Product (id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images, tags), ProductsResponse (products array, total, skip, limit), AuthResponse (id, username, email, firstName, lastName, gender, image, accessToken, refreshToken), LoginCredentials (username, password), CartItem (product, quantity). All must be strictly typed with no 'any'."

The aim 03: [Build Axios API layer with typed responses]
Actual prompt: "Create an axios instance with base URL https://dummyjson.com, Content-Type header, and a request interceptor that attaches JWT token from localStorage. Build productApi with methods: getProducts, getProductById, getProductsByCategory, searchProducts, getCategories — all returning strictly typed responses. Build authApi with login method accepting LoginCredentials."

The aim 04: [Implement Pinia stores for global state management]
Actual prompt: "Create three Pinia stores using Composition API: (1) authStore — manages user, token, isAuthenticated computed, login/logout actions with localStorage persistence; (2) cartStore — manages CartItem array, computed totalItems/totalPrice, add/remove/update/clear actions with localStorage persistence; (3) uiStore — manages isDarkMode with toggle, localStorage persistence, and document class toggling."

The aim 05: [Create reusable composables for business logic separation]
Actual prompt: "Create composables to separate business logic from components: useProducts (wraps productApi, manages loading/error state, provides fetch/search methods), useCart (wraps cartStore for component-level usage), useDarkMode (wraps uiStore with storeToRefs for reactive dark mode toggle)."

The aim 06: [Set up Vue Router with lazy-loaded routes and auth guards]
Actual prompt: "Configure Vue Router 4 with lazy-loaded routes: / (Home), /product/:id (Detail with props), /login, /cart, /admin (requiresAuth meta), catch-all 404. Add beforeEach navigation guard that checks localStorage for JWT token on protected routes and redirects to login. Include scrollBehavior to scroll to top."

The aim 07: [Build glassmorphism UI primitive components]
Actual prompt: "Create reusable UI components with glassmorphism design (backdrop-blur-xl, bg-white/70, border-white/30, dark mode support): GlassCard (hover effects, customizable padding), GlassButton (primary/secondary/ghost variants, sm/md/lg sizes, loading spinner), BaseInput (v-model, label, glass style), Modal (teleport, backdrop blur, close animation), Loader (spinning border animation), Badge (count display for cart)."

The aim 08: [Build navbar with responsive design and mobile menu]
Actual prompt: "Create a sticky NavBar with: UNFAKE logo/brand link, desktop navigation links (Shop, Dashboard for authenticated users), dark mode toggle button with sun/moon SVG icons, cart button with Badge count, sign in/out button. Include responsive hamburger menu for mobile with slide-down MobileMenu component. Use backdrop blur glass effect. Wire up events for cart drawer toggle."

The aim 09: [Build product listing components — card, grid, filter, search]
Actual prompt: "Create product components: ProductCard (image with hover zoom, discount badge, brand/category label, star rating, price with original price line-through, add to cart button), ProductGrid (responsive grid cols 1/2/3/4, loading skeleton animation, empty state), ProductFilter (category pills with active state highlighting), ProductSearch (search input with icon, clear button, debounced), ProductGallery (main image with thumbnail selector and fade transitions)."

The aim 10: [Build shopping cart components — drawer, item, summary]
Actual prompt: "Create cart components: CartDrawer (slide-in panel from right with backdrop, header with count, scrollable item list, empty state, footer with total and view cart link, clear cart button), CartItem (thumbnail, title, brand, quantity controls with +/- buttons, price calculation, remove button), CartSummary (order breakdown with items count, shipping, total, checkout button)."

The aim 11: [Build all page views — Home, Product Detail, Login, Cart, Admin, 404]
Actual prompt: "Create views: HomeView (hero section with UNFAKE branding and decorative blur elements, search bar, category filter, product grid with debounced search), ProductDetailView (back button, product gallery, full details with rating/stock/price/description/tags, add to cart), LoginView (glass card login form with demo credentials display), CartView (full page cart with items and summary sidebar, empty state), AdminDashboardView (stats cards, product table with edit/delete, edit modal), NotFoundView (404 with back to home)."

The aim 12: [Wire up App.vue with router, stores, and cart drawer]
Actual prompt: "Configure App.vue as root layout: initialize all stores on mount (auth, cart, ui), include NavBar with cart toggle event, RouterView with fade page transitions, Footer, and CartDrawer with open/close state. Set up main.ts to create app with Pinia and Router plugins."

The aim 13: [Configure Tailwind CSS with dark mode and custom styles]
Actual prompt: "Set up Tailwind CSS v4 with @tailwindcss/vite plugin. Create base styles with Inter font, smooth scrolling, custom scrollbar styling for light/dark modes. Add utility classes for line-clamp text truncation. Configure dark mode via class strategy for manual toggling."

The aim 14: [Add responsive design and performance optimizations]
Actual prompt: "Ensure all components are mobile-first responsive using Tailwind breakpoints (sm, md, lg, xl). Use lazy-loaded routes for code splitting. Add loading skeletons, computed properties over watchers, proper v-for keys. Optimize images with loading='lazy' attribute."

The aim 15: [Rebrand from UNFAKE to SUPPLYHOUSE department store]
Actual prompt: "Rebrand the entire site from 'UNFAKE' fashion store to 'SUPPLYHOUSE' department store. Update all localStorage keys from 'unfake_*' to 'supplyhouse_*' across authStore, cartStore, uiStore, axiosInstance, and router. Change index.html title/meta. Update NavBar brand to SUPPLYHOUSE with cube icon. Update HomeView hero section with department store tagline 'Everything you need, all in one place'. Update Footer and LoginView branding. Update README.md."

The aim 16: [Fix Tailwind CSS v4 dark mode toggle]
Actual prompt: "Fix dark mode toggle that is not working with Tailwind CSS v4. Tailwind v4 no longer uses 'darkMode: class' in config — instead add '@custom-variant dark (&:where(.dark, .dark *))' directive in style.css after the '@import tailwindcss' line. Also update uiStore to set root.style.colorScheme alongside the class toggle for proper browser awareness."

The aim 17: [Implement liquid glass UI design system]
Actual prompt: "Create a comprehensive liquid glass CSS class system in style.css: liquid-glass (subtle transparent with backdrop-filter blur and inset box shadows), liquid-glass-strong (more opaque for panels), liquid-glass-nav (sticky navigation glass), liquid-glass-hover (hover effect with increased opacity), glass-orb (decorative floating blurred spheres). Apply dark mode variants using @custom-variant. Apply these classes to: GlassCard, ProductCard, CartDrawer, CartSummary, Modal, ProductGrid skeleton, MobileMenu, HomeView hero, LoginView form."

The aim 18: [Enhance NavBar with toggle switch and profile dropdown]
Actual prompt: "Redesign NavBar with: SUPPLYHOUSE brand using cube SVG icon, smooth toggle switch for dark/light mode (sliding ball with sun/moon icons), user profile dropdown with avatar showing initials, user name/email, links to Profile and Dashboard, Sign Out button, dropdown animation with scale/opacity transition. Add profileOpen ref for dropdown state."

The aim 19: [Improve login view with tabs, social login, and better UX]
Actual prompt: "Redesign LoginView with: liquid-glass-strong card, background glass orbs, login/register tab switcher, show/hide password toggle, remember me checkbox, forgot password link, form validation computed, social login buttons (Google/GitHub decorative), success message for registration, improved error display. Use SUPPLYHOUSE branding."

The aim 20: [Create user profile page with account management]
Actual prompt: "Create ProfileView.vue with: user profile header (avatar with initials, name, email, username), tab navigation (overview, orders, settings), overview tab with stats cards (cart items, total, orders) and quick action buttons (view cart, browse products, dashboard), orders tab with empty state, settings tab with account info display and sign out. Add /profile route with requiresAuth meta to router. Wire profile dropdown in NavBar to link to /profile."
