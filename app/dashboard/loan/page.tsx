"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { FileText, Calculator } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  loanType: z.string().min(1, "Loan type is required"),
  duration: z.string().min(1, "Duration is required"),
  purpose: z.string().min(1, "Purpose is required"),
  income: z.string().min(1, "Monthly income is required"),
})

export default function LoanPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      loanType: "",
      duration: "",
      purpose: "",
      income: "",
    },
  })

  const calculateMonthlyPayment = useCallback((amount: number, months: number) => {
    const interestRate = 0.05 / 12 // 5% annual interest rate
    const payment =
      (amount * interestRate * Math.pow(1 + interestRate, months)) / (Math.pow(1 + interestRate, months) - 1)
    return Math.round(payment * 100) / 100
  }, [])

  const handleDurationChange = useCallback((duration: string) => {
    const amount = Number.parseFloat(form.getValues("amount")) || 0
    const months = Number.parseInt(duration) || 0
    if (amount && months) {
      setMonthlyPayment(calculateMonthlyPayment(amount, months))
    }
  }, [form, calculateMonthlyPayment])

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast({
        title: "Loan Application Submitted",
        description: "We will review your application and get back to you soon.",
        type: "success",
      })
      form.reset()
      setMonthlyPayment(null)
    } catch (error) {
      toast({
        type: "error",
        title: "Application Failed",
        description: "Please try again later",
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [form, toast])

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
              <div className="p-3 bg-purple-500/20 rounded-xl backdrop-blur-sm">
                <FileText className="w-7 h-7 text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Apply for a Loan
                </CardTitle>
                <CardDescription className="text-gray-300/90">Get the financial support you need</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-100 font-medium">Loan Amount</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <span className="absolute left-3 top-3.5 text-gray-400 text-lg">$</span>
                          <Input
                            type="number"
                            placeholder="0.00"
                            className={cn(
                              "pl-10 bg-gray-950/50 border-white/20 text-gray-100",
                              "rounded-xl h-14 text-lg font-medium focus:ring-2 focus:ring-purple-400",
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
                  name="loanType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-100 font-medium">Loan Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-950/50 border-white/20 text-gray-100 rounded-xl h-14 px-4">
                            <SelectValue placeholder="Select loan type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-900 border-white/20 backdrop-blur-lg rounded-xl">
                          <SelectItem
                            value="personal"
                            className="focus:bg-white/10 text-gray-100 hover:!bg-white/15 rounded-lg"
                          >
                            Personal Loan
                          </SelectItem>
                          <SelectItem
                            value="business"
                            className="focus:bg-white/10 text-gray-100 hover:!bg-white/15 rounded-lg"
                          >
                            Business Loan
                          </SelectItem>
                          <SelectItem
                            value="education"
                            className="focus:bg-white/10 text-gray-100 hover:!bg-white/15 rounded-lg"
                          >
                            Education Loan
                          </SelectItem>
                          <SelectItem
                            value="mortgage"
                            className="focus:bg-white/10 text-gray-100 hover:!bg-white/15 rounded-lg"
                          >
                            Mortgage Loan
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-100 font-medium">Loan Duration</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          handleDurationChange(value)
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-gray-950/50 border-white/20 text-gray-100 rounded-xl h-14 px-4">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-900 border-white/20 backdrop-blur-lg rounded-xl">
                          <SelectItem
                            value="12"
                            className="focus:bg-white/10 text-gray-100 hover:!bg-white/15 rounded-lg"
                          >
                            12 months
                          </SelectItem>
                          <SelectItem
                            value="24"
                            className="focus:bg-white/10 text-gray-100 hover:!bg-white/15 rounded-lg"
                          >
                            24 months
                          </SelectItem>
                          <SelectItem
                            value="36"
                            className="focus:bg-white/10 text-gray-100 hover:!bg-white/15 rounded-lg"
                          >
                            36 months
                          </SelectItem>
                          <SelectItem
                            value="48"
                            className="focus:bg-white/10 text-gray-100 hover:!bg-white/15 rounded-lg"
                          >
                            48 months
                          </SelectItem>
                          <SelectItem
                            value="60"
                            className="focus:bg-white/10 text-gray-100 hover:!bg-white/15 rounded-lg"
                          >
                            60 months
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-100 font-medium">Loan Purpose</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter loan purpose"
                          className={cn(
                            "bg-gray-950/50 border-white/20 text-gray-100",
                            "rounded-xl h-14 text-lg font-medium focus:ring-2 focus:ring-purple-400",
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
                  name="income"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-100 font-medium">Monthly Income</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <span className="absolute left-3 top-3.5 text-gray-400 text-lg">$</span>
                          <Input
                            type="number"
                            placeholder="0.00"
                            className={cn(
                              "pl-10 bg-gray-950/50 border-white/20 text-gray-100",
                              "rounded-xl h-14 text-lg font-medium focus:ring-2 focus:ring-purple-400",
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

                {monthlyPayment && (
                  <div className="p-4 bg-purple-500/10 rounded-lg flex items-center gap-3">
                    <Calculator className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-200">Estimated Monthly Payment</p>
                      <p className="text-2xl font-bold text-white">${monthlyPayment}</p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className={cn(
                    "w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white",
                    "rounded-xl h-14 text-lg font-medium transition-all duration-300",
                    "hover:from-purple-600 hover:to-pink-600 focus:ring-2 focus:ring-purple-400",
                  )}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Submit Application"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="border-t border-white/20 mt-6 py-6">
            <div className="w-full space-y-3">
              <h4 className="text-lg font-semibold text-gray-100">Important Note</h4>
              <p className="text-sm text-gray-400/90 leading-relaxed">
                Loan approval is subject to credit assessment and bank policies. Interest rates may vary based on your
                credit score and loan type.
              </p>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
