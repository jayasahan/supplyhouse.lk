<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { useUiStore } from '@/stores/uiStore'
import NavBar from '@/components/layout/NavBar.vue'
import Footer from '@/components/layout/Footer.vue'
import CartDrawer from '@/components/cart/CartDrawer.vue'
import ScrollToTop from '@/components/ui/ScrollToTop.vue'

const authStore = useAuthStore()
const cartStore = useCartStore()
const uiStore = useUiStore()

const cartDrawerOpen = ref(false)

onMounted(() => {
  authStore.initialize()
  cartStore.initialize()
  uiStore.initialize()
})

function toggleCart(): void {
  cartDrawerOpen.value = !cartDrawerOpen.value
}
</script>

<template>
  <div class="min-h-screen bg-white text-neutral-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-white">
    <NavBar @toggle-cart="toggleCart" />

    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <Footer />
    <CartDrawer :open="cartDrawerOpen" @close="cartDrawerOpen = false" />
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
