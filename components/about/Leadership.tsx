import { motion } from 'framer-motion'
import Image from 'next/image'

const leaders = [
  { 
    name: 'John Doe', 
    position: 'CEO', 
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
  },
  { 
    name: 'Jane Smith', 
    position: 'CFO', 
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
  },
  { 
    name: 'Mike Johnson', 
    position: 'CTO', 
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'
  },
  { 
    name: 'Sarah Brown', 
    position: 'COO', 
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400'
  },
]

export function Leadership() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">{leader.name}</h3>
              <p className="text-gray-600">{leader.position}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

