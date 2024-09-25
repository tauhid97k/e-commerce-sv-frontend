import { fetcher } from '@/lib/fetcher'

// Get all Attributes (For Admin)
export const getAttributes = async (queries: string) => {
  return await fetcher(`attributes?${queries}`)
}
