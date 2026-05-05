import type { Product } from './product'

export interface CartItem {    // Interface representing an item in the shopping cart, containing a product and its quantity. This interface can be used to type-check the data when managing the cart state in the application.
  product: Product
  quantity: number
}
