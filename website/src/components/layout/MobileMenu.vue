<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useUiStore } from '@/stores/uiStore'
import { storeToRefs } from 'pinia'

defineProps<{
  open: boolean
}>()

defineEmits<{
  close: []
}>()

const authStore = useAuthStore()
const uiStore = useUiStore()
const { isAuthenticated } = storeToRefs(authStore)
const { isDarkMode } = storeToRefs(uiStore)
</script>

<template>
  <Transition name="slide">
    <div
      v-if="open"
      class="liquid-glass-nav border-t border-neutral-200/50 dark:border-white/10 md:hidden"
    >
      <div class="flex flex-col gap-1 px-4 py-4">
        <!-- User info (if logged in) -->
        <div v-if="isAuthenticated && authStore.user" class="mb-3 flex items-center gap-3 rounded-xl bg-neutral-100/60 px-4 py-3 dark:bg-white/5">
          <div class="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 text-xs font-bold text-white dark:from-neutral-200 dark:to-neutral-400 dark:text-black">
            {{ authStore.user.firstName?.charAt(0) }}{{ authStore.user.lastName?.charAt(0) }}
          </div>
          <div>
            <p class="text-sm font-semibold text-neutral-900 dark:text-white">{{ authStore.user.firstName }} {{ authStore.user.lastName }}</p>
            <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ authStore.user.email }}</p>
          </div>
        </div>

        <RouterLink
          to="/"
          class="rounded-xl px-4 py-3 text-sm font-medium text-neutral-700 transition-all hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-white/10"
          @click="$emit('close')"
        >
          Shop
        </RouterLink>
        <RouterLink
          v-if="isAuthenticated"
          to="/admin"
          class="rounded-xl px-4 py-3 text-sm font-medium text-neutral-700 transition-all hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-white/10"
          @click="$emit('close')"
        >
          Dashboard
        </RouterLink>

        <button
          class="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-neutral-700 transition-all hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-white/10 text-left"
          @click="uiStore.toggleTheme()"
        >
          {{ isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode' }}
        </button>

        <RouterLink
          v-if="!isAuthenticated"
          to="/login"
          class="mt-2 rounded-xl bg-black px-4 py-3 text-center text-sm font-medium text-white transition-all dark:bg-white dark:text-black"
          @click="$emit('close')"
        >
          Sign In
        </RouterLink>
        <button
          v-else
          class="mt-2 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-all hover:bg-red-50 dark:hover:bg-red-900/20 text-left"
          @click="authStore.logout(); $emit('close')"
        >
          Sign Out
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
