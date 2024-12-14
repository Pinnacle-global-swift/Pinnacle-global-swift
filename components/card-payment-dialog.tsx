'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Copy, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
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

const WALLET_ADDRESS = 'bc1qptmch...he2qgh07y'

export function CardPaymentDialog ({
  open,
  onOpenChange,
  amount
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount: number
}) {
  const [copied, setCopied] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('Bitcoin')

  const copyToClipboard = () => {
    navigator.clipboard.writeText(WALLET_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='bg-[#1a1a1a] text-white border-gray-800 sm:max-w-[425px]'>
        <DialogHeader className='space-y-3'>
          <DialogTitle className='flex items-center gap-2'>
            <Wallet className='w-5 h-5' />
            Card Payment
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-6'>
          <div className='space-y-2'>
            <label className='text-xs text-gray-400'>AMOUNT(USD)</label>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                $
              </span>
              <input
                type='text'
                value={amount.toFixed(2)}
                readOnly
                className='w-full bg-[#2a2a2a] border border-gray-700 rounded-md py-2 px-7 text-white'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-xs text-gray-400'>PAYMENT METHOD</label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className='w-full bg-[#2a2a2a] border-gray-700 text-white'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className='bg-[#2a2a2a] border-gray-700'>
                <SelectItem value='Bitcoin'>Bitcoin</SelectItem>
                <SelectItem value='USDT'>USDT</SelectItem>
                <SelectItem value='ETH'>ETH</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex justify-center bg-white p-4 rounded-lg'>
            <Image
              src='/placeholder.svg?height=200&width=200'
              alt='Payment QR Code'
              width={200}
              height={200}
              className='w-full max-w-[200px]'
            />
          </div>

          <div className='space-y-2'>
            <p className='text-xs text-gray-400'>
              You are to pay the amount above to the crypto address provided
              below. Contact support to verify...
            </p>
            <div className='flex items-center gap-2 bg-[#2a2a2a] p-2 rounded-lg'>
              <div className='flex-1 text-sm truncate'>{WALLET_ADDRESS}</div>
              <Button
                variant='ghost'
                size='sm'
                onClick={copyToClipboard}
                className='h-8 px-3 text-primary hover:text-primary hover:bg-primary/10'
              >
                {copied ? 'Copied!' : 'Copy'}
                <Copy className='w-4 h-4 ml-2' />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
