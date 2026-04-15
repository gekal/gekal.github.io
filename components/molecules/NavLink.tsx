import Link from 'next/link'

interface NavLinkProps {
  href: string
  label: string
  isActive: boolean
  /** true when rendered over dark (hero) background */
  dark?: boolean
  mobile?: boolean
}

export default function NavLink({ href, label, isActive, dark = false, mobile = false }: NavLinkProps) {
  if (mobile) {
    return (
      <Link
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
  }

  return (
    <Link
      href={href}
      className={`relative px-3.5 py-1.5 rounded-lg text-[13px] font-normal tracking-[-0.01em] transition-all duration-200 ${
        dark
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
}
