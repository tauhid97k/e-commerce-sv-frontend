import { fetcher } from '@/lib/fetcher'

// Get Auth User and Status
export const getAuth = async () => {
  try {
    const data = await fetcher('auth')

    return {
      isAuthenticated: data.isAuthenticated,
      user: data.user,
    }
  } catch (_error) {
    return {
      isAuthenticated: false,
      user: null,
    }
  }
}
