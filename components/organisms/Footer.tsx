import Link from 'next/link'
import SocialLink from '@/components/molecules/SocialLink'
import { IconName } from '@/components/atoms/Icon'

const pages = [
  { href: '/', label: 'ホーム' },
  { href: '/about', label: 'About' },
  { href: '/posts', label: 'ブログ' },
  { href: '/contact', label: 'Contact' },
]

const socials: { href: string; label: string; icon: IconName }[] = [
  { href: 'https://github.com/gekal', label: 'GitHub', icon: 'github' },
  { href: 'https://twitter.com/GekalCn', label: 'X (Twitter)', icon: 'twitter' },
  { href: 'https://www.linkedin.com/in/gekal', label: 'LinkedIn', icon: 'linkedin' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface-secondary)', borderTop: '1px solid var(--separator-opaque)' }}>
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span
                className="w-7 h-7 rounded-[8px] flex items-center justify-center text-white font-bold text-sm"
                style={{ background: 'var(--apple-blue)' }}
              >
                鷹
              </span>
              <span
                className="font-semibold text-[15px] tracking-[-0.01em]"
                style={{ color: 'var(--text-primary)' }}
              >
                鴻鷹
              </span>
            </Link>
            <p className="text-[13px] leading-relaxed max-w-xs" style={{ color: 'var(--text-secondary)' }}>
              フリーランスエンジニア。<br />
              Cloud · DevOps · Backend を中心に発信。
            </p>
            <div className="flex items-center gap-2 mt-5">
              {socials.map(({ href, label, icon }) => (
                <SocialLink key={href} href={href} label={label} icon={icon} variant="light" />
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h3
              className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-4"
              style={{ color: 'var(--text-tertiary)' }}
            >
              ページ
            </h3>
            <ul className="space-y-2.5">
              {pages.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13px] transition-opacity hover:opacity-60"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-4"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Contact
            </h3>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <a
                  href="mailto:liu.hongying@hotmail.com"
                  className="transition-opacity break-all hover:opacity-60"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  liu.hongying@hotmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.gekal.cn"
                  className="transition-opacity hover:opacity-60"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  www.gekal.cn
                </a>
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium rounded-full px-3.5 py-1.5 border transition-opacity hover:opacity-75"
              style={{ color: 'var(--apple-blue)', borderColor: 'var(--apple-blue)' }}
            >
              お問い合わせ →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px]"
          style={{ borderTop: '1px solid var(--separator-opaque)', color: 'var(--text-tertiary)' }}
        >
          <p>© {new Date().getFullYear()} 鴻鷹 (gekal). All rights reserved.</p>
          <p>Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
