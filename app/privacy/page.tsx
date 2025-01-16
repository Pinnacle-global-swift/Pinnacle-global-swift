'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function PrivacyPolicy () {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <Header />
      <main className='container mx-auto px-4 py-16'>
        <div className='prose lg:prose-xl mx-auto'>
          <h1>Privacy Policy</h1>

          <p>
            At Pinnacle Global Swift, we are committed to protecting your
            privacy and ensuring the security of your personal information. This
            Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you use our website, mobile application, and
            banking services (collectively, the "Services"). Please read this
            privacy policy carefully. If you do not agree with the terms of this
            privacy policy, please do not access the Services.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, information
            we obtain automatically when you use our Services, and information
            from third-party sources. This may include:
          </p>
          <ul>
            <li>
              Personal identification information (Name, email address, phone
              number, etc.)
            </li>
            <li>
              Financial information (Account numbers, transaction history,
              credit information)
            </li>
            <li>Authentication information (Passwords, security questions)</li>
            <li>
              Device and usage information (IP address, browser type, operating
              system)
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect for various purposes, including:
          </p>
          <ul>
            <li>Providing and maintaining our Services</li>
            <li>Processing transactions and sending related communications</li>
            <li>Verifying your identity and preventing fraud</li>
            <li>Improving and personalizing our Services</li>
            <li>Complying with legal and regulatory requirements</li>
          </ul>

          <h2>3. Information Sharing and Disclosure</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>
              Service providers and partners who assist in operating our
              business
            </li>
            <li>Financial institutions with which we partner</li>
            <li>Legal and regulatory authorities, when required by law</li>
            <li>
              Potential buyers in the event of a sale, merger, or acquisition of
              our business
            </li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information. However, no method of transmission
            over the Internet or electronic storage is 100% secure, and we
            cannot guarantee absolute security.
          </p>

          <h2>5. Your Rights and Choices</h2>
          <p>
            You have certain rights regarding your personal information,
            including:
          </p>
          <ul>
            <li>Accessing and updating your information</li>
            <li>Opting out of marketing communications</li>
            <li>
              Requesting deletion of your personal information (subject to legal
              requirements)
            </li>
          </ul>

          <h2>6. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to collect
            information about your browsing activities. You can manage your
            cookie preferences through your browser settings.
          </p>

          <h2>7. Children's Privacy</h2>
          <p>
            Our Services are not intended for individuals under the age of 18.
            We do not knowingly collect personal information from children under
            18.
          </p>

          <h2>8. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last Updated" date.
          </p>

          <h2>9. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries
            other than your own. We will take appropriate measures to protect
            your personal information in accordance with this Privacy Policy.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p>
            <span className='text-gray-300'>
              2401 W Park Row Dr, Pantego, TX 76013, United States
            </span>
            privacy@pinnacleswift.com
          </p>

          <p>Last Updated: January 15, 2025</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
