'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Wallet, QrCode } from 'lucide-react'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

const cryptoAddresses = [
  {
    type: "BTC",
    coin: "COIN",
    address: "bc1qc5hvcr8k6vxzsks6w3d5h3rcmaa52t34n4mdjk",
    qrCode: "/placeholder.svg?height=200&width=200",
    timestamp: "9:19 PM",
    icon: "/btc-icon.svg"
  },
  {
    type: "ETH", 
    coin: "COIN",
    address: "0x5ed59b1E92493310e5580C4e54051036396AAA2C",
    qrCode: "/placeholder.svg?height=200&width=200",
    timestamp: "9:20 PM",
    icon: "/eth-icon.svg"
  },
  {
    type: "USDT",
    coin: "TRC20",
    address: "TDwxMpfaXoWqxQU5kdosvbDKqbKoQ5klkF",
    qrCode: "/placeholder.svg?height=200&width=200",
    timestamp: "9:20 PM",
    icon: "/usdt-icon.svg"
  }
]

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
})

export default function DepositPage() {
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoAddresses[0])
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
  const { toast } = useToast()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      paymentMethod: "bitcoin",
    },
  })

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address)
    setCopiedAddress(address)
    toast({
      title: "Address Copied",
      description: "The address has been copied to your clipboard",
    })
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  const handlePaymentMethodChange = (value: string) => {
    form.setValue("paymentMethod", value)
    switch(value) {
      case "bitcoin":
        setSelectedCrypto(cryptoAddresses[0])
        break
      case "ethereum":
        setSelectedCrypto(cryptoAddresses[1])
        break
      case "usdt":
        setSelectedCrypto(cryptoAddresses[2])
        break
    }
  }

  return (
    <div className="container max-w-xl mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-900 to-gray-800">
          <CardHeader className="border-b border-gray-700 pb-7">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Wallet className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <CardTitle className="text-2xl text-white">Deposit Funds</CardTitle>
                <CardDescription className="text-gray-400">
                  Add money to your account
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form className="space-y-6">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="pl-7 bg-gray-800 border-gray-700 text-white"
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
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Payment Method</FormLabel>
                      <Select onValueChange={handlePaymentMethodChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                          <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                          <SelectItem value="usdt">USDT (TRC20)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Image
                        src={selectedCrypto.icon}
                        alt={selectedCrypto.type}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-lg font-semibold text-white">{selectedCrypto.type}</span>
                      <span className="text-sm text-gray-400">{selectedCrypto.coin}</span>
                    </div>
                    <span className="text-xs text-gray-500">{selectedCrypto.timestamp}</span>
                  </div>

                  <div className="flex justify-center">
                    <div className="bg-white p-4 rounded-lg">
                      <Image
                        src={selectedCrypto.qrCode}
                        alt="QR Code"
                        width={200}
                        height={200}
                        className="w-full max-w-[200px]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-200">Wallet Address</label>
                    <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
                      <QrCode className="w-5 h-5 text-gray-400" />
                      <code className="flex-1 text-sm text-gray-300 font-mono break-all">
                        {selectedCrypto.address}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(selectedCrypto.address)}
                        className="h-8 px-3 text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        {copiedAddress === selectedCrypto.address ? (
                          "Copied!"
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="border-t border-gray-700 mt-6 flex flex-col items-start pt-6">
            <h4 className="text-sm font-medium text-gray-200 mb-2">Important Note</h4>
            <p className="text-sm text-gray-400">
              Please make sure to send only {selectedCrypto.type} ({selectedCrypto.coin}) to this address.
              Sending any other cryptocurrency may result in permanent loss.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

