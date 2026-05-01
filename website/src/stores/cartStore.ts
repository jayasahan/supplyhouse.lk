import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem } from '@/types/cart'
import type { Product } from '@/types/product'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
  )

  function initialize(): void {
    const stored = localStorage.getItem('supplyhouse_cart')
    if (stored) {
      items.value = JSON.parse(stored) as CartItem[]
    }
  }

  function persist(): void {
    localStorage.setItem('supplyhouse_cart', JSON.stringify(items.value))
  }

  function addToCart(product: Product, quantity = 1): void {
    const existing = items.value.find((i) => i.product.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ product, quantity })
    }
    persist()
  }

  function removeFromCart(productId: number): void {
    items.value = items.value.filter((i) => i.product.id !== productId)
    persist()
  }

  function updateQuantity(productId: number, quantity: number): void {
    const item = items.value.find((i) => i.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
        persist()
      }
    }
  }

  function clearCart(): void {
    items.value = []
    persist()
  }

  return {
    items,
    totalItems,
    totalPrice,
    initialize,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
})
