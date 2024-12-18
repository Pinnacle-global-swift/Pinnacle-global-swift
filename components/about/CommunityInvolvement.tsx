import { motion } from 'framer-motion'
import Image from 'next/image'

const initiatives = [
  { 
    title: 'Financial Literacy Programs', 
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1920',
    description: 'Empowering communities through financial education and workshops.'
  },
  { 
    title: 'Environmental Conservation', 
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1920',
    description: 'Supporting sustainable initiatives and environmental preservation.'
  },
  { 
    title: 'Youth Entrepreneurship', 
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1920',
    description: 'Nurturing the next generation of business leaders and innovators.'
  },
]

export function CommunityInvolvement() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Community Involvement</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={initiative.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative h-48">
                <Image
                  src={initiative.image}
                  alt={initiative.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{initiative.title}</h3>
                <p className="text-gray-600">{initiative.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

