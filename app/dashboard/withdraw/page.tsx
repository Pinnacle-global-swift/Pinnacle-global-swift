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
    <div className="container max-w-xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 backdrop-blur-lg rounded-2xl border border-white/10">
          <CardHeader className="border-b border-white/20 pb-7">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/20 rounded-xl backdrop-blur-sm">
                <ArrowDownRight className="w-7 h-7 text-red-400" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Withdraw Funds
                </CardTitle>
                <CardDescription className="text-gray-300/90">Withdraw money to your bank account</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-8">
            <div className="mb-6 p-4 bg-blue-500/10 rounded-lg flex items-center gap-3">
              <Wallet className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm font-medium text-gray-200">Available Balance</p>
                <p className="text-2xl font-bold text-white">${accountUser?.balance || "0.00"}</p>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-100 font-medium">Amount</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <span className="absolute left-3 top-3.5 text-gray-400 text-lg">$</span>
                          <Input
                            type="number"
                            placeholder="0.00"
                            className={cn(
                              "pl-10 bg-gray-950/50 border-white/20 text-gray-100",
                              "rounded-xl h-14 text-lg font-medium focus:ring-2 focus:ring-red-400",
                              "focus:border-transparent transition-all duration-300 hover:border-white/40",
                            )}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="withdrawalMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-100 font-medium">Withdrawal Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-950/50 border-white/20 text-gray-100 rounded-xl h-14 px-4">
                            <SelectValue placeholder="Select withdrawal method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-900 border-white/20 backdrop-blur-lg rounded-xl">
                          <SelectItem
                            value="Bank Transfer"
                            className="focus:bg-white/10 text-gray-100 hover:!bg-white/15 rounded-lg"
                          >
                            Bank Transfer
                          </SelectItem>
                          <SelectItem
                            value="Wire Transfer"
                            className="focus:bg-white/10 text-gray-100 hover:!bg-white/15 rounded-lg"
                          >
                            Wire Transfer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-100 font-medium">Bank Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter bank name"
                          className={cn(
                            "bg-gray-950/50 border-white/20 text-gray-100",
                            "rounded-xl h-14 text-lg font-medium focus:ring-2 focus:ring-red-400",
                            "focus:border-transparent transition-all duration-300 hover:border-white/40",
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-100 font-medium">Account Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter account number"
                          className={cn(
                            "bg-gray-950/50 border-white/20 text-gray-100",
                            "rounded-xl h-14 text-lg font-medium focus:ring-2 focus:ring-red-400",
                            "focus:border-transparent transition-all duration-300 hover:border-white/40",
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="swiftCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-100 font-medium">SWIFT Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter SWIFT code"
                          className={cn(
                            "bg-gray-950/50 border-white/20 text-gray-100",
                            "rounded-xl h-14 text-lg font-medium focus:ring-2 focus:ring-red-400",
                            "focus:border-transparent transition-all duration-300 hover:border-white/40",
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className={cn(
                    "w-full bg-gradient-to-r from-red-500 to-orange-500 text-white",
                    "rounded-xl h-14 text-lg font-medium transition-all duration-300",
                    "hover:from-red-600 hover:to-orange-600 focus:ring-2 focus:ring-red-400",
                  )}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Withdraw Funds"}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="border-t border-white/20 mt-6 py-6">
            <div className="w-full space-y-3">
              <h4 className="text-lg font-semibold text-gray-100">Recent Withdrawals</h4>
              <p className="text-sm text-gray-400/90 leading-relaxed">No recent withdrawals</p>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
