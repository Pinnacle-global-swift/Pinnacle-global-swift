'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, CheckCircle } from 'lucide-react'
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
  otp: z
    .string()
    .length(6, { message: 'OTP must be 6 digits' })
    .regex(/^\d+$/, { message: 'OTP must contain only numbers' })
})

export default function VerifyResetOTP () {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: ''
    }
  })

  async function onSubmit (values: z.infer<typeof formSchema>) {
    const storedEmail = localStorage.getItem('resetEmail')
    setIsSubmitting(true)
    try {
      const data = await api.verifyResetOTP(storedEmail, values.otp)

      localStorage.setItem('resetToken', data?.resetToken)
      //  resetToken
      localStorage.removeItem('resetEmail')
      console.log(data)
      toast({
        title: 'OTP Verified',
        description: 'Your OTP has been successfully verified.',
        duration: 5000,
          type:"success"
      })
      router.push('/reset-password')
    } catch (error: any) {
      console.error(error)
      toast({
        type: 'error',
        title: 'Verification Failed',
        description:
          error?.response?.data?.errors?.message ||
          'An unexpected error occurred. Please try again.',
     
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative'>
      <div className='absolute inset-0 z-0'>
        <Image
          src='https://firebasestorage.googleapis.com/v0/b/first-project-a5bbf.appspot.com/o/imagebuilding.jpg?alt=media&token=cdceeabf-1e6e-4c5d-8143-56e9d1917612?auto=format&fit=crop&q=80&w=2070'
          alt='Background'
          layout='fill'
          objectFit='cover'
          quality={100}
        />
        <div className='absolute inset-0 bg-gray-900 opacity-75'></div>
      </div>

      <div className='sm:mx-auto sm:w-full sm:max-w-md z-10'>
        <motion.div
          className='flex justify-center'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src='/pgbw.png?height=200&width=200'
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
          <h2 className='text-3xl font-extrabold text-white'>Verify OTP</h2>
          <p className='mt-2 text-sm text-blue-200'>
            Enter the 6-digit code sent to your email
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className='mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10'
      >
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='otp'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password (OTP)</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Shield className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                        <Input
                          className='pl-10 bg-gray-50 text-center text-2xl tracking-widest'
                          placeholder='000000'
                          maxLength={6}
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
                className='w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className='flex items-center justify-center'>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Verifying...
                  </div>
                ) : (
                  <>
                    Verify OTP
                    <CheckCircle className='ml-2 h-5 w-5' />
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className='mt-6'>
            <Link
              href='/forgot-password'
              className='flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900'
            >
              <ArrowLeft className='h-4 w-4' />
              Back to Forgot Password
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='mt-6 flex justify-center space-x-4'
        >
          <Link
            href='/privacy'
            className='text-sm text-blue-200 hover:text-white'
          >
            Privacy Notice
          </Link>
          <span className='text-blue-200'>•</span>
          <Link
            href='/terms'
            className='text-sm text-blue-200 hover:text-white'
          >
            Terms of service
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
