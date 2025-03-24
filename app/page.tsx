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
import ErrorBoundary from "@/components/ErrorBoundary"

 const Home =  ()=> {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <CurrencyTicker />
      <main className="flex-1" role="main">
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary>
          <Features />
        </ErrorBoundary>
        <ErrorBoundary>
          <AccountTypes />
        </ErrorBoundary>
        <ErrorBoundary>
          <Services />
        </ErrorBoundary>
        <ErrorBoundary>
          <FinancialTools />
        </ErrorBoundary>
        <ErrorBoundary>
          <SecurityMeasures />
        </ErrorBoundary>
        <ErrorBoundary>
          <Testimonials />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}


export default Home