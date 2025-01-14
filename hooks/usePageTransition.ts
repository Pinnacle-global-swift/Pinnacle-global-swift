'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function usePageTransition() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // Adjust timing as needed

    return () => clearTimeout(timer)
  }, [pathname])

  return isLoading
}

