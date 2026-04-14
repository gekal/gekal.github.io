import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

const postsDirectory = path.join(process.cwd(), '_posts')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content?: string
  categories?: string | string[]
  tags?: string | string[]
  background?: string
  subtitle?: string
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

      const excerpt = content
        .replace(/```[\s\S]*?```/g, '')
        .replace(/#{1,6}\s/g, '')
        .replace(/[*_`[\]()]/g, '')
        .trim()
        .slice(0, 160)
        .trim() + '...'

      const parsedDate = data.date ? new Date(data.date) : null
      const dateIso =
        parsedDate && !isNaN(parsedDate.getTime())
          ? parsedDate.toISOString()
          : new Date(0).toISOString()

      return {
        slug,
        title: data.title || slug,
        date: dateIso,
        excerpt,
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

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content)

  const contentHtml = processedContent.toString()

  const parsedDate2 = data.date ? new Date(data.date) : null
  const dateIso2 =
    parsedDate2 && !isNaN(parsedDate2.getTime())
      ? parsedDate2.toISOString()
      : new Date(0).toISOString()

  return {
    slug,
    title: data.title || slug,
    date: dateIso2,
    excerpt:
      content
        .replace(/```[\s\S]*?```/g, '')
        .replace(/#{1,6}\s/g, '')
        .replace(/[*_`[\]()]/g, '')
        .trim()
        .slice(0, 160)
        .trim() + '...',
    content: contentHtml,
    categories: data.categories,
    tags: data.tags,
    background: data.background,
    subtitle: data.subtitle,
  }
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
