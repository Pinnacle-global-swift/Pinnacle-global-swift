import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from "@/components/ui/toaster"
import { TawkTo } from '@/components/tawk-to'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pinance Global Bank - Supercharge Your Workflow',
  description: 'Pinance Global Bank is the ultimate productivity tool...',
  openGraph: {
    title: 'Pinance Global Bank',
    description: 'Pinance Global Bank is the ultimate productivity tool...',
    url: 'https://pinanceglobalbank.com',
    images: [
      {
        url: '/pgb.png',
        width: 800,
        height: 600,
        alt: 'Pinance Global Bank',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pinance Global Bank',
    description: 'Supercharge your workflow with Pinance Global Bank...',
    images: ['/twitter-image.jpg'],
  },
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
          <TawkTo />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

