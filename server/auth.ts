'use server'

import { cookies } from 'next/headers'
import { APP_URL, BASE_API_URL } from './config'

// Get Auth User and Status
export const getAuth = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/api/auth`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Referer: APP_URL,
        Cookie: cookies().toString(),
      },
      credentials: 'include',
    })

    const data = await response.json()
    return {
      isAuthenticated: data.auth,
      user: data.user,
    }
  } catch (_error) {
    return {
      isAuthenticated: false,
      user: null,
    }
  }
}
