'use server'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL as string
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL as string
import { cookies } from 'next/headers'

export const fetcher = async (segments: string, options?: RequestInit) => {
  const defaultHeaders: HeadersInit = {
    Accept: 'application/json',
    Referer: APP_URL,
    Cookie: cookies().toString(),
  }

  const mergedOptions: RequestInit = {
    credentials: 'include',
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options?.headers || {}),
    },
  }

  const response = await fetch(`${BASE_API_URL}/api/${segments}`, mergedOptions)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}
