import { useCartStore } from '@/stores/cartStore'
import type { Product } from '@/types/product'

export function useCart() {
  const cartStore = useCartStore()

  function addToCart(product: Product, quantity = 1): void {
    cartStore.addToCart(product, quantity)
  }

  function removeFromCart(productId: number): void {
    cartStore.removeFromCart(productId)
  }

  function updateQuantity(productId: number, quantity: number): void {
    cartStore.updateQuantity(productId, quantity)
  }

  function clearCart(): void {
    cartStore.clearCart()
  }

  return {
    items: cartStore.items,
    totalItems: cartStore.totalItems,
    totalPrice: cartStore.totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
}
