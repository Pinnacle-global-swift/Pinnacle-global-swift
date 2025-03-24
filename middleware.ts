import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const expiry = request.cookies.get("expiry")?.value

  // Allow access to login page
  if (request.nextUrl.pathname === '/login') {
    if (token && expiry && new Date(expiry) > new Date()) {
      // If user is already logged in, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // Protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token || !expiry || new Date(expiry) <= new Date()) {
      // Invalid or expired session
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete("token")
      response.cookies.delete("expiry")
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/dashboard/:path*']
}

