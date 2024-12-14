'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Globe } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/components/ui/use-toast"
import { api } from "@/lib/api"

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
]

export default function Language() {
  const [selectedLang, setSelectedLang] = useState('en')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleLanguageChange = async (code: string) => {
    setIsLoading(true)
    try {
      await api.updateLanguage(code);
      setSelectedLang(code)
      toast({
        title: "Language Updated",
        description: "Your language preference has been updated successfully.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error updating language:', error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Failed to update language preference. Please try again.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Language Settings</h1>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Select Language</CardTitle>
            <CardDescription>
              Choose your preferred language for the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            {languages.map((lang, index) => (
              <motion.button
                key={lang.code}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center justify-between w-full p-4 rounded-lg border transition-colors ${
                  selectedLang === lang.code
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </div>
                {selectedLang === lang.code && (
                  <Check className="w-5 h-5" />
                )}
              </motion.button>
            ))}
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground text-center w-full">
              Language changes will be applied immediately
            </p>
          </CardFooter>
        </Card>
      )}
    </motion.div>
  )
}

