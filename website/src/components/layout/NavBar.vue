<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/authStore'
import { useUiStore } from '@/stores/uiStore'
import { storeToRefs } from 'pinia'
import Badge from '@/components/ui/Badge.vue'
import MobileMenu from './MobileMenu.vue'

const cartStore = useCartStore()
const authStore = useAuthStore()
const uiStore = useUiStore()
const { totalItems } = storeToRefs(cartStore)
const { isAuthenticated } = storeToRefs(authStore)
const { isDarkMode } = storeToRefs(uiStore)

const mobileMenuOpen = ref(false)
const profileOpen = ref(false)

defineEmits<{
  toggleCart: []
}>()
</script>

<template>
  <header
    class="liquid-glass-nav sticky top-0 z-40 w-full transition-all duration-300"
  >
    <nav class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <!-- Logo -->
      <RouterLink
        to="/"
        class="flex items-center gap-2 text-xl font-black tracking-wider text-black uppercase dark:text-white transition-colors"
      >
        <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        SUPPLYHOUSE
      </RouterLink>

      <!-- Desktop Nav -->
      <div class="hidden items-center gap-5 md:flex">
        <RouterLink
          to="/"
          class="text-sm font-medium text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
        >
          Shop
        </RouterLink>
        <RouterLink
          v-if="isAuthenticated"
          to="/admin"
          class="text-sm font-medium text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
        >
          Dashboard
        </RouterLink>

        <!-- Dark Mode Toggle -->
        <button
          class="relative flex h-9 w-16 items-center rounded-full p-1 transition-all duration-300"
          :class="isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'"
          @click="uiStore.toggleTheme()"
          :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <div
            class="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 dark:bg-neutral-600"
            :class="isDarkMode ? 'translate-x-7' : 'translate-x-0'"
          >
            <svg v-if="isDarkMode" class="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="h-4 w-4 text-neutral-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </div>
        </button>

        <!-- Cart Button -->
        <button
          class="relative rounded-xl p-2 text-neutral-600 transition-all hover:bg-white/40 dark:text-neutral-400 dark:hover:bg-white/10"
          @click="$emit('toggleCart')"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <Badge
            v-if="totalItems > 0"
            :count="totalItems"
            class="absolute -right-1 -top-1"
          />
        </button>

        <!-- Profile / Auth -->
        <div v-if="isAuthenticated" class="relative">
          <button
            class="flex items-center gap-2 rounded-xl px-3 py-1.5 transition-all hover:bg-white/40 dark:hover:bg-white/10"
            @click="profileOpen = !profileOpen"
          >
            <img
              :src="authStore.user?.image || 'https://ui-avatars.com/api/?name=User&background=000&color=fff&size=32'"
              class="h-7 w-7 rounded-full object-cover ring-2 ring-white/50"
              alt="Profile"
            />
            <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {{ authStore.user?.firstName || 'User' }}
            </span>
            <svg class="h-3.5 w-3.5 text-neutral-400 transition-transform" :class="{ 'rotate-180': profileOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Profile Dropdown -->
          <Transition name="dropdown">
            <div
              v-if="profileOpen"
              class="liquid-glass-strong absolute right-0 top-full mt-2 w-64 rounded-2xl p-3 z-50"
            >
              <div class="mb-3 flex items-center gap-3 rounded-xl bg-white/30 p-3 dark:bg-white/5">
                <img
                  :src="authStore.user?.image || 'https://ui-avatars.com/api/?name=User&background=000&color=fff&size=48'"
                  class="h-10 w-10 rounded-full object-cover"
                  alt="Profile"
                />
                <div class="min-w-0">
                  <p class="text-sm font-bold text-neutral-900 dark:text-white truncate">
                    {{ authStore.user?.firstName }} {{ authStore.user?.lastName }}
                  </p>
                  <p class="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                    {{ authStore.user?.email }}
                  </p>
                </div>
              </div>
              <RouterLink
                to="/admin"
                class="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-neutral-700 transition-all hover:bg-white/40 dark:text-neutral-300 dark:hover:bg-white/10"
                @click="profileOpen = false"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Dashboard
              </RouterLink>
              <RouterLink
                to="/cart"
                class="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-neutral-700 transition-all hover:bg-white/40 dark:text-neutral-300 dark:hover:bg-white/10"
                @click="profileOpen = false"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                My Cart
              </RouterLink>
              <div class="my-1.5 border-t border-white/20 dark:border-white/10" />
              <button
                class="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-600 transition-all hover:bg-red-50/50 dark:text-red-400 dark:hover:bg-red-900/20 text-left"
                @click="authStore.logout(); profileOpen = false"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </Transition>
        </div>

        <RouterLink
          v-else
          to="/login"
          class="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition-all hover:bg-neutral-800 hover:shadow-lg dark:bg-white dark:text-black dark:hover:bg-neutral-200"
        >
          Sign In
        </RouterLink>
      </div>

      <!-- Mobile -->
      <div class="flex items-center gap-3 md:hidden">
        <button
          class="relative rounded-xl p-2 text-neutral-600 dark:text-neutral-400"
          @click="$emit('toggleCart')"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <Badge v-if="totalItems > 0" :count="totalItems" class="absolute -right-1 -top-1" />
        </button>
        <button
          class="rounded-xl p-2 text-neutral-600 dark:text-neutral-400"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <MobileMenu
      :open="mobileMenuOpen"
      @close="mobileMenuOpen = false"
    />
  </header>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}
</style>
