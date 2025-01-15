'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/components/ui/use-toast"
import { api } from "@/lib/api"

interface UserProfile {
  fullName: string;
  phoneNumber: string;
  address: string;
}

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const data = await api.getUserDetails();
      setProfile(data?.data?.user);
      toast({ title: "Profile Loaded", description: "Your profile information has been successfully loaded.",   type:"success" });
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({ title: "Error", description: "Failed to fetch profile data. Please try again.",   type:"error" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await api.updateUserProfile({
        fullName: profile!.fullName,
        phoneNumber: profile!.phoneNumber,
        address: profile!.address,
      });
      toast({ title: "Profile Updated", description: "Your profile has been successfully updated.",   type:"success" })
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({ title: "Update Failed", description: "Failed to update profile. Please try again.",   type:"error" })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <h1 className="text-3xl font-bold text-slate-800">Your Profile</h1>

        <form onSubmit={handleSubmit}>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-slate-800">Personal Information</CardTitle>
              <CardDescription className="text-slate-600">
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
              {/* <div className="flex justify-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center">
                    <User className="w-12 h-12 text-emerald-600" />
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute bottom-0 right-0 rounded-full bg-white hover:bg-emerald-50 border-slate-200"
                  >
                    <Camera className="w-4 h-4 text-emerald-600" />
                  </Button>
                </div>
              </div> */}

              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-emerald-600" />
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      className="pl-10 h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                      value={profile?.fullName}
                      onChange={(e) => setProfile({ ...profile!, fullName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-emerald-600" />
                    <Input
                      id="phone"
                      placeholder="Enter your phone number"
                      className="pl-10 h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                      value={profile?.phoneNumber}
                      onChange={(e) => setProfile({ ...profile!, phoneNumber: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-slate-700">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-emerald-600" />
                    <Input
                      id="address"
                      placeholder="Enter your address"
                      className="pl-10 h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                      value={profile?.address}
                      onChange={(e) => setProfile({ ...profile!, address: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50/50 p-6">
              <Button type="submit" 
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </form>
      </motion.div>
    </div>
  )
}