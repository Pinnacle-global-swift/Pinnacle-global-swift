'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    Tawk_API?: any
    Tawk_LoadStart?: Date
  }
}

export function TawkTo() {
  useEffect(() => {
    // Initialize Tawk.to
    const s1 = document.createElement('script')
    const s0 = document.getElementsByTagName('script')[0]
    
    s1.async = true
    s1.src = 'https://embed.tawk.to/634610c637898912e96e218d/1gf4r33ct'
    s1.charset = 'UTF-8'
    s1.setAttribute('crossorigin', '*')
    
    if (s0?.parentNode) {
      s0.parentNode.insertBefore(s1, s0)
    }

    // Cleanup
    return () => {
      s1.remove()
      delete window.Tawk_API
      delete window.Tawk_LoadStart
    }
  }, [])

  return null
}

