/**
 * サイトの正規オリジン。
 *
 * apex (gekal.cn) でもアクセスできるが、GitHub Pages が `public/CNAME` の値に
 * 従って www へ 301 リダイレクトする。したがって www が正規形。
 * 絶対 URL が必要な箇所ではホスト名をハードコードせずこれを使うこと。
 */
export const SITE_URL = 'https://www.gekal.cn'
