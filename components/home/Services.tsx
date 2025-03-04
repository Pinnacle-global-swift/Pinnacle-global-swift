'use client'

import { motion } from 'framer-motion'
import { CreditCard, Briefcase, Home, BarChartIcon as ChartBar, Plane, Shield, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export function Services() {
  const services = [
    {
      icon: CreditCard,
      name: "Personal Banking",
      description: "Checking, savings, and credit card solutions tailored to your needs.",
      gradient: "from-blue-500 to-indigo-600",
      link: "/services/personal"
    },
    { icon: Briefcase, name: "Business Accounts", description: "Comprehensive banking services to help your business thrive.", gradient: "from-green-500 to-teal-600", link: "/services" },
    { icon: Home, name: "Mortgages", description: "Competitive rates and flexible terms for your dream home.", gradient: "from-red-500 to-pink-600", link: "/services/mortgages" },
    { icon: ChartBar, name: "Investment Services", description: "Expert guidance and diverse portfolio options for wealth growth.", gradient: "from-purple-500 to-violet-600", link: "/services" },
    { icon: Plane, name: "International Banking", description: "Seamless cross-border transactions and multi-currency accounts.", gradient: "from-yellow-500 to-orange-600", link: "/services" },
    { icon: Shield, name: "Insurance Products", description: "Protect what matters most with our range of insurance offerings.", gradient: "from-gray-500 to-gray-600", link: "/services" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            Comprehensive Banking Solutions
          </h2>
          <p className="text-gray-600 text-lg">
            Discover our range of professional banking services designed to meet your financial goals
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl blur-xl`} />
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${service.gradient} mb-6`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <Link href={service.link}>
                  <Button
                    variant="ghost"
                    className="group/button hover:text-primary transition-colors"
                  >
                    Explore Service
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link href="/services">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

