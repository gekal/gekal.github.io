import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import { all } from 'lowlight'
import { collectToc, withImageDimensions, type TocItem } from './markdown-plugins'

export type { TocItem }

// rehype-highlight's `languages` option REPLACES the default set, so we register
// lowlight's full grammar set (`all`) to cover every language used across posts
// (bash / ts / python / powershell / bat・cmd / yaml / apache / …).

const postsDirectory = path.join(process.cwd(), '_posts')

export interface Post {
  slug: string
  title: string
  date: string
  /** frontmatter に `updated` があるときだけ入る。公開日と同じなら省く */
  updated?: string
  excerpt: string
  /** 読了時間 (分)。最低 1 分。 */
  readingMinutes: number
  content?: string
  categories?: string | string[]
  tags?: string | string[]
  background?: string
  subtitle?: string
  toc?: TocItem[]
}

const EXCERPT_LENGTH = 160

// 和文の読字速度。日本語は 400〜600 字/分とされるので中間を取る。
// 記事は和文主体なので、欧文の「200 語/分」ではなく文字数で数える
const CHARS_PER_MINUTE = 500

/**
 * 読了時間の目安。
 *
 * コードブロックは読み飛ばされることも精読されることもあり見積もりが難しいので、
 * 素の文字数の 1/3 だけ数えて過大評価を避けている。
 */
function estimateReadingMinutes(markdown: string): number {
  const code = markdown.match(/```[\s\S]*?```/g)?.join('') ?? ''
  const prose = markdown.replace(/```[\s\S]*?```/g, '')

  const chars = countChars(prose) + countChars(code) / 3
  return Math.max(1, Math.round(chars / CHARS_PER_MINUTE))
}

function countChars(text: string): number {
  return text.replace(/\s+/g, '').length
}

/** frontmatter の日付を ISO 文字列にする。不正な値は握りつぶす。 */
function toIsoDate(value: unknown): string | undefined {
  if (!value) return undefined
  const parsed = new Date(value as string)
  return isNaN(parsed.getTime()) ? undefined : parsed.toISOString()
}

/**
 * 記事本文から抜粋を作る。meta description・OGP・JSON-LD・RSS が共通で使う。
 *
 * 記法の記号だけを消すと `[Claude Code](https://…)` が
 * 「Claude Codehttps://…」のように本文と URL が繋がってしまうため、
 * リンクや画像は構造ごと畳んでからテキストを取り出す。
 */
function buildExcerpt(markdown: string): string {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ') // コードブロック
    .replace(/`[^`\n]*`/g, ' ') // インラインコード
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // 画像
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // リンクはラベルだけ残す
    .replace(/<[^>]+>/g, ' ') // 生の HTML タグ
    .replace(/^\s{0,3}#{1,6}\s+/gm, '') // 見出し
    .replace(/^\s{0,3}>\s?/gm, '') // 引用
    .replace(/^\s{0,3}([-*+]|\d+\.)\s+/gm, '') // リスト
    .replace(/^\s{0,3}\|.*$/gm, ' ') // 表
    .replace(/[*_~]/g, '') // 強調
    .replace(/\s+/g, ' ') // 改行・連続空白を 1 つに
    .trim()

  return text.length > EXCERPT_LENGTH ? `${text.slice(0, EXCERPT_LENGTH).trim()}…` : text
}

export function getSortedPostsData(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((f) => f.endsWith('.markdown') || f.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.(markdown|md)$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      const excerpt = buildExcerpt(content)
      const dateIso = toIsoDate(data.date) ?? new Date(0).toISOString()
      const updated = toIsoDate(data.updated)

      return {
        slug,
        title: data.title || slug,
        date: dateIso,
        updated: updated && updated !== dateIso ? updated : undefined,
        excerpt,
        readingMinutes: estimateReadingMinutes(content),
        categories: data.categories,
        tags: data.tags,
        background: data.background,
        subtitle: data.subtitle,
      } satisfies Post
    })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getAllPostSlugs(): { slug: string }[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((f) => f.endsWith('.markdown') || f.endsWith('.md'))
    .map((fileName) => ({
      slug: fileName.replace(/\.(markdown|md)$/, ''),
    }))
}

export async function getPostData(slug: string): Promise<Post> {
  let fullPath = path.join(postsDirectory, `${slug}.markdown`)
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, `${slug}.md`)
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const toc: TocItem[] = []

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    // 順序が重要: slug で id を振り → 目次を集め → 最後にアンカーを足す。
    // collectToc を autolink より後ろに置くと、追加された "#" まで
    // 見出しテキストとして拾ってしまう
    .use(rehypeSlug)
    .use(collectToc(toc))
    .use(rehypeAutolinkHeadings, {
      behavior: 'append',
      // hast の Properties では className は配列、aria-* は文字列で渡す
      properties: { className: ['heading-anchor'], ariaHidden: 'true', tabIndex: -1 },
      content: { type: 'text', value: '#' },
    })
    .use(withImageDimensions(path.join(process.cwd(), 'public')))
    .use(rehypeHighlight, {
      detect: false,
      ignoreMissing: true,
      languages: all,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  const contentHtml = processedContent.toString()

  const dateIso = toIsoDate(data.date) ?? new Date(0).toISOString()
  const updated = toIsoDate(data.updated)

  return {
    slug,
    title: data.title || slug,
    date: dateIso,
    updated: updated && updated !== dateIso ? updated : undefined,
    excerpt: buildExcerpt(content),
    readingMinutes: estimateReadingMinutes(content),
    content: contentHtml,
    categories: data.categories,
    tags: data.tags,
    background: data.background,
    subtitle: data.subtitle,
    toc,
  }
}

/**
 * 記事一覧の並び (新しい順) における前後の記事。
 * `prev` が新しい側、`next` が古い側。
 */
export function getAdjacentPosts(slug: string): { prev: Post | null; next: Post | null } {
  const posts = getSortedPostsData()
  const index = posts.findIndex((p) => p.slug === slug)
  if (index === -1) return { prev: null, next: null }

  return {
    prev: posts[index - 1] ?? null,
    next: posts[index + 1] ?? null,
  }
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
