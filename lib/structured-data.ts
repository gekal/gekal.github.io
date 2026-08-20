import { SITE_URL } from './site'
import { PROFILE, EXPERIENCE_YEARS } from './profile'
import { CREDENTIALS } from './credentials'

/**
 * トップと About に埋める Person の構造化データ。
 *
 * 記事には BlogPosting を出しているが、「誰なのか」を機械可読で示すものが
 * なかった。指名検索やナレッジパネルでの見え方に効く。
 */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROFILE.name,
    alternateName: PROFILE.handle,
    url: SITE_URL,
    image: PROFILE.avatar,
    jobTitle: PROFILE.role,
    description: `${PROFILE.role}。実務 ${EXPERIENCE_YEARS} 年。${PROFILE.bio}`,
    email: `mailto:${PROFILE.email}`,
    knowsLanguage: ['ja', 'zh'],
    knowsAbout: [
      'Amazon Web Services',
      'Google Cloud Platform',
      'Microsoft Azure',
      'Kubernetes',
      'Docker',
      'Terraform',
      'DevOps',
      'CI/CD',
      'Java',
      'Spring Boot',
    ],
    hasCredential: CREDENTIALS.flatMap((group) =>
      group.items.map((item) => ({
        '@type': 'EducationalOccupationalCredential',
        name: `${group.vendor} ${item.name}`,
        ...(item.url ? { url: item.url } : {}),
      })),
    ),
    sameAs: [PROFILE.github, PROFILE.linkedin, 'https://twitter.com/GekalCn'],
  }
}
