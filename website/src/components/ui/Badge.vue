<script setup lang="ts">
defineProps<{
  count: number
}>()
</script>

<template>
  <span
    v-if="count > 0"
    class="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-xs font-bold text-white dark:bg-white dark:text-black"
  >
    {{ count > 99 ? '99+' : count }}
  </span>
</template>
