import axiosInstance from './axiosInstance'
import type { Product, ProductsResponse } from '@/types/product'

export const productApi = {    // Object containing functions related to product API calls, such as fetching products, fetching a product by ID, fetching products by category, searching products, and fetching categories
  async getProducts(limit = 30, skip = 0): Promise<ProductsResponse> {
    const { data } = await axiosInstance.get<ProductsResponse>('/products', {
      params: { limit, skip },
    })
    return data
  },

  async getProductById(id: number): Promise<Product> {   // Asynchronous function to fetch a single product by its ID by sending a GET request to the '/products/{id}' endpoint, where {id} is the ID of the product to be fetched. The function returns a promise that resolves to a Product object containing the details of the requested product.
    const { data } = await axiosInstance.get<Product>(`/products/${id}`)
    return data
  },

  async getProductsByCategory(category: string): Promise<ProductsResponse> {  // Asynchronous function to fetch products by category by sending a GET request to the '/products/category/{category}' endpoint, where {category} is the name of the category for which products are to be fetched. The function returns a promise that resolves to a ProductsResponse object containing an array of Product objects that belong to the specified category, along with pagination information such as total number of products, skip value, and limit value.
    const { data } = await axiosInstance.get<ProductsResponse>(
      `/products/category/${category}`
    )
    return data
  },

  async searchProducts(query: string): Promise<ProductsResponse> {  // Asynchronous function to search for products by sending a GET request to the '/products/search' endpoint with a query parameter 'q' that contains the search term. The function returns a promise that resolves to a ProductsResponse object containing an array of Product objects that match the search query, along with pagination information such as total number of products, skip value, and limit value.
    const { data } = await axiosInstance.get<ProductsResponse>(
      '/products/search',
      { params: { q: query } }
    )
    return data
  },

  async getCategories(): Promise<string[]> {   // Asynchronous function to fetch the list of product categories by sending a GET request to the '/products/categories' endpoint. The function returns a promise that resolves to an array of strings, where each string is the slug of a product category. This allows the application to display or use the list of available product categories for filtering or navigation purposes.
    const { data } = await axiosInstance.get<{ slug: string; name: string; url: string }[]>(
      '/products/categories'
    )
    return data.map((c) => c.slug)   // Map the response data, which is an array of objects containing category information (slug, name, url), to an array of strings containing only the slug of each category. This simplifies the data structure for use in the application, allowing it to work with a simple list of category slugs instead of more complex objects when displaying categories or filtering products by category.
  },
}
