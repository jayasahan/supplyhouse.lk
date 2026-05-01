<script setup lang="ts">
import type { Product } from '@/types/product'
import ProductCard from './ProductCard.vue'

defineProps<{
  products: Product[]
  loading: boolean
}>()

const emit = defineEmits<{
  'open-detail': [product: Product, rect: DOMRect]
}>()

function handleOpenDetail(product: Product, rect: DOMRect): void {
  emit('open-detail', product, rect)
}
</script>

<template>
  <div>
    <!-- Loading Skeleton -->
    <div v-if="loading" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="i in 8"
        :key="i"
        class="animate-pulse rounded-2xl liquid-glass"
      >
        <div class="aspect-square bg-neutral-200 dark:bg-neutral-800 rounded-t-2xl" />
        <div class="p-4 space-y-3">
          <div class="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-700" />
          <div class="h-4 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700" />
          <div class="h-4 w-1/3 rounded bg-neutral-200 dark:bg-neutral-700" />
        </div>
      </div>
    </div>

    <!-- Product Grid -->
    <div
      v-else-if="products.length > 0"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @open-detail="handleOpenDetail"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-20 text-center">
      <svg class="h-16 w-16 text-neutral-300 dark:text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
      <p class="mt-4 text-lg font-medium text-neutral-500 dark:text-neutral-400">No products found</p>
      <p class="text-sm text-neutral-400 dark:text-neutral-500">Try adjusting your search or filter</p>
    </div>
  </div>
</template>
