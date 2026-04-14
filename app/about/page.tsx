import type { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'

export const metadata: Metadata = {
  title: 'About',
  description:
    'フリーランスエンジニア gekal のプロフィール。AWS/GCP/Azure のマルチクラウドを専門とし、システム開発から DevOps まで幅広く対応します。',
}

const services = [
  {
    icon: '☁️',
    title: 'クラウドインフラ構築・運用',
    description:
      'AWS / GCP / Azure を活用したインフラ設計・構築・最適化。コスト削減から高可用性アーキテクチャまで対応。',
  },
  {
    icon: '🚀',
    title: 'DevOps / CI-CD 環境構築',
    description:
      'GitHub Actions・Jenkins を使った CI/CD パイプライン構築。Docker/Kubernetes による コンテナ化・オーケストレーション。',
  },
  {
    icon: '💻',
    title: 'バックエンドシステム開発',
    description:
      'Java / Spring Boot・Node.js・.NET を使った API・マイクロサービス開発。設計から実装・テストまで一貫対応。',
  },
  {
    icon: '🔍',
    title: '技術コンサルティング',
    description:
      'クラウド移行・アーキテクチャレビュー・技術選定サポート。ベストプラクティスに基づいた改善提案。',
  },
]

const skills = [
  {
    category: 'クラウド',
    items: [
      { name: 'AWS', level: 95 },
      { name: 'Google Cloud', level: 90 },
      { name: 'Azure', level: 90 },
    ],
  },
  {
    category: 'コンテナ / オーケストレーション',
    items: [
      { name: 'Docker', level: 92 },
      { name: 'Kubernetes', level: 85 },
      { name: 'Helm', level: 78 },
    ],
  },
  {
    category: 'バックエンド',
    items: [
      { name: 'Java / Spring Boot', level: 90 },
      { name: 'JavaScript / Node.js', level: 82 },
      { name: '.NET / C#', level: 75 },
      { name: 'Shell Script / Groovy', level: 80 },
    ],
  },
  {
    category: 'DevOps / ツール',
    items: [
      { name: 'GitHub Actions', level: 88 },
      { name: 'Jenkins', level: 85 },
      { name: 'Terraform / IaC', level: 80 },
    ],
  },
]

const certifications = [
  {
    provider: 'Amazon Web Services (AWS)',
    color: 'bg-orange-50 border-orange-200',
    badgeColor: 'bg-orange-500',
    items: [
      'AWS Certified Cloud Practitioner',
      'AWS Certified Developer - Associate',
      'AWS Certified Solutions Architect - Associate',
      'AWS Certified SysOps Administrator - Associate',
      'AWS Certified Solutions Architect - Professional',
    ],
  },
  {
    provider: 'Google Cloud Platform (GCP)',
    color: 'bg-blue-50 border-blue-200',
    badgeColor: 'bg-blue-500',
    items: [
      'Associate Cloud Engineer',
      'Professional Cloud Architect',
      'Professional Cloud DevOps Engineer',
      'Professional Data Engineer',
      'Professional Cloud Developer',
    ],
  },
  {
    provider: 'Microsoft Azure',
    color: 'bg-sky-50 border-sky-200',
    badgeColor: 'bg-sky-500',
    items: [
      'Azure Fundamentals (AZ-900)',
      'Azure Developer Associate (AZ-204)',
      'Azure Administrator Associate (AZ-104)',
      'DevOps Engineer Expert (AZ-400)',
      'Azure Solutions Architect Expert (AZ-305)',
      'Security, Compliance, and Identity Fundamentals (SC-900)',
    ],
  },
  {
    provider: 'Cloud Native / Kubernetes',
    color: 'bg-purple-50 border-purple-200',
    badgeColor: 'bg-purple-500',
    items: ['Certified Kubernetes Application Developer (CKAD)'],
  },
]

export default function AboutPage() {
  return (
    <>
      <HeroSection
        title="About Me"
        subtitle="フリーランスエンジニア — Cloud / DevOps / Backend"
        backgroundImage="/img/bg-about.jpg"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-20">

        {/* Introduction */}
        <section>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-shrink-0 text-center">
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg mx-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://github.com/gekal.png"
                  alt="gekal"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 font-bold text-dark text-lg">鴻 鷹</p>
              <p className="text-gray-500 text-sm">gekal</p>
              <div className="flex justify-center gap-3 mt-3">
                <a href="https://github.com/gekal" target="_blank" rel="noopener noreferrer"
                  className="text-gray-400 hover:text-dark transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/gekal" target="_blank" rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex-1">
              <h2 className="font-serif text-3xl font-bold text-dark mb-4">
                フリーランスエンジニア
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                2011年よりソフトウェアエンジニアとしてのキャリアをスタート。
                Java・JavaScript・.NET・Shellなど多様な言語での開発経験を積んだ後、
                クラウドとコンテナ技術に特化。現在はフリーランスとして
                <strong>AWS・GCP・Azure のマルチクラウド</strong>を軸に、
                インフラ設計・DevOps 環境構築・バックエンド開発まで幅広くサポートしています。
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                AWS・GCP・Azure 合計 <strong>16 資格</strong>、
                Kubernetes (CKAD) を取得済み。
                オープンソース技術を積極的に活用し、現場での実践的なソリューションを提供します。
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  '経験 13 年以上',
                  'マルチクラウド',
                  '16 資格取得',
                  'リモート対応可',
                  '日本語・中国語',
                ].map((badge) => (
                  <span
                    key={badge}
                    className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section>
          <h2 className="font-serif text-3xl font-bold text-dark mb-8 text-center">
            提供サービス
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="font-bold text-dark text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="font-serif text-3xl font-bold text-dark mb-8 text-center">
            スキルセット
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((group) => (
              <div key={group.category}>
                <h3 className="font-semibold text-dark mb-4 text-sm uppercase tracking-wider border-b border-gray-200 pb-2">
                  {group.category}
                </h3>
                <div className="space-y-3">
                  {group.items.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 font-medium">{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="font-serif text-3xl font-bold text-dark mb-8 text-center">
            取得資格
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.provider}
                className={`rounded-xl border ${cert.color} p-5`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-3 h-3 rounded-full ${cert.badgeColor}`} />
                  <h3 className="font-bold text-dark text-sm">{cert.provider}</h3>
                </div>
                <ul className="space-y-1.5">
                  {cert.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-10 border border-primary/20">
          <h2 className="font-serif text-3xl font-bold text-dark mb-4">
            お仕事のご依頼・ご相談
          </h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            クラウド移行・インフラ構築・システム開発など、
            お気軽にお問い合わせください。初回相談は無料です。
          </p>
          <Link href="/contact" className="btn-primary text-base px-8 py-4">
            お問い合わせ
          </Link>
        </section>
      </div>
    </>
  )
}
