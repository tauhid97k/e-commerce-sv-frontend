import axios, { AxiosInstance } from 'axios'
import { useRouter } from 'next/navigation'

export const useAxios = (apiVersion?: string): AxiosInstance => {
  const router = useRouter()

  // Construct Url
  const url = apiVersion ? `/backend/api/${apiVersion}` : `/backend/api`

  // Create a singleton instance
  let instance: AxiosInstance | null = null

  // Initialize the instance if it doesn't exist
  if (!instance) {
    instance = axios.create({
      withCredentials: true,
      baseURL: url,
    })

    // Response interceptor
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error

        if (response) {
          const { status } = response

          if (status === 403) {
            router.push('/unauthorized')
          }
        }

        return Promise.reject(error)
      }
    )
  }

  return instance
}
