import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from '@/server/auth'

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req

  const isDashboardRoute = nextUrl.pathname.startsWith('/dashboard')
  const isAuthRoute = nextUrl.pathname.startsWith('/auth')

  if (isDashboardRoute || isAuthRoute) {
    const { isAuthenticated } = await getAuth()

    if (isDashboardRoute) {
      return isAuthenticated
        ? NextResponse.next()
        : NextResponse.redirect(new URL('/auth/login', nextUrl))
    }

    if (isAuthRoute) {
      return isAuthenticated
        ? NextResponse.redirect(new URL('/dashboard', nextUrl))
        : NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/(api)(.*)'],
}
