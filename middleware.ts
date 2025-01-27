import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { api } from "@/lib/api" // Import api helper

// ... other imports

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const expiry = Number.parseInt(request.cookies.get("expiry")?.value || "0", 10) // Get expiry timestamp
  const protectedRoutes = ["/dashboard", "/admin"]

  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  if (isProtectedRoute) {
    if (!token || api.isTokenExpired(expiry)) {
      // Check token and expiry
      const url = request.nextUrl.clone()
      url.pathname = "/login"
      // Clear cookies on expiry or missing token
      request.cookies.delete("token")
      request.cookies.delete("expiry")
      return NextResponse.redirect(url)
    }
  }

  // ... other middleware logic
}

// ... other code

