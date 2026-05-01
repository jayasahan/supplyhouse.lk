<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
  type?: string
  label?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label
      v-if="label"
      class="text-sm font-medium text-neutral-600 dark:text-neutral-400"
    >
      {{ label }}
    </label>
    <input
      :value="modelValue"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      class="w-full rounded-xl border bg-white/50 px-4 py-2.5 text-neutral-900 placeholder-neutral-400 backdrop-blur-xl transition-all duration-300 outline-none border-neutral-200 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:bg-black/30 dark:border-white/10 dark:text-white dark:placeholder-neutral-500 dark:focus:border-white/30 dark:focus:ring-white/10"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
