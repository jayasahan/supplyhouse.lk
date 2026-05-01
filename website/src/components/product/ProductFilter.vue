<script setup lang="ts">
defineProps<{
  categories: string[]
  selectedCategory: string
}>()

defineEmits<{
  'update:selectedCategory': [value: string]
}>()

function formatCategory(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      :class="[
        'rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 border',
        selectedCategory === ''
          ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
          : 'bg-white/50 text-neutral-600 border-neutral-200 hover:bg-neutral-100 dark:bg-white/5 dark:text-neutral-400 dark:border-white/10 dark:hover:bg-white/10',
      ]"
      @click="$emit('update:selectedCategory', '')"
    >
      All
    </button>
    <button
      v-for="cat in categories"
      :key="cat"
      :class="[
        'rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 border',
        selectedCategory === cat
          ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
          : 'bg-white/50 text-neutral-600 border-neutral-200 hover:bg-neutral-100 dark:bg-white/5 dark:text-neutral-400 dark:border-white/10 dark:hover:bg-white/10',
      ]"
      @click="$emit('update:selectedCategory', cat)"
    >
      {{ formatCategory(cat) }}
    </button>
  </div>
</template>
