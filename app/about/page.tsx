import type { Metadata } from 'next'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import HeroSection from '@/components/organisms/HeroSection'
import ServiceCard from '@/components/organisms/ServiceCard'
import SkillGroup from '@/components/organisms/SkillGroup'
import CertGroup from '@/components/organisms/CertGroup'
import ConditionsTable from '@/components/organisms/ConditionsTable'
import CTASection from '@/components/organisms/CTASection'
import Avatar from '@/components/atoms/Avatar'
import SectionLabel from '@/components/atoms/SectionLabel'
import AccentLine from '@/components/atoms/AccentLine'
import { PROFILE, EXPERIENCE_YEARS, CAREER_START_YEAR } from '@/lib/profile'
import { CREDENTIALS, CREDENTIAL_COUNT } from '@/lib/credentials'
import { personJsonLd } from '@/lib/structured-data'
import { WORKS_DRAFT } from '@/lib/works'

export const metadata: Metadata = {
  title: 'About',
  description: `フリーランスエンジニア gekal のプロフィール。AWS/GCP/Azure マルチクラウド専門、実務 ${EXPERIENCE_YEARS} 年・${CREDENTIAL_COUNT} 資格。稼働条件も掲載しています。`,
}

const services = [
  {
    icon: '☁️',
    title: 'クラウドインフラ',
    desc: 'AWS / GCP / Azure を活用した設計・構築・最適化。高可用性からコスト削減まで対応。',
    tags: ['AWS', 'GCP', 'Azure', 'Terraform'],
  },
  {
    icon: '🚀',
    title: 'DevOps / CI-CD',
    desc: 'GitHub Actions・Jenkins によるパイプライン構築。Docker/Kubernetes コンテナ化。',
    tags: ['Docker', 'Kubernetes', 'GitHub Actions', 'Jenkins'],
  },
  {
    icon: '💻',
    title: 'バックエンド開発',
    desc: 'Java / Spring Boot・Node.js・.NET による API・マイクロサービス開発。',
    tags: ['Java', 'Spring Boot', 'Node.js', '.NET'],
  },
  {
    icon: '🔍',
    title: '技術コンサルティング',
    desc: 'クラウド移行・アーキテクチャレビュー・技術選定支援。',
    tags: ['Architecture', 'Migration', 'Review'],
  },
]

const skillGroups = [
  {
    name: 'Cloud',
    accent: '#FF9500',
    skills: ['AWS (Professional)', 'Google Cloud (Professional)', 'Azure (Expert)', 'Terraform / IaC'],
  },
  { name: 'Container', accent: '#64B5F6', skills: ['Docker', 'Kubernetes', 'Helm', 'CKAD 認定'] },
  {
    name: 'Backend',
    accent: '#34C759',
    skills: ['Java / Spring Boot', 'JavaScript / Node.js', '.NET / C#', 'Shell / Groovy'],
  },
  {
    name: 'DevOps',
    accent: '#BF5AF2',
    skills: ['GitHub Actions', 'Jenkins', 'CI/CD Pipeline', 'SRE プラクティス'],
  },
]

const profileBadges = [
  `${EXPERIENCE_YEARS} 年以上の経験`,
  'マルチクラウド対応',
  `${CREDENTIAL_COUNT} 資格取得`,
  'リモート作業可',
  '日本語・中国語',
]

const profileLinks = [
  { href: PROFILE.github, label: 'GitHub' },
  { href: PROFILE.linkedin, label: 'LinkedIn' },
]

/** 各セクションの中央寄せ見出し */
function SectionHeading({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box sx={{ textAlign: 'center', mb: 5 }}>
      <SectionLabel>{label}</SectionLabel>
      <Typography variant="h2" component="h2">
        {children}
      </Typography>
    </Box>
  )
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />
      <HeroSection
        title="About Me"
        subtitle={`フリーランスエンジニア — ${EXPERIENCE_YEARS} 年以上の経験 · ${CREDENTIAL_COUNT} 資格`}
        backgroundImage="/img/bg-about.jpg"
        size="sm"
      />

      <Container maxWidth="md" sx={{ py: 8 }}>
        <Stack spacing={12}>
          {/* ── プロフィール ── */}
          <Grid container spacing={6} component="section">
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={1.5} sx={{ alignItems: 'center' }}>
                <Avatar src={PROFILE.avatar} alt={PROFILE.handle} size="lg" online />
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">{PROFILE.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {PROFILE.handle} · @GekalCn
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  {profileLinks.map(({ href, label }) => (
                    <Button
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      variant="outlined"
                      color="inherit"
                    >
                      {label}
                    </Button>
                  ))}
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 1.5 }}>
                <AccentLine />
                <SectionLabel>Freelance Engineer</SectionLabel>
              </Stack>
              <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                クラウドとコンテナの
                <br />
                専門エンジニア
              </Typography>
              <Stack spacing={1.5} sx={{ color: 'text.secondary' }}>
                <Typography>
                  {CAREER_START_YEAR} 年よりソフトウェアエンジニアとして活動。Java・JavaScript・.NET
                  など多様な言語で開発経験を積んだ後、クラウドとコンテナ技術に特化。
                </Typography>
                <Typography>
                  現在は<Box component="strong" sx={{ color: 'text.primary' }}>フリーランス</Box>
                  として、AWS・GCP・Azure の
                  <Box component="strong" sx={{ color: 'text.primary' }}>マルチクラウド</Box>
                  を軸にインフラ設計・DevOps 環境構築・バックエンド開発まで一貫してサポートしています。
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mt: 2.5 }}>
                {profileBadges.map((b) => (
                  <Chip key={b} label={b} size="small" color="primary" variant="outlined" />
                ))}
              </Stack>
              {/* 事例が実データに差し替わるまでは導線を出さない (lib/works.ts) */}
              {!WORKS_DRAFT && (
                <Button href="/works" endIcon={<ArrowForwardIcon />} sx={{ mt: 2, ml: -1.5 }}>
                  実績・事例を見る
                </Button>
              )}
            </Grid>
          </Grid>

          {/* ── サービス ── */}
          <Box component="section">
            <SectionHeading label="Services">提供サービス</SectionHeading>
            <Grid container spacing={3}>
              {services.map((s) => (
                <Grid key={s.title} size={{ xs: 12, sm: 6 }}>
                  <ServiceCard {...s} />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* ── スキル ── */}
          <Box component="section">
            <SectionHeading label="Skills">スキルセット</SectionHeading>
            <Grid container spacing={3}>
              {skillGroups.map((g) => (
                <Grid key={g.name} size={{ xs: 12, sm: 6 }}>
                  <SkillGroup {...g} />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* ── 資格 ── */}
          <Box component="section">
            <SectionHeading label="Certifications">
              取得資格{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                {CREDENTIAL_COUNT}
              </Box>
            </SectionHeading>
            <Grid container spacing={3}>
              {CREDENTIALS.map((c) => (
                <Grid key={c.vendor} size={{ xs: 12, sm: 6 }}>
                  <CertGroup {...c} />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* ── 稼働条件 ── */}
          <Box component="section">
            <SectionHeading label="Conditions">稼働条件</SectionHeading>
            <ConditionsTable />
          </Box>

          <CTASection
            badge="Currently Available"
            title="お仕事のご依頼・ご相談"
            description={
              <>
                クラウド移行・インフラ構築・システム開発など、
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
