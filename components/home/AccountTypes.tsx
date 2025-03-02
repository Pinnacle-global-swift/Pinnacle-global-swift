'use client'

import { PiggyBankIcon as Piggy, Briefcase, Building, Users, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function AccountTypes() {
  const accountTypes = [
    {
      icon: Piggy,
      title: "Personal Savings",
      description: "Grow your wealth with our high-yield savings accounts and personalized financial planning services.",
      link: "/accounts/personal",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: Briefcase,
      title: "Business Checking",
      description: "Streamlined business banking solutions with advanced cash management tools and dedicated support.",
      link: "/accounts/business",
      gradient: "from-purple-500 to-pink-400"
    },
    {
      icon: Building,
      title: "Corporate Banking",
      description: "Comprehensive financial solutions for large corporations with global banking capabilities.",
      link: "/accounts/corporate",
      gradient: "from-emerald-500 to-teal-400"
    },
    {
      icon: Users,
      title: "Joint Accounts",
      description: "Simplified shared banking with smart features for families and partnerships.",
      link: "/accounts/joint",
      gradient: "from-orange-500 to-amber-400"
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            Account Types
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose the perfect account type that suits your financial needs and goals
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {accountTypes.map((type, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl -z-10" />
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${type.gradient} mb-6`}>
                  <type.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{type.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {type.description}
                </p>
                <Link href={type.link}>
                  <Button
                    variant="ghost"
                    className="group/button hover:text-primary transition-colors"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

