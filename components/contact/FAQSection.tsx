import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: "What are your banking hours?",
    answer: "Our branches are open Monday to Friday from 9am to 5pm, and Saturdays from 10am to 2pm. Our online banking services are available 24/7."
  },
  {
    question: "How can I report a lost or stolen card?",
    answer: "If your card is lost or stolen, please call our 24/7 hotline at 1-800-123-4567 immediately to report it and prevent unauthorized use."
  },
  {
    question: "How do I set up online banking?",
    answer: "To set up online banking, visit our website and click on the 'Enroll' button. You'll need your account number and social security number to complete the process."
  },
  {
    question: "What types of loans do you offer?",
    answer: "We offer a variety of loans including personal loans, home mortgages, auto loans, and business loans. Contact our loan department for more details."
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <button
                  className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="p-4 bg-gray-50">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

