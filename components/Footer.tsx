import Link from 'next/link'

const links = {
  pages: [
    { href: '/', label: 'ホーム' },
    { href: '/about', label: 'About' },
    { href: '/posts', label: 'ブログ' },
    { href: '/contact', label: 'Contact' },
  ],
  social: [
    { href: 'https://github.com/gekal', label: 'GitHub', icon: 'github' },
    { href: 'https://twitter.com/GekalCn', label: 'X (Twitter)', icon: 'twitter' },
    { href: 'https://www.linkedin.com/in/gekal', label: 'LinkedIn', icon: 'linkedin' },
  ],
}

function SocialIcon({ name }: { name: string }) {
  if (name === 'github') return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
  if (name === 'twitter') return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

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
              {links.social.map(({ href, label, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:opacity-70"
                  style={{
                    background: 'rgba(0,0,0,0.05)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <SocialIcon name={icon} />
                </a>
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
              {links.pages.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13px] transition-colors hover:opacity-70"
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
                  className="transition-colors break-all hover:opacity-70"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  liu.hongying@hotmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.gekal.cn"
                  className="transition-colors hover:opacity-70"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  www.gekal.cn
                </a>
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium rounded-full px-3.5 py-1.5 transition-opacity hover:opacity-75 border"
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
