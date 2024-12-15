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
  CardFooter,
  CardHeader,
  CardTitle,
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

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
})

const WALLET_ADDRESS = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"

export default function DepositPage() {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      paymentMethod: "",
    },
  })

  const copyToClipboard = () => {
    navigator.clipboard.writeText(WALLET_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Address Copied",
      description: "Wallet address has been copied to clipboard",
    })
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  <div className="flex justify-center">
                    <div className="bg-white p-4 rounded-lg">
                      <Image
                        src="/placeholder.svg?height=200&width=200"
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
                      <code className="flex-1 text-sm text-gray-300 font-mono">
                        {WALLET_ADDRESS}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyToClipboard}
                        className="h-8 px-3 text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        {copied ? "Copied!" : "Copy"}
                        <Copy className="w-4 h-4 ml-2" />
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
              Please make sure to send only the supported cryptocurrency to this address.
              Sending any other cryptocurrency may result in permanent loss.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

