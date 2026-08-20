import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import SocialLink, { type SocialIconName } from '@/components/molecules/SocialLink'
import { PROFILE } from '@/lib/profile'
import { WORKS_DRAFT } from '@/lib/works'

const pages = [
  { href: '/', label: 'ホーム' },
  { href: '/about', label: 'About' },
  ...(WORKS_DRAFT ? [] : [{ href: '/works', label: '実績' }]),
  { href: '/posts', label: 'ブログ' },
  { href: '/tags', label: 'タグ' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'プライバシーポリシー' },
]

const socials: { href: string; label: string; icon: SocialIconName }[] = [
  { href: PROFILE.github, label: 'GitHub', icon: 'github' },
  { href: 'https://twitter.com/GekalCn', label: 'X (Twitter)', icon: 'twitter' },
  { href: PROFILE.linkedin, label: 'LinkedIn', icon: 'linkedin' },
]

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'action.hover', borderTop: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg" sx={{ py: 7 }}>
        <Grid container spacing={5} sx={{ mb: 5 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Link
              href="/"
              underline="none"
              sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                鷹
              </Box>
              <Typography sx={{ fontWeight: 700, color: 'text.primary' }}>鴻鷹</Typography>
            </Link>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 280 }}>
              フリーランスエンジニア。
              <br />
              Cloud · DevOps · Backend を中心に発信。
            </Typography>
            <Stack direction="row" spacing={0.5} sx={{ mt: 2 }}>
              {socials.map(({ href, label, icon }) => (
                <SocialLink key={href} href={href} label={label} icon={icon} />
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="overline" color="text.secondary">
              ページ
            </Typography>
            <Stack spacing={1.25} sx={{ mt: 1.5 }}>
              {pages.map(({ href, label }) => (
                <Link
                  key={href}

                  href={href}
                  variant="body2"
                  color="text.secondary"
                >
                  {label}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="overline" color="text.secondary">
              Contact
            </Typography>
            <Stack spacing={1.25} sx={{ mt: 1.5 }}>
              <Link
                component="a"
                href={`mailto:${PROFILE.email}`}
                variant="body2"
                color="text.secondary"
                sx={{ wordBreak: 'break-all' }}
              >
                {PROFILE.email}
              </Link>
              <Link component="a" href="https://www.gekal.cn" variant="body2" color="text.secondary">
                www.gekal.cn
              </Link>
            </Stack>
            <Button

              href="/contact"
              variant="outlined"
              size="small"
              sx={{ mt: 2.5 }}
            >
              お問い合わせ
            </Button>
          </Grid>
        </Grid>

        <Divider />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{ alignItems: 'center', justifyContent: 'space-between', pt: 3 }}
        >
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} 鴻鷹 (gekal). All rights reserved.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Built with Next.js & MUI
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}
