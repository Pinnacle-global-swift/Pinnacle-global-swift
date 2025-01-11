import { motion } from 'framer-motion'

const milestones = [
  { year: 1985, event: 'Pinnacle Global Swift founded' },
  { year: 1995, event: 'Expanded to 50 branches nationwide' },
  { year: 2005, event: 'Launched online banking platform' },
  { year: 2015, event: 'Reached $100 billion in assets' },
  { year: 2023, event: 'Introduced AI-powered financial advisory services' }
]

export function Milestones () {
  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-12'>Our Milestones</h2>
        <div className='max-w-4xl mx-auto'>
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='flex items-center mb-8'
            >
              <div className='w-24 text-right mr-8'>
                <span className='text-2xl font-bold text-primary'>
                  {milestone.year}
                </span>
              </div>
              <div className='flex-1 p-4 bg-gray-100 rounded-lg shadow'>
                <p className='text-lg'>{milestone.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
