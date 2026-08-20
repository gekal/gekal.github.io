import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Avatar from '@/components/atoms/Avatar'
import SectionLabel from '@/components/atoms/SectionLabel'
import { PROFILE, EXPERIENCE_YEARS } from '@/lib/profile'
import { AVAILABILITY } from '@/lib/business'

/**
 * 記事末尾の著者ボックス + 相談導線。
 *
 * 流入の大半は検索から記事に直接来るので、記事の終わりが実質のランディング
 * ページになる。ここに「誰が書いたか」と「仕事として頼めるか」がないと、
 * 記事がいくら読まれても問い合わせには繋がらない。
 */
export default function PostAuthorCta() {
  const available = AVAILABILITY.status !== 'closed'

  return (
    <Card component="aside" sx={{ mt: 6 }}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <SectionLabel sx={{ mb: 2 }}>この記事を書いた人</SectionLabel>

        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 2 }}>
          <Avatar src={PROFILE.avatar} alt={PROFILE.handle} size="sm" />
          <Box>
            <Typography sx={{ fontWeight: 700, lineHeight: 1.3 }}>
              {PROFILE.name}（{PROFILE.handle}）
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {PROFILE.role} · 実務 {EXPERIENCE_YEARS} 年
            </Typography>
          </Box>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {PROFILE.bio}
          {available && 'この記事の領域についてのご相談も承っています（初回相談は無料）。'}
        </Typography>

        <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
          <Button href="/contact" variant="contained" endIcon={<ArrowForwardIcon />}>
            お仕事のご相談
          </Button>
          <Button href="/about" variant="outlined" color="inherit">
            プロフィール
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
