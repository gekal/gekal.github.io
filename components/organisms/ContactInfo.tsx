import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MailOutlineIcon from '@mui/icons-material/MailOutlineOutlined'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import ContactCard from '@/components/molecules/ContactCard'
import AvailabilityBadge from '@/components/molecules/AvailabilityBadge'
import SectionLabel from '@/components/atoms/SectionLabel'

const cards = [
  {
    icon: <MailOutlineIcon fontSize="small" />,
    label: 'Email',
    value: 'liu.hongying@hotmail.com',
    href: 'mailto:liu.hongying@hotmail.com',
  },
  {
    icon: <LinkedInIcon fontSize="small" />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/gekal',
    href: 'https://www.linkedin.com/in/gekal',
  },
  {
    icon: <GitHubIcon fontSize="small" />,
    label: 'GitHub',
    value: 'github.com/gekal',
    href: 'https://github.com/gekal',
  },
]

export default function ContactInfo() {
  return (
    <Stack spacing={4}>
      <Box>
        <SectionLabel>Get in touch</SectionLabel>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
          お話しましょう
        </Typography>
        <Typography variant="body2" color="text.secondary">
          お仕事のご依頼・技術相談・その他お問い合わせはフォームまたは直接ご連絡ください。
          通常 1〜2 営業日以内にご返信します。
        </Typography>
      </Box>

      <Stack spacing={1.5}>
        {cards.map(({ icon, label, value, href }) => (
          <ContactCard key={label} icon={icon} label={label} value={value} href={href} />
        ))}
      </Stack>

      <AvailabilityBadge />
    </Stack>
  )
}
