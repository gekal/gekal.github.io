'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'ホーム' },
  { href: '/about', label: 'About' },
  { href: '/posts', label: 'ブログ' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/85 backdrop-blur-md border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-white font-serif font-bold text-xl tracking-widest hover:text-gray-300 transition-colors"
          >
            鴻鷹
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'text-white border-b-2 border-primary pb-0.5'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-400 hover:text-white focus:outline-none"
            aria-label="メニュー"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-400 hover:text-white px-3 py-2 text-sm uppercase tracking-wider transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
