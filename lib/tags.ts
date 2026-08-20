/**
 * タグまわりの純粋な関数。
 *
 * `lib/posts.ts` は fs で `_posts/` を読むためクライアントから import できない。
 * 記事一覧の絞り込み (PostSearch) やタグチップはクライアント側でもこれらを使うので、
 * ファイルアクセスを伴わない部分だけ切り出してある。
 */

export interface TagSummary {
  /** 表示に使う名前 — 同じタグの中で最も多く使われている表記 */
  label: string
  slug: string
  count: number
}

/**
 * frontmatter の tags を配列にそろえる。
 * Jekyll 由来の記事は `tags: aws docker` のような空白区切りの文字列で書かれている。
 */
export function parseTags(raw: string | string[] | undefined): string[] {
  if (Array.isArray(raw)) return raw.map(String).filter(Boolean)
  if (typeof raw === 'string') return raw.split(/\s+/).filter(Boolean)
  return []
}

/**
 * タグの正規形。
 *
 * 記事によって `Windows` / `windows`、`Powershell` / `powershell` と表記が揺れて
 * いるので、小文字に寄せて 1 ページに束ねる。
 *
 * ここではパーセントエンコードしない。generateStaticParams にはデコード済みの
 * 値を渡す決まりで、エンコードは Next.js が行うため。リンクを組み立てるときだけ
 * `tagHref` を使う。
 */
export function tagSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, '-')
}

/** タグページへのリンク。日本語タグ (目標・フリーランス) があるのでここで符号化する。 */
export function tagHref(tag: string): string {
  return `/tags/${encodeURIComponent(tagSlug(tag))}/`
}
