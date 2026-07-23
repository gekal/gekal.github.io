/**
 * public/ 配下のラスター画像から WebP を生成する。
 *
 * 元ファイルは触らず `foo.png` の隣に `foo.webp` を置くだけ。
 * 記事本文側は lib/markdown-plugins.ts の `withPictureSources` が
 * <picture> を組み立て、WebP 非対応環境では元画像にフォールバックする。
 *
 * ## 実行方法
 *
 *   npm i -D sharp && node scripts/optimize-images.mjs && npm un -D sharp
 *
 * sharp を devDependencies に常駐させていないのは意図的。ネイティブ依存で
 * プラットフォーム別の optional dependency を持つため、macOS で作った
 * lockfile が Linux ランナーの `npm ci` を壊す事故が起きやすい
 * (CLAUDE.md の Deployment 節を参照)。生成物だけコミットする。
 *
 * 生成済みで元画像より新しい WebP はスキップするので、再実行は安全。
 */
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const PUBLIC_DIR = path.join(process.cwd(), 'public')

// 本文カラムは 736px、コード等の張り出しでも 832px。2x ディスプレイを見込んでも
// 1600px あれば足りる。ヒーローは全幅に敷くので広めに取る
const MAX_WIDTH = 1600
const MAX_WIDTH_FULL_BLEED = 1920
const FULL_BLEED_DIR = path.join(PUBLIC_DIR, 'img')

const QUALITY = 80

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

function isStale(source, target) {
  if (!fs.existsSync(target)) return true
  return fs.statSync(source).mtimeMs > fs.statSync(target).mtimeMs
}

const results = []

for (const file of walk(PUBLIC_DIR)) {
  if (!/\.(png|jpe?g|gif)$/i.test(file)) continue

  const target = file.replace(/\.(png|jpe?g|gif)$/i, '.webp')
  if (!isStale(file, target)) continue

  const animated = /\.gif$/i.test(file)
  const maxWidth = file.startsWith(FULL_BLEED_DIR) ? MAX_WIDTH_FULL_BLEED : MAX_WIDTH

  try {
    // アニメーション GIF は全フレームを縦に連結した 1 枚として扱われるため、
    // sharp 既定のピクセル上限 (約 2.68 億) を簡単に超える
    const image = sharp(file, { animated, limitInputPixels: false })
    const { width } = await image.metadata()

    await image
      // 拡大はしない。元が小さい画像はそのままの寸法で再エンコードする
      .resize({ width: Math.min(width ?? maxWidth, maxWidth), withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(target)

    const before = fs.statSync(file).size
    const after = fs.statSync(target).size

    // 図版のような平坦な PNG では WebP の方が大きくなることがある。
    // その場合は残さない (<picture> の source が無ければ元画像が使われる)
    if (after >= before) {
      fs.rmSync(target)
      console.log(`- ${path.relative(PUBLIC_DIR, file)}: WebP の方が大きいのでスキップ`)
      continue
    }

    results.push({ file: path.relative(PUBLIC_DIR, file), before, after })
  } catch (error) {
    console.error(`× ${path.relative(PUBLIC_DIR, file)}: ${error.message}`)
  }
}

const kb = (n) => `${Math.round(n / 1024)}KB`
let before = 0
let after = 0

for (const r of results.sort((a, b) => b.before - a.before)) {
  before += r.before
  after += r.after
  const saved = Math.round((1 - r.after / r.before) * 100)
  console.log(`${kb(r.before).padStart(7)} → ${kb(r.after).padStart(7)}  -${String(saved).padStart(2)}%  ${r.file}`)
}

console.log(
  `\n${results.length} 件: ${kb(before)} → ${kb(after)} (-${Math.round((1 - after / before) * 100)}%)`,
)
