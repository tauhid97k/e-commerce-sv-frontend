import { NextRequest, NextResponse } from 'next/server'
import { authRoutes } from '@/auth.routes'
import { getAuth } from '@/server/auth'

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req

  const isDashboardRoute = nextUrl.pathname.startsWith('/dashboard')
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isDashboardRoute || isAuthRoute) {
    const { isAuthenticated } = await getAuth()

    if (isDashboardRoute) {
      return isAuthenticated
        ? NextResponse.next()
        : NextResponse.redirect(new URL('/login', nextUrl))
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
