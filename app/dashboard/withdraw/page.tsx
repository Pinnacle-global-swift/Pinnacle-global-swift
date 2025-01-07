'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownRight, Wallet } from 'lucide-react'
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
import { api } from '@/lib/api'

const formSchema = z.object({
  amount: z.string().min(1, 'Amount is required'),
  withdrawalMethod: z.string().min(1, 'Withdrawal method is required'),
  bankName: z.string().min(1, 'Bank name is required'),
  accountNumber: z.string().min(1, 'Account number is required'),
  swiftCode: z.string().min(1, 'SWIFT code is required'),
  description: z.string().optional()
})

const cryptoAddresses = [
  {
    address: 'bc1qc5hvcr8k6vxzsks6w3d5h3rcmaa52t34n4mdjk',
    phone: '+234 812 747 8245',
    qrCode: '/placeholder.svg?height=200&width=200',
    timestamp: '9:19 PM'
  },
  {
    address: '0x5ed59b1E92493310e5580C4e54051036396AAA2C',
    phone: '+234 812 747 8245',
    qrCode: '/placeholder.svg?height=200&width=200',
    timestamp: '9:20 PM'
  },
  {
    address: 'TDwxMpfaXoWqxQU5kdosvbDKqbKoQ5klkF',
    phone: '+234 812 747 8245',
    qrCode: '/placeholder.svg?height=200&width=200',
    timestamp: '9:20 PM'
  }
]

export default function WithdrawPage () {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [accountInfo, setAccountInfo] = useState<any>(null)
  const [accountUser, setAccountUser] = useState<any>(null)

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMethod, setSelectedMethod] = useState<string>('bank_transfer')
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      withdrawalMethod: '',
      bankName: '',
      accountNumber: '',
      swiftCode: '',
      description: ''
    }
  })

  async function onSubmit (values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    console.log(values)
    try {
      const response = await api.withdraw({
        amount: parseFloat(values.amount),
        withdrawalMethod: values.withdrawalMethod,
        bankName: values.bankName,
        accountNumber: values.accountNumber,
        swiftCode: values.swiftCode
      })
      console.log(response)
      const receiptWindow = window.open('', '_blank')
      if (receiptWindow) {
        receiptWindow.document.write(response.data.receipt) // Write the receipt HTML
        receiptWindow.document.close()
      }
      toast({
        title: 'Withdrawal Initiated',
        description: `Your withdrawal request for $${values.amount} has been submitted. Reference: ${response.data?.transaction.reference}`,
        duration: 5000
      })

      form.reset()
    } catch (error: any) {
      console.error('Withdrawal error:', error?.response?.data?.error?.message)
      toast({
        // variant: "destructive",
        title: 'Withdrawal Failed',
        description:
          error?.response?.data?.error?.message ||
          'An unexpected error occurred. Please try again.',
        duration: 5000
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const data = await api.getUserDetails() // Call the API method
        setAccountUser(data?.data?.account) // Set the fetched data to state
      } catch (err: any) {
        setError(err.message || 'Failed to fetch account info') // Handle error
      } finally {
        setLoading(false) // Stop loading indicator
      }
    }

    fetchAccountInfo() // Call the function when the component mounts
  }, [])

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
              <div className='p-3 bg-red-500/10 rounded-lg'>
                <ArrowDownRight className='w-6 h-6 text-red-500' />
              </div>
              <div>
                <CardTitle className='text-2xl text-white'>
                  Withdraw Funds
                </CardTitle>
                <CardDescription className='text-gray-400'>
                  Withdraw money to your bank account
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className='pt-6'>
            <div className='mb-6 p-4 bg-blue-500/10 rounded-lg flex items-center gap-3'>
              <Wallet className='w-5 h-5 text-blue-500' />
              <div>
                <p className='text-sm font-medium text-white'>
                  Available Balance
                </p>
                <p className='text-2xl font-bold text-white'>
                  ${accountUser?.balance}
                </p>
              </div>
            </div>

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
                      <FormLabel className='text-gray-200'>Amount</FormLabel>
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
                  name='withdrawalMethod'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-200'>
                        Withdrawal Method
                      </FormLabel>
                      <Select
                        onValueChange={value => {
                          field.onChange(value)
                          setSelectedMethod(value)
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                            <SelectValue placeholder='Select withdrawal method' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='bg-gray-800 border-gray-700'>
                          <SelectItem value='Bank Transfer'>
                            Bank Transfer
                          </SelectItem>
                          <SelectItem value='Wire Transfer'>
                            Wire Transfer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='bankName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-200'>Bank Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter bank name'
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
                  name='accountNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-200'>
                        Account Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter account number'
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
                  name='swiftCode'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-200'>
                        SWIFT Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter SWIFT code'
                          className='bg-gray-800 border-gray-700 text-white'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  className='w-full bg-red-600 hover:bg-red-700 text-white'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Withdraw Funds'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className='border-t border-gray-700 mt-6 flex flex-col items-start pt-6'>
            <h4 className='text-sm font-medium text-gray-200 mb-2'>
              Recent Withdrawals
            </h4>
            <p className='text-sm text-gray-400'>No recent withdrawals</p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
