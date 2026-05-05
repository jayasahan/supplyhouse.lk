import axios from 'axios'  // Import the axios library, which is a popular HTTP client for making requests to APIs. This library provides an easy-to-use interface for sending asynchronous HTTP requests and handling responses in JavaScript and TypeScript applications.
 
const axiosInstance = axios.create({     // Create a new instance of axios with custom configuration, allowing us to set default properties for all requests made using this instance, such as the base URL and headers.
  baseURL: 'https://dummyjson.com',    // Set the base URL for all requests made with this axios instance to 'https://dummyjson.com', which means that all request URLs will be relative to this base URL, simplifying the process of making API calls to this specific endpoint.
  headers: {
    'Content-Type': 'application/json',       // Set the default 'Content-Type' header to 'application/json' for all requests made with this axios instance, indicating that the request body will be in JSON format, which is commonly used for API communication and allows the server to correctly parse the incoming data.
  },
})

axiosInstance.interceptors.request.use((config) => {    // Add a request interceptor to the axios instance, which allows us to modify the request configuration before it is sent to the server. In this case, we are adding an Authorization header with a token from localStorage if it exists, enabling authenticated requests to the API.
  const token = localStorage.getItem('supplyhouse_token')    // Retrieve the authentication token from localStorage using the key 'supplyhouse_token'. This token is typically stored after a successful login and is used to authenticate subsequent API requests.
  if (token) {  
    config.headers.Authorization = `Bearer ${token}`     // If the token exists, add an 'Authorization' header to the request configuration with the
  }
  return config          // Return the modified request configuration, allowing the request to proceed with the added Authorization header if a token was found, or without it if no token is present. This ensures that authenticated requests include the necessary credentials while unauthenticated requests can still be made without errors.
}) 

export default axiosInstance         // Export the configured axios instance as the default export of this module, allowing other parts of the application to import and use this instance for making API requests with the predefined base URL and headers, as well as the request interceptor for handling authentication tokens. This promotes code reuse and consistency across the application when interacting with the API.
