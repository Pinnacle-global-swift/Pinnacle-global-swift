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
import { Copy, Wallet } from 'lucide-react'
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
})

const WALLET_ADDRESS = "0x5dC01F37bD10c23E3F3801d166709CD32f492297"

export function DepositDialog({
  open,
  onOpenChange,
  className
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  className?: string
}) {
  const [copied, setCopied] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "0.00",
      paymentMethod: "USDT(ERC20)",
    },
  })

  const copyToClipboard = () => {
    navigator.clipboard.writeText(WALLET_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(
        "bg-background border-border text-foreground sm:max-w-[425px] overflow-hidden",
        className
      )}>
        <DialogHeader className="space-y-3">
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Deposit
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground">AMOUNT</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        className="pl-7 bg-background border-border"
                        placeholder="0.00"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground">PAYMENT METHOD</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USDT(ERC20)">USDT (ERC20)</SelectItem>
                      <SelectItem value="USDT(TRC20)">USDT (TRC20)</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

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
              <div className="text-xs text-muted-foreground">
                You are to pay the amount above to the crypto address provided below. Contact support to verify...
              </div>
              <div className="flex items-center gap-2 bg-background/50 p-2 rounded-lg">
                <div className="flex-1 text-sm truncate">
                  {WALLET_ADDRESS}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="h-8 px-3 text-primary hover:text-primary hover:bg-primary/10"
                >
                  {copied ? "Copied!" : "Copy"}
                  <Copy className="w-4 h-4 ml-2" />
                </Button>
              </div>
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

