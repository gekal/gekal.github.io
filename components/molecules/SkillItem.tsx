interface SkillItemProps {
  skill: string
  /** CSS color for the dot */
  accent: string
}

export default function SkillItem({ skill, accent }: SkillItemProps) {
  return (
    <li className="flex items-center gap-2.5 text-[13px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: accent }}
      />
      {skill}
    </li>
  )
}
