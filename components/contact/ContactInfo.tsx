import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const contactDetails = [
  { icon: MapPin, title: 'Visit Us', content: '123 Banking Street, New York, NY 10001' },
  { icon: Phone, title: 'Call Us', content: '+1 (555) 123-4567' },
  { icon: Mail, title: 'Email Us', content: 'contact@pinnacleglobalbank.com' },
  { icon: Clock, title: 'Working Hours', content: 'Mon-Fri: 9am-5pm, Sat: 10am-2pm' },
]

export function ContactInfo() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactDetails.map((detail, index) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <detail.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{detail.title}</h3>
              <p className="text-gray-600">{detail.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

