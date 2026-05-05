export interface LoginCredentials {   // Interface representing the structure of login credentials, containing a username and password, which are both strings. This interface can be used to type-check the data when handling user authentication in the application.
  username: string
  password: string
}

export interface AuthResponse {   // Interface representing the structure of the response received after a successful authentication request, containing user information and tokens. This interface can be used to type-check the data when processing the authentication response in the application.
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

export interface AuthUser {   // Interface representing the structure of an authenticated user, containing their basic information. This interface can be used to type-check the data when displaying user information in the application.
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}
