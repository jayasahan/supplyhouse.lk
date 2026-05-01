<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useProducts } from '@/composables/useProducts'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import type { Product } from '@/types/product'
import AdminStats from '@/components/dashboard/AdminStats.vue'
import AdminProductTable from '@/components/dashboard/AdminProductTable.vue'
import Modal from '@/components/ui/Modal.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import GlassButton from '@/components/ui/GlassButton.vue'
import Loader from '@/components/ui/Loader.vue'

const { products, loading, fetchProducts } = useProducts()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const editingProduct = ref<Product | null>(null)
const editModalOpen = ref(false)
const editTitle = ref('')
const editPrice = ref('')

const localProducts = ref<Product[]>([])

const totalRevenue = computed(() =>
  localProducts.value.reduce((sum, p) => sum + p.price, 0)
)

const avgRating = computed(() => {
  if (localProducts.value.length === 0) return 0
  return localProducts.value.reduce((sum, p) => sum + p.rating, 0) / localProducts.value.length
})

const lowStock = computed(() =>
  localProducts.value.filter((p) => p.stock < 20).length
)

onMounted(async () => {
  await fetchProducts(30)
  localProducts.value = [...products.value]
})

function handleEdit(product: Product): void {
  editingProduct.value = product
  editTitle.value = product.title
  editPrice.value = String(product.price)
  editModalOpen.value = true
}

function saveEdit(): void {
  if (!editingProduct.value) return
  const index = localProducts.value.findIndex((p) => p.id === editingProduct.value!.id)
  const existing = localProducts.value[index]
  if (index !== -1 && existing) {
    localProducts.value[index] = {
      id: existing.id,
      title: editTitle.value,
      description: existing.description,
      price: Number(editPrice.value) || existing.price,
      discountPercentage: existing.discountPercentage,
      rating: existing.rating,
      stock: existing.stock,
      brand: existing.brand,
      category: existing.category,
      thumbnail: existing.thumbnail,
      images: existing.images,
      tags: existing.tags,
    }
  }
  editModalOpen.value = false
  editingProduct.value = null
}

function handleDelete(id: number): void {
  localProducts.value = localProducts.value.filter((p) => p.id !== id)
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-black text-neutral-900 dark:text-white">Admin Dashboard</h1>
      <p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Welcome back, {{ user?.firstName || 'Admin' }}
      </p>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-32">
      <Loader size="lg" />
    </div>

    <div v-else>
      <!-- Stats -->
      <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStats title="Total Products" :value="localProducts.length" icon="📦" />
        <AdminStats title="Total Revenue" :value="`$${totalRevenue.toFixed(0)}`" icon="💰" />
        <AdminStats title="Avg Rating" :value="avgRating.toFixed(1)" icon="⭐" />
        <AdminStats title="Low Stock" :value="lowStock" icon="⚠️" />
      </div>

      <!-- Product Table -->
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-bold text-neutral-900 dark:text-white">Products</h2>
        <span class="text-sm text-neutral-500 dark:text-neutral-400">
          {{ localProducts.length }} items
        </span>
      </div>

      <AdminProductTable
        :products="localProducts"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>

    <!-- Edit Modal -->
    <Modal :show="editModalOpen" @close="editModalOpen = false">
      <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-4">Edit Product</h3>
      <div class="flex flex-col gap-4">
        <BaseInput v-model="editTitle" label="Title" placeholder="Product title" />
        <BaseInput v-model="editPrice" label="Price" placeholder="Price" type="number" />
        <div class="flex gap-3 mt-2">
          <GlassButton variant="secondary" class="flex-1" @click="editModalOpen = false">
            Cancel
          </GlassButton>
          <GlassButton class="flex-1" @click="saveEdit">
            Save Changes
          </GlassButton>
        </div>
      </div>
    </Modal>
  </div>
</template>
