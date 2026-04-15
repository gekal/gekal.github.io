import type { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'

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
  {
    name: 'Cloud',
    accent: '#FF9500',
    skills: ['AWS (Professional)', 'Google Cloud (Professional)', 'Azure (Expert)', 'Terraform / IaC'],
  },
  {
    name: 'Container',
    accent: '#0071E3',
    skills: ['Docker', 'Kubernetes', 'Helm', 'CKAD 認定'],
  },
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

const certs = [
  {
    vendor: 'AWS',
    accent: '#FF9500',
    items: [
      'Cloud Practitioner',
      'Developer Associate',
      'Solutions Architect Associate',
      'SysOps Administrator Associate',
      'Solutions Architect Professional',
    ],
  },
  {
    vendor: 'Google Cloud',
    accent: '#34A853',
    items: [
      'Associate Cloud Engineer',
      'Professional Cloud Architect',
      'Professional Cloud DevOps Engineer',
      'Professional Data Engineer',
      'Professional Cloud Developer',
    ],
  },
  {
    vendor: 'Azure',
    accent: '#0078D4',
    items: [
      'Fundamentals (AZ-900)',
      'Developer Associate (AZ-204)',
      'Administrator Associate (AZ-104)',
      'DevOps Engineer Expert (AZ-400)',
      'Solutions Architect Expert (AZ-305)',
      'Security Fundamentals (SC-900)',
    ],
  },
  {
    vendor: 'Cloud Native',
    accent: '#326CE5',
    items: ['CKAD — Certified Kubernetes Application Developer'],
  },
]

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
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="relative w-36">
              <div
                className="w-36 h-36 rounded-2xl overflow-hidden"
                style={{
                  boxShadow: '0 8px 30px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://github.com/gekal.png"
                  alt="gekal"
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className="absolute -bottom-1.5 -right-1.5 w-4 h-4 rounded-full border-2 border-white"
                style={{ background: '#34C759' }}
              />
            </div>

            <div className="mt-4 text-center">
              <p
                className="font-semibold text-[17px] tracking-[-0.02em]"
                style={{ color: 'var(--text-primary)' }}
              >
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
                  style={{
                    color: 'var(--text-secondary)',
                    borderColor: 'var(--separator)',
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="flex-1 pt-1">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-4 h-px"
                style={{ background: 'var(--apple-blue)' }}
              />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.1em]"
                style={{ color: 'var(--apple-blue)' }}
              >
                Freelance Engineer
              </span>
            </div>
            <h2
              className="font-bold mb-4 leading-tight"
              style={{
                color: 'var(--text-primary)',
                fontSize: 'clamp(24px, 4vw, 30px)',
                letterSpacing: '-0.03em',
              }}
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
              {['13 年以上の経験', 'マルチクラウド対応', '16 資格取得', 'リモート作業可', '日本語・中国語'].map((b) => (
                <span
                  key={b}
                  className="text-[12px] font-medium rounded-full px-3 py-1"
                  style={{
                    color: 'var(--apple-blue)',
                    background: 'var(--apple-blue-light)',
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ─────────────────────────────── */}
        <section>
          <div className="text-center mb-10">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-2"
              style={{ color: 'var(--apple-blue)' }}
            >
              Services
            </p>
            <h2 className="section-heading">提供サービス</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl p-6 transition-shadow duration-200"
                style={{
                  background: 'var(--surface-secondary)',
                  border: '1px solid var(--separator-opaque)',
                }}
              >
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3
                  className="font-semibold text-[15px] mb-2 tracking-[-0.01em]"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {s.title}
                </h3>
                <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] rounded-md px-2 py-0.5 border"
                      style={{
                        background: 'white',
                        borderColor: 'var(--separator)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Skills ───────────────────────────────── */}
        <section>
          <div className="text-center mb-10">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-2"
              style={{ color: 'var(--apple-blue)' }}
            >
              Skills
            </p>
            <h2 className="section-heading">スキルセット</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillGroups.map((g) => (
              <div
                key={g.name}
                className="rounded-2xl p-6"
                style={{ background: '#1D1D1F' }}
              >
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.1em] mb-4"
                  style={{ color: g.accent }}
                >
                  {g.name}
                </p>
                <ul className="space-y-2.5">
                  {g.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2.5 text-[13px]"
                      style={{ color: 'rgba(255,255,255,0.7)' }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: g.accent }}
                      />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Certifications ───────────────────────── */}
        <section>
          <div className="text-center mb-10">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-2"
              style={{ color: 'var(--apple-blue)' }}
            >
              Certifications
            </p>
            <h2 className="section-heading">
              取得資格{' '}
              <span className="gradient-text">16</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certs.map((c) => (
              <div
                key={c.vendor}
                className="rounded-2xl p-5"
                style={{
                  background: 'var(--surface-secondary)',
                  border: '1px solid var(--separator-opaque)',
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: c.accent }}
                  />
                  <h3
                    className="font-semibold text-[13px] tracking-[-0.01em]"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {c.vendor}
                  </h3>
                  <span
                    className="ml-auto text-[11px]"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {c.items.length} certs
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {c.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[12px]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <svg
                        className="h-3.5 w-3.5 mt-0.5 flex-shrink-0"
                        style={{ color: '#34C759' }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────── */}
        <section
          className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          style={{ background: '#000000' }}
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 30% 50%, #0071E3 0%, transparent 60%)' }}
          />
          <div className="relative z-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-3 text-white/50">
              Currently Available
            </p>
            <h2
              className="font-bold text-white mb-3"
              style={{ fontSize: 'clamp(24px, 4vw, 34px)', letterSpacing: '-0.03em' }}
            >
              お仕事のご依頼・ご相談
            </h2>
            <p className="text-white/50 text-[15px] mb-8 max-w-sm mx-auto leading-relaxed">
              クラウド移行・インフラ構築・システム開発など、<br />初回相談は無料です。
            </p>
            <Link href="/contact" className="btn-primary text-[15px]">
              お問い合わせ
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

      </div>
    </>
  )
}
