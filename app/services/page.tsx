'use client'

import { motion } from 'framer-motion'
import {
  CreditCard,
  Briefcase,
  PiggyBank,
  BarChart as ChartBar,
  Globe,
  Shield,
  ArrowRight,
  CheckCircle,
  Users,
  Building,
  Wallet,
  Phone,
  Star,
  Clock,
  ThumbsUp,
  Zap
} from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const services = [
  {
    icon: CreditCard,
    title: 'Personal Banking',
    description:
      'Tailored financial solutions for individuals, including savings accounts, credit cards, and personal loans.',
    image:
      'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80&w=1920',
    features: [
      'High-yield savings accounts',
      'Premium credit cards',
      'Flexible personal loans',
      'Mobile banking access'
    ]
  },
  {
    icon: Briefcase,
    title: 'Business Banking',
    description:
      'Comprehensive banking services for businesses of all sizes, from startups to large corporations.',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1920',
    features: [
      'Business checking accounts',
      'Merchant services',
      'Business loans',
      'Corporate credit cards'
    ]
  },
  {
    icon: PiggyBank,
    title: 'Savings & Investments',
    description:
      'Grow your wealth with our range of savings accounts and investment opportunities.',
    image:
      'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&q=80&w=1920',
    features: [
      'Term deposits',
      'Investment portfolios',
      'Retirement planning',
      'Wealth management'
    ]
  },
  {
    icon: ChartBar,
    title: 'Wealth Management',
    description:
      'Expert financial advice and portfolio management for high-net-worth individuals.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1920',
    features: [
      'Portfolio management',
      'Estate planning',
      'Tax optimization',
      'Private banking'
    ]
  },
  {
    icon: Globe,
    title: 'International Banking',
    description:
      'Seamless cross-border transactions and multi-currency accounts for global citizens.',
    image:
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1920',
    features: [
      'Multi-currency accounts',
      'Foreign exchange',
      'International transfers',
      'Global investment options'
    ]
  },
  {
    icon: Shield,
    title: 'Secure Online Banking',
    description:
      'State-of-the-art digital banking platform with advanced security features.',
    image:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1920',
    features: [
      '24/7 account access',
      'Secure transactions',
      'Mobile banking app',
      'Real-time alerts'
    ]
  }
]

const accountTypes = [
  {
    icon: Users,
    title: 'Personal Accounts',
    description: 'Perfect for individual banking needs',
    features: [
      'Free online banking',
      'Mobile app access',
      'Debit card included',
      'No minimum balance'
    ]
  },
  {
    icon: Building,
    title: 'Business Accounts',
    description: 'Designed for companies and enterprises',
    features: [
      'Business credit cards',
      'Payroll services',
      'Merchant services',
      'Business loans'
    ]
  },
  {
    icon: Wallet,
    title: 'Premium Accounts',
    description: 'Enhanced services for premium clients',
    features: [
      'Dedicated manager',
      'Priority service',
      'Travel insurance',
      'Concierge services'
    ]
  }
]

const whyChooseUs = [
  {
    icon: Shield,
    title: 'Security',
    description: 'Bank-grade encryption and multi-factor authentication'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock customer service and assistance'
  },
  {
    icon: ThumbsUp,
    title: 'User-Friendly',
    description: 'Intuitive interfaces for seamless banking experience'
  },
  {
    icon: Zap,
    title: 'Fast Transactions',
    description: 'Quick and efficient processing of all your transactions'
  }
]

const serviceProcess = [
  {
    step: 1,
    title: 'Choose Your Service',
    description:
      'Select from our range of banking services tailored to your needs.'
  },
  {
    step: 2,
    title: 'Open an Account',
    description:
      'Complete our simple online application process to get started.'
  },
  {
    step: 3,
    title: 'Verify Your Identity',
    description: 'Securely verify your identity with our easy KYC process.'
  },
  {
    step: 4,
    title: 'Start Banking',
    description:
      'Access your account and enjoy our comprehensive banking services.'
  }
]

const testimonials = [
  {
    name: 'John Doe',
    role: 'Small Business Owner',
    comment:
      'Pinnacle Global Swift has transformed how I manage my business finances. Their online platform is intuitive and their customer service is top-notch!'
  },
  {
    name: 'Jane Smith',
    role: 'Freelance Consultant',
    comment:
      "As someone who travels frequently, I appreciate the global accessibility and security features Pinnacle offers. It's made international transactions a breeze."
  },
  {
    name: 'Mike Johnson',
    role: 'Retiree',
    comment:
      "The wealth management team at Pinnacle has been instrumental in helping me plan for and enjoy my retirement. I couldn't be happier with their service."
  }
]

export default function ServicesPage() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-grow'>
        {/* Hero Section */}
        <section className='relative h-[60vh] flex items-center justify-center overflow-hidden'>
          <Image
            src='https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80&w=1920'
            alt='Banking Services'
            layout='fill'
            objectFit='cover'
            quality={100}
            priority
          />
          <div className='absolute inset-0 bg-black opacity-50'></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='relative z-10 text-center text-white'
          >
            <h1 className='text-5xl font-bold mb-4'>Our Services</h1>
            <p className='text-xl'>
              Comprehensive financial solutions for every need
            </p>
          </motion.div>
        </section>

        {/* Account Types Section */}
        <section className='py-20 bg-gradient-to-b from-blue-900 to-blue-800 text-white'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold mb-4'>
                Choose Your Account Type
              </h2>
              <p className='text-xl text-blue-200'>
                Find the perfect account for your banking needs
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {accountTypes.map((account, index) => (
                <motion.div
                  key={account.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className='bg-white/10 backdrop-blur-md rounded-lg p-6 hover:bg-white/20 transition-all duration-300'
                >
                  <account.icon className='w-12 h-12 text-blue-400 mb-4' />
                  <h3 className='text-xl font-semibold mb-2'>
                    {account.title}
                  </h3>
                  <p className='text-blue-200 mb-4'>{account.description}</p>
                  <ul className='space-y-2'>
                    {account.features.map((feature, i) => (
                      <li key={i} className='flex items-center text-sm'>
                        <CheckCircle className='w-4 h-4 text-blue-400 mr-2' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Tabs Section */}
        <section className='py-20 bg-gray-50'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold mb-4'>Our Banking Services</h2>
              <p className='text-xl text-gray-600'>
                Explore our comprehensive range of financial solutions
              </p>
            </div>
            <Tabs defaultValue='personal' className='w-full'>
              <TabsList className='w-full max-w-md mx-auto mb-8'>
                <TabsTrigger value='personal' className='flex-1'>
                  Personal
                </TabsTrigger>
                <TabsTrigger value='business' className='flex-1'>
                  Business
                </TabsTrigger>
                <TabsTrigger value='premium' className='flex-1'>
                  Premium
                </TabsTrigger>
              </TabsList>
              <TabsContent value='personal'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                  {services.slice(0, 3).map((service, index) => (
                    <ServiceCard key={index} service={service} index={index} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value='business'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                  {services.slice(3, 6).map((service, index) => (
                    <ServiceCard key={index} service={service} index={index} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value='premium'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                  {services.slice(0, 3).map((service, index) => (
                    <ServiceCard key={index} service={service} index={index} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className='py-20 bg-white'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold mb-4'>
                Why Choose Pinnacle Global Swift
              </h2>
              <p className='text-xl text-gray-600'>
                Experience banking excellence with our unique advantages
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className='text-center'
                >
                  <div className='bg-blue-100 rounded-full p-4 inline-block mb-4'>
                    <item.icon className='w-8 h-8 text-blue-600' />
                  </div>
                  <h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
                  <p className='text-gray-600'>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Process Section */}
        <section className='py-20 bg-gray-50'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold mb-4'>Our Service Process</h2>
              <p className='text-xl text-gray-600'>
                Simple steps to start your banking journey with us
              </p>
            </div>
            <div className='flex flex-col md:flex-row justify-between items-start'>
              {serviceProcess.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className='flex-1 text-center mb-8 md:mb-0'
                >
                  <div className='bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold'>
                    {step.step}
                  </div>
                  <h3 className='text-xl font-semibold mb-2'>{step.title}</h3>
                  <p className='text-gray-600'>{step.description}</p>
                  {index < serviceProcess.length - 1 && (
                    <div className='hidden md:block absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2'>
                      <ArrowRight className='w-8 h-8 text-blue-600' />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className='py-20 bg-blue-900 text-white'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold mb-4'>What Our Clients Say</h2>
              <p className='text-xl text-blue-200'>
                Hear from our satisfied customers
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className='bg-white/10 backdrop-blur-md rounded-lg p-6'
                >
                  <div className='flex items-center mb-4'>
                    <div className='w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4'>
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <h3 className='font-semibold'>{testimonial.name}</h3>
                      <p className='text-blue-200'>{testimonial.role}</p>
                    </div>
                  </div>
                  <p className='text-blue-100'>"{testimonial.comment}"</p>
                  <div className='mt-4 flex'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className='w-5 h-5 text-yellow-400 fill-current'
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className='py-20 bg-white'>
          <div className='container mx-auto px-4'>
            <div className='max-w-4xl mx-auto text-center'>
              <h2 className='text-3xl font-bold mb-4'>Need Help Choosing?</h2>
              <p className='text-xl mb-8 text-gray-600'>
                Our financial experts are here to help you find the perfect
                banking solutions
              </p>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className='overflow-hidden h-full hover:shadow-lg transition-shadow'>
        <div className='relative h-48'>
          <Image
            src={service.image}
            alt={service.title}
            layout='fill'
            objectFit='cover'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
          <div className='absolute bottom-4 left-4'>
            <service.icon className='w-8 h-8 text-white mb-2' />
            <h3 className='text-xl font-semibold text-white'>
              {service.title}
            </h3>
          </div>
        </div>
        <CardContent className='p-6'>
          <p className='text-gray-600 mb-4'>{service.description}</p>
          <ul className='space-y-2'>
            {service.features.map((feature: string, i: number) => (
              <li key={i} className='flex items-center text-sm text-gray-600'>
                <CheckCircle className='w-4 h-4 text-green-500 mr-2' />
                {feature}
              </li>
            ))}
          </ul>
          <Button variant='outline' className='w-full mt-6'>
            Learn More
            <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
