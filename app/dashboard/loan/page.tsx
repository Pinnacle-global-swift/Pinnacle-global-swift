'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Calculator } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  amount: z.string().min(1, 'Amount is required'),
  loanType: z.string().min(1, 'Loan type is required'),
  duration: z.string().min(1, 'Duration is required'),
  purpose: z.string().min(1, 'Purpose is required'),
  income: z.string().min(1, 'Monthly income is required')
})

export default function LoanPage () {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      loanType: '',
      duration: '',
      purpose: '',
      income: ''
    }
  })

  const calculateMonthlyPayment = (amount: number, months: number) => {
    const interestRate = 0.05 / 12 // 5% annual interest rate
    const payment =
      (amount * interestRate * Math.pow(1 + interestRate, months)) /
      (Math.pow(1 + interestRate, months) - 1)
    return Math.round(payment * 100) / 100
  }

  const handleDurationChange = (duration: string) => {
    const amount = parseFloat(form.getValues('amount')) || 0
    const months = parseInt(duration) || 0
    if (amount && months) {
      setMonthlyPayment(calculateMonthlyPayment(amount, months))
    }
  }

  async function onSubmit (values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast({
        title: 'Loan Application Submitted',
        description: 'We will review your application and get back to you soon.',
                type: 'success'
      })
      form.reset()
      setMonthlyPayment(null)
    } catch (error) {
      toast({
        type:"error",
        title: 'Application Failed',
        description: 'Please try again later'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='container max-w-xl mx-auto py-10'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className='border-0 shadow-lg bg-gradient-to-br from-gray-900 to-gray-800'>
          <CardHeader className='border-b border-gray-700 pb-7'>
            <div className='flex items-center gap-4'>
              <div className='p-3 bg-purple-500/10 rounded-lg'>
                <FileText className='w-6 h-6 text-purple-500' />
              </div>
              <div>
                <CardTitle className='text-2xl text-white'>
                  Apply for a Loan
                </CardTitle>
                <CardDescription className='text-gray-400'>
                  Get the financial support you need
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className='pt-6'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <FormField
                  control={form.control}
                  name='amount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-200'>
                        Loan Amount
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <span className='absolute left-3 top-2.5 text-gray-500'>
                            $
                          </span>
                          <Input
                            type='number'
                            placeholder='0.00'
                            className='pl-7 bg-gray-800 border-gray-700 text-white'
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='loanType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-200'>Loan Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                            <SelectValue placeholder='Select loan type' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='bg-gray-800 border-gray-700'>
                          <SelectItem value='personal'>
                            Personal Loan
                          </SelectItem>
                          <SelectItem value='business'>
                            Business Loan
                          </SelectItem>
                          <SelectItem value='education'>
                            Education Loan
                          </SelectItem>
                          <SelectItem value='mortgage'>
                            Mortgage Loan
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='duration'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-200'>
                        Loan Duration
                      </FormLabel>
                      <Select
                        onValueChange={value => {
                          field.onChange(value)
                          handleDurationChange(value)
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                            <SelectValue placeholder='Select duration' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='bg-gray-800 border-gray-700'>
                          <SelectItem value='12'>12 months</SelectItem>
                          <SelectItem value='24'>24 months</SelectItem>
                          <SelectItem value='36'>36 months</SelectItem>
                          <SelectItem value='48'>48 months</SelectItem>
                          <SelectItem value='60'>60 months</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='purpose'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-200'>
                        Loan Purpose
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter loan purpose'
                          className='bg-gray-800 border-gray-700 text-white'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='income'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-200'>
                        Monthly Income
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <span className='absolute left-3 top-2.5 text-gray-500'>
                            $
                          </span>
                          <Input
                            type='number'
                            placeholder='0.00'
                            className='pl-7 bg-gray-800 border-gray-700 text-white'
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {monthlyPayment && (
                  <div className='p-4 bg-purple-500/10 rounded-lg flex items-center gap-3'>
                    <Calculator className='w-5 h-5 text-purple-500' />
                    <div>
                      <p className='text-sm font-medium text-white'>
                        Estimated Monthly Payment
                      </p>
                      <p className='text-2xl font-bold text-white'>
                        ${monthlyPayment}
                      </p>
                    </div>
                  </div>
                )}

                <Button
                  type='submit'
                  className='w-full bg-purple-600 hover:bg-purple-700 text-white'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Submit Application'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className='border-t border-gray-700 mt-6 flex flex-col items-start pt-6'>
            <h4 className='text-sm font-medium text-gray-200 mb-2'>
              Important Note
            </h4>
            <p className='text-sm text-gray-400'>
              Loan approval is subject to credit assessment and bank policies.
              Interest rates may vary based on your credit score and loan type.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
