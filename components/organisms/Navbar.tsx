'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import NavLink from '@/components/molecules/NavLink'
import Icon from '@/components/atoms/Icon'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/posts', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isHero, setIsHero] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 1)
      setIsHero(window.scrollY < 60)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // All pages start with a dark hero image, so use white text until the user scrolls
  const useDark = isHero

  return (
    <>
      {/* ── Desktop / Scroll bar ───────────────────── */}
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? useDark
              ? 'glass-nav-dark shadow-lg shadow-black/10'
              : 'glass-nav shadow-sm shadow-black/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="flex items-center justify-between h-[60px]">

            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2.5 select-none">
              <span
                className="w-8 h-8 rounded-[10px] flex items-center justify-center text-white font-bold text-[15px] shadow-sm transition-transform duration-200 group-hover:scale-95"
                style={{ background: 'var(--apple-blue)' }}
              >
                鷹
              </span>
              <span
                className={`font-bold text-[16px] tracking-[-0.03em] transition-opacity duration-200 group-hover:opacity-70 ${
                  useDark ? 'text-white' : 'text-[#1D1D1F]'
                }`}
              >
                鴻鷹
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label }) => (
                <NavLink
                  key={href}
                  href={href}
                  label={label}
                  isActive={pathname === href}
                  dark={useDark}
                />
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <Link
                href="/contact"
                className="px-5 py-2 rounded-full text-white text-[13px] font-medium tracking-[-0.01em] transition-all duration-200 hover:opacity-85 hover:scale-[0.97] active:scale-95 shadow-sm"
                style={{ background: 'var(--apple-blue)' }}
              >
                お問い合わせ
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(true)}
              className={`md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
                useDark
                  ? 'text-white/70 hover:text-white hover:bg-white/10'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/[0.05]'
              }`}
              aria-label="メニューを開く"
            >
              <Icon name="menu" className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile full-screen overlay ─────────────── */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-500 ${
          isOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 transition-opacity duration-400 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'rgba(0, 0, 0, 0.93)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
          onClick={() => setIsOpen(false)}
        />

        {/* Panel */}
        <div className="relative z-10 flex flex-col h-full px-7 pb-10">

          {/* Top bar */}
          <div className="flex items-center justify-between h-[60px] flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              onClick={() => setIsOpen(false)}
            >
              <span
                className="w-8 h-8 rounded-[10px] flex items-center justify-center text-white font-bold text-[15px]"
                style={{ background: 'var(--apple-blue)' }}
              >
                鷹
              </span>
              <span className="font-bold text-[16px] tracking-[-0.03em] text-white">
                鴻鷹
              </span>
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 text-white/70 hover:text-white hover:bg-white/15 transition-colors"
              aria-label="メニューを閉じる"
            >
              <Icon name="close" className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.08] flex-shrink-0" />

          {/* Links */}
          <nav className="flex-1 flex flex-col justify-center gap-1 py-8">
            {navLinks.map(({ href, label }, i) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    group flex items-center justify-between
                    px-4 py-4 rounded-2xl
                    transition-all duration-300
                    ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
                    ${isActive
                      ? 'bg-white/[0.08] text-white'
                      : 'text-white/50 hover:text-white hover:bg-white/[0.05]'
                    }
                  `}
                  style={{ transitionDelay: isOpen ? `${80 + i * 50}ms` : '0ms' }}
                >
                  <span
                    className="text-[32px] font-bold tracking-[-0.04em] leading-none"
                  >
                    {label}
                  </span>
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
                      isActive ? 'bg-white/10' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* CTA at bottom */}
          <div
            className={`flex-shrink-0 transition-all duration-300 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: isOpen ? '320ms' : '0ms' }}
          >
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white text-[16px] font-medium tracking-[-0.01em] transition-opacity hover:opacity-85"
              style={{ background: 'var(--apple-blue)' }}
            >
              お問い合わせ
              <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
            </Link>

            {/* Social links row */}
            <div className="flex items-center justify-center gap-4 mt-6">
              {[
                { href: 'https://github.com/gekal', label: 'GitHub' },
                { href: 'https://twitter.com/GekalCn', label: 'X (Twitter)' },
                { href: 'https://www.linkedin.com/in/gekal', label: 'LinkedIn' },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-white/30 hover:text-white/60 transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
