'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function TermsAndConditions () {
  const terms = [
    {
      title: 'Acceptance of Terms',
      content:
        'By using our Services, you agree to these Terms and Conditions, which form a legally binding agreement between you and Pinnacle Global Swift. If you do not agree to these terms, you may not access or use our Services.'
    },
    {
      title: 'Use of Services',
      content:
        'You agree to use our Services only for lawful purposes and in a manner that does not infringe the rights of, restrict or inhibit the use and enjoyment of the Services by any third party. This includes conduct which is unlawful or which may harass or cause distress or inconvenience to any person, the transmission of obscene or offensive content or disruption of normal flow of dialogue within our Services. You also agree not to use our Services for any unauthorized commercial purposes, such as advertising or marketing, without our prior written consent.'
    }
    // ... other terms
  ]

  return (
    <div className='bg-gray-50 min-h-screen'>
      <Header />
      <main className='container mx-auto px-4 py-16'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-white rounded-lg shadow-md p-8'
        >
          <h1 className='text-3xl font-bold text-center mb-8 text-primary'>
            Terms and Conditions of Service
          </h1>

          <Tabs defaultValue='terms' className='w-full'>
            <TabsList className='mb-4 border-b border-gray-200'>
              <TabsTrigger
                value='terms'
                className='px-4 py-2 font-medium text-gray-700 hover:text-primary transition-colors'
              >
                Terms of Service
              </TabsTrigger>
            </TabsList>

            <TabsContent value='terms'>
              <div className='space-y-6'>
                {terms.map((term, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className='border-b border-gray-200 pb-4'
                  >
                    <div className='flex items-center mb-2'>
                      <CheckCircle className='w-5 h-5 text-green-500 mr-2' />
                      <h2 className='text-xl font-semibold text-gray-900'>
                        {index + 1}. {term.title}
                      </h2>
                    </div>
                    <p className='text-gray-700'>{term.content}</p>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: terms.length * 0.1 }}
                  className='pt-4'
                >
                  <p className='text-gray-700'>
                    If you have any questions about these Terms and Conditions,
                    please{' '}
                    <Link
                      href='/contact'
                      className='text-primary hover:underline font-medium'
                    >
                      contact us
                    </Link>
                    .
                  </p>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value='privacy'>
              <div className='prose lg:prose-xl mx-auto'>
                {/* Add your privacy policy content here */}
                <p>Privacy Policy Content</p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
