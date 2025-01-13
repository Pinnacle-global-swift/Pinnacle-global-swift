'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    Tawk_API?: any
    Tawk_LoadStart?: Date
  }
}

export function TawkTo () {
  useEffect(() => {
    // Initialize Tawk.to
    const s1 = document.createElement('script')
    const s0 = document.getElementsByTagName('script')[0]

    s1.async = true
    s1.src = 'https://embed.tawk.to/67854836af5bfec1dbeae42e/1ihga46jn'
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
