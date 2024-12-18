import { Calculator, TrendingUp, PieChart, DollarSign } from 'lucide-react'
import Image from 'next/image'

export function FinancialTools() {
  const tools = [
    {
      icon: Calculator,
      title: "Loan Calculator",
      description: "Estimate your monthly payments and total interest.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1920",
    },
    {
      icon: TrendingUp,
      title: "Investment Tracker",
      description: "Monitor your portfolio performance in real-time.",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1920",
    },
    {
      icon: PieChart,
      title: "Budget Planner",
      description: "Create and manage your personal or business budget.",
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=1920",
    },
    {
      icon: DollarSign,
      title: "Currency Converter",
      description: "Get real-time exchange rates for multiple currencies.",
      image: "https://images.unsplash.com/photo-1616261167032-b16d2df8333b?auto=format&fit=crop&q=80&w=1920",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Financial Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool, index) => (
            <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image
                  src={tool.image}
                  alt={tool.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <tool.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                <p className="text-gray-600">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

