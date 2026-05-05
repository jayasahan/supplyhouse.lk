The aim 01: Start the project
Actual prompt: hi ai, i want to make a website for selling things called supplyhouse.lk. how to start a webiste using vue js? i am new please give simple steps.

The aim 02: Setup routing
Actual prompt: my vue app is running. now i want multiple pages like home, cart and login. how to add vue router to my new project?

The aim 03: Create a layout skeleton
Actual prompt: how to make a basic app layout in App.vue? i need a navbar at top and footer at bottom and page content in middle.

The aim 04: Make the Navigation Bar
Actual prompt: help me make a NavBar.vue component. i need logo on left and links for home, products, cart and login on right.

The aim 05: Make a mobile menu
Actual prompt: the navbar looks bad on my phone. how to make a hamburger menu MobileMenu.vue for small screens?

The aim 06: Make the Footer
Actual prompt: write code for a simple Footer.vue with copyright text and some fake links.

The aim 07: Global styles
Actual prompt: i created style.css. how to reset margins and paddings and set a nice main font for whole app?

The aim 08: Glassmorphism effect
Actual prompt: i saw a cool glass effect on websites. how to make a GlassCard.vue component that looks like see-through glass?

The aim 09: Glass style button
Actual prompt: now i want a button that also looks like glass. make GlassButton.vue for me please.

The aim 10: Setup shared state
Actual prompt: i need a way to save cart data everywhere. i heard pinia is good. how to install and setup pinia?

The aim 11: Create UI Store
Actual prompt: i want to control mobile menu open and close state. can we make a uiStore.ts for this?

The aim 12: Dark mode
Actual prompt: can you help me add dark mode? write a useDarkMode.ts composable so user can toggle light and dark theme.

The aim 13: Home page basic
Actual prompt: let's build HomeView.vue. just put a big welcome text and a nice background for now.

The aim 14: Hero section for home
Actual prompt: i want a cool hero section in home. make a HeroCardShuffle.vue that shows some pictures shuffling.

The aim 15: Create Product type
Actual prompt: in my app i will sell things. what is typescript? how to write types/product.ts for my products? i need id, name, price, image.

The aim 16: Badges for things
Actual prompt: i need a small colorful tag to show if a product is 'new' or 'sale'. make a Badge.vue component.

The aim 17: Reusable input field
Actual prompt: we will need forms soon. make a BaseInput.vue component that i can reuse for all text inputs.

The aim 18: Loading indicator
Actual prompt: sometimes things load slow. write a Loader.vue component that shows a spinning circle.

The aim 19: Modal popup
Actual prompt: i want popups for my site. make a Modal.vue that can show any content inside it and has a close button.

The aim 20: Scroll to top button
Actual prompt: when pages are very long, i need a button at bottom right to go up. write ScrollToTop.vue.

The aim 21: Setup Axios
Actual prompt: i need to fetch data from internet. how to use axios? please make axiosInstance.ts with a base url.

The aim 22: Product API functions
Actual prompt: create productApi.ts inside api folder. write a function that gets all products using axios.

The aim 23: Reusable products logic
Actual prompt: how to get the products into my pages easily? make useProducts.ts composable to call the api and return data.

The aim 24: Single product card
Actual prompt: i need a card for one product to show image name and price. make ProductCard.vue. use the GlassCard we made before.

The aim 25: Grid for products
Actual prompt: now i want to show many products. write ProductGrid.vue to show product cards in a nice grid.

The aim 26: Product searching
Actual prompt: write ProductSearch.vue. it should have a search bar that filters products by name.

The aim 27: Product filtering
Actual prompt: i want users to sort products by price and category. make ProductFilter.vue component with some dropdowns.

The aim 28: Fetch real products on Home
Actual prompt: update HomeView.vue to actually load products from our api and show them in the ProductGrid.

The aim 29: Product Details Page
Actual prompt: what to do when user clicks a product? make ProductDetailView.vue to show big image and description.

The aim 30: Product images gallery
Actual prompt: in product page I want to show many images. write ProductGallery.vue where clicking small image makes it big.

The aim 31: Product Modal quick view
Actual prompt: instead of going to new page, can we show product details in popup? make ProductDetailModal.vue using our Modal component.

The aim 32: Define Cart types
Actual prompt: now let's work on adding to cart. first make types/cart.ts for cart items.

The aim 33: Cart Store logic
Actual prompt: create cartStore.ts in pinia. i need add to cart, remove from cart and total price calculations.

The aim 34: Cart Item design
Actual prompt: write CartItem.vue to show a single product in cart with small image, name, price and a delete button.

The aim 35: Cart Drawer sidebar
Actual prompt: when user clicks cart icon i want a sidebar to slide from right. build CartDrawer.vue.

The aim 36: Make cart add button work
Actual prompt: change ProductCard.vue so clicking 'add to cart' actually saves item in the cart store.

The aim 37: Show cart total in navbar
Actual prompt: update NavBar.vue to show a little number badge on the cart icon when i add items.

The aim 38: Cart Page view
Actual prompt: i also want a full page for cart called CartView.vue. just list all cart items there.

The aim 39: Order summary box
Actual prompt: inside CartView, add a CartSummary.vue on the right side that shows subtotal, tax and total cost.

The aim 40: Auth types
Actual prompt: time for login. make types/auth.ts to store user info like token, email, role.

The aim 41: Auth API
Actual prompt: create api/authApi.ts with fake login and register functions that return a fake token.

The aim 42: Auth Store
Actual prompt: make authStore.ts to save user token. it should remember login even if i refresh page.

The aim 43: Auth wrapper logic
Actual prompt: create composables/useAuth.ts to make checking if user is logged in easier across the app.

The aim 44: Login Page UI
Actual prompt: design LoginView.vue. i need email and password fields, and a submit button. make it look nice.

The aim 45: Connect login form
Actual prompt: make the login form actually call useAuth login function. if success, redirect to home page.

The aim 46: User Profile
Actual prompt: create ProfileView.vue that only logged in users can see. show their email and a logout button.

The aim 47: Admin dashboard page
Actual prompt: part of site is for admin only. make AdminDashboardView.vue with a sidebar and main area.

The aim 48: Admin statistics
Actual prompt: in admin dashboard write AdminStats.vue to show some boxes with total sales and total users.

The aim 49: Admin products table
Actual prompt: write AdminProductTable.vue to list all products in a table so admin can edit or delete them.

The aim 50: 404 page
Actual prompt: what happens if user goes to wrong url? create beautiful NotFoundView.vue page that says 404 and button to go home.
