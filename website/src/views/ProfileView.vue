<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'
import GlassButton from '@/components/ui/GlassButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const { user } = storeToRefs(authStore)
const { totalItems, totalPrice } = storeToRefs(cartStore)

const activeTab = ref<'overview' | 'orders' | 'settings'>('overview')

const initials = computed(() => {
  if (!user.value) return '?'
  return `${user.value.firstName?.charAt(0) ?? ''}${user.value.lastName?.charAt(0) ?? ''}`
})

function handleLogout(): void {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
    <!-- Profile Header -->
    <div class="liquid-glass-strong rounded-3xl p-8 mb-8">
      <div class="flex flex-col items-center gap-6 sm:flex-row">
        <!-- Avatar -->
        <div class="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 text-2xl font-black text-white shadow-lg dark:from-neutral-200 dark:to-neutral-400 dark:text-black">
          {{ initials }}
        </div>

        <!-- Info -->
        <div class="flex-1 text-center sm:text-left">
          <h1 class="text-2xl font-black text-neutral-900 dark:text-white">
            {{ user?.firstName }} {{ user?.lastName }}
          </h1>
          <p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {{ user?.email }}
          </p>
          <p class="mt-0.5 text-xs text-neutral-400 dark:text-neutral-500">
            @{{ user?.username }}
          </p>
        </div>

        <!-- Actions -->
        <div class="flex gap-3">
          <GlassButton variant="secondary" size="sm" @click="router.push('/')">
            Continue Shopping
          </GlassButton>
          <GlassButton variant="ghost" size="sm" @click="handleLogout">
            Sign Out
          </GlassButton>
        </div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="mb-6 flex rounded-xl bg-neutral-100/80 p-1 dark:bg-white/5">
      <button
        v-for="tab in (['overview', 'orders', 'settings'] as const)"
        :key="tab"
        :class="[
          'flex-1 rounded-lg py-2.5 text-sm font-semibold capitalize transition-all',
          activeTab === tab
            ? 'bg-white text-black shadow-sm dark:bg-white/15 dark:text-white'
            : 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
        ]"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Overview Tab -->
    <div v-if="activeTab === 'overview'" class="grid gap-6 sm:grid-cols-3">
      <div class="liquid-glass rounded-2xl p-6 text-center">
        <p class="text-3xl font-black text-neutral-900 dark:text-white">{{ totalItems }}</p>
        <p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Items in Cart</p>
      </div>
      <div class="liquid-glass rounded-2xl p-6 text-center">
        <p class="text-3xl font-black text-neutral-900 dark:text-white">${{ totalPrice.toFixed(2) }}</p>
        <p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Cart Total</p>
      </div>
      <div class="liquid-glass rounded-2xl p-6 text-center">
        <p class="text-3xl font-black text-neutral-900 dark:text-white">0</p>
        <p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Orders</p>
      </div>

      <!-- Quick Actions -->
      <div class="sm:col-span-3 liquid-glass rounded-2xl p-6">
        <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-4">Quick Actions</h3>
        <div class="grid gap-3 sm:grid-cols-3">
          <button
            class="flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all hover:bg-neutral-100/60 dark:hover:bg-white/5"
            @click="router.push('/cart')"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-white/10">
              <svg class="h-5 w-5 text-neutral-600 dark:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-neutral-900 dark:text-white">View Cart</p>
              <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ totalItems }} items</p>
            </div>
          </button>
          <button
            class="flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all hover:bg-neutral-100/60 dark:hover:bg-white/5"
            @click="router.push('/')"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-white/10">
              <svg class="h-5 w-5 text-neutral-600 dark:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-neutral-900 dark:text-white">Browse Products</p>
              <p class="text-xs text-neutral-500 dark:text-neutral-400">Explore departments</p>
            </div>
          </button>
          <button
            class="flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all hover:bg-neutral-100/60 dark:hover:bg-white/5"
            @click="router.push('/admin')"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-white/10">
              <svg class="h-5 w-5 text-neutral-600 dark:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-neutral-900 dark:text-white">Dashboard</p>
              <p class="text-xs text-neutral-500 dark:text-neutral-400">Admin panel</p>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Orders Tab -->
    <div v-else-if="activeTab === 'orders'" class="liquid-glass rounded-2xl p-10 text-center">
      <svg class="mx-auto h-16 w-16 text-neutral-300 dark:text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
      <p class="mt-4 text-lg font-semibold text-neutral-500 dark:text-neutral-400">No orders yet</p>
      <p class="mt-1 text-sm text-neutral-400 dark:text-neutral-500">
        Your completed orders will appear here.
      </p>
      <GlassButton class="mt-6" @click="router.push('/')">
        Start Shopping
      </GlassButton>
    </div>

    <!-- Settings Tab -->
    <div v-else-if="activeTab === 'settings'" class="space-y-6">
      <div class="liquid-glass rounded-2xl p-6">
        <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-4">Account Information</h3>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="text-xs font-medium text-neutral-500 dark:text-neutral-400">First Name</label>
            <p class="mt-1 text-sm font-semibold text-neutral-900 dark:text-white">{{ user?.firstName }}</p>
          </div>
          <div>
            <label class="text-xs font-medium text-neutral-500 dark:text-neutral-400">Last Name</label>
            <p class="mt-1 text-sm font-semibold text-neutral-900 dark:text-white">{{ user?.lastName }}</p>
          </div>
          <div>
            <label class="text-xs font-medium text-neutral-500 dark:text-neutral-400">Email</label>
            <p class="mt-1 text-sm font-semibold text-neutral-900 dark:text-white">{{ user?.email }}</p>
          </div>
          <div>
            <label class="text-xs font-medium text-neutral-500 dark:text-neutral-400">Username</label>
            <p class="mt-1 text-sm font-semibold text-neutral-900 dark:text-white">{{ user?.username }}</p>
          </div>
        </div>
      </div>

      <div class="liquid-glass rounded-2xl p-6">
        <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-2">Danger Zone</h3>
        <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          Once you sign out, you'll need to log in again to access your account.
        </p>
        <GlassButton variant="ghost" @click="handleLogout">
          <span class="text-red-600 dark:text-red-400">Sign Out</span>
        </GlassButton>
      </div>
    </div>
  </div>
</template>
