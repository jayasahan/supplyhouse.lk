export interface Product {   // Interface representing the structure of a product, containing various properties such as id, title, description, price, discount percentage, rating, stock, brand, category, thumbnail, images, and tags. This interface can be used to type-check the data when handling products in the application.
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
  tags: string[]
}

export interface ProductsResponse {   // Interface representing the structure of the response received when fetching a list of products, containing an array of Product objects, total number of products, skip value for pagination, and limit value for pagination. This interface can be used to type-check the data when processing the response from a products API endpoint in the application.
  products: Product[]
  total: number
  skip: number
  limit: number
}
