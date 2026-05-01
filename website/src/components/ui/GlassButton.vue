<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 cursor-pointer',
      'backdrop-blur-xl border',
      'disabled:opacity-50 disabled:cursor-not-allowed',

      variant === 'secondary'
        ? 'bg-white/20 border-white/30 text-neutral-800 hover:bg-white/40 dark:bg-white/10 dark:border-white/20 dark:text-white dark:hover:bg-white/20'
        : variant === 'ghost'
          ? 'bg-transparent border-transparent text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-white/10'
          : 'bg-black text-white border-black/80 hover:bg-neutral-800 dark:bg-white dark:text-black dark:border-white/80 dark:hover:bg-neutral-200',

      size === 'sm' ? 'px-3 py-1.5 text-sm' : size === 'lg' ? 'px-8 py-3 text-lg' : 'px-5 py-2.5 text-base',
    ]"
    @click="$emit('click')"
  >
    <svg
      v-if="loading"
      class="h-4 w-4 animate-spin"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
    <slot />
  </button>
</template>
