'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface CurrencyData {
  code: string
  name: string
  price: number
  isCrypto: boolean
}

const CRYPTO_CODES = ['BTC', 'ETH', 'ADA', 'DOT', 'XRP', 'DOGE', 'USDT', 'LINK', 'UNI', 'SOL']

const INITIAL_CURRENCIES: CurrencyData[] = [
  { code: 'USD', name: 'US Dollar', price: 1.00, isCrypto: false },
  { code: 'EUR', name: 'Euro', price: 0.92, isCrypto: false },
  { code: 'GBP', name: 'British Pound', price: 0.79, isCrypto: false },
  { code: 'JPY', name: 'Japanese Yen', price: 148.21, isCrypto: false },
  { code: 'AUD', name: 'Australian Dollar', price: 1.52, isCrypto: false },
  { code: 'CAD', name: 'Canadian Dollar', price: 1.35, isCrypto: false },
  { code: 'CHF', name: 'Swiss Franc', price: 0.86, isCrypto: false },
  { code: 'CNY', name: 'Chinese Yuan', price: 7.19, isCrypto: false },
  { code: 'SEK', name: 'Swedish Krona', price: 10.45, isCrypto: false },
  { code: 'NZD', name: 'New Zealand Dollar', price: 1.63, isCrypto: false },
  { code: 'MXN', name: 'Mexican Peso', price: 17.05, isCrypto: false },
  { code: 'SGD', name: 'Singapore Dollar', price: 1.34, isCrypto: false },
  { code: 'HKD', name: 'Hong Kong Dollar', price: 7.82, isCrypto: false },
  { code: 'NOK', name: 'Norwegian Krone', price: 10.55, isCrypto: false },
  { code: 'KRW', name: 'South Korean Won', price: 1335.50, isCrypto: false },
  { code: 'TRY', name: 'Turkish Lira', price: 30.65, isCrypto: false },
  { code: 'RUB', name: 'Russian Ruble', price: 92.82, isCrypto: false },
  { code: 'INR', name: 'Indian Rupee', price: 83.46, isCrypto: false },
  { code: 'BRL', name: 'Brazilian Real', price: 4.94, isCrypto: false },
  { code: 'ZAR', name: 'South African Rand', price: 19.08, isCrypto: false },
  { code: 'THB', name: 'Thai Baht', price: 35.82, isCrypto: false },
  { code: 'PHP', name: 'Philippine Peso', price: 56.16, isCrypto: false },
  { code: 'MYR', name: 'Malaysian Ringgit', price: 4.77, isCrypto: false },
  { code: 'IDR', name: 'Indonesian Rupiah', price: 15635.00, isCrypto: false },
  { code: 'AED', name: 'UAE Dirham', price: 3.67, isCrypto: false },
  { code: 'SAR', name: 'Saudi Riyal', price: 3.75, isCrypto: false },
  { code: 'QAR', name: 'Qatari Riyal', price: 3.64, isCrypto: false },
  { code: 'KWD', name: 'Kuwaiti Dinar', price: 0.31, isCrypto: false },
  { code: 'BHD', name: 'Bahraini Dinar', price: 0.38, isCrypto: false },
  { code: 'OMR', name: 'Omani Rial', price: 0.38, isCrypto: false },
  { code: 'BTC', name: 'Bitcoin', price: 42000.00, isCrypto: true },
  { code: 'ETH', name: 'Ethereum', price: 2500.00, isCrypto: true },
  { code: 'ADA', name: 'Cardano', price: 0.50, isCrypto: true },
  { code: 'DOT', name: 'Polkadot', price: 7.00, isCrypto: true },
  { code: 'XRP', name: 'Ripple', price: 0.52, isCrypto: true },
  { code: 'DOGE', name: 'Dogecoin', price: 0.08, isCrypto: true },
  { code: 'USDT', name: 'Tether', price: 1.00, isCrypto: true },
  { code: 'LINK', name: 'Chainlink', price: 18.00, isCrypto: true },
  { code: 'UNI', name: 'Uniswap', price: 7.50, isCrypto: true },
  { code: 'SOL', name: 'Solana', price: 110.00, isCrypto: true },
]

export function CurrencyTicker() {
  const [currencies, setCurrencies] = useState<CurrencyData[]>(INITIAL_CURRENCIES)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
        if (!response.ok) throw new Error('Failed to fetch rates')
        const data = await response.json()
        const rates = data.usd

        setCurrencies(prev => prev.map(curr => {
          const rate = rates[curr.code.toLowerCase()]
          if (rate) {
            let price = rate
            if (curr.isCrypto) {
              price = 1 / rate
            }
            return { ...curr, price }
          }
          return curr
        }))
      } catch (error) {
        console.error('Error fetching currency rates:', error)
      }
    }

    fetchRates()
    const interval = setInterval(fetchRates, 3600000) // Update every hour

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (scrollContainer && currencies.length > 0) {
      const scrollWidth = scrollContainer.scrollWidth
      const animationDuration = scrollWidth / 30 // Adjusted for smoother speed

      const animation = scrollContainer.animate(
        [
          { transform: 'translateX(0)' },
          { transform: `translateX(-${scrollWidth / 2}px)` }
        ],
        {
          duration: animationDuration * 1000,
          iterations: Infinity,
          easing: 'linear'
        }
      )

      return () => {
        animation.cancel()
      }
    }
  }, [currencies])

  return (
    <div className="bg-gray-900 text-white py-3 overflow-hidden border-b border-white/5">
      <div ref={scrollRef} className="flex whitespace-nowrap">
        {[...currencies, ...currencies].map((currency, index) => (
          <div key={index} className="flex items-center mx-6">
            <span className={`font-bold mr-2 ${currency.isCrypto ? 'text-yellow-400' : 'text-blue-400'}`}>
              {currency.code}
            </span>
            <span className="text-gray-400 mr-2 text-sm">{currency.name}</span>
            <span className={`font-mono ${currency.isCrypto ? 'text-orange-400' : 'text-green-400'}`}>
              {currency.isCrypto ? '$' : ''}
              {currency.price.toLocaleString(undefined, {
                minimumFractionDigits: currency.price < 1 ? 4 : 2,
                maximumFractionDigits: currency.price < 1 ? 4 : 2,
              })}
              {!currency.isCrypto ? ` ${currency.code}` : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

