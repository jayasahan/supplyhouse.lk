import axiosInstance from './axiosInstance'
import type { AuthResponse, LoginCredentials } from '@/types/auth'

export const authApi = {   // Object containing functions related to authentication API calls, such as login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {    // Asynchronous function to handle user login by sending a POST request to the '/auth/login' endpoint with the provided login credentials, and returning a promise that resolves to an AuthResponse containing user information and tokens upon successful authentication
    const { data } = await axiosInstance.post<AuthResponse>(    // Make a POST request to the
      '/auth/login',   // Make a POST request to the '/auth/login' endpoint with the provided login credentials, expecting a response of type AuthResponse which contains user information and tokens upon successful authentication
      credentials    // Pass the login credentials as the request body to the '/auth/login' endpoint, allowing the server to authenticate the user and return the appropriate response containing user information and tokens if the credentials are valid
    )
    return data   // Return the data from the response, which is expected to be of type AuthResponse, containing user information and tokens upon successful authentication, allowing the calling code to access this information for further processing (such as storing tokens or displaying user info in the UI)
  },
}
