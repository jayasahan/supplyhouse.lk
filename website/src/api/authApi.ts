import axiosInstance from './axiosInstance'
import type { AuthResponse, LoginCredentials } from '@/types/auth'

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await axiosInstance.post<AuthResponse>(
      '/auth/login',
      credentials
    )
    return data
  },
}
