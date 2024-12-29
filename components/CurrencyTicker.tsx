'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const currencies = [
  { code: 'USD', name: 'US Dollar', price: 1.00 },
  { code: 'EUR', name: 'Euro', price: 0.85 },
  { code: 'GBP', name: 'British Pound', price: 0.73 },
  { code: 'JPY', name: 'Japanese Yen', price: 110.21 },
  { code: 'AUD', name: 'Australian Dollar', price: 1.35 },
  { code: 'CAD', name: 'Canadian Dollar', price: 1.25 },
  { code: 'CHF', name: 'Swiss Franc', price: 0.92 },
  { code: 'CNY', name: 'Chinese Yuan', price: 6.45 },
  { code: 'SEK', name: 'Swedish Krona', price: 8.64 },
  { code: 'NZD', name: 'New Zealand Dollar', price: 1.43 },
  { code: 'MXN', name: 'Mexican Peso', price: 20.18 },
  { code: 'SGD', name: 'Singapore Dollar', price: 1.35 },
  { code: 'HKD', name: 'Hong Kong Dollar', price: 7.77 },
  { code: 'NOK', name: 'Norwegian Krone', price: 8.66 },
  { code: 'KRW', name: 'South Korean Won', price: 1175.50 },
  { code: 'TRY', name: 'Turkish Lira', price: 8.65 },
  { code: 'RUB', name: 'Russian Ruble', price: 73.82 },
  { code: 'INR', name: 'Indian Rupee', price: 74.46 },
  { code: 'BRL', name: 'Brazilian Real', price: 5.24 },
  { code: 'ZAR', name: 'South African Rand', price: 14.78 },
  { code: 'THB', name: 'Thai Baht', price: 33.12 },
  { code: 'PHP', name: 'Philippine Peso', price: 50.66 },
  { code: 'MYR', name: 'Malaysian Ringgit', price: 4.19 },
  { code: 'IDR', name: 'Indonesian Rupiah', price: 14385.00 },
  { code: 'AED', name: 'UAE Dirham', price: 3.67 },
  { code: 'SAR', name: 'Saudi Riyal', price: 3.75 },
  { code: 'QAR', name: 'Qatari Riyal', price: 3.64 },
  { code: 'KWD', name: 'Kuwaiti Dinar', price: 0.30 },
  { code: 'BHD', name: 'Bahraini Dinar', price: 0.38 },
  { code: 'OMR', name: 'Omani Rial', price: 0.38 },
  { code: 'BTC', name: 'Bitcoin', price: 45000.00 },
  { code: 'ETH', name: 'Ethereum', price: 3000.00 },
  { code: 'ADA', name: 'Cardano', price: 2.10 },
  { code: 'DOT', name: 'Polkadot', price: 35.00 },
  { code: 'XRP', name: 'Ripple', price: 1.10 },
  { code: 'DOGE', name: 'Dogecoin', price: 0.30 },
  { code: 'USDT', name: 'Tether', price: 1.00 },
  { code: 'LINK', name: 'Chainlink', price: 25.00 },
  { code: 'UNI', name: 'Uniswap', price: 28.00 },
  { code: 'SOL', name: 'Solana', price: 150.00 },
]

export function CurrencyTicker() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      const scrollWidth = scrollContainer.scrollWidth
      const animationDuration = scrollWidth / .2 // Slightly faster to accommodate more entries

      const animation = scrollContainer.animate(
        [
          { transform: 'translateX(0)' },
          { transform: `translateX(-${scrollWidth / 2}px)` }
        ],
        {
          duration: animationDuration,
          iterations: Infinity,
          easing: 'linear'
        }
      )

      return () => {
        animation.cancel()
      }
    }
  }, [])

  return (
    <div className="bg-gray-900 text-white py-3 overflow-hidden">
      <div ref={scrollRef} className="flex whitespace-nowrap">
        {[...currencies, ...currencies].map((currency, index) => (
          <div key={index} className="flex items-center mx-4">
            <span className={`font-bold mr-2 ${currency.code.length === 3 ? 'text-blue-400' : 'text-yellow-400'}`}>
              {currency.code}
            </span>
            <span className="text-gray-400 mr-2">{currency.name}</span>
            <span className={`${currency.code.length === 3 ? 'text-green-400' : 'text-orange-400'}`}>
              ${currency.price.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

