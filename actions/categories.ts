import { fetcher } from '@/lib/fetcher'

// Get all categories (For Admin)
export const getCategories = async (queries: string) => {
  return await fetcher(`admin/categories?${queries}`)
}
