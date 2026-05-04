import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem } from '@/types/cart'
import type { Product } from '@/types/product'

export const useCartStore = defineStore('cart', () => {  // Define a Pinia store named 'cart'
  const items = ref<CartItem[]>([])   // Reactive reference to an array of CartItem objects, representing the items in the shopping cart

  const totalItems = computed(() =>   // Computed property to calculate the total number of items in the cart by summing the quantity of each CartItem
    items.value.reduce((sum, item) => sum + item.quantity, 0)  // Use the reduce method to iterate over the items array and accumulate the total quantity
  )

  const totalPrice = computed(() =>  // Computed property to calculate the total price of the items in the cart by summing the product of price and quantity for each CartItem
    items.value.reduce(    // Use the reduce method to iterate over the items array and accumulate the total price
      (sum, item) => sum + item.product.price * item.quantity,   // For each CartItem, multiply the product's price by its quantity and add it to the accumulated sum
      0
    )
  )

  function initialize(): void {   // Function to initialize the cart by loading any existing cart data from localStorage
    const stored = localStorage.getItem('supplyhouse_cart')   // Retrieve the stored cart data from localStorage using the key 'supplyhouse_cart'
    if (stored) {  // If there is stored cart data, parse it from JSON and set the items reference to the parsed array of CartItem objects
      items.value = JSON.parse(stored) as CartItem[]   // Parse the stored JSON string into an array of CartItem objects and assign it to the items reference
    }
  }

  function persist(): void {  // Function to persist the current state of the cart to localStorage by converting the items array to a JSON string and storing it under the key 'supplyhouse_cart'
    localStorage.setItem('supplyhouse_cart', JSON.stringify(items.value))  // Convert the items array to a JSON string and store it in localStorage under the key 'supplyhouse_cart'
  }

  function addToCart(product: Product, quantity = 1): void {  // Function to add a product to the cart with a specified quantity (default is 1)
    const existing = items.value.find((i) => i.product.id === product.id)   // Check if the product already exists in the cart by finding a CartItem with a matching product ID 
    if (existing) {
      existing.quantity += quantity  // If the product already exists in the cart, increase its quantity by the specified amount
    } else {                                
      items.value.push({ product, quantity })   // If the product does not exist in the cart, create a new CartItem with the product and quantity and add it to the items array
    }
    persist()        // After adding the product to the cart, call the persist function to save the updated cart state to localStorage
  }

  function removeFromCart(productId: number): void {   // Function to remove a product from the cart by its product ID
    items.value = items.value.filter((i) => i.product.id !== productId)  // Filter the items array to create a new array that excludes the CartItem with the specified product ID, effectively removing it from the cart
    persist()   // After removing the product from the cart, call the persist function to save the updated cart state to localStorage
  }

  function updateQuantity(productId: number, quantity: number): void {  // Function to update the quantity of a specific product in the cart by its product ID
    const item = items.value.find((i) => i.product.id === productId)  // Find the CartItem in the items array that matches the specified product ID
    if (item) {
      if (quantity <= 0) {    // If the updated quantity is less than or equal to 0, call the removeFromCart function to remove the product from the cart
        removeFromCart(productId)  // Remove the product from the cart if the updated quantity is less than or equal to 0
      } else {
        item.quantity = quantity  // If the updated quantity is greater than 0, update the quantity of the CartItem to the new value
        persist()  // After updating the quantity of the product in the cart, call the persist function to save the updated cart state to localStorage
      }
    }
  }

  function clearCart(): void {
    items.value = []  // Clear the cart by setting the items array to an empty array
    persist()   // After clearing the cart, call the persist function to save the updated (empty) cart state to localStorage
  }

  return {   // Return the state and actions of the cart store for use in components
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
