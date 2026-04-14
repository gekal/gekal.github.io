'use client'

import { useState } from 'react'
import HeroSection from '@/components/HeroSection'

// Note: metadata export doesn't work in 'use client' components.
// Move to a server wrapper if needed. For now, title is set in layout.

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <HeroSection
        title="Contact"
        subtitle="お気軽にご連絡ください"
        backgroundImage="/img/bg-contact.jpg"
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">

        {/* Info */}
        <div className="text-center mb-12">
          <p className="text-gray-600 text-lg leading-relaxed">
            お仕事のご依頼・技術的なご相談・その他お問い合わせは
            下記フォームよりお気軽にどうぞ。
          </p>
          <p className="text-gray-500 text-sm mt-2">
            通常 1〜2 営業日以内にご返信いたします。
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            {
              icon: '📧',
              label: 'Email',
              value: 'liu.hongying@hotmail.com',
              href: 'mailto:liu.hongying@hotmail.com',
            },
            {
              icon: '💼',
              label: 'LinkedIn',
              value: 'linkedin.com/in/gekal',
              href: 'https://www.linkedin.com/in/gekal',
            },
            {
              icon: '🐙',
              label: 'GitHub',
              value: 'github.com/gekal',
              href: 'https://github.com/gekal',
            },
          ].map(({ icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all text-center"
            >
              <span className="text-2xl mb-2">{icon}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</span>
              <span className="text-sm text-primary font-medium truncate w-full text-center">{value}</span>
            </a>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="font-serif text-2xl font-bold text-dark mb-6">お問い合わせフォーム</h2>

          {status === 'sent' ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-dark mb-2">送信完了しました</h3>
              <p className="text-gray-600">
                お問い合わせありがとうございます。
                <br />近日中にご返信いたします。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                    placeholder="山田 太郎"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  件名 <span className="text-red-500">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                  placeholder="お仕事のご相談 / 技術相談 など"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  メッセージ <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
                  placeholder="ご依頼内容・ご質問など詳しくご記入ください"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm">
                  送信に失敗しました。直接メールでご連絡ください。
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full btn-primary py-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? '送信中...' : '送信する'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
