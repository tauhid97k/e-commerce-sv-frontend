import axios, { AxiosInstance } from 'axios'
import { useRouter } from 'next/navigation'

export const useAxios = (): AxiosInstance => {
  const router = useRouter()

  // Create a singleton instance
  let instance: AxiosInstance | null = null

  // Initialize the instance if it doesn't exist
  if (!instance) {
    instance = axios.create({
      withCredentials: true,
      baseURL: '/backend/api',
    })

    // Response interceptor
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error

        if (response) {
          const { status } = response

          if (status === 401) {
            router.replace('/auth/login')
          }

          if (status === 403) {
            router.push('/unauthorized')
          }

          if (status === 500) {
            router.push('/internal-server-error')
          }
        }

        return Promise.reject(error)
      }
    )
  }

  return instance
}
