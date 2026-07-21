import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'

interface SkillItemProps {
  skill: string
  /** ドットの色 (CSS カラー値) */
  accent: string
}

export default function SkillItem({ skill, accent }: SkillItemProps) {
  return (
    <ListItem disableGutters disablePadding sx={{ mb: 0.75 }}>
      <ListItemIcon sx={{ minWidth: 20 }}>
        <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: accent }} />
      </ListItemIcon>
      <ListItemText
        primary={skill}
        slotProps={{ primary: { variant: 'body2', sx: { color: 'rgba(255,255,255,0.75)' } } }}
      />
    </ListItem>
  )
}
