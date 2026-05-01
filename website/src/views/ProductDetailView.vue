<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProducts } from '@/composables/useProducts'
import { useCartStore } from '@/stores/cartStore'
import ProductGallery from '@/components/product/ProductGallery.vue'
import GlassButton from '@/components/ui/GlassButton.vue'
import Loader from '@/components/ui/Loader.vue'

const route = useRoute()
const router = useRouter()
const { product, loading, error, fetchProductById } = useProducts()
const cartStore = useCartStore()

onMounted(async () => {
  const id = Number(route.params.id)
  if (isNaN(id)) {
    await router.push('/')
    return
  }
  await fetchProductById(id)
})

function handleAddToCart(): void {
  if (product.value) {
    cartStore.addToCart(product.value)
  }
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <!-- Back -->
    <button
      class="mb-6 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-black dark:hover:text-white"
      @click="router.back()"
    >
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Back to shop
    </button>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-32">
      <Loader size="lg" />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="flex flex-col items-center justify-center py-32">
      <p class="text-lg text-red-500">{{ error }}</p>
      <GlassButton class="mt-4" @click="router.push('/')">Go Home</GlassButton>
    </div>

    <!-- Product -->
    <div v-else-if="product" class="grid gap-10 lg:grid-cols-2">
      <!-- Gallery -->
      <ProductGallery :images="product.images" :title="product.title" />

      <!-- Details -->
      <div class="flex flex-col gap-6">
        <!-- Category -->
        <span class="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          {{ product.brand || product.category }}
        </span>

        <!-- Title -->
        <h1 class="text-3xl font-black text-neutral-900 dark:text-white sm:text-4xl">
          {{ product.title }}
        </h1>

        <!-- Rating -->
        <div class="flex items-center gap-2">
          <div class="flex">
            <svg
              v-for="i in 5"
              :key="i"
              class="h-4 w-4"
              :class="i <= Math.round(product.rating) ? 'text-neutral-800 dark:text-white' : 'text-neutral-200 dark:text-neutral-700'"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span class="text-sm text-neutral-500">{{ product.rating.toFixed(1) }} rating</span>
          <span class="text-sm text-neutral-400">·</span>
          <span class="text-sm text-neutral-500">{{ product.stock }} in stock</span>
        </div>

        <!-- Price -->
        <div class="flex items-baseline gap-3">
          <span class="text-3xl font-black text-neutral-900 dark:text-white">
            ${{ product.price.toFixed(2) }}
          </span>
          <span
            v-if="product.discountPercentage > 10"
            class="text-lg text-neutral-400 line-through"
          >
            ${{ (product.price / (1 - product.discountPercentage / 100)).toFixed(2) }}
          </span>
          <span
            v-if="product.discountPercentage > 10"
            class="rounded-full bg-black px-3 py-1 text-xs font-bold text-white dark:bg-white dark:text-black"
          >
            -{{ Math.round(product.discountPercentage) }}%
          </span>
        </div>

        <!-- Description -->
        <p class="leading-relaxed text-neutral-600 dark:text-neutral-400">
          {{ product.description }}
        </p>

        <!-- Tags -->
        <div v-if="product.tags?.length" class="flex flex-wrap gap-2">
          <span
            v-for="tag in product.tags"
            :key="tag"
            class="rounded-full border px-3 py-1 text-xs font-medium text-neutral-500 border-neutral-200 dark:border-white/10 dark:text-neutral-400"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Add to Cart -->
        <div class="mt-4 flex flex-col gap-3 sm:flex-row">
          <GlassButton size="lg" class="flex-1" @click="handleAddToCart">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Add to Cart
          </GlassButton>
        </div>
      </div>
    </div>
  </div>
</template>
