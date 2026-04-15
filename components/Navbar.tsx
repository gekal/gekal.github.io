'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

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

  useEffect(() => { setIsOpen(false) }, [pathname])

  /* On the home page the hero is dark, so nav text starts white */
  const isHome = pathname === '/'
  const useDark = isHome && isHero

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? useDark
            ? 'glass-nav-dark'
            : 'glass-nav'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="flex items-center justify-between h-[52px]">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span
              className="w-7 h-7 rounded-[8px] flex items-center justify-center text-white font-bold text-sm transition-opacity group-hover:opacity-80"
              style={{ background: 'var(--apple-blue)' }}
            >
              鷹
            </span>
            <span
              className={`font-semibold text-[15px] tracking-[-0.01em] transition-colors ${
                useDark ? 'text-white' : 'text-[#1D1D1F]'
              } group-hover:opacity-70`}
            >
              鴻鷹
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-3.5 py-1.5 rounded-lg text-[13px] font-normal tracking-[-0.01em] transition-all duration-200 ${
                    useDark
                      ? isActive
                        ? 'text-white'
                        : 'text-white/70 hover:text-white'
                      : isActive
                      ? 'text-[#1D1D1F]'
                      : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
                >
                  {label}
                </Link>
              )
            })}

            <Link
              href="/contact"
              className="ml-3 px-4 py-1.5 rounded-full text-white text-[13px] font-normal tracking-[-0.01em] transition-opacity hover:opacity-80 active:scale-95"
              style={{ background: 'var(--apple-blue)' }}
            >
              お問い合わせ
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
              useDark ? 'text-white/70 hover:text-white' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
            aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
          >
            <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              {isOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass-nav border-t border-black/[0.06] px-6 py-3 space-y-0.5">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center px-3 py-2.5 rounded-xl text-[14px] font-normal transition-colors ${
                  isActive
                    ? 'text-[#1D1D1F] bg-black/[0.04]'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/[0.03]'
                }`}
              >
                {isActive && (
                  <span
                    className="w-1.5 h-1.5 rounded-full mr-2.5 flex-shrink-0"
                    style={{ background: 'var(--apple-blue)' }}
                  />
                )}
                {label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
