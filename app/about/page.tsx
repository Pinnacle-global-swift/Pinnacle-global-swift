'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/about/HeroSection'
import { OurValues } from '@/components/about/OurValues'
import { Leadership } from '@/components/about/Leadership'
import { Milestones } from '@/components/about/Milestones'
import { Awards } from '@/components/about/Awards'
import { CommunityInvolvement } from '@/components/about/CommunityInvolvement'
import { OurMission } from '@/components/about/OurMission'
import { OurStory } from '@/components/about/OurStory'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <OurStory />
        <OurMission />
        <OurValues />
        <Leadership />
        <Milestones />
        <CommunityInvolvement />
        <Awards />
      </main>
      <Footer />
    </div>
  )
}

