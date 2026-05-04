import { defineStore } from 'pinia'  //pinia
import { ref, computed } from 'vue'  //vue
import { authApi } from '@/api/authApi'   //authentication api
import type { AuthUser, LoginCredentials } from '@/types/auth'  //types for authentication

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)   //ref for storing authenticated user information
  const token = ref<string | null>(null)   //ref for storing authentication token
  const loading = ref(false)    //ref for tracking loading state during authentication processes
  const error = ref<string | null>(null) //ref for storing error messages related to authentication

  const isAuthenticated = computed(() => !!token.value)

  function initialize(): void {
    const storedToken = localStorage.getItem('supplyhouse_token')  //retrieve stored token from localStorage
    const storedUser = localStorage.getItem('supplyhouse_user')  //retrieve stored user information from localStorage
    if (storedToken && storedUser) {
      token.value = storedToken   //set token ref to the retrieved token
      user.value = JSON.parse(storedUser) as AuthUser
    }
  }

  async function login(credentials: LoginCredentials): Promise<boolean> {
    loading.value = true  //set loading state to true when login process starts
    error.value = null  //reset error state before attempting login
    try {
      const response = await authApi.login(credentials)  //call the login API with the provided credentials
      token.value = response.accessToken  //set token ref to the access token received from the API response
      user.value = {          //set user ref to the user information received from the API response
        id: response.id,     //assuming the API response includes an 'id' field for the user
        username: response.username,   //assuming the API response includes a 'username' field for the user
        email: response.email,  //assuming the API response includes an 'email' field for the user
        firstName: response.firstName,  //assuming the API response includes a 'firstName' field for the user
        lastName: response.lastName,  //assuming the API response includes a 'lastName' field for the user
        gender: response.gender,  //assuming the API response includes
        image: response.image,  //assuming the API response includes an 'image' field for the user
      }
      localStorage.setItem('supplyhouse_token', response.accessToken)  //store the access token in localStorage for persistence
      localStorage.setItem('supplyhouse_user', JSON.stringify(user.value))  //store the user information in localStorage for persistence
      return true  //return true to indicate successful login
    } catch {
      error.value = 'Invalid credentials. Please try again.'  //set error message if login fails due to invalid credentials
      return false  //return false to indicate failed login
    } finally {   //set loading state to false after login process completes, regardless of success or failure
      loading.value = false  //set loading state to false after login process completes, regardless of success or failure
    }
  }

  function logout(): void {
    user.value = null  //clear user information from ref when logging out
    token.value = null  //clear authentication token from ref when logging out
    localStorage.removeItem('supplyhouse_token')  //remove the stored token from localStorage when logging out
    localStorage.removeItem('supplyhouse_user')  //remove the stored user information from localStorage when logging out
  }

  return { user, token, loading, error, isAuthenticated, initialize, login, logout }  //return the state and actions of the auth store for use in components
})
