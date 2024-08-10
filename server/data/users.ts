'use server'

import { cookies } from 'next/headers'
import { APP_URL, BASE_API_URL } from '@/server/config'

// Get All Users (For Admin)
export const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/api/users`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Referer: APP_URL,
        Cookie: cookies().toString(),
      },
      credentials: 'include',
    })

    return await response.json()
  } catch (_error) {
    // Handle Error
  }
}
