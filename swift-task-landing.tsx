import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
// import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"


export default function SwiftTaskLanding() {
  const carouselItems = [
    {
      title: "Supercharge Your Workflow",
      description: "SwiftTask is the ultimate productivity tool that helps you manage tasks, automate workflows, and boost your efficiency.",
      image: "/placeholder.svg?height=400&width=800",
    },
    {
      title: "Collaborate Seamlessly",
      description: "Work together with your team in real-time, share tasks, and stay on the same page effortlessly.",
      image: "/placeholder.svg?height=400&width=800",
    },
    {
      title: "Automate Your Routine",
      description: "Let SwiftTask handle your repetitive tasks, so you can focus on what truly matters.",
      image: "/placeholder.svg?height=400&width=800",
    },
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold">SwiftTask</div>
        <div className="space-x-6">
          <a href="#" className="hover:text-blue-400 transition-colors">Features</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Pricing</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Download</a>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20 relative">
        {/* <Slider {...settings}> */}
          {carouselItems.map((item, index) => (
            <div key={index} className="focus:outline-none">
              <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                  <motion.h1 
                    className="text-4xl md:text-6xl font-bold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    {item.title}
                  </motion.h1>
                  <motion.p 
                    className="text-xl md:text-2xl text-gray-300 mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {item.description}
                  </motion.p>
                  <motion.button 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full flex items-center transition-colors mx-auto md:mx-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Get Started <ChevronRight className="ml-2" />
                  </motion.button>
                </div>
                <motion.div 
                  className="md:w-1/2"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <img 
                    src={item.image}
                    alt={`SwiftTask - ${item.title}`}
                    className="rounded-lg shadow-2xl w-full"
                  />
                </motion.div>
              </div>
            </div>
          ))}
        {/* </Slider> */}

        <AnimatedBackground />
      </main>
    </div>
  )
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-500 rounded-full opacity-10"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 200 - 100],
            x: [0, Math.random() * 200 - 100],
            scale: [1, Math.random() + 0.5],
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}

