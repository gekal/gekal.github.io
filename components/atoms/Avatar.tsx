interface AvatarProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  online?: boolean
}

const sizes = {
  sm: { outer: 'w-10 h-10', dot: 'w-2.5 h-2.5' },
  md: { outer: 'w-24 h-24', dot: 'w-3.5 h-3.5' },
  lg: { outer: 'w-36 h-36', dot: 'w-4 h-4' },
}

export default function Avatar({ src, alt, size = 'md', online = false }: AvatarProps) {
  const { outer, dot } = sizes[size]
  return (
    <div className="relative inline-block">
      <div
        className={`${outer} rounded-2xl overflow-hidden`}
        style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
      {online && (
        <span
          className={`absolute -bottom-1.5 -right-1.5 ${dot} rounded-full border-2 border-white`}
          style={{ background: '#34C759' }}
        />
      )}
    </div>
  )
}
