'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

export const useSession = () => {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    let inactivityTimeout: NodeJS.Timeout
    let checkInterval: NodeJS.Timer

    const checkExpiry = () => {
      const expiry = localStorage.getItem('expires_at')
      if (!expiry) return false
      return new Date(expiry) > new Date()
    }

    const clearSession = (message: string) => {
      localStorage.removeItem('token')
      localStorage.removeItem('expires_at')
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
      document.cookie = "expiry=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
      
      toast({
        title: 'Session Expired',
        description: message,
        duration: 5000,
        type: "error",
      })
      
      router.push('/login')
    }

    const resetInactivityTimer = () => {
      if (!checkExpiry()) {
        clearSession('Your session has expired. Please login again.')
        return
      }

      clearTimeout(inactivityTimeout)
      inactivityTimeout = setTimeout(() => {
        clearSession('Your session has expired due to inactivity.')
      }, 30 * 60 * 1000) // 30 minutes
    }

    // Set up activity listeners
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    events.forEach(event => {
      document.addEventListener(event, resetInactivityTimer)
    })

    // Initial setup
    resetInactivityTimer()

    // Regular expiry check
    checkInterval = setInterval(() => {
      if (!checkExpiry()) {
        clearSession('Your session has expired. Please login again.')
      }
    }, 60000) // Check every minute

    return () => {
      clearTimeout(inactivityTimeout)
      clearInterval(checkInterval)
      events.forEach(event => {
        document.removeEventListener(event, resetInactivityTimer)
      })
    }
  }, [router, toast])
}
