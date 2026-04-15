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

  useEffect(() => { setIsOpen(false) }, [pathname])

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
              className={`font-semibold text-[15px] tracking-[-0.01em] transition-colors group-hover:opacity-70 ${
                useDark ? 'text-white' : 'text-[#1D1D1F]'
              }`}
            >
              鴻鷹
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => (
              <NavLink
                key={href}
                href={href}
                label={label}
                isActive={pathname === href}
                dark={useDark}
              />
            ))}
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
            <Icon name={isOpen ? 'close' : 'menu'} className="h-[18px] w-[18px]" strokeWidth={1.8} />
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
          {navLinks.map(({ href, label }) => (
            <NavLink
              key={href}
              href={href}
              label={label}
              isActive={pathname === href}
              mobile
            />
          ))}
        </div>
      </div>
    </nav>
  )
}
