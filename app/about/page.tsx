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
    color: 'text-orange-400',
    skills: ['AWS (Professional)', 'Google Cloud (Professional)', 'Azure (Expert)', 'Terraform / IaC'],
  },
  {
    name: 'Container',
    color: 'text-blue-400',
    skills: ['Docker', 'Kubernetes', 'Helm', 'CKAD 認定'],
  },
  {
    name: 'Backend',
    color: 'text-green-400',
    skills: ['Java / Spring Boot', 'JavaScript / Node.js', '.NET / C#', 'Shell / Groovy'],
  },
  {
    name: 'DevOps',
    color: 'text-purple-400',
    skills: ['GitHub Actions', 'Jenkins', 'CI/CD Pipeline', 'SRE プラクティス'],
  },
]

const certs = [
  {
    vendor: 'AWS',
    color: 'border-orange-200 bg-orange-50',
    dot: 'bg-orange-400',
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
    color: 'border-blue-200 bg-blue-50',
    dot: 'bg-blue-400',
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
    color: 'border-sky-200 bg-sky-50',
    dot: 'bg-sky-400',
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
    color: 'border-purple-200 bg-purple-50',
    dot: 'bg-purple-400',
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

      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 space-y-24">

        {/* ── Profile ──────────────────────────────── */}
        <section className="flex flex-col md:flex-row gap-12 items-start">
          {/* Avatar card */}
          <div className="flex-shrink-0">
            <div className="relative w-40">
              <div className="w-40 h-40 rounded-2xl overflow-hidden ring-4 ring-primary/20 shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://github.com/gekal.png"
                  alt="gekal"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Online indicator */}
              <span className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-green-400 border-2 border-white shadow" />
            </div>

            <div className="mt-4 text-center">
              <p className="font-serif font-bold text-ink text-lg">鴻 鷹</p>
              <p className="text-slate-500 text-xs mt-0.5">gekal · @GekalCn</p>
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
                  className="text-xs text-slate-500 hover:text-primary border border-slate-200 hover:border-primary/40 px-3 py-1 rounded-lg transition-all"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="flex-1 pt-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-px bg-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                Freelance Engineer
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-ink mb-4 leading-tight">
              クラウドとコンテナの<br />専門エンジニア
            </h2>
            <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
              <p>
                2011 年よりソフトウェアエンジニアとして活動。Java・JavaScript・.NET など多様な言語で開発経験を積んだ後、クラウドとコンテナ技術に特化。
              </p>
              <p>
                現在は<strong className="text-ink">フリーランス</strong>として、AWS・GCP・Azure の<strong className="text-ink">マルチクラウド</strong>を軸にインフラ設計・DevOps 環境構築・バックエンド開発まで一貫してサポートしています。
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              {['13 年以上の経験', 'マルチクラウド対応', '16 資格取得', 'リモート作業可', '日本語・中国語'].map((b) => (
                <span key={b} className="text-xs font-medium text-primary bg-primary/8 border border-primary/15 px-3 py-1 rounded-full">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ─────────────────────────────── */}
        <section>
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Services</p>
            <h2 className="section-heading">提供サービス</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map((s) => (
              <div key={s.title} className="card p-6 group">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-ink text-base mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="text-xs bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
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
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Skills</p>
            <h2 className="section-heading">スキルセット</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skillGroups.map((g) => (
              <div key={g.name} className="bg-ink rounded-2xl p-6">
                <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${g.color}`}>{g.name}</p>
                <ul className="space-y-2.5">
                  {g.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${g.color.replace('text-', 'bg-')}`} />
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
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Certifications</p>
            <h2 className="section-heading">取得資格 <span className="gradient-text">16</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {certs.map((c) => (
              <div key={c.vendor} className={`rounded-2xl border ${c.color} p-5`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                  <h3 className="font-bold text-ink text-sm">{c.vendor}</h3>
                  <span className="ml-auto text-xs text-slate-400">{c.items.length} certs</span>
                </div>
                <ul className="space-y-1.5">
                  {c.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                      <svg className="h-3.5 w-3.5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
        <section className="bg-ink rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <p className="text-xs font-semibold text-primary-light uppercase tracking-widest mb-3">
              Currently Available
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-white font-bold mb-3">
              お仕事のご依頼・ご相談
            </h2>
            <p className="text-slate-400 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
              クラウド移行・インフラ構築・システム開発など、<br />初回相談は無料です。
            </p>
            <Link href="/contact" className="btn-primary">
              お問い合わせ
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

      </div>
    </>
  )
}
