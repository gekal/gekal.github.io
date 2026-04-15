import type { Metadata } from 'next'
import HeroSection from '@/components/organisms/HeroSection'
import ContactForm from '@/components/organisms/ContactForm'
import ContactInfo from '@/components/organisms/ContactInfo'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'gekal へのお問い合わせ。お仕事依頼・技術相談はこちらから。',
}

export default function ContactPage() {
  return (
    <>
      <HeroSection
        title="Contact"
        subtitle="お気軽にご連絡ください"
        backgroundImage="/img/bg-contact.jpg"
        size="sm"
      />
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  )
}
