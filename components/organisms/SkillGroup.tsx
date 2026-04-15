import SkillItem from '@/components/molecules/SkillItem'

interface SkillGroupProps {
  name: string
  accent: string
  skills: string[]
}

export default function SkillGroup({ name, accent, skills }: SkillGroupProps) {
  return (
    <div className="rounded-2xl p-6" style={{ background: 'var(--dark-surface)' }}>
      <p
        className="text-[11px] font-bold uppercase tracking-[0.1em] mb-4"
        style={{ color: accent }}
      >
        {name}
      </p>
      <ul className="space-y-2.5">
        {skills.map((skill) => (
          <SkillItem key={skill} skill={skill} accent={accent} />
        ))}
      </ul>
    </div>
  )
}
