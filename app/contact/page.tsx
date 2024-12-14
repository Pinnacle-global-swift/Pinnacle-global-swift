'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function Contact() {
  const [activeTab, setActiveTab] = useState('personal')

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 mb-16"
          >
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Get Support for<br />any Queries or Complaints
              </h1>
              <p className="text-gray-600 mb-8">
                Committed to helping you meet all your banking needs.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Corporate Office</h3>
                    <p className="text-gray-600">
                      Street 2685 Margareta Ford, Múlabing, Iceland.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office Hours</h3>
                    <p className="text-gray-600">24/7</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Front Desk</h3>
                    <p className="text-gray-600">support@pinnacleglobal.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input placeholder="Enter your name" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <Input type="email" placeholder="Enter your email" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ph. Num</label>
                  <Input placeholder="Enter your phone number" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input placeholder="Enter subject" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea placeholder="Enter your message" rows={4} />
                </div>

                <Button className="w-full">Send A Message</Button>
              </form>
            </div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <button className="bg-primary text-white px-4 py-2 rounded-lg">BRANCH</button>
                <button className="text-gray-600 px-4 py-2">ATM</button>
                <div className="flex-1">
                  <Input placeholder="Enter Your Location" className="max-w-md" />
                </div>
                <Button>Search</Button>
              </div>
              <div className="h-[500px] rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.991441291371!2d2.294481315674307!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sus!4v1647891702695!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </motion.div>

          {/* Customer Care Numbers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-center mb-8">Customer Care Numbers</h2>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="w-full max-w-md mx-auto mb-8">
                <TabsTrigger value="personal" className="flex-1">Personal Banking</TabsTrigger>
                <TabsTrigger value="corporate" className="flex-1">Corporate Banking</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-sm font-semibold">Personal Service</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Contact Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4">General Query/Complaint</td>
                        <td className="px-6 py-4 text-primary">support@pinnacleglobal.com</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Credit Card</td>
                        <td className="px-6 py-4 text-primary">support@pinnacleglobal.com</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-center mt-4 text-sm text-gray-600">
                  To submit your complaint, <a href="#" className="text-primary hover:underline">Click here</a>
                </div>
              </TabsContent>

              <TabsContent value="corporate">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-sm font-semibold">Corporate Service</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Contact Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4">Business Solutions</td>
                        <td className="px-6 py-4 text-primary">corporate@pinnacleglobal.com</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Enterprise Support</td>
                        <td className="px-6 py-4 text-primary">enterprise@pinnacleglobal.com</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

