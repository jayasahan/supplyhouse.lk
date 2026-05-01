<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import CartItemComponent from '@/components/cart/CartItem.vue'
import CartSummary from '@/components/cart/CartSummary.vue'

const cartStore = useCartStore()
const { items, totalItems } = storeToRefs(cartStore)
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-black text-neutral-900 dark:text-white">Shopping Cart</h1>
    <p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{{ totalItems }} items in your cart</p>

    <div v-if="items.length > 0" class="mt-8 grid gap-8 lg:grid-cols-3">
      <!-- Items -->
      <div class="lg:col-span-2">
        <div class="flex flex-col gap-3">
          <CartItemComponent
            v-for="item in items"
            :key="item.product.id"
            :item="item"
          />
        </div>
      </div>

      <!-- Summary -->
      <div>
        <CartSummary />
      </div>
    </div>

    <!-- Empty -->
    <div v-else class="flex flex-col items-center justify-center py-24">
      <svg class="h-20 w-20 text-neutral-300 dark:text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <h2 class="mt-6 text-xl font-bold text-neutral-700 dark:text-neutral-300">Your cart is empty</h2>
      <p class="mt-2 text-neutral-500 dark:text-neutral-400">Browse products and add items to your cart</p>
      <RouterLink
        to="/"
        class="mt-6 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
      >
        Continue Shopping
      </RouterLink>
    </div>
  </div>
</template>
