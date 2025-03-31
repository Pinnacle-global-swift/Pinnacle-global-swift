import type { Metadata } from 'next'
import { Inter, Outfit, Raleway } from 'next/font/google'
import './globals.css'
import { Suspense } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { TawkTo } from '@/components/tawk-to'
import { LoadingProvider } from '@/components/LoadingProvider'
import { LoadingAnimation } from '@/components/LoadingAnimation'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit'
})

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway'
})

export const metadata: Metadata = {
  title: {
    default: 'Pinnacle Global Swift - Premier Digital Banking Solutions',
    template: '%s | Pinnacle Global Swift'
  },
  description: 'Experience seamless global banking with Pinnacle Global Swift. We offer comprehensive financial solutions including personal banking, business accounts, investments, and international transfers with cutting-edge security.',
  keywords: [
    'digital banking',
    'online banking',
    'international transfers',
    'business banking',
    'investment management',
    'secure banking',
    'global banking solutions',
    'wealth management',
    'financial services',
    'mobile banking'
  ],
  authors: [{ name: 'Pinnacle Global Swift' }],
  creator: 'Pinnacle Global Swift',
  publisher: 'Pinnacle Global Swift',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pinnacleglobalswift.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pinnacleglobalswift.com/',
    siteName: 'Pinnacle Global Swift',
    title: 'Pinnacle Global Swift - Premier Digital Banking Solutions',
    description: 'Transform your banking experience with our comprehensive suite of digital financial services. Access global markets, manage wealth, and conduct secure transactions anywhere, anytime.',
    images: [
      {
        url: '/pgbw.png',
        width: 900,
        height: 900,
        alt: 'Pinnacle Global Swift - Digital Banking Excellence',
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pinnacle Global Swift - Premier Digital Banking',
    description: 'Experience the future of banking with our comprehensive digital financial solutions. Secure, efficient, and globally connected.',
    site: '@PinnacleGlobal',
    creator: '@PinnacleGlobal',
    images: ['/twitter-image.jpg']
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  category: 'Banking & Finance'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {/* <meta name='robots' content='noindex' /> */}
        <link rel='icon' href='/PGSLOGO.ico' />
        <link rel='icon' type='image/png' sizes='32x32' href='/PGSLOGO.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/PGSLOGO.png' />
        <link rel='apple-touch-icon' href='/PGSLOGO.png' />
        <script src="//code.jivosite.com/widget/xDOUdtrJAc" async></script>
      </head>
      <body className={`${inter.variable} ${outfit.variable} ${raleway.variable} font-sans`}>
        <Suspense fallback={<LoadingAnimation />}>
          <LoadingProvider>
            {children}
            <Toaster />
            {/* <TawkTo /> */}
          </LoadingProvider>
        </Suspense>
      </body>
    </html>
  )
}
