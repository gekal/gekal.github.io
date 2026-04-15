interface TagListProps {
  tags: string[]
  max?: number
  /** dark variant: white text on semi-transparent dark bg */
  dark?: boolean
  className?: string
}

export default function TagList({ tags, max, dark = false, className = '' }: TagListProps) {
  const visible = max ? tags.slice(0, max) : tags

  if (dark) {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        {visible.map((tag) => (
          <span
            key={tag}
            className="text-[12px] rounded-full px-2.5 py-1"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
          >
            #{tag}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {visible.map((tag) => (
        <span key={tag} className="tag text-[11px]">
          {tag}
        </span>
      ))}
    </div>
  )
}
