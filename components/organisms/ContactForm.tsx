'use client'

import { useState } from 'react'
import Input from '@/components/atoms/Input'
import Textarea from '@/components/atoms/Textarea'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import FormField from '@/components/molecules/FormField'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const FORMSPREE_URL = 'https://formspree.io/f/xojyvezn'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_URL, {
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

  if (status === 'sent') {
    return (
      <div
        className="rounded-2xl border p-8 py-16 text-center"
        style={{ background: 'var(--surface)', borderColor: 'var(--separator-opaque)' }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: '#F0FDF4' }}
        >
          <Icon name="check" className="h-7 w-7" strokeWidth={2} />
        </div>
        <h3
          className="font-semibold text-[19px] mb-2"
          style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
        >
          送信完了しました
        </h3>
        <p className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>
          お問い合わせありがとうございます。<br />近日中にご返信いたします。
        </p>
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl border p-8"
      style={{ background: 'var(--surface)', borderColor: 'var(--separator-opaque)' }}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField id="name" label="お名前" required>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="山田 太郎"
            />
          </FormField>
          <FormField id="email" label="メールアドレス" required>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@email.com"
            />
          </FormField>
        </div>

        <FormField id="subject" label="件名" required>
          <Input
            id="subject"
            type="text"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="お仕事のご相談 / 技術相談 など"
          />
        </FormField>

        <FormField id="message" label="メッセージ" required>
          <Textarea
            id="message"
            rows={6}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="ご依頼内容・ご質問など詳しくご記入ください"
          />
        </FormField>

        {status === 'error' && (
          <p
            className="text-[12px] px-4 py-2.5 rounded-lg border"
            style={{ color: '#DC2626', background: '#FEF2F2', borderColor: '#FECACA' }}
          >
            送信に失敗しました。直接メールでご連絡ください。
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          disabled={status === 'sending'}
          className="w-full justify-center py-3 text-[15px] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? (
            <>
              <Icon name="spinner" className="h-4 w-4" />
              送信中...
            </>
          ) : (
            '送信する'
          )}
        </Button>
      </form>
    </div>
  )
}
