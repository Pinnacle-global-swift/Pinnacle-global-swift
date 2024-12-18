import Image from 'next/image'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920"
        alt="Pinnacle Global Bank Headquarters"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center text-white"
      >
        <h1 className="text-5xl font-bold mb-4">About Pinnacle Global Bank</h1>
        <p className="text-xl">Building Trust, Empowering Futures</p>
      </motion.div>
    </section>
  )
}

