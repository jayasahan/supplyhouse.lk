<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '@/types/product'
import { useCartStore } from '@/stores/cartStore'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  'open-detail': [product: Product, rect: DOMRect]
}>()

const cartStore = useCartStore()
const cardEl = ref<HTMLElement | null>(null)

function handleAddToCart(): void {
  cartStore.addToCart(props.product)
}

function handleOpenDetail(): void {
  const rect = cardEl.value?.getBoundingClientRect()
  if (rect) {
    emit('open-detail', props.product, rect)
  }
}
</script>

<template>
  <div
    ref="cardEl"
    class="group relative flex flex-col overflow-hidden rounded-2xl liquid-glass liquid-glass-hover transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
    @click="handleOpenDetail"
  >
    <!-- Image -->
    <div class="relative aspect-square overflow-hidden">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <!-- Discount Badge -->
      <span
        v-if="product.discountPercentage > 10"
        class="absolute left-3 top-3 rounded-full bg-black px-2.5 py-1 text-xs font-bold text-white dark:bg-white dark:text-black"
      >
        -{{ Math.round(product.discountPercentage) }}%
      </span>
    </div>

    <!-- Info -->
    <div class="flex flex-1 flex-col gap-2 p-4">
      <span class="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
        {{ product.brand || product.category }}
      </span>

      <span
        class="text-sm font-semibold text-neutral-900 transition-colors line-clamp-1 hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300"
      >
        {{ product.title }}
      </span>

      <!-- Rating -->
      <div class="flex items-center gap-1">
        <div class="flex">
          <svg
            v-for="i in 5"
            :key="i"
            class="h-3 w-3"
            :class="i <= Math.round(product.rating) ? 'text-neutral-800 dark:text-white' : 'text-neutral-200 dark:text-neutral-700'"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <span class="text-[10px] text-neutral-400">{{ product.rating.toFixed(1) }}</span>
      </div>

      <!-- Price + Add -->
      <div class="mt-auto flex items-center justify-between pt-2">
        <div class="flex items-baseline gap-1.5">
          <span class="text-lg font-bold text-neutral-900 dark:text-white">
            ${{ product.price.toFixed(2) }}
          </span>
          <span
            v-if="product.discountPercentage > 10"
            class="text-xs text-neutral-400 line-through"
          >
            ${{ (product.price / (1 - product.discountPercentage / 100)).toFixed(2) }}
          </span>
        </div>

        <button
          class="rounded-xl bg-black p-2 text-white transition-all hover:bg-neutral-700 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          title="Add to cart"
          @click.stop="handleAddToCart"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
