'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.'
  })
})

export default function ForgotPassword () {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  async function onSubmit (values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      await api.forgotPassword(values.email)
      toast({
        title: 'Password Reset Initiated',
        description: 'Check your email for further instructions.',
        duration: 5000
      })
      router.push('/login')
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'Password Reset Failed',
        description:
          error.message || 'An unexpected error occurred. Please try again.',
        duration: 5000
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <motion.div
          className='flex justify-center'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src='/placeholder.svg?height=50&width=200'
            alt='Swift-Blink Logo'
            width={200}
            height={50}
            className='h-12 w-auto'
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='mt-6 text-center'
        >
          <h2 className='text-3xl font-extrabold text-gray-900'>
            Forgot Password?
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            Enter your email address to get the password reset link.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
      >
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Mail className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                        <Input
                          className='pl-10 bg-blue-50'
                          placeholder='hello@example.com'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                className='w-full bg-emerald-500 hover:bg-emerald-600'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Reset Password'}
              </Button>

              <div className='mt-6'>
                <Link
                  href='/login'
                  className='flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900'
                >
                  <ArrowLeft className='h-4 w-4' />
                  Back to login
                </Link>
              </div>
            </form>
          </Form>
        </div>

        <div className='mt-6 flex justify-center space-x-4 text-sm text-gray-600'>
          <Link href='/privacy' className='hover:text-gray-900'>
            Privacy Notice
          </Link>
          <span>•</span>
          <Link href='/terms' className='hover:text-gray-900'>
            Terms of service
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
