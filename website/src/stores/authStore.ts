import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '@/api/authApi'
import type { AuthUser, LoginCredentials } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  function initialize(): void {
    const storedToken = localStorage.getItem('supplyhouse_token')
    const storedUser = localStorage.getItem('supplyhouse_user')
    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser) as AuthUser
    }
  }

  async function login(credentials: LoginCredentials): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      const response = await authApi.login(credentials)
      token.value = response.accessToken
      user.value = {
        id: response.id,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        gender: response.gender,
        image: response.image,
      }
      localStorage.setItem('supplyhouse_token', response.accessToken)
      localStorage.setItem('supplyhouse_user', JSON.stringify(user.value))
      return true
    } catch {
      error.value = 'Invalid credentials. Please try again.'
      return false
    } finally {
      loading.value = false
    }
  }

  function logout(): void {
    user.value = null
    token.value = null
    localStorage.removeItem('supplyhouse_token')
    localStorage.removeItem('supplyhouse_user')
  }

  return { user, token, loading, error, isAuthenticated, initialize, login, logout }
})
