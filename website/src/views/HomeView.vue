<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useProducts } from '@/composables/useProducts'
import type { Product } from '@/types/product'
import ProductGrid from '@/components/product/ProductGrid.vue'
import ProductFilter from '@/components/product/ProductFilter.vue'
import ProductSearch from '@/components/product/ProductSearch.vue'
import HeroCardShuffle from '@/components/product/HeroCardShuffle.vue'
import ProductDetailModal from '@/components/product/ProductDetailModal.vue'

const {
  products,
  categories,
  loading,
  fetchProducts,
  fetchByCategory,
  searchProducts,
  fetchCategories,
} = useProducts()

const searchQuery = ref('')
const selectedCategory = ref('')
let debounceTimer: ReturnType<typeof setTimeout> | null = null

// Modal detail state
const detailProductId = ref<number | null>(null)
const detailOriginRect = ref<DOMRect | null>(null)

function openProductDetail(product: Product, rect: DOMRect): void {
  detailOriginRect.value = rect
  detailProductId.value = product.id
}

function closeProductDetail(): void {
  detailProductId.value = null
  detailOriginRect.value = null
}

onMounted(async () => {
  await Promise.all([fetchProducts(100), fetchCategories()])
})

watch(selectedCategory, async (cat) => {
  searchQuery.value = ''
  if (cat) {
    await fetchByCategory(cat)
  } else {
    await fetchProducts(100)
  }
})

watch(searchQuery, (query) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(async () => {
    selectedCategory.value = ''
    if (query.trim()) {
      await searchProducts(query.trim())
    } else {
      await fetchProducts(100)
    }
  }, 400)
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-neutral-100 dark:bg-neutral-900 transition-colors">
      <!-- Glass orb decorations -->
      <div class="glass-orb -right-20 -top-20 h-80 w-80 bg-blue-200 dark:bg-blue-500" />
      <div class="glass-orb -bottom-10 left-1/4 h-60 w-60 bg-purple-200 dark:bg-purple-500" />
      <div class="glass-orb right-1/3 top-1/3 h-40 w-40 bg-amber-200 dark:bg-amber-500" />

      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div class="relative z-10 grid items-center gap-10 lg:grid-cols-2">
          <!-- Left: Text content -->
          <div class="max-w-2xl">
            <div class="liquid-glass inline-block rounded-full px-4 py-1.5 mb-6">
              <span class="text-xs font-semibold uppercase tracking-widest text-neutral-600 dark:text-neutral-300">
                Your Department Store, Delivered
              </span>
            </div>
            <h1
              class="text-5xl font-black tracking-tight text-black sm:text-6xl lg:text-7xl dark:text-white"
            >
              SUPPLY<span class="text-neutral-400 dark:text-neutral-500">HOUSE</span>
            </h1>
            <p class="mt-6 max-w-lg text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
              Everything you need, all in one place. From electronics to groceries, beauty to home — discover quality products at great prices.
            </p>
            <div class="mt-8 flex gap-3">
              <a href="#shop" class="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-neutral-800 hover:shadow-lg dark:bg-white dark:text-black dark:hover:bg-neutral-200">
                Shop Now
              </a>
            </div>
          </div>

          <!-- Right: Card shuffle -->
          <div class="hidden sm:flex items-center justify-center">
            <HeroCardShuffle />
          </div>
        </div>
      </div>
    </section>

    <!-- Shop Section -->
    <section id="shop" class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 flex flex-col gap-6">
        <div class="flex flex-col gap-1">
          <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">All Departments</h2>
          <p class="text-sm text-neutral-500 dark:text-neutral-400">
            {{ products.length }} products available
          </p>
        </div>

        <!-- Search -->
        <div class="max-w-md">
          <ProductSearch v-model="searchQuery" />
        </div>

        <!-- Filters -->
        <ProductFilter
          :categories="categories"
          :selected-category="selectedCategory"
          @update:selected-category="selectedCategory = $event"
        />
      </div>

      <!-- Grid -->
      <ProductGrid :products="products" :loading="loading" @open-detail="openProductDetail" />
    </section>

    <!-- Product Detail Modal -->
    <ProductDetailModal
      :product-id="detailProductId"
      :origin-rect="detailOriginRect"
      @close="closeProductDetail"
    />
  </div>
</template>
