import { useAuthStore } from '@/stores/authStore'
import type { LoginCredentials } from '@/types/auth'

export function useAuth() {
  const authStore = useAuthStore()

  async function login(credentials: LoginCredentials): Promise<boolean> {
    return authStore.login(credentials)
  }

  function logout(): void {
    authStore.logout()
  }

  return {
    user: authStore.user,
    isAuthenticated: authStore.isAuthenticated,
    loading: authStore.loading,
    error: authStore.error,
    login,
    logout,
  }
}
