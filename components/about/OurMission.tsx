import { motion } from 'framer-motion'
import { Target } from 'lucide-react'

export function OurMission() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <Target className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700">
            At Pinnacle Global Bank, our mission is to empower individuals and businesses to achieve their financial goals by providing innovative, secure, and accessible banking solutions. We are committed to fostering long-term relationships built on trust, integrity, and mutual success.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

