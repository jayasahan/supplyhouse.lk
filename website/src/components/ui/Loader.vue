<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div class="flex items-center justify-center">
    <div
      :class="[
        'animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-800 dark:border-neutral-700 dark:border-t-white',
        size === 'sm' ? 'h-5 w-5' : size === 'lg' ? 'h-12 w-12' : 'h-8 w-8',
      ]"
    />
  </div>
</template>
