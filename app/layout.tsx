import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from "@/components/ui/toaster"



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pinance Global Bank - Supercharge Your Workflow',
  description: 'Pinance Global Bank  is the ultimate productivity tool that helps you manage tasks, automate workflows, and boost your efficiency.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem

        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

