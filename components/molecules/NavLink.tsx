import Link from 'next/link'

interface NavLinkProps {
  href: string
  label: string
  isActive: boolean
  /** true when rendered over dark (hero) background */
  dark?: boolean
}

export default function NavLink({ href, label, isActive, dark = false }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`
        relative px-4 py-2 rounded-lg text-[14px] font-medium tracking-[-0.01em]
        transition-all duration-200
        ${dark
          ? isActive
            ? 'text-white bg-white/10'
            : 'text-white/60 hover:text-white hover:bg-white/8'
          : isActive
            ? 'text-[#1D1D1F] bg-black/[0.06]'
            : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/[0.04]'
        }
      `}
    >
      {label}
      {/* Active dot indicator */}
      {isActive && (
        <span
          className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          style={{ background: dark ? 'rgba(255,255,255,0.6)' : 'var(--apple-blue)' }}
        />
      )}
    </Link>
  )
}
