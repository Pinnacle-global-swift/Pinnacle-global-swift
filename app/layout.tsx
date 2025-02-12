import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Suspense } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { TawkTo } from '@/components/tawk-to'
import { LoadingProvider } from '@/components/LoadingProvider'
import { LoadingAnimation } from '@/components/LoadingAnimation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pinance Global Swift - Supercharge Your Workflow',
  description: 'Pinance Global Swift is the ultimate productivity tool...',
  openGraph: {
    title: 'Pinance Global Swift',
    description: 'Pinance Global Swift is the ultimate productivity tool...',
    url: 'https://pinnacleglobalswift.com/',
    images: [
      {
        url: '/pgbw.png',
        width: 900,
        height: 900,
        alt: 'Pinance Global Swift'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pinance Global Swift',
    description: 'Supercharge your workflow with Pinance Global Swift...',
    images: ['/twitter-image.jpg']
  }
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='icon' href='/PGSLOGO.ico' />
        <link rel='icon' type='image/png' sizes='32x32' href='/PGSLOGO.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/PGSLOGO.png' />
        <link rel='apple-touch-icon' href='/PGSLOGO.png' />
        {/* <script src="//code.jivosite.com/widget/xDOUdtrJAc" async></script> */}
      </head>
      <body className={inter.className}>
        <Suspense fallback={<LoadingAnimation />}>
          <LoadingProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
              {children}
            
              <Toaster />
              <TawkTo />
            </ThemeProvider>
          </LoadingProvider>
        </Suspense>
      </body>
    </html>
  )
}
