<script setup lang="ts">
import type { Product } from '@/types/product'

defineProps<{
  products: Product[]
}>()

defineEmits<{
  edit: [product: Product]
  delete: [id: number]
}>()
</script>

<template>
  <div class="overflow-x-auto rounded-2xl border bg-white/70 backdrop-blur-xl border-neutral-200/50 dark:bg-black/40 dark:border-white/10">
    <table class="w-full text-left text-sm">
      <thead>
        <tr class="border-b border-neutral-200 dark:border-white/10">
          <th class="px-4 py-3 font-semibold text-neutral-500 dark:text-neutral-400">Product</th>
          <th class="px-4 py-3 font-semibold text-neutral-500 dark:text-neutral-400">Category</th>
          <th class="px-4 py-3 font-semibold text-neutral-500 dark:text-neutral-400">Price</th>
          <th class="px-4 py-3 font-semibold text-neutral-500 dark:text-neutral-400">Stock</th>
          <th class="px-4 py-3 font-semibold text-neutral-500 dark:text-neutral-400">Rating</th>
          <th class="px-4 py-3 font-semibold text-neutral-500 dark:text-neutral-400">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in products"
          :key="product.id"
          class="border-b border-neutral-100 transition-colors hover:bg-neutral-50 dark:border-white/5 dark:hover:bg-white/5"
        >
          <td class="px-4 py-3">
            <div class="flex items-center gap-3">
              <img
                :src="product.thumbnail"
                :alt="product.title"
                class="h-10 w-10 rounded-lg object-cover"
              />
              <span class="font-medium text-neutral-900 dark:text-white truncate max-w-[200px]">
                {{ product.title }}
              </span>
            </div>
          </td>
          <td class="px-4 py-3 text-neutral-500 dark:text-neutral-400 capitalize">
            {{ product.category }}
          </td>
          <td class="px-4 py-3 font-medium text-neutral-900 dark:text-white">
            ${{ product.price.toFixed(2) }}
          </td>
          <td class="px-4 py-3">
            <span
              :class="[
                'inline-block rounded-full px-2.5 py-0.5 text-xs font-bold',
                product.stock > 50
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : product.stock > 10
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
              ]"
            >
              {{ product.stock }}
            </span>
          </td>
          <td class="px-4 py-3 text-neutral-500 dark:text-neutral-400">
            {{ product.rating.toFixed(1) }}
          </td>
          <td class="px-4 py-3">
            <div class="flex items-center gap-2">
              <button
                class="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-blue-600 dark:hover:bg-white/10"
                @click="$emit('edit', product)"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                class="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                @click="$emit('delete', product.id)"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
