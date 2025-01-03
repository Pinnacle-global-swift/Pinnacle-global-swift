'use client'

import { Card } from "@/components/ui/card"
import { User, Shield, CreditCard, Languages } from 'lucide-react'
import Link from 'next/link'

export default function Settings() {
  const settingsSections = [
    {
      title: "ACCOUNT",
      items: [
        {
          icon: User,
          label: "Your profile",
          href: "/dashboard/settings/profile"
        },
        {
          icon: Shield,
          label: "Account Verification",
          href: "/dashboard/settings/verification"
        }
      ]
    },
    {
      title: "FINANCES",
      items: [
        {
          icon: CreditCard,
          label: "Transaction limits",
          href: "/dashboard/settings/limits"
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-slate-800">Account Settings</h1>
        <div className="space-y-6">
          {settingsSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h2 className="text-sm font-semibold text-slate-600 tracking-wider">{section.title}</h2>
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur overflow-hidden">
                {section.items.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`
                        flex items-center gap-4 p-4 
                        hover:bg-emerald-50 transition-colors
                        border-b border-slate-100 last:border-0
                      `}
                    >
                      <div className="flex-shrink-0 p-2 rounded-lg bg-emerald-50">
                        <Icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">
                          {item.label}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}