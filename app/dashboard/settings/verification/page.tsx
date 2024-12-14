'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Upload, CheckCircle2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface VerificationStep {
  title: string;
  description: string;
  icon: React.ElementType;
  status: 'completed' | 'in-progress' | 'pending';
}

const verificationSteps: VerificationStep[] = [
  {
    title: "Identity Verification",
    description: "Upload a valid government-issued ID",
    icon: Shield,
    status: "completed"
  },
  {
    title: "Address Verification",
    description: "Upload proof of address (utility bill, lease agreement)",
    icon: Upload,
    status: "in-progress"
  },
  {
    title: "Final Review",
    description: "Our team will review your documents",
    icon: CheckCircle2,
    status: "pending"
  }
]

export default function Verification() {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpload = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Account Verification</h1>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Verification Process</CardTitle>
            <CardDescription>
              Complete the following steps to verify your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Progress value={33} className="h-2" />
            
            <div className="space-y-6">
              {verificationSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-lg border"
                  >
                    <div className={`p-2 rounded-full ${
                      step.status === 'completed' ? 'bg-green-100 text-green-600' :
                      step.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    <Button
                      variant={step.status === 'completed' ? 'ghost' : 'outline'}
                      disabled={step.status === 'pending'}
                      onClick={handleUpload}
                    >
                      {step.status === 'completed' ? 'Completed' :
                       step.status === 'in-progress' ? 'Upload' : 'Pending'}
                    </Button>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground text-center">
              Verification usually takes 24-48 hours after all documents are submitted.
            </p>
          </CardFooter>
        </Card>
      )}
    </motion.div>
  )
}

