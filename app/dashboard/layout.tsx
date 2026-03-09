'use client'

import DashboardLayout from '@/components/dashboard/layout'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from "@/components/ui/toaster"
import { useAuth } from '@/hooks/useAuth'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  // Activate auth guard to protect dashboard routes
  useAuth()

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <DashboardLayout>{children}</DashboardLayout>
      <Toaster />
    </ThemeProvider>
  )
}

