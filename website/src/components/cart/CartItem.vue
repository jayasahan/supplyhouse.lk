<script setup lang="ts">
import type { CartItem } from '@/types/cart'
import { useCartStore } from '@/stores/cartStore'

defineProps<{
  item: CartItem
}>()

const cartStore = useCartStore()
</script>

<template>
  <div class="flex gap-4 rounded-xl border p-3 bg-white/50 border-neutral-200/50 dark:bg-white/5 dark:border-white/10 transition-all">
    <!-- Image -->
    <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
      <img
        :src="item.product.thumbnail"
        :alt="item.product.title"
        class="h-full w-full object-cover"
      />
    </div>

    <!-- Details -->
    <div class="flex flex-1 flex-col justify-between min-w-0">
      <div>
        <h4 class="text-sm font-semibold text-neutral-900 dark:text-white truncate">
          {{ item.product.title }}
        </h4>
        <p class="text-xs text-neutral-400">{{ item.product.brand || item.product.category }}</p>
      </div>

      <div class="flex items-center justify-between">
        <!-- Quantity Controls -->
        <div class="flex items-center gap-2">
          <button
            class="flex h-7 w-7 items-center justify-center rounded-lg border text-neutral-600 transition-all hover:bg-neutral-100 border-neutral-200 dark:border-white/10 dark:text-neutral-400 dark:hover:bg-white/10"
            @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
          >
            <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
            </svg>
          </button>
          <span class="w-6 text-center text-sm font-medium text-neutral-900 dark:text-white">
            {{ item.quantity }}
          </span>
          <button
            class="flex h-7 w-7 items-center justify-center rounded-lg border text-neutral-600 transition-all hover:bg-neutral-100 border-neutral-200 dark:border-white/10 dark:text-neutral-400 dark:hover:bg-white/10"
            @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
          >
            <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <!-- Price -->
        <span class="text-sm font-bold text-neutral-900 dark:text-white">
          ${{ (item.product.price * item.quantity).toFixed(2) }}
        </span>
      </div>
    </div>

    <!-- Remove -->
    <button
      class="self-start text-neutral-400 transition-colors hover:text-red-500"
      @click="cartStore.removeFromCart(item.product.id)"
    >
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
