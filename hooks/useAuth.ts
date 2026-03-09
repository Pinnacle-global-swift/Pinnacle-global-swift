import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function useAuth() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    const expiry = typeof window !== 'undefined' ? localStorage.getItem('expires_at') : null

    // Check if session is valid
    const isAuthenticated = token && expiry && new Date(expiry) > new Date()

    // Redirect logic
    if (pathname === '/login' && isAuthenticated) {
      // If user is already logged in, redirect to dashboard
      router.push('/dashboard')
    } else if (pathname.startsWith('/dashboard') && !isAuthenticated) {
      // Redirect to login if accessing protected routes without auth
      router.push('/login')
    }
  }, [pathname, router])
}
