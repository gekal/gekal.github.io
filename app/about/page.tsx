import type { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '@/components/organisms/HeroSection'
import ServiceCard from '@/components/organisms/ServiceCard'
import SkillGroup from '@/components/organisms/SkillGroup'
import CertGroup from '@/components/organisms/CertGroup'
import CTASection from '@/components/organisms/CTASection'
import Avatar from '@/components/atoms/Avatar'
import Badge from '@/components/atoms/Badge'
import SectionLabel from '@/components/atoms/SectionLabel'
import AccentLine from '@/components/atoms/AccentLine'

export const metadata: Metadata = {
  title: 'About',
  description: 'フリーランスエンジニア gekal のプロフィール。AWS/GCP/Azure マルチクラウド専門、システム開発から DevOps まで。',
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
  { name: 'Cloud', accent: '#FF9500', skills: ['AWS (Professional)', 'Google Cloud (Professional)', 'Azure (Expert)', 'Terraform / IaC'] },
  { name: 'Container', accent: '#0071E3', skills: ['Docker', 'Kubernetes', 'Helm', 'CKAD 認定'] },
  { name: 'Backend', accent: '#34C759', skills: ['Java / Spring Boot', 'JavaScript / Node.js', '.NET / C#', 'Shell / Groovy'] },
  { name: 'DevOps', accent: '#BF5AF2', skills: ['GitHub Actions', 'Jenkins', 'CI/CD Pipeline', 'SRE プラクティス'] },
]

const certs = [
  {
    vendor: 'AWS',
    accent: '#FF9500',
    items: ['Cloud Practitioner', 'Developer Associate', 'Solutions Architect Associate', 'SysOps Administrator Associate', 'Solutions Architect Professional'],
  },
  {
    vendor: 'Google Cloud',
    accent: '#34A853',
    items: ['Associate Cloud Engineer', 'Professional Cloud Architect', 'Professional Cloud DevOps Engineer', 'Professional Data Engineer', 'Professional Cloud Developer'],
  },
  {
    vendor: 'Azure',
    accent: '#0078D4',
    items: ['Fundamentals (AZ-900)', 'Developer Associate (AZ-204)', 'Administrator Associate (AZ-104)', 'DevOps Engineer Expert (AZ-400)', 'Solutions Architect Expert (AZ-305)', 'Security Fundamentals (SC-900)'],
  },
  {
    vendor: 'Cloud Native',
    accent: '#326CE5',
    items: ['CKAD — Certified Kubernetes Application Developer'],
  },
]

const profileBadges = ['13 年以上の経験', 'マルチクラウド対応', '16 資格取得', 'リモート作業可', '日本語・中国語']

export default function AboutPage() {
  return (
    <>
      <HeroSection
        title="About Me"
        subtitle="フリーランスエンジニア — 13 年以上の経験 · 16 資格"
        backgroundImage="/img/bg-about.jpg"
        size="sm"
      />

      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-16 space-y-24">

        {/* ── Profile ──────────────────────────────── */}
        <section className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-shrink-0">
            <Avatar src="https://github.com/gekal.png" alt="gekal" size="lg" online />
            <div className="mt-4 text-center">
              <p className="font-semibold text-[17px] tracking-[-0.02em]" style={{ color: 'var(--text-primary)' }}>
                鴻 鷹
              </p>
              <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                gekal · @GekalCn
              </p>
            </div>
            <div className="flex justify-center gap-2 mt-3">
              {[
                { href: 'https://github.com/gekal', label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/gekal', label: 'LinkedIn' },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] rounded-full px-3 py-1 border transition-opacity hover:opacity-70"
                  style={{ color: 'var(--text-secondary)', borderColor: 'var(--separator)' }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex-1 pt-1">
            <div className="flex items-center gap-2 mb-3">
              <AccentLine />
              <SectionLabel>Freelance Engineer</SectionLabel>
            </div>
            <h2
              className="font-bold mb-4 leading-tight"
              style={{ color: 'var(--text-primary)', fontSize: 'clamp(24px, 4vw, 30px)', letterSpacing: '-0.03em' }}
            >
              クラウドとコンテナの<br />専門エンジニア
            </h2>
            <div className="space-y-3 text-[15px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p>
                2011 年よりソフトウェアエンジニアとして活動。Java・JavaScript・.NET など多様な言語で開発経験を積んだ後、クラウドとコンテナ技術に特化。
              </p>
              <p>
                現在は<strong style={{ color: 'var(--text-primary)' }}>フリーランス</strong>として、AWS・GCP・Azure の<strong style={{ color: 'var(--text-primary)' }}>マルチクラウド</strong>を軸にインフラ設計・DevOps 環境構築・バックエンド開発まで一貫してサポートしています。
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-5">
              {profileBadges.map((b) => <Badge key={b}>{b}</Badge>)}
            </div>
          </div>
        </section>

        {/* ── Services ─────────────────────────────── */}
        <section>
          <div className="text-center mb-10">
            <SectionLabel className="mb-2">Services</SectionLabel>
            <h2 className="section-heading">提供サービス</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s) => <ServiceCard key={s.title} {...s} />)}
          </div>
        </section>

        {/* ── Skills ───────────────────────────────── */}
        <section>
          <div className="text-center mb-10">
            <SectionLabel className="mb-2">Skills</SectionLabel>
            <h2 className="section-heading">スキルセット</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillGroups.map((g) => <SkillGroup key={g.name} {...g} />)}
          </div>
        </section>

        {/* ── Certifications ───────────────────────── */}
        <section>
          <div className="text-center mb-10">
            <SectionLabel className="mb-2">Certifications</SectionLabel>
            <h2 className="section-heading">
              取得資格 <span className="gradient-text">16</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certs.map((c) => <CertGroup key={c.vendor} {...c} />)}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────── */}
        <CTASection
          badge="Currently Available"
          title="お仕事のご依頼・ご相談"
          description={<>クラウド移行・インフラ構築・システム開発など、<br />初回相談は無料です。</>}
          ctaText="お問い合わせ"
          ctaHref="/contact"
        />
      </div>
    </>
  )
}
