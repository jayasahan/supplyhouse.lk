<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import BaseInput from '@/components/ui/BaseInput.vue'
import GlassButton from '@/components/ui/GlassButton.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const tab = ref<'login' | 'register'>('login')
const username = ref('emilys')
const password = ref('emilyspass')
const email = ref('')
const showPassword = ref(false)
const rememberMe = ref(true)
const successMessage = ref('')

const isFormValid = computed(() => {
  if (tab.value === 'login') return username.value.trim().length > 0 && password.value.length > 0
  return username.value.trim().length > 0 && password.value.length >= 6 && email.value.includes('@')
})

async function handleLogin(): Promise<void> {
  successMessage.value = ''
  const success = await authStore.login({
    username: username.value,
    password: password.value,
  })
  if (success) {
    const redirect = route.query.redirect as string | undefined
    await router.push(redirect || '/')
  }
}

function handleRegister(): void {
  // Simulated registration (DummyJSON doesn't support it)
  successMessage.value = 'Account created! You can now sign in with the demo credentials.'
  tab.value = 'login'
  username.value = 'emilys'
  password.value = 'emilyspass'
}

function handleSubmit(): void {
  if (tab.value === 'login') handleLogin()
  else handleRegister()
}
</script>

<template>
  <div class="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 overflow-hidden">
    <!-- Background orbs -->
    <div class="glass-orb -left-20 top-20 h-72 w-72 bg-blue-200 dark:bg-blue-600" />
    <div class="glass-orb -right-10 bottom-20 h-56 w-56 bg-purple-200 dark:bg-purple-600" />

    <div class="relative z-10 w-full max-w-md">
      <!-- Glass Card -->
      <div class="liquid-glass-strong rounded-3xl p-8 shadow-2xl">
        <!-- Header -->
        <div class="mb-6 text-center">
          <h1 class="text-3xl font-black tracking-tight text-black dark:text-white">
            SUPPLY<span class="text-neutral-400 dark:text-neutral-500">HOUSE</span>
          </h1>
          <p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {{ tab === 'login' ? 'Welcome back! Sign in to continue.' : 'Create your account' }}
          </p>
        </div>

        <!-- Tab Switcher -->
        <div class="mb-6 flex rounded-xl bg-neutral-100/80 p-1 dark:bg-white/5">
          <button
            :class="[
              'flex-1 rounded-lg py-2 text-sm font-semibold transition-all',
              tab === 'login'
                ? 'bg-white text-black shadow-sm dark:bg-white/15 dark:text-white'
                : 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
            ]"
            @click="tab = 'login'"
          >
            Sign In
          </button>
          <button
            :class="[
              'flex-1 rounded-lg py-2 text-sm font-semibold transition-all',
              tab === 'register'
                ? 'bg-white text-black shadow-sm dark:bg-white/15 dark:text-white'
                : 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
            ]"
            @click="tab = 'register'"
          >
            Register
          </button>
        </div>

        <!-- Success message -->
        <div v-if="successMessage" class="mb-4 rounded-xl bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
          {{ successMessage }}
        </div>

        <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
          <BaseInput
            v-model="username"
            label="Username"
            placeholder="Enter your username"
          />

          <BaseInput
            v-if="tab === 'register'"
            v-model="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
          />

          <div class="relative">
            <BaseInput
              v-model="password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="tab === 'register' ? 'Min 6 characters' : 'Enter your password'"
            />
            <button
              type="button"
              class="absolute right-3 top-[34px] text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
              @click="showPassword = !showPassword"
            >
              <svg v-if="!showPassword" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            </button>
          </div>

          <!-- Remember me + Forgot password (login only) -->
          <div v-if="tab === 'login'" class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="rememberMe"
                type="checkbox"
                class="h-4 w-4 rounded border-neutral-300 text-black accent-black dark:accent-white dark:border-neutral-600"
              />
              <span class="text-xs text-neutral-500 dark:text-neutral-400">Remember me</span>
            </label>
            <button type="button" class="text-xs text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
              Forgot password?
            </button>
          </div>

          <!-- Error -->
          <p v-if="authStore.error" class="rounded-lg bg-red-50 p-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {{ authStore.error }}
          </p>

          <GlassButton
            class="w-full mt-1"
            size="lg"
            :loading="authStore.loading"
            :disabled="!isFormValid"
          >
            {{ tab === 'login' ? 'Sign In' : 'Create Account' }}
          </GlassButton>
        </form>

        <!-- Divider -->
        <div class="my-5 flex items-center gap-3">
          <div class="h-px flex-1 bg-neutral-200 dark:bg-white/10" />
          <span class="text-xs text-neutral-400">or</span>
          <div class="h-px flex-1 bg-neutral-200 dark:bg-white/10" />
        </div>

        <!-- Social login buttons (decorative) -->
        <div class="flex gap-3">
          <button class="liquid-glass flex-1 rounded-xl py-2.5 text-sm font-medium text-neutral-700 transition-all hover:shadow-md dark:text-neutral-300">
            <span class="flex items-center justify-center gap-2">
              <svg class="h-4 w-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </span>
          </button>
          <button class="liquid-glass flex-1 rounded-xl py-2.5 text-sm font-medium text-neutral-700 transition-all hover:shadow-md dark:text-neutral-300">
            <span class="flex items-center justify-center gap-2">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </span>
          </button>
        </div>

        <!-- Demo credentials hint -->
        <div class="mt-5 liquid-glass rounded-xl p-4">
          <p class="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
            Demo Credentials (DummyJSON)
          </p>
          <p class="text-xs text-neutral-400 dark:text-neutral-500">
            Username: <span class="font-mono font-semibold text-neutral-600 dark:text-neutral-300">emilys</span>
          </p>
          <p class="text-xs text-neutral-400 dark:text-neutral-500">
            Password: <span class="font-mono font-semibold text-neutral-600 dark:text-neutral-300">emilyspass</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
