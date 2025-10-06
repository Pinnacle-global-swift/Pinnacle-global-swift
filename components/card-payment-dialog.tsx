'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Copy, Wallet } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'

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

interface CardPaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount: number
}

export function CardPaymentDialog ({
  open,
  onOpenChange,
  amount
}: CardPaymentDialogProps) {
  const [copied, setCopied] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(cryptoAddresses[0].type)

  const selectedAddress = cryptoAddresses.find(
    crypto => crypto.type === paymentMethod
  )

  const copyToClipboard = () => {
    if (!selectedAddress) return

    navigator.clipboard.writeText(selectedAddress.address)
    setCopied(true)
    toast({
      title: 'Copied!',
      description: 'The wallet address has been copied to your clipboard.',
      type: 'success'
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleConfirmPayment = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='bg-[#1a1a1a] text-white border-gray-800 w-[90vw] max-w-[425px] p-4 sm:p-6'>
        <DialogHeader className='space-y-3 px-0'>
          <DialogTitle className='flex items-center gap-2 text-lg sm:text-xl'>
            <Wallet className='w-5 h-5' />
            Card Payment
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-4 sm:space-y-6'>
          {/* Amount Section */}
          <div className='w-full'>
            <label className='text-xs text-gray-400'>AMOUNT (USD)</label>
            <div className='relative mt-1 w-full'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                $
              </span>
              <input
                type='text'
                value={amount.toFixed(2)}
                readOnly
                aria-label='Payment amount in USD'
                className='w-full bg-[#2a2a2a] border border-gray-700 rounded-md py-2 px-7 text-white block text-sm sm:text-base'
              />
            </div>
          </div>

          {/* Payment Method Section */}
          <div className='w-full'>
            <label className='text-xs text-gray-400'>PAYMENT METHOD</label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className='w-full bg-[#2a2a2a] border-gray-700 text-white mt-1 text-sm sm:text-base'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className='bg-[#2a2a2a] border-gray-700'>
                {cryptoAddresses.map(crypto => (
                  <SelectItem key={crypto.type} value={crypto.type}>
                    {crypto.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* QR Code Section */}
          <div className='flex justify-center'>
            <div className='bg-white p-2 sm:p-4 rounded-lg w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] relative'>
              {selectedAddress ? (
                <Image
                  src={selectedAddress.qrCode || '/placeholder.svg'}
                  alt={`${paymentMethod} QR Code`}
                  fill
                  className='object-contain p-1 sm:p-2'
                  priority
                  sizes='(max-width: 640px) 150px, 200px'
                />
              ) : (
                <p className='text-gray-500 text-xs sm:text-sm'>
                  QR Code unavailable
                </p>
              )}
            </div>
          </div>

          {/* Wallet Address Section */}
          <div>
            <p className='text-xs text-gray-400 mb-2'>
              You are to pay the amount above to the crypto address provided
              below. Contact support to verify the transaction.
            </p>
            <div className='flex items-center gap-2 bg-[#2a2a2a] p-2 rounded-lg'>
              <div className='flex-1 text-xs sm:text-sm truncate'>
                {selectedAddress
                  ? `${selectedAddress.address.slice(0, 30)}...`
                  : 'Address unavailable'}
              </div>
              <button
                onClick={copyToClipboard}
                className='text-primary hover:text-primary-dark focus:outline-none'
                disabled={!selectedAddress}
                aria-label='Copy address'
              >
                <Copy className='w-4 h-4 sm:w-5 sm:h-5' />
              </button>
            </div>
          </div>
        </div>

        {/* Add this button at the bottom of the dialog content */}
        <div className='mt-6'>
          <button
            onClick={handleConfirmPayment}
            className='w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl h-12 text-lg font-medium transition-all duration-300 hover:from-blue-600 hover:to-purple-600'
          >
            Confirm Payment
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
