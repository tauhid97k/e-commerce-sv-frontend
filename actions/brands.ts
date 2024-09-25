import { fetcher } from '@/lib/fetcher'

// Get all brands (For Admin)
export const getBrands = async (queries: string) => {
  return await fetcher(`brands?${queries}`)
}
