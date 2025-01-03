import { Hero } from "@/components/home/Hero"
import { Features } from "@/components/home/Features"
import { Services } from "@/components/home/Services"
import { Testimonials } from "@/components/home/Testimonials"
import { CTA } from "@/components/home/CTA"
import { Contact } from "@/components/home/Contact"
import { AccountTypes } from "@/components/home/AccountTypes"
import { FinancialTools } from "@/components/home/FinancialTools"
import { SecurityMeasures } from "@/components/home/SecurityMeasures"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CurrencyTicker } from "@/components/CurrencyTicker"
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <CurrencyTicker />
      <main className="flex-1">
        <Hero />
        <Features />
        <AccountTypes />
        <Services />
        <FinancialTools />
        <SecurityMeasures />
        <Testimonials />
        {/* <CTA /> */}
        {/* <Contact /> */}
      </main>
      <Footer />
    </div>
  )
}

