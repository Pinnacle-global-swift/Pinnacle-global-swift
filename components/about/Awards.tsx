import { motion } from 'framer-motion'
import { Award } from 'lucide-react'

const awards = [
  { year: 2023, title: 'Best Digital Banking Experience' },
  { year: 2022, title: 'Most Innovative Financial Institution' },
  { year: 2021, title: 'Excellence in Customer Service' },
  { year: 2020, title: 'Top Sustainable Bank' },
]

export function Awards() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Awards and Recognition</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
              <p className="text-gray-600">{award.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

