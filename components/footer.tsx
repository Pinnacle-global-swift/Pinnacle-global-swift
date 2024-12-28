import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Pinnacle Global Bank</h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner in banking and financial services. Building wealth and securing futures since 1990.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-primary transition-colors">Careers</Link>
              </li>
              <li>
                <Link href="/locations" className="text-gray-400 hover:text-primary transition-colors">Locations</Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-primary transition-colors">Support</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Banking Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/personal" className="text-gray-400 hover:text-primary transition-colors">Personal Banking</Link>
              </li>
              <li>
                <Link href="/services/business" className="text-gray-400 hover:text-primary transition-colors">Business Banking</Link>
              </li>
              <li>
                <Link href="/investments" className="text-gray-400 hover:text-primary transition-colors">Wealth Management</Link>
              </li>
              <li>
                <Link href="/services/loans" className="text-gray-400 hover:text-primary transition-colors">Loans & Mortgages</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <span>+1 (336) 754-6451</span>
              </li>
              <li className="flex items-center text-gray-400">
                <span>contact@pinnacleglobal.com</span>
              </li>
              <li className="flex items-center text-gray-400">
                <span>2401 W Park Row Dr, Pantego, TX 76013, United States</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Pinnacle Global Bank. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/security" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

