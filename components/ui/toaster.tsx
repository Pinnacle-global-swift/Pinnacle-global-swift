'use client'

import { NewToaster } from "@/components/ui/new-toaster"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <NewToaster toasts={toasts} />
  )
}

