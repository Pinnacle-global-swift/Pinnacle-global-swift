'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowDownRight } from 'lucide-react'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  withdrawalMethod: z.string().min(1, "Withdrawal method is required"),
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  swiftCode: z.string().min(1, "SWIFT code is required"),
  description: z.string().optional(),
})

export function WithdrawDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "0.00",
      withdrawalMethod: "bank_transfer",
      bankName: "",
      accountNumber: "",
      swiftCode: "",
      description: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-white border-gray-800 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowDownRight className="w-5 h-5" />
            Withdraw
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">AMOUNT</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.001"
                      min="0.001"
                      placeholder="Min. amount: 0.001"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="withdrawalMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">WITHDRAWAL METHOD</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select withdrawal method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">BANK NAME</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Bank Name"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">ACCOUNT NUMBER/IBAN</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Account Number"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="swiftCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">SWIFT CODE</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Swift Code"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">DESCRIPTION</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Note"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#c4ff3e] text-black hover:bg-[#b3ee2d]"
            >
              Withdraw
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

