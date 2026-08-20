import { PROFILE } from './profile'

/**
 * 稼働条件と事業者情報。
 *
 * 発注側が最初に確認するのはスキルではなく「今受けられるのか」「どういう条件か」
 * なので、ここを 1 か所にまとめて About / Contact から参照する。
 *
 * **値は必ず実態に合わせて更新すること。** 特に `asOf` を放置すると、
 * 「受付中」の表示だけが残って古い情報を出し続けることになる。
 */

export type AvailabilityStatus = 'available' | 'limited' | 'closed'

export const AVAILABILITY = {
  /** この情報をいつ時点のものとして表示するか (ISO 日付) */
  asOf: '2026-08-21',
  status: 'available' as AvailabilityStatus,
  /** 稼働開始できる時期 */
  from: '相談のうえ調整',
  /** 週あたりの稼働日数 */
  daysPerWeek: '週 2〜5 日',
  /** 契約形態 */
  contract: '準委任契約（請負も相談可）',
  /** 勤務地・リモート可否 */
  workStyle: 'フルリモート中心（必要に応じて打ち合わせ出社可）',
  /** 商流 */
  channel: '直接契約・エージェント経由いずれも可',
  /** 単価 */
  rate: '応相談（稼働日数・業務内容に応じてお見積り）',
  /** 最低契約期間 */
  minimumTerm: '1 か月〜',
} as const

const STATUS_LABEL: Record<AvailabilityStatus, string> = {
  available: '新規案件を受付中です',
  limited: '稼働に空きが少ない状況です（短期・スポットは相談可）',
  closed: '現在は新規のお受付を停止しています',
}

/** バッジに出す文言。「いつ時点か」を必ず添える。 */
export function availabilityLabel(): string {
  const asOf = new Date(AVAILABILITY.asOf).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
  })
  return `${asOf}時点 — ${STATUS_LABEL[AVAILABILITY.status]}`
}

/**
 * 事業者情報。
 *
 * 空文字の項目は表示しない。企業の購買・経理は取引開始前にインボイスの
 * 登録番号を確認するので、取得済みなら `invoiceNumber` を必ず埋めること。
 */
export const BUSINESS = {
  /** 事業形態 — 例: '個人事業主' / '法人' */
  form: '個人事業主',
  /** 屋号 (あれば) */
  tradeName: '',
  /** 所在地 — 都道府県レベルで可。例: '東京都' */
  location: '',
  /** 適格請求書発行事業者 登録番号 — 例: 'T1234567890123' */
  invoiceNumber: '',
  email: PROFILE.email,
} as const
