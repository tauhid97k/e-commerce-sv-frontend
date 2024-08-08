'use server'

import { cookies } from 'next/headers'
import { BASE_API_URL } from './api'

// Get Authenticated User
export const getUser = async () => {
  const response = await fetch(`${BASE_API_URL}/api/user`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Referer: 'localhost:3000',
      Cookie: cookies().toString(),
    },
    credentials: 'include',
  })

  return await response.json()
}
