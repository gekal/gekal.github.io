import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import SkillItem from '@/components/molecules/SkillItem'

interface SkillGroupProps {
  name: string
  accent: string
  skills: string[]
}

export default function SkillGroup({ name, accent, skills }: SkillGroupProps) {
  return (
    <Paper elevation={0} sx={{ p: 3, height: '100%', bgcolor: 'grey.900', borderRadius: 3 }}>
      <Typography variant="overline" sx={{ color: accent, fontWeight: 700 }}>
        {name}
      </Typography>
      <List dense disablePadding sx={{ mt: 1 }}>
        {skills.map((skill) => (
          <SkillItem key={skill} skill={skill} accent={accent} />
        ))}
      </List>
    </Paper>
  )
}
