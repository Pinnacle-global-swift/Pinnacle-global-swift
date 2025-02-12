"use client"

import { Card, CardContent } from "@/components/ui/card"
import { User, Shield, CreditCard } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Settings() {
  const settingsSections = [
    {
      title: "ACCOUNT",
      items: [
        {
          icon: User,
          label: "Your profile",
          href: "/dashboard/settings/profile",
        },
        {
          icon: Shield,
          label: "Account Verification",
          href: "/dashboard/settings/verification",
        },
      ],
    },
    {
      title: "FINANCES",
      items: [
        {
          icon: CreditCard,
          label: "Transaction limits",
          href: "/dashboard/settings/limits",
        },
      ],
    },
  ]

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 backdrop-blur-lg rounded-2xl border border-white/10">
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
              Account Settings
            </h1>
            <div className="space-y-6">
              {settingsSections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h2 className="text-sm font-semibold text-gray-300 tracking-wider">{section.title}</h2>
                  <Card className="border-0 bg-gray-800/50 backdrop-blur overflow-hidden rounded-xl">
                    {section.items.map((item, index) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          className={`
                            flex items-center gap-4 p-4 
                            hover:bg-white/5 transition-colors
                            border-b border-white/10 last:border-0
                          `}
                        >
                          <div className="flex-shrink-0 p-2 rounded-lg bg-blue-500/20">
                            <Icon className="w-5 h-5 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-200">{item.label}</p>
                          </div>
                        </Link>
                      )
                    })}
                  </Card>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

