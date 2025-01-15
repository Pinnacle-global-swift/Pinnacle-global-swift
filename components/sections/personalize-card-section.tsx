'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Star } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader } from "@/components/ui/loader"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { api } from "@/lib/api"

export function PersonalizeCardSection() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Loader />
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const cardType = formData.get('cardType') as string

    try {
      await api.cardApplication({ name, email, cardType });
      toast({
        title: "Application Submitted",
        description: "Your card application has been received successfully.",
          type:"success"
      })
    } catch (error) {
      console.error('Error submitting application:', error)
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
          type:"error"
        // variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-cyan-500">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute top-4 left-4 bg-white rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="font-semibold">4.2k+ Active Card Holders</p>
            </div>
            <Image
              src="/cardpersonal.png"
              alt="Personalize Your Card"
              width={600}
              height={600}
              className="rounded-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-6">
              Personalize Your Card And Stand Out From Crowd
            </h2>
            <p className="mb-8">
              Design a card that reflects your personality. Choose from our exclusive designs and make your card truly unique.
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-white" />
                <span>Great explorer of the master-builder</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-white" />
                <span>The master-builder of great explorer</span>
              </li>
            </ul>

            <div className="bg-white p-6 rounded-lg max-w-md">
              <h3 className="text-gray-900 font-semibold mb-4">Apply for Credit Card</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" type="text" placeholder="Enter your name" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="Enter your email" required />
                </div>
                <div>
                  <Label htmlFor="cardType">Card Type</Label>
                  <Select name="cardType" defaultValue="virtual_debit">
                    <SelectTrigger>
                      <SelectValue placeholder="Select card type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="virtual_debit">Virtual Debit</SelectItem>
                      <SelectItem value="master">Master</SelectItem>
                      <SelectItem value="visa">Visa</SelectItem>
                      <SelectItem value="amex">American Express</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Apply Now'}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

