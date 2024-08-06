import axios, { AxiosInstance } from 'axios'
import { useRouter } from 'next/router'
import { BASE_API_URL } from './api'

export const useAxios = (apiVersion: string = 'v1'): AxiosInstance => {
  const router = useRouter()

  // Create a singleton instance
  let instance: AxiosInstance | null = null

  // Initialize the instance if it doesn't exist
  if (!instance) {
    instance = axios.create({
      withCredentials: true,
      baseURL: `${BASE_API_URL}/api/${apiVersion}`,
    })

    // Response interceptor
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error

        if (response) {
          const { status } = response

          if (status === 401) {
            router.push('/login')
          }
        }

        return Promise.reject(error)
      }
    )
  }

  return instance
}
