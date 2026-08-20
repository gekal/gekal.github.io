/**
 * サイトの正規オリジン。
 *
 * apex (gekal.cn) でもアクセスできるが、GitHub Pages が `public/CNAME` の値に
 * 従って www へ 301 リダイレクトする。したがって www が正規形。
 * 絶対 URL が必要な箇所ではホスト名をハードコードせずこれを使うこと。
 */
export const SITE_URL = 'https://www.gekal.cn'

/**
 * Google Analytics 4 の測定 ID。
 *
 * 静的書き出しなのでビルド時に埋め込まれる。未設定ならタグを一切出さないので、
 * 計測を始めるときだけ GitHub Actions の env に NEXT_PUBLIC_GA_ID を足せばよい。
 * 値が入るとプライバシーポリシーの Cookie に関する記述も一緒に出る。
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? ''
