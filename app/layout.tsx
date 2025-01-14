import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Suspense } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from "@/components/ui/toaster"
import { TawkTo } from '@/components/tawk-to'
import { LoadingProvider } from '@/components/LoadingProvider'
import { LoadingAnimation } from '@/components/LoadingAnimation'


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
        width: 900,
        height: 900,
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
      <Suspense fallback={<LoadingAnimation />}>
      <LoadingProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem

        >
          {children}
          <TawkTo />
          <Toaster />
        </ThemeProvider>
        </LoadingProvider>
        </Suspense>
      </body>
    </html>
  )
}

