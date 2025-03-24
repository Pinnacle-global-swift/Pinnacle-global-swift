'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function NewsletterForm () {
  const [email, setEmail] = useState('')

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        // Handle subscription
        setEmail('')
      }}
    >
      <div className='flex gap-2 mb-6'>
        <Input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400'
        />
        <Button
          type='submit'
          size='icon'
          variant='default'
          className='bg-primary hover:bg-primary/90'
        >
          <Send className='w-4 h-4' />
        </Button>
      </div>
    </form>
  )
}
