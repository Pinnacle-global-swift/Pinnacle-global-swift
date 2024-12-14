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
import { FileText } from 'lucide-react'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  paybackDate: z.string().min(1, "Payback date is required"),
  description: z.string().optional(),
})

export function LoanDialog({
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
            <FileText className="w-5 h-5" />
            Loan
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
                      step="0.01"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paybackDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Payback Date</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
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
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="text-sm text-gray-400">
              Note: You must have banked with us for at least 3 months to be eligible for a loan
            </div>

            <Button
              type="submit"
              className="w-full bg-[#c4ff3e] text-black hover:bg-[#b3ee2d]"
            >
              Continue
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

