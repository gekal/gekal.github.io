import type { Metadata } from 'next'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import HeroSection from '@/components/organisms/HeroSection'
import WorkCard from '@/components/organisms/WorkCard'
import ConditionsTable from '@/components/organisms/ConditionsTable'
import CTASection from '@/components/organisms/CTASection'
import SectionLabel from '@/components/atoms/SectionLabel'
import { WORKS, WORKS_DRAFT } from '@/lib/works'

export const metadata: Metadata = {
  title: '実績',
  description:
    'クラウド移行・Kubernetes 基盤構築・API 開発などの事例。課題・担当範囲・技術スタック・成果をまとめています。',
  // 事例がサンプルのままの間は検索結果に出さない (lib/works.ts の WORKS_DRAFT)
  ...(WORKS_DRAFT ? { robots: { index: false, follow: false } } : {}),
}

export default function WorksPage() {
  return (
    <>
      <HeroSection
        title="実績・事例"
        subtitle="守秘義務の範囲で、課題・担当範囲・成果を公開しています"
        backgroundImage="/img/bg-about.jpg"
        size="sm"
      />

      <Container maxWidth="md" sx={{ py: 8 }}>
        <Stack spacing={10}>
          <Stack spacing={4} component="section">
            {WORKS.map((work) => (
              <WorkCard key={work.slug} work={work} />
            ))}
          </Stack>

          <Box component="section">
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <SectionLabel>Conditions</SectionLabel>
              <Typography variant="h2" component="h2">
                稼働条件
              </Typography>
            </Box>
            <ConditionsTable />
          </Box>

          <CTASection
            badge="Freelance Available"
            title="似た課題を抱えていませんか"
            description={
              <>
                現状の整理からでも構いません。
                <br />
                初回相談は無料です。
              </>
            }
            ctaText="お問い合わせ"
            ctaHref="/contact"
          />
        </Stack>
      </Container>
    </>
  )
}
