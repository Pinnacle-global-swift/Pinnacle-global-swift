import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SwiftTask - Supercharge Your Workflow',
  description: 'SwiftTask is the ultimate productivity tool that helps you manage tasks, automate workflows, and boost your efficiency.',
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
        </ThemeProvider>
      </body>
    </html>
  )
}

