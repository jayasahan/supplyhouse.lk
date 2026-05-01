<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import CartItemComponent from './CartItem.vue'

defineProps<{
  open: boolean
}>()

defineEmits<{
  close: []
}>()

const cartStore = useCartStore()
const { items, totalItems, totalPrice } = storeToRefs(cartStore)
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="open" class="fixed inset-0 z-50">
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/40 backdrop-blur-sm"
          @click="$emit('close')"
        />

        <!-- Drawer -->
        <div
          class="absolute right-0 top-0 flex h-full w-full max-w-md flex-col liquid-glass-strong shadow-2xl"
        >
          <!-- Header -->
          <div class="flex items-center justify-between border-b px-6 py-4 border-neutral-200 dark:border-white/10">
            <h2 class="text-lg font-bold text-neutral-900 dark:text-white">
              Cart ({{ totalItems }})
            </h2>
            <button
              class="rounded-xl p-2 text-neutral-500 transition-colors hover:bg-neutral-100 dark:hover:bg-white/10"
              @click="$emit('close')"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Items -->
          <div v-if="items.length > 0" class="flex-1 overflow-y-auto px-6 py-4">
            <div class="flex flex-col gap-3">
              <CartItemComponent
                v-for="item in items"
                :key="item.product.id"
                :item="item"
              />
            </div>
          </div>

          <!-- Empty -->
          <div v-else class="flex flex-1 flex-col items-center justify-center px-6">
            <svg class="h-16 w-16 text-neutral-300 dark:text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p class="mt-4 font-medium text-neutral-500 dark:text-neutral-400">Your cart is empty</p>
            <p class="text-sm text-neutral-400 dark:text-neutral-500">Add items to get started</p>
          </div>

          <!-- Footer -->
          <div v-if="items.length > 0" class="border-t px-6 py-4 border-neutral-200 dark:border-white/10">
            <div class="mb-3 flex items-center justify-between">
              <span class="text-sm text-neutral-500 dark:text-neutral-400">Total</span>
              <span class="text-xl font-black text-neutral-900 dark:text-white">
                ${{ totalPrice.toFixed(2) }}
              </span>
            </div>
            <RouterLink
              to="/cart"
              class="block w-full rounded-xl bg-black py-3 text-center text-sm font-semibold text-white transition-all hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              @click="$emit('close')"
            >
              View Cart
            </RouterLink>
            <button
              class="mt-2 w-full rounded-xl py-2 text-center text-xs font-medium text-neutral-500 transition-colors hover:text-red-500"
              @click="cartStore.clearCart()"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.3s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from > div:last-child,
.drawer-leave-to > div:last-child {
  transform: translateX(100%);
}
</style>
