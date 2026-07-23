import fs from 'fs'
import path from 'path'

const PUBLIC_DIR = path.join(process.cwd(), 'public')

/**
 * ヒーロー背景用の sx フラグメント。`sx={{ ...heroBackgroundSx(src), ... }}` で使う。
 *
 * `scripts/optimize-images.mjs` が置いた WebP があれば `image-set()` で優先させる。
 * 記事本文の `<picture>` と違い CSS 背景は要素を差し替えられないため、
 * ブラウザ側に選ばせる形を取る。
 *
 * 素の `url()` を先に宣言し、`@supports` の中で `image-set()` に上書きする。
 * **sx に配列を渡してはいけない** — MUI はそれをレスポンシブのブレークポイント値
 * として解釈するので、Emotion 本来の「フォールバック宣言の並び」にはならない。
 *
 * fs を読むので **Server Component からのみ** 呼ぶこと。
 */
export function heroBackgroundSx(src: string) {
  const fallback = { backgroundImage: `url(${src})` }

  if (!src.startsWith('/') || !/\.(png|jpe?g)$/i.test(src)) return fallback

  const webp = src.replace(/\.(png|jpe?g)$/i, '.webp')
  if (!fs.existsSync(path.join(PUBLIC_DIR, decodeURIComponent(webp)))) return fallback

  const mime = /\.png$/i.test(src) ? 'image/png' : 'image/jpeg'
  const imageSet = `image-set(url("${webp}") type("image/webp"), url("${src}") type("${mime}"))`

  return {
    ...fallback,
    [`@supports (background-image: ${imageSet})`]: { backgroundImage: imageSet },
  }
}
