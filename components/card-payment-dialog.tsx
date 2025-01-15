'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Copy, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'

const cryptoAddresses = [
  {
    type: 'BTC',
    coin: 'COIN',
    address: 'bc1qc5hvcr8k6vxzsks6w3d5h3rcmaa52t34n4mdjk',
    qrCode: '/BTC.png?height=200&width=200',
    timestamp: '9:19 PM',
    icon: '/btc-icon.svg',
  },
  {
    type: 'ETH',
    coin: 'COIN',
    address: '0x5ed59b1E92493310e5580C4e54051036396AAA2C',
    qrCode: '/ETH.png?height=200&width=200',
    timestamp: '9:20 PM',
    icon: '/eth-icon.svg',
  },
  {
    type: 'USDT',
    coin: 'TRC20',
    address: 'TDwxMpfaXoWqxQU5kdosvbDKqbKoQ5klkF',
    qrCode: '/USDT.png?height=200&width=200',
    timestamp: '9:20 PM',
    icon: '/usdt-icon.svg',
  },
]

export function CardPaymentDialog({
  open,
  onOpenChange,
  amount,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount: number
}) {
  const [copied, setCopied] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(cryptoAddresses[0].type)

  const selectedAddress = cryptoAddresses.find(
    (crypto) => crypto.type === paymentMethod
  )

  const copyToClipboard = () => {
    if (!selectedAddress) return

    navigator.clipboard.writeText(selectedAddress.address)
    setCopied(true)
    toast({
      title: 'Copied!',
      description: 'The wallet address has been copied to your clipboard.',
        type:"success"
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1a1a1a] text-white border-gray-800 sm:max-w-[425px]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Card Payment
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Amount Section */}
          <div>
            <label className="text-xs text-gray-400">AMOUNT (USD)</label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                $
              </span>
              <input
                type="text"
                value={amount.toFixed(2)}
                readOnly
                className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md py-2 px-7 text-white"
              />
            </div>
          </div>

          {/* Payment Method Section */}
          <div>
            <label className="text-xs text-gray-400">PAYMENT METHOD</label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="w-full bg-[#2a2a2a] border-gray-700 text-white mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a2a] border-gray-700">
                {cryptoAddresses.map((crypto) => (
                  <SelectItem key={crypto.type} value={crypto.type}>
                    {crypto.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* QR Code Section */}
          <div className="flex justify-center bg-white p-4 rounded-lg">
            {selectedAddress ? (
              <Image
                src={selectedAddress.qrCode}
                alt={`${paymentMethod} QR Code`}
                width={200}
                height={200}
                className="w-full max-w-[200px]"
              />
            ) : (
              <p className="text-gray-500">QR Code unavailable</p>
            )}
          </div>

          {/* Wallet Address Section */}
          <div>
            <p className="text-xs text-gray-400">
              You are to pay the amount above to the crypto address provided
              below. Contact support to verify the transaction.
            </p>
            <div className="flex items-center gap-2 bg-[#2a2a2a] p-2 rounded-lg mt-2">
              <div className="flex-1 text-sm truncate">
                {selectedAddress?.address || 'Address unavailable'}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="h-8 px-3 text-primary hover:text-primary hover:bg-primary/10"
                disabled={!selectedAddress}
              >
                {copied ? 'Copied!' : 'Copy'}
                <Copy className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
