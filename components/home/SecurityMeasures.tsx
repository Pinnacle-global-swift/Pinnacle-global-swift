import { Shield, Lock, Eye, Bell } from 'lucide-react'

export function SecurityMeasures() {
  const measures = [
    {
      icon: Shield,
      title: "Advanced Encryption",
      description: "Your data is protected with industry-leading 256-bit encryption.",
    },
    {
      icon: Lock,
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security to your account with 2FA.",
    },
    {
      icon: Eye,
      title: "24/7 Fraud Monitoring",
      description: "Our systems continuously monitor for suspicious activities.",
    },
    {
      icon: Bell,
      title: "Real-time Alerts",
      description: "Get instant notifications for any account activity.",
    },
  ]

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Bank-Grade Security</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {measures.map((measure, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg">
              <measure.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{measure.title}</h3>
              <p className="text-gray-300">{measure.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

