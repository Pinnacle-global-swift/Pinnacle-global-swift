'use client'

import { useState, useCallback } from 'react'
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
    type: 'XRP',
    coin: 'COIN',
    address: 'rpW3G4AyeRtTFumwyd7bDyGW1AWZhZi7u',
    qrCode: '/XRP.png?height=200&width=200',
    timestamp: '10:04 PM',
    icon: '/xrp-icon.svg'
  },
  {
    type: 'XLM',
    coin: 'COIN',
    address: 'GDTIY34FHHVZEUZCSE5V57WA2WYLQC4KFFKCDP6LUSO7BH5HITAZK',
    qrCode: '/XLM.png?height=200&width=200',
    timestamp: '10:05 PM',
    icon: '/xlm-icon.svg'
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

export default function DepositPage() {
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoAddresses[0])
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      paymentMethod: 'XRP' // Changed to match crypto type
    }
  })

  const copyToClipboard = useCallback(async (e: React.MouseEvent, address: string) => {
    e.preventDefault() // Prevent default button behavior
    try {
      await navigator.clipboard.writeText(address)
      setCopiedAddress(address)
      toast({
        type: "success",
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
  }, [toast])

  const handlePaymentMethodChange = useCallback((value: string) => {
    const selectedCrypto = cryptoAddresses.find(crypto => crypto.type === value)
    if (selectedCrypto) {
      setSelectedCrypto(selectedCrypto)
      form.setValue('paymentMethod', value)
    }
  }, [form])

  return (
    <div className='min-h-full bg-[#f8fafc] dark:bg-[#0f172a] p-4 lg:p-8'>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <Card className='border-none shadow-2xl bg-white dark:bg-slate-800 overflow-hidden'>
          <CardHeader className='bg-[#1e293b] text-white p-8 relative overflow-hidden'>
            <div className="absolute inset-0 opacity-10 bg-[url(\'https://www.transparenttextures.com/patterns/carbon-fibre.png\')]" />
            <div className="relative z-10 flex items-center gap-4">
              <div className='p-3 bg-blue-500/20 rounded-xl backdrop-blur-sm'>
                <Wallet className='w-8 h-8 text-blue-400' />
              </div>
              <div>
                <CardTitle className='text-2xl font-bold tracking-tight'>
                  Deposit Funds
                </CardTitle>
                <CardDescription className='text-slate-400 mt-1 font-medium'>
                  Add liquidity via secure crypto gateways
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className='p-8'>
            <Form {...form}>
              <form className='space-y-8' onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name='amount'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-slate-700 dark:text-slate-300 font-semibold'>
                          Anticipated Amount
                        </FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <span className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold'>
                              $
                            </span>
                            <Input
                              type='number'
                              placeholder='0.00'
                              className='pl-8 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-12 text-lg font-bold rounded-xl focus:ring-2 focus:ring-blue-500 transition-all'
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
                    name='paymentMethod'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-slate-700 dark:text-slate-300 font-semibold'>
                          Asset Type
                        </FormLabel>
                        <Select
                          onValueChange={handlePaymentMethodChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className='bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-12 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all'>
                              <SelectValue placeholder='Select asset' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="dark:bg-slate-800 border-slate-700">
                            {cryptoAddresses.map((crypto) => (
                              <SelectItem
                                key={crypto.type}
                                value={crypto.type}
                              >
                                <div className='flex items-center gap-3'>
                                  <img
                                    src={crypto.icon}
                                    alt={crypto.type}
                                    className='w-5 h-5 grayscale group-hover:grayscale-0 transition-all'
                                  />
                                  <span className="font-semibold">{crypto.type}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='flex flex-col md:flex-row gap-8 items-center bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-700/50'>
                  <div className='bg-white p-4 rounded-2xl shadow-inner border border-slate-200'>
                    <Image
                      src={selectedCrypto.qrCode}
                      alt='QR Code'
                      width={180}
                      height={180}
                      className='aspect-square'
                    />
                  </div>

                  <div className='flex-1 space-y-4 w-full'>
                    <div className="flex items-center gap-2">
                      <QrCode className='w-4 h-4 text-blue-500' />
                      <label className='text-xs font-bold text-slate-500 uppercase tracking-widest'>
                        Your Personal {selectedCrypto.type} Address
                      </label>
                    </div>
                    <div className='flex items-center gap-3 bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-700'>
                      <code className='flex-1 text-sm text-slate-700 dark:text-slate-300 font-mono break-all leading-relaxed'>
                        {selectedCrypto.address}
                      </code>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={(e) => copyToClipboard(e, selectedCrypto.address)}
                        className={cn(
                          'shrink-0 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all',
                          copiedAddress === selectedCrypto.address && 'text-emerald-500'
                        )}
                      >
                        {copiedAddress === selectedCrypto.address ? (
                          <Check className='w-5 h-5' />
                        ) : (
                          <Copy className='w-5 h-5 text-slate-400' />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>

          <CardFooter className='bg-slate-50 dark:bg-slate-900/50 p-8 border-t border-slate-100 dark:border-slate-700/30'>
            <div className='w-full space-y-3'>
              <h4 className='text-xs font-bold text-slate-500 uppercase tracking-widest'>
                Compliance & Security
              </h4>
              <p className='text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium'>
                Only send <span className='text-blue-500 font-bold'>{selectedCrypto.type}</span> assets to this address. Credits are typically applied after <span className="text-slate-700 dark:text-slate-300">3-12 network confirmations</span>. All deposits are monitored for institutional compliance.
              </p>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
