import { motion } from 'framer-motion'
import { Shield, Users, Lightbulb, Leaf } from 'lucide-react'

const values = [
  { icon: Shield, title: 'Integrity', description: 'We uphold the highest ethical standards in all our dealings.' },
  { icon: Users, title: 'Customer-Centric', description: 'Our customers are at the heart of everything we do.' },
  { icon: Lightbulb, title: 'Innovation', description: 'We continuously evolve to meet the changing needs of our clients.' },
  { icon: Leaf, title: 'Sustainability', description: 'We are committed to responsible banking practices and community development.' },
]

export function OurValues() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <value.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

