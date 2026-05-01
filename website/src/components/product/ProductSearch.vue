<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="relative">
    <svg
      class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input
      :value="modelValue"
      type="text"
      placeholder="Search products..."
      class="w-full rounded-xl border bg-white/50 py-3 pl-11 pr-4 text-sm text-neutral-900 placeholder-neutral-400 backdrop-blur-xl transition-all duration-300 outline-none border-neutral-200 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:bg-black/30 dark:border-white/10 dark:text-white dark:placeholder-neutral-500 dark:focus:border-white/30 dark:focus:ring-white/10"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button
      v-if="modelValue"
      class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-white transition-colors"
      @click="$emit('update:modelValue', '')"
    >
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
