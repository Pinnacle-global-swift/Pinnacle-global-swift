'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Search } from 'lucide-react'
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
  accountNumber: z.string().min(1, "Account number is required"),
  beneficiaryName: z.string().min(1, "Beneficiary name is required"),
  amount: z.string().min(1, "Amount is required"),
  transferType: z.string().min(1, "Transfer type is required"),
  description: z.string().optional(),
})

export default function TransferPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountNumber: "",
      beneficiaryName: "",
      amount: "",
      transferType: "",
      description: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast({
        title: "Transfer Successful",
        description: `$${values.amount} has been transferred to ${values.beneficiaryName}`,
      })
      form.reset()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Transfer Failed",
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
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <ArrowUpRight className="w-6 h-6" />
              Transfer Money
            </CardTitle>
            <CardDescription className="text-gray-400">
              Send money to other bank accounts securely
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Account Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Input
                            placeholder="Enter account number"
                            className="pl-9 bg-gray-800 border-gray-700 text-white"
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
                  name="beneficiaryName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Beneficiary Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter beneficiary name"
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
                  name="transferType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Transfer Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select transfer type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="internal">Internal Transfer</SelectItem>
                          <SelectItem value="external">External Transfer</SelectItem>
                          <SelectItem value="international">International Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Description (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter transfer description"
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Transfer Money"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="border-t border-gray-700 mt-6 flex flex-col items-start pt-6">
            <h4 className="text-sm font-medium text-gray-200 mb-2">Recent Transfers</h4>
            <p className="text-sm text-gray-400">No recent transfers</p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

