'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownRight, Wallet } from 'lucide-react'
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
  withdrawalMethod: z.string().min(1, "Withdrawal method is required"),
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  swiftCode: z.string().min(1, "SWIFT code is required"),
  description: z.string().optional(),
})

export default function WithdrawPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      withdrawalMethod: "",
      bankName: "",
      accountNumber: "",
      swiftCode: "",
      description: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast({
        title: "Withdrawal Initiated",
        description: `$${values.amount} withdrawal request has been submitted`,
      })
      form.reset()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Withdrawal Failed",
        description: "Please try again later",
      })
    } finally {
      setIsSubmitting(false)
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
              <div className="p-3 bg-red-500/10 rounded-lg">
                <ArrowDownRight className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <CardTitle className="text-2xl text-white">Withdraw Funds</CardTitle>
                <CardDescription className="text-gray-400">
                  Withdraw money to your bank account
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6 p-4 bg-blue-500/10 rounded-lg flex items-center gap-3">
              <Wallet className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-white">Available Balance</p>
                <p className="text-2xl font-bold text-white">$50,000.00</p>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  name="withdrawalMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Withdrawal Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select withdrawal method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                          <SelectItem value="wire_transfer">Wire Transfer</SelectItem>
                          <SelectItem value="crypto">Cryptocurrency</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Bank Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter bank name"
                          className="bg-gray-800 border-gray-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Account Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter account number"
                          className="bg-gray-800 border-gray-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="swiftCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">SWIFT Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter SWIFT code"
                          className="bg-gray-800 border-gray-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Withdraw Funds"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="border-t border-gray-700 mt-6 flex flex-col items-start pt-6">
            <h4 className="text-sm font-medium text-gray-200 mb-2">Recent Withdrawals</h4>
            <p className="text-sm text-gray-400">No recent withdrawals</p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

