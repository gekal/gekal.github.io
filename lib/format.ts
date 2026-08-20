/**
 * 表示用の整形。
 *
 * `lib/posts.ts` は fs に依存していてクライアントから import できないため、
 * クライアント側 (記事一覧の絞り込み → PostCard) でも使う整形処理はここに置く。
 */

/** 記事の日付表示 — 例: 2026年8月20日 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
