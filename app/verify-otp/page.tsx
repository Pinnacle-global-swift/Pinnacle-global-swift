'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api } from "@/lib/api"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 digits" }).regex(/^\d+$/, { message: "OTP must contain only numbers" }),
})

export default function VerifyOTP() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // await api.verifyOTP(values.otp);
      toast({
        title: "OTP Verified",
        description: "Your OTP has been successfully verified.",
        duration: 5000,
      });
      router.push('/change-password');
    } catch (error:any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-primary flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/placeholder.svg?height=50&width=200"
            alt="Pinnacle Global Bank Logo"
            width={200}
            height={50}
            className="h-12 w-auto"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-center"
        >
          <h2 className="text-3xl font-extrabold text-white">
            Verify OTP
          </h2>
          <p className="mt-2 text-sm text-blue-200">
            Enter the 6-digit code sent to your email
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password (OTP)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          className="pl-10 bg-gray-50"
                          placeholder="Enter 6-digit OTP"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:bg-blue-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>
          </Form>

          <div className="mt-6">
            <Link
              href="/forgot-password"
              className="flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-500"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Forgot Password
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

