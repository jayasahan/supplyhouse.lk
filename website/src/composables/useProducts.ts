import { ref } from 'vue'
import { productApi } from '@/api/productApi'
import type { Product, ProductsResponse } from '@/types/product'

export function useProducts() {
  const products = ref<Product[]>([])
  const product = ref<Product | null>(null)
  const categories = ref<string[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const total = ref(0)

  async function fetchProducts(limit = 30, skip = 0): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const data: ProductsResponse = await productApi.getProducts(limit, skip)
      products.value = data.products
      total.value = data.total
    } catch {
      error.value = 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  async function fetchProductById(id: number): Promise<void> {
    loading.value = true
    error.value = null
    try {
      product.value = await productApi.getProductById(id)
    } catch {
      error.value = 'Failed to fetch product'
    } finally {
      loading.value = false
    }
  }

  async function fetchByCategory(category: string): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const data: ProductsResponse = await productApi.getProductsByCategory(category)
      products.value = data.products
      total.value = data.total
    } catch {
      error.value = 'Failed to fetch products by category'
    } finally {
      loading.value = false
    }
  }

  async function searchProducts(query: string): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const data: ProductsResponse = await productApi.searchProducts(query)
      products.value = data.products
      total.value = data.total
    } catch {
      error.value = 'Failed to search products'
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories(): Promise<void> {
    try {
      categories.value = await productApi.getCategories()
    } catch {
      error.value = 'Failed to fetch categories'
    }
  }

  return {
    products,
    product,
    categories,
    loading,
    error,
    total,
    fetchProducts,
    fetchProductById,
    fetchByCategory,
    searchProducts,
    fetchCategories,
  }
}
