<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'
import GlassButton from '@/components/ui/GlassButton.vue'

const cartStore = useCartStore()
const { totalItems, totalPrice } = storeToRefs(cartStore)
</script>

<template>
  <div class="rounded-2xl liquid-glass-strong p-5">
    <h3 class="text-lg font-bold text-neutral-900 dark:text-white">Order Summary</h3>

    <div class="mt-4 space-y-3">
      <div class="flex items-center justify-between text-sm">
        <span class="text-neutral-500 dark:text-neutral-400">Items ({{ totalItems }})</span>
        <span class="font-medium text-neutral-900 dark:text-white">${{ totalPrice.toFixed(2) }}</span>
      </div>
      <div class="flex items-center justify-between text-sm">
        <span class="text-neutral-500 dark:text-neutral-400">Shipping</span>
        <span class="font-medium text-neutral-900 dark:text-white">Free</span>
      </div>
      <div class="border-t border-neutral-200 dark:border-white/10 pt-3">
        <div class="flex items-center justify-between">
          <span class="text-base font-bold text-neutral-900 dark:text-white">Total</span>
          <span class="text-xl font-black text-neutral-900 dark:text-white">${{ totalPrice.toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <GlassButton class="mt-5 w-full" size="lg" @click="() => {}">
      Checkout
    </GlassButton>
  </div>
</template>
