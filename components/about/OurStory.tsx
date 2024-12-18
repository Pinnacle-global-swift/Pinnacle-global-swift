import { motion } from 'framer-motion'
import Image from 'next/image'

export function OurStory() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1920"
                alt="Pinnacle Global Bank's journey"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4">
                Founded in 1985, Pinnacle Global Bank began as a small community bank with a vision to provide personalized financial services. Over the decades, we've grown into a global institution, never forgetting our roots and commitment to our customers.
              </p>
              <p className="text-lg text-gray-700">
                Today, we combine cutting-edge technology with time-honored banking principles to offer innovative solutions that meet the evolving needs of individuals and businesses worldwide.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

