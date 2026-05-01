<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
  icon: string
}>()
</script>

<template>
  <div class="rounded-2xl border bg-white/70 p-5 backdrop-blur-xl transition-all duration-300 hover:shadow-lg border-neutral-200/50 dark:bg-black/40 dark:border-white/10">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-wider text-neutral-400">{{ title }}</p>
        <p class="mt-1 text-2xl font-black text-neutral-900 dark:text-white">{{ value }}</p>
      </div>
      <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 dark:bg-white/10">
        <span class="text-xl">{{ icon }}</span>
      </div>
    </div>
  </div>
</template>
