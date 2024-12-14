'use client'

import { cn } from '@/lib/utils'

export function LoadingSpinner ({ className }: { className?: string }) {
  return (
    <div className='flex items-center justify-center w-full min-h-[200px]'>
      <div
        className={cn(
          'animate-spin rounded-full h-12 w-12 border-b-2 border-primary',
          className
        )}
      />
    </div>
  )
}
