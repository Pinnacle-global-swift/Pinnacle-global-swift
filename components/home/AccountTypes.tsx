import { PiggyBankIcon as Piggy, Briefcase, Building, Users } from 'lucide-react'

export function AccountTypes() {
  const accountTypes = [
    {
      icon: Piggy,
      title: "Personal Savings",
      description: "Grow your wealth with our high-yield savings accounts.",
    },
    {
      icon: Briefcase,
      title: "Business Checking",
      description: "Manage your business finances with our flexible checking accounts.",
    },
    {
      icon: Building,
      title: "Corporate Banking",
      description: "Tailored solutions for large corporations and institutions.",
    },
    {
      icon: Users,
      title: "Joint Accounts",
      description: "Share finances easily with our joint account options.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Account Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {accountTypes.map((type, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <type.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
              <p className="text-gray-600">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

