'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function TermsAndConditions () {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <Header />
      <main className='container mx-auto px-4 py-16'>
        <div className='prose lg:prose-xl mx-auto'>
          <h1>Terms and Conditions of Service</h1>

          <p>
            Welcome to Pinnacle Global Swift. These Terms and Conditions govern
            your use of our website, mobile application, and all related
            services (collectively, the "Services"). By accessing or using our
            Services, you agree to be bound by these Terms and Conditions.
            Please read them carefully.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By using our Services, you agree to these Terms and Conditions,
            which form a legally binding agreement between you and Pinnacle
            Global Swift. If you do not agree to these terms, you may not access
            or use our Services.
          </p>

          <h2>2. Use of Services</h2>
          <p>
            You agree to use our Services only for lawful purposes and in a
            manner that does not infringe the rights of, restrict or inhibit the
            use and enjoyment of the Services by any third party. This includes
            conduct which is unlawful or which may harass or cause distress or
            inconvenience to any person, the transmission of obscene or
            offensive content or disruption of normal flow of dialogue within
            our Services. You also agree not to use our Services for any
            unauthorized commercial purposes, such as advertising or marketing,
            without our prior written consent.
          </p>

          <h2>3. Account Security</h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and password and for restricting access to your computer,
            and you agree to accept responsibility for all activities that occur
            under your account or password. Pinnacle Global Swift reserves the
            right to refuse service, terminate accounts, remove or edit content,
            or cancel orders in its sole discretion. You must notify us
            immediately of any unauthorized use of your account or password or
            any other breach of security.
          </p>

          <h2>4. Intellectual Property</h2>
          <p>
            All content included on this site, such as text, graphics, logos,
            button icons, images, audio clips, digital downloads, data
            compilations, and software, is the property of Pinnacle Global Swift
            or its content suppliers and protected by international copyright
            laws. The compilation of all content on this site is the exclusive
            property of Pinnacle Global Swift and protected by international
            copyright laws. You may not reproduce, distribute, display, sell,
            lease, transmit, create derivative works from, translate, modify,
            reverse-engineer, disassemble, decompile, or otherwise exploit this
            site or any portion of it unless expressly permitted by us in
            writing.
          </p>

          <h2>5. Disclaimer of Warranties</h2>
          <p>
            The Services are provided "as is" and without warranties of any
            kind, whether express or implied. To the fullest extent permissible
            pursuant to applicable law, Pinnacle Global Swift disclaims all
            warranties, express or implied, including, but not limited to,
            implied warranties of merchantability and fitness for a particular
            purpose and non-infringement. Pinnacle Global Swift does not
            represent or warrant that the functions contained in the Services
            will be uninterrupted or error-free, that defects will be corrected,
            or that the Services or the server that makes the Services available
            are free of viruses or other harmful components. You expressly agree
            that your use of the Services is at your sole risk.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            In no event shall Pinnacle Global Swift be liable for any direct,
            indirect, incidental, special, or consequential damages that result
            from the use of, or the inability to use, the Services, even if
            Pinnacle Global Swift has been advised of the possibility of such
            damages. This includes, but is not limited to, damages for loss of
            profits, goodwill, use, data, or other intangible losses. Some
            jurisdictions do not allow the limitation of liability, so the
            foregoing limitation may not apply to you.
          </p>

          <h2>7. Governing Law</h2>
          <p>
            These Terms and Conditions shall be governed by and construed in
            accordance with the laws of Singapore, without giving effect to any
            principles of conflicts of law. Any dispute arising under these
            Terms and Conditions shall be subject to the exclusive jurisdiction
            of the courts of Singapore.
          </p>

          <h2>8. Changes to Terms and Conditions</h2>
          <p>
            Pinnacle Global Swift reserves the right to modify these Terms and
            Conditions at any time. We will post any changes on this page and,
            if the changes are significant, we will provide a more prominent
            notice, such as email notification. Your continued use of the
            Services after any changes to these Terms and Conditions constitutes
            your acceptance of the new terms. It is your responsibility to check
            this page periodically for changes.
          </p>

          <h2>9. Termination</h2>
          <p>
            We may terminate your access to the Services at any time, without
            cause or notice, which may result in the forfeiture and destruction
            of all information associated with your account. All provisions of
            this Agreement that, by their nature, should survive termination
            shall survive termination, including, without limitation, ownership
            provisions, warranty disclaimers, indemnity, and limitations of
            liability.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us at:
          </p>
          <p>
            <span className='text-gray-300'>
              2401 W Park Row Dr, Pantego, TX 76013, United States
            </span>
            support@pinnacleswift.com
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
