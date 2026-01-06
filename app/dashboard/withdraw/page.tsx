"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { ArrowDownRight, Wallet } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { api } from "@/lib/api"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Amount must be a valid number",
    })
    .refine((val) => parseFloat(val) >= 100, {
      message: "Minimum withdrawal amount is $100",
    })
    .refine((val) => parseFloat(val) <= 50000, {
      message: "Maximum withdrawal amount is $50,000",
    }),
  withdrawalMethod: z.enum(["Bank Transfer", "Wire Transfer"], {
    required_error: "Please select a withdrawal method",
  }),
  bankName: z
    .string()
    .min(2, "Bank name must be at least 2 characters")
    .max(50, "Bank name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "Bank name must contain only letters and spaces"),
  accountNumber: z
    .string()
    .min(8, "Account number must be at least 8 digits")
    .max(20, "Account number must not exceed 20 digits")
    .regex(/^\d+$/, "Account number must contain only numbers"),
  swiftCode: z
    .string()
    .min(8, "SWIFT code must be 8 or 11 characters")
    .max(11, "SWIFT code must be 8 or 11 characters")
    .regex(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, "Invalid SWIFT code format"),
  description: z
    .string()
    .max(100, "Description must not exceed 100 characters")
    .optional(),
})

export default function WithdrawPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [accountUser, setAccountUser] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      withdrawalMethod: undefined,
      bankName: "",
      accountNumber: "",
      swiftCode: "",
      description: "",
    },
  })

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    const withdrawalAmount = parseFloat(values.amount)
    const currentBalance = accountUser?.balance || 0

    // Check if withdrawal amount exceeds balance
    if (withdrawalAmount > currentBalance) {
      toast({
        type: "error",
        title: "Insufficient Balance",
        description: "Withdrawal amount exceeds available balance",
      })
      return
    }

    // Check if withdrawal amount exceeds daily limit
    if (withdrawalAmount > 10000) {
      toast({
        type: "error",
        title: "Limit Exceeded",
        description: "Daily withdrawal limit is $10,000",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await api.withdraw({
        amount: withdrawalAmount,
        withdrawalMethod: values.withdrawalMethod,
        bankName: values.bankName,
        accountNumber: values.accountNumber,
        swiftCode: values.swiftCode,
      })

      toast({
        title: "Withdrawal Initiated",
        description: `Your withdrawal request for $${values.amount} has been submitted.`,
        type: "success",
      })
      form.reset()
    } catch (error: any) {
      toast({
        type: "error",
        title: "Withdrawal Failed",
        description: error?.response?.data?.error?.message || "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [accountUser?.balance, form, toast])

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const data = await api.getUserDetails()
        setAccountUser(data?.data?.account)
      } catch (err: any) {
        toast({
          type: "error",
          title: "Error",
          description: err.message || "Failed to fetch account info",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAccountInfo()
  }, [toast])

  return (
    <div className='min-h-full bg-[#f8fafc] dark:bg-[#0f172a] p-4 lg:p-8'>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <Card className="border-none shadow-2xl bg-white dark:bg-slate-800 overflow-hidden">
          <CardHeader className="bg-[#1e293b] text-white p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url(\'https://www.transparenttextures.com/patterns/carbon-fibre.png\')]" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/20 rounded-xl backdrop-blur-sm">
                  <ArrowDownRight className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold tracking-tight">Withdraw Funds</CardTitle>
                  <CardDescription className="text-slate-400 mt-1 font-medium">Fast and secure global payouts</CardDescription>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Available Balance</p>
                <p className="text-2xl font-black text-white">${(accountUser?.balance || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <div className="sm:hidden mb-8 p-6 bg-slate-900 rounded-2xl border border-slate-700">
              <div className="flex items-center gap-3 mb-1">
                <Wallet className="w-4 h-4 text-blue-400" />
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Available Balance</p>
              </div>
              <p className="text-3xl font-black text-white">${(accountUser?.balance || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold">Amount to Withdraw</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="pl-8 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-14 text-xl font-bold rounded-xl focus:ring-2 focus:ring-red-500 transition-all"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="withdrawalMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold">Method</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-12 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all">
                              <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="dark:bg-slate-800 border-slate-700">
                            <SelectItem value="Bank Transfer">Local Bank Transfer</SelectItem>
                            <SelectItem value="Wire Transfer">SWIFT/Wire Transfer</SelectItem>
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
                        <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold">Bank Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Receiving bank"
                            className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-12 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold">Account Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Recipient account"
                            className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-12 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all font-mono"
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
                        <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold">SWIFT/BIC</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Bank identifier"
                            className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-12 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all font-mono uppercase"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing Request..." : "Initiate Withdrawal"}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="bg-slate-50 dark:bg-slate-900/50 p-6">
            <div className="w-full flex items-center gap-4 text-slate-500 dark:text-slate-400">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-semibold uppercase tracking-wider">Withdrawals are processed within 24-48 business hours.</p>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
