import fs from 'fs'
import path from 'path'
import { imageSize } from 'image-size'
import { visit } from 'unist-util-visit'
import type { Element, Root } from 'hast'

export interface TocItem {
  id: string
  text: string
  depth: 2 | 3
}

/**
 * 見出しを走査して目次データを集める。
 *
 * rehype-slug より後ろに置くこと (id が振られた後でないと拾えない)。
 * 目次は h2 / h3 までに留める。記事によっては h4 以下まで使っているが、
 * そこまで並べると目次自体が読みづらくなる。
 */
export function collectToc(sink: TocItem[]) {
  return () => (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      const depth = node.tagName === 'h2' ? 2 : node.tagName === 'h3' ? 3 : null
      if (depth === null) return

      const id = typeof node.properties?.id === 'string' ? node.properties.id : null
      if (!id) return

      const text = toPlainText(node).trim()
      if (text) sink.push({ id, text, depth })
    })
  }
}

/**
 * 記事内の <img> に実寸と遅延読み込みを付与する。
 *
 * 属性が無いと画像の読み込み完了まで高さが 0 のままで、後続の本文が
 * 飛んで読めなくなる (レイアウトシフト)。static export では next/image の
 * 最適化が使えないため、ビルド時に public/ 配下の実ファイルを見て埋める。
 */
export function withImageDimensions(publicDir: string) {
  return () => (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'img') return

      const props = (node.properties ??= {})
      props.loading ??= 'lazy'
      props.decoding ??= 'async'

      const src = typeof props.src === 'string' ? props.src : null
      // 外部URL・data URI はビルド時に寸法を測れない
      if (!src || !src.startsWith('/')) return
      if (props.width != null || props.height != null) return

      const size = measure(path.join(publicDir, decodeURIComponent(src)))
      if (!size) return

      props.width = size.width
      props.height = size.height
    })
  }
}

function measure(filePath: string): { width: number; height: number } | null {
  try {
    const { width, height } = imageSize(fs.readFileSync(filePath))
    return width && height ? { width, height } : null
  } catch {
    // 参照切れの画像でビルドを落とす必要はない。属性を付けないだけに留める
    return null
  }
}

function toPlainText(node: Element): string {
  let out = ''
  visit(node, 'text', (text: { value: string }) => {
    out += text.value
  })
  return out
}
