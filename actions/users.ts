import { fetcher } from '@/lib/fetcher'

// Get all users (For Admin)
export const getUsers = async (queries: string) => {
  return await fetcher(`admin/users?${queries}`)
}
