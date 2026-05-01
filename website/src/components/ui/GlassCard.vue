<script setup lang="ts">
defineProps<{
  hover?: boolean
  padding?: string
  strong?: boolean
}>()
</script>

<template>
  <div
    :class="[
      'rounded-2xl transition-all duration-300',
      strong ? 'liquid-glass-strong' : 'liquid-glass',
      hover ? 'liquid-glass-hover cursor-pointer' : '',
      padding ?? 'p-6',
    ]"
  >
    <slot />
  </div>
</template>
