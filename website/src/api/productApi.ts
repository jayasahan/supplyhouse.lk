import axiosInstance from './axiosInstance'
import type { Product, ProductsResponse } from '@/types/product'

export const productApi = {
  async getProducts(limit = 30, skip = 0): Promise<ProductsResponse> {
    const { data } = await axiosInstance.get<ProductsResponse>('/products', {
      params: { limit, skip },
    })
    return data
  },

  async getProductById(id: number): Promise<Product> {
    const { data } = await axiosInstance.get<Product>(`/products/${id}`)
    return data
  },

  async getProductsByCategory(category: string): Promise<ProductsResponse> {
    const { data } = await axiosInstance.get<ProductsResponse>(
      `/products/category/${category}`
    )
    return data
  },

  async searchProducts(query: string): Promise<ProductsResponse> {
    const { data } = await axiosInstance.get<ProductsResponse>(
      '/products/search',
      { params: { q: query } }
    )
    return data
  },

  async getCategories(): Promise<string[]> {
    const { data } = await axiosInstance.get<{ slug: string; name: string; url: string }[]>(
      '/products/categories'
    )
    return data.map((c) => c.slug)
  },
}
