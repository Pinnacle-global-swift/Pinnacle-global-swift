'use client'

import { motion } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { Download, Copy, Check, Building, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'

interface TransactionReceiptProps {
  isOpen: boolean
  onClose: () => void
  transaction: any
}

export function TransactionReceipt({ isOpen, onClose, transaction }: TransactionReceiptProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    toast({
      title: "Copied!",
      description: "Transaction reference copied to clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const printReceipt = () => {
    window.print()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white print:shadow-none">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  Transaction Receipt
                </DialogTitle>
                <p className="text-sm text-gray-500">Transaction details and confirmation</p>
              </div>
            </div>
            <div className="hidden print:block absolute top-4 right-4">
              <Image
                src="/logo.png"
                alt="Bank Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
          </div>
        </DialogHeader>
        
        <div className="p-6 space-y-8">
          {/* Bank Information */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl space-y-2">
            <h2 className="text-xl font-bold text-primary flex items-center gap-2">
              Pinnacle Global Swift
              <span className="text-sm font-normal text-gray-500">
                (International Banking Institution)
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Bank Address</p>
                <p className="font-medium">{transaction?.bankDetails?.address}</p>
              </div>
              <div>
                <p className="text-gray-500">SWIFT/BIC Code</p>
                <p className="font-mono font-medium">{transaction?.bankDetails?.swiftCode}</p>
              </div>
            </div>
          </div>

          {/* Transaction Status Banner */}
          <div className={`rounded-lg p-4 flex items-center justify-between ${
            transaction?.status === 'completed' ? 'bg-green-50 text-green-700' : 
            transaction?.status === 'pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'
          }`}>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                transaction?.status === 'completed' ? 'bg-green-500' :
                transaction?.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <span className="font-medium capitalize">
                {transaction?.status} Transaction
              </span>
            </div>
            <span className="text-sm">
              {/* {format(new Date(transaction?.date), "MMMM dd, yyyy 'at' h:mm a")} */}
            </span>
          </div>

          {/* Transaction Details */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Transaction Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Type</span>
                    <span className="font-medium capitalize">{transaction?.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Amount</span>
                    <span className="font-bold text-lg">
                      ${transaction?.amount.toFixed(2)} {transaction?.currency}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Reference ID</span>
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {transaction?.reference}
                      </code>
                      <button 
                        onClick={() => handleCopy(transaction?.reference)}
                        className="text-primary hover:text-primary/80"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Account Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Account Holder</span>
                    <span className="font-medium">{transaction?.accountDetails?.accountHolder}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Account Number</span>
                    <span className="font-medium font-mono">
                      {transaction?.accountDetails?.accountNumber}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Email</span>
                    <span className="font-medium">{transaction?.accountDetails?.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {transaction?.description && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Transaction Note</h4>
                <p className="text-gray-600 text-sm">{transaction?.description}</p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="border-t pt-6 mt-8">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                <p>Receipt No: {transaction?.receiptNumber}</p>
                <p className="mt-1">Generated on {format(new Date(), "PPP")}</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={printReceipt}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
