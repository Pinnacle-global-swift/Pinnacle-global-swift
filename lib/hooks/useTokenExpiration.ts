'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

function useTokenExpiration() {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    function checkExpiration() {
      const expiry = localStorage.getItem('expires_at')
      if (!expiry) return

      const expiryDate = new Date(expiry)
      const now = new Date()
      
      if (now >= expiryDate) {
        // Clear stored data
        localStorage.removeItem('token')
        localStorage.removeItem('expires_at')
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
        document.cookie = 'expiry=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
        
        toast({
          title: 'Session Expired',
          description: 'Your session has expired. Please login again.',
          duration: 5000,
          type: "error",
        })
        
        router.push('/login')
      }
    }

    // Check every minute
    const intervalId = setInterval(checkExpiration, 60000)
    
    // Initial check
    checkExpiration()

    return () => clearInterval(intervalId)
  }, [router, toast])
}

export default useTokenExpiration