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
    },
    // {
    //   title: "OTHERS",
    //   items: [
    //     {
    //       icon: Languages,
    //       label: "Language",
    //       href: "/dashboard/settings/language"
    //     }
    //   ]
    // }
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
      <div className="space-y-6">
      {settingsSections.map((section) => (
        <div key={section.title} className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
          <Card className="divide-y divide-gray-100">
            {section.items.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <Icon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
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
  )
}

