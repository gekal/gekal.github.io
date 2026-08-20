/**
 * プロフィールの数値と定型文の単一の出どころ。
 *
 * 経験年数や資格数をページごとに手で書くと必ず食い違う (About は資格を 17 件
 * 並べながら「16 資格」と書いていた)。数えられるものはここから導出する。
 */

/** ソフトウェアエンジニアとしての活動開始年 */
export const CAREER_START_YEAR = 2011

/**
 * 経験年数。モジュール評価時 = ビルド時に確定するので、値が進むのは再デプロイの
 * タイミング。記事追加や Dependabot で定期的にビルドが走るため実用上は問題ない。
 */
export const EXPERIENCE_YEARS = new Date().getFullYear() - CAREER_START_YEAR

/** サイト全体で使い回すプロフィール。記事下の著者ボックスと About が共有する。 */
export const PROFILE = {
  name: '鴻 鷹',
  handle: 'gekal',
  role: 'フリーランスエンジニア',
  avatar: 'https://github.com/gekal.png',
  bio: 'AWS / GCP / Azure のマルチクラウドを軸に、インフラ設計・DevOps 環境構築・バックエンド開発まで一貫して対応しています。',
  github: 'https://github.com/gekal',
  linkedin: 'https://www.linkedin.com/in/gekal',
  email: 'liu.hongying@hotmail.com',
} as const
