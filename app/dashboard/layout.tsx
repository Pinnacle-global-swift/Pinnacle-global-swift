import DashboardLayout from '@/components/dashboard/layout'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from "@/components/ui/toaster"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
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

