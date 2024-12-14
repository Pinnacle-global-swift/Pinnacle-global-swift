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
import { ArrowUp } from 'lucide-react'
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  accountNumber: z.string().min(1, "Account number is required"),
  beneficiaryName: z.string().min(1, "Beneficiary name is required"),
  amount: z.string().min(1, "Amount is required"),
  description: z.string().optional(),
})

export function TransferDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountNumber: "",
      beneficiaryName: "",
      amount: "0.00",
      description: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle transfer submission
    console.log(values)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-white border-gray-800 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowUp className="w-5 h-5" />
            Transfer
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">ACCOUNT NUMBER</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="beneficiaryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">BENEFICIARY NAME</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
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

