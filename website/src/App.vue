<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { useUiStore } from '@/stores/uiStore'
import NavBar from '@/components/layout/NavBar.vue'
import Footer from '@/components/layout/Footer.vue'
import CartDrawer from '@/components/cart/CartDrawer.vue'
import ScrollToTop from '@/components/ui/ScrollToTop.vue'

const authStore = useAuthStore()   // Create an instance of the authentication store using the `useAuthStore` function. This store will manage the user's authentication state, including login status, user information, and any related actions such as logging in or out. By initializing this store on component mount, we ensure that the application can check for existing authentication tokens or sessions and set up the user's state accordingly when the app is loaded.
const cartStore = useCartStore()  // Create an instance of the cart store using the `useCartStore` function. This store will manage the state of the shopping cart, including the items added to the cart, quantities, and any related actions such as adding or removing items. By initializing this store on component mount, we ensure that the application can load any existing cart data from local storage or a backend service, allowing users to continue where they left off with their shopping experience.
const uiStore = useUiStore()  // Create an instance of the UI store using the `useUiStore` function. This store will manage the state of the user interface, including theme settings (light/dark mode), modal visibility, and any other UI-related states. By initializing this store on component mount, we ensure that the application can load any saved UI preferences from local storage or a backend service, providing a personalized and consistent user experience across sessions.

const cartDrawerOpen = ref(false)  // Define a reactive reference named `cartDrawerOpen` initialized to `false`. This variable will be used to control the visibility of the cart drawer component. When `cartDrawerOpen` is set to `true`, the cart drawer will be displayed, allowing users to view and manage their shopping cart. When set to `false`, the cart drawer will be hidden. This reactive reference allows for dynamic updates to the UI based on user interactions, such as clicking a button to open or close the cart drawer.
 
onMounted(() => {
  authStore.initialize()    // Call the `initialize` method of the authentication store when the component is mounted. This method is responsible for setting up the initial state of the authentication system, such as checking for existing authentication tokens, validating user sessions, and loading any necessary user data. By calling this method on mount, we ensure that the application can properly manage user authentication and provide a seamless experience for returning users.
  cartStore.initialize()    // Call the `initialize` method of the cart store when the component is mounted. This method is responsible for setting up the initial state of the shopping cart, such as loading any existing cart data from local storage or a backend service. By calling this method on mount, we ensure that users can continue their shopping experience without losing their cart contents, providing a smooth and consistent user experience.
  uiStore.initialize()      // Call the `initialize` method of the UI store when the component is mounted. This method is responsible for setting up the initial state of the user interface, such as loading any saved UI preferences (e.g., theme settings) from local storage or a backend service. By calling this method on mount, we ensure that users can have a personalized and consistent UI experience based on their previous interactions with the application.
})

function toggleCart(): void {
  cartDrawerOpen.value = !cartDrawerOpen.value   // Define a function named `toggleCart` that toggles the value of `cartDrawerOpen`. This function will be called when the user interacts with a UI element (e.g., a button) to open or close the cart drawer. By negating the current value of `cartDrawerOpen`, this function allows for seamless toggling between showing and hiding the cart drawer, enhancing the user experience by providing easy access to the shopping cart.
}
</script>

<template>
  <div class="min-h-screen bg-white text-neutral-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-white">
    <NavBar @toggle-cart="toggleCart" />   // Render the `NavBar` component and listen for the `toggle-cart` event. When the `toggle-cart` event is emitted by the `NavBar`, the `toggleCart` function will be called, allowing users to open or close the cart drawer from the navigation bar. This integration provides a convenient way for users to access their shopping cart from anywhere in the application.

    <main>
      <RouterView v-slot="{ Component }">   // Use the `RouterView` component to render the matched component for the current route. The `v-slot` directive is used to access the `Component` that corresponds to the current route, allowing us to apply a transition effect when navigating between pages. By wrapping the `Component` in a `Transition` component, we can create smooth animations for page transitions, enhancing the overall user experience when navigating through the application.
        <Transition name="page" mode="out-in">  // Wrap the dynamically rendered `Component` in a `Transition` component with the name "page" and mode "out-in". This setup allows for smooth transitions between different pages or views in the application. The "out-in" mode ensures that the current page will transition out before the new page transitions in, creating a seamless and visually appealing navigation experience for users as they move through different routes in the application. 
          <component :is="Component" />  // Dynamically render the component corresponding to the current route using the `component` element. The `:is` directive is used to specify which component to render based on the value of `Component`, which is provided by the `RouterView`. This allows for dynamic rendering of different pages or views in the application as users navigate through different routes, while also applying the defined transition effects for a smoother user experience.
        </Transition>
      </RouterView>
    </main>

    <Footer />
    <CartDrawer :open="cartDrawerOpen" @close="cartDrawerOpen = false" />     // Render the `CartDrawer` component and bind its `open` prop to the `cartDrawerOpen` reactive reference. This allows the cart drawer to be shown or hidden based on the value of `cartDrawerOpen`. Additionally, listen for the `close` event emitted by the `CartDrawer`, and when this event is triggered, set `cartDrawerOpen` to `false` to hide the cart drawer. This integration provides a seamless way for users to manage their shopping cart, allowing them to easily open and close the cart drawer as needed while navigating through the application.
    <ScrollToTop />
  </div>
</template>

<style>
.page-enter-active,   
.page-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease; 
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
