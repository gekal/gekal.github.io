/**
 * 取得資格。
 *
 * 件数はここから数える。ページに数字を直書きすると、資格が増えたときに
 * 必ず食い違う (実際 About は 17 件並べながら「16 資格」と表示していた)。
 *
 * `url` には Credly / Microsoft Learn / Google Cloud の公開バッジ URL を入れる。
 * 自己申告のリストは検証できないので、埋められるものは埋めておくと強い。
 */
export interface Credential {
  name: string
  /** 検証可能な公開バッジの URL */
  url?: string
}

export interface CredentialGroup {
  vendor: string
  /** 見出しのドット色 (CSS カラー値) */
  accent: string
  items: Credential[]
}

export const CREDENTIALS: CredentialGroup[] = [
  {
    vendor: 'AWS',
    accent: '#FF9500',
    items: [
      { name: 'Cloud Practitioner' },
      { name: 'Developer Associate' },
      { name: 'Solutions Architect Associate' },
      { name: 'SysOps Administrator Associate' },
      { name: 'Solutions Architect Professional' },
    ],
  },
  {
    vendor: 'Google Cloud',
    accent: '#34A853',
    items: [
      { name: 'Associate Cloud Engineer' },
      { name: 'Professional Cloud Architect' },
      { name: 'Professional Cloud DevOps Engineer' },
      { name: 'Professional Data Engineer' },
      { name: 'Professional Cloud Developer' },
    ],
  },
  {
    vendor: 'Azure',
    accent: '#0078D4',
    items: [
      { name: 'Fundamentals (AZ-900)' },
      { name: 'Developer Associate (AZ-204)' },
      { name: 'Administrator Associate (AZ-104)' },
      { name: 'DevOps Engineer Expert (AZ-400)' },
      { name: 'Solutions Architect Expert (AZ-305)' },
      { name: 'Security Fundamentals (SC-900)' },
    ],
  },
  {
    vendor: 'Cloud Native',
    accent: '#326CE5',
    items: [{ name: 'CKAD — Certified Kubernetes Application Developer' }],
  },
]

/** 資格の総数 */
export const CREDENTIAL_COUNT = CREDENTIALS.reduce((n, group) => n + group.items.length, 0)
