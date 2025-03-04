'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Wallet, QrCode, Check } from 'lucide-react'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
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
import { cn } from '@/lib/utils'

const cryptoAddresses = [
  {
    type: 'BTC',
    coin: 'COIN',
    address: 'bc1qc5hvcr8k6vxzsks6w3d5h3rcmaa52t34n4mdjk',
    qrCode: '/BTC.png?height=200&width=200',
    timestamp: '9:19 PM',
    icon: '/btc-icon.svg'
  },
  {
    type: 'ETH',
    coin: 'COIN',
    address: '0x5ed59b1E92493310e5580C4e54051036396AAA2C',
    qrCode: '/ETH.png?height=200&width=200',
    timestamp: '9:20 PM',
    icon: '/eth-icon.svg'
  },
  {
    type: 'USDT',
    coin: 'TRC20',
    address: 'TDwxMpfaXoWqxQU5kdosvbDKqbKoQ5klkF',
    qrCode: '/USDT.png?height=200&width=200',
    timestamp: '9:20 PM',
    icon: '/usdt-icon.svg'
  }
]

const formSchema = z.object({
  amount: z.string().min(1, 'Amount is required'),
  paymentMethod: z.string().min(1, 'Payment method is required')
})

export default function DepositPage () {
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoAddresses[0])
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      paymentMethod: 'BTC' // Changed to match crypto type
    }
  })

  const copyToClipboard = async (e: React.MouseEvent, address: string) => {
    e.preventDefault() // Prevent default button behavior
    try {
      await navigator.clipboard.writeText(address)
      setCopiedAddress(address)
      toast({
        type:"success",
        title: 'Address Copied',
        description: 'The address has been copied to your clipboard'
      })
      setTimeout(() => setCopiedAddress(null), 2000)
    } catch (err) {
      toast({
        title: 'Copy Failed',
        description: 'Failed to copy address to clipboard',
        type: 'error'
      })
    }
  }
  const handlePaymentMethodChange = (value: string) => {
    console.log('Selected value:', value) // Debug logging
    
    const selectedCrypto = cryptoAddresses.find(crypto => crypto.type === value)
    if (selectedCrypto) {
      setSelectedCrypto(selectedCrypto)
      form.setValue('paymentMethod', value)
    }
  }

  return (
    <div className='container max-w-xl mx-auto py-10 px-4 sm:px-6 lg:px-8'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Card className='border-0 shadow-2xl bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 backdrop-blur-lg rounded-2xl border border-white/10'>
          <CardHeader className='border-b border-white/20 pb-7'>
            <div className='flex items-center gap-4'>
              <div className='p-3 bg-blue-500/20 rounded-xl backdrop-blur-sm'>
                <Wallet className='w-7 h-7 text-blue-400' />
              </div>
              <div>
                <CardTitle className='text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                  Deposit Funds
                </CardTitle>
                <CardDescription className='text-gray-300/90'>
                  Add money to your account securely
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className='pt-8'>
            <Form {...form}>
              <form className='space-y-8' onSubmit={(e) => e.preventDefault()}>
                <FormField
                  control={form.control}
                  name='amount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-100 font-medium'>
                        Amount
                      </FormLabel>
                      <FormControl>
                        <div className='relative group'>
                          <span className='absolute left-3 top-3.5 text-gray-400 text-lg'>
                            $
                          </span>
                          <Input
                            type='number'
                            placeholder='0.00'
                            className={cn(
                              'pl-10 bg-gray-950/50 border-white/20 text-gray-100',
                              'rounded-xl h-14 text-lg font-medium focus:ring-2 focus:ring-blue-400',
                              'focus:border-transparent transition-all duration-300 hover:border-white/40'
                            )}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-red-300' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='paymentMethod'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-100 font-medium'>
                        Payment Method
                      </FormLabel>
                      <Select
                        onValueChange={handlePaymentMethodChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='bg-gray-950/50 border-white/20 text-gray-100 rounded-xl h-14 px-4'>
                            <SelectValue placeholder='Select payment method' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='bg-gray-900 border-white/20 backdrop-blur-lg rounded-xl'>
                          {cryptoAddresses.map((crypto) => (
                            <SelectItem
                              key={crypto.type}
                              value={crypto.type} // Use exact crypto type
                              className='focus:bg-white/10 text-gray-100 hover:!bg-white/15 rounded-lg'
                            >
                              <div className='flex items-center gap-3'>
                                <img
                                  src={crypto.icon}
                                  alt={crypto.type}
                                  className='w-6 h-6'
                                />
                                {crypto.type} ({crypto.coin})
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className='text-red-300' />
                    </FormItem>
                  )}
                />

                <div className='space-y-6'>
                  <div className='flex justify-center group relative'>
                    <div className='bg-white/5 p-5 rounded-2xl backdrop-blur-sm border border-white/20 transition-all duration-300 hover:border-blue-400/50'>
                      <div className='absolute inset-0 bg-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity' />
                      <Image
                        src={selectedCrypto.qrCode}
                        alt='QR Code'
                        width={240}
                        height={240}
                        className='w-full max-w-[240px] aspect-square'
                      />
                    </div>
                  </div>

                  <div className='space-y-3'>
                    <label className='text-sm font-medium text-gray-200'>
                      Deposit Address
                    </label>
                    <div className='flex items-center gap-2 bg-gray-950/50 p-4 rounded-xl border border-white/20 group hover:border-blue-400/50 transition-all duration-300'>
                      <QrCode className='w-6 h-6 text-blue-400' />
                      <code className='flex-1 text-sm text-gray-300 font-mono break-all'>
                        {selectedCrypto.address}
                      </code>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={(e) => copyToClipboard(e, selectedCrypto.address)}
                        className={cn(
                          'h-9 px-3 text-gray-400 hover:text-white',
                          'hover:bg-white/10 transition-all duration-200',
                          copiedAddress === selectedCrypto.address && 'text-green-400'
                        )}
                      >
                        {copiedAddress === selectedCrypto.address ? (
                          <span className='flex items-center gap-2'>
                            <Check className='w-4 h-4' /> Copied
                          </span>
                        ) : (
                          <Copy className='w-4 h-4' />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>

          <CardFooter className='border-t border-white/20 mt-6 py-6'>
            <div className='w-full space-y-3'>
              <h4 className='text-lg font-semibold text-gray-100'>
                Important Note
              </h4>
              <p className='text-sm text-gray-400/90 leading-relaxed'>
                Please ensure to send only{' '}
                <span className='font-medium text-blue-400'>
                  {selectedCrypto.type} ({selectedCrypto.coin})
                </span>{' '}
                to this address. Sending other assets may result in permanent loss.
                Network confirmations typically take 2-30 minutes.
              </p>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
