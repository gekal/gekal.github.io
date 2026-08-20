/**
 * 実績・事例。
 *
 * ─────────────────────────────────────────────────────────────────
 *  ⚠ 下の WORKS はレイアウト確認用のサンプルです。実案件に差し替えるまで
 *    WORKS_DRAFT を true のままにしてください。true の間は
 *      - ナビゲーション / フッター / サイトマップに /works を出さない
 *      - /works を noindex にする
 *    ので、サンプルが検索結果に出ることはありません。
 *    差し替えが済んだら WORKS_DRAFT を false にするだけで公開されます。
 * ─────────────────────────────────────────────────────────────────
 *
 * 書くときのコツ:
 *  - 守秘義務があっても「業界 + 規模」までなら書ける。社名は不要。
 *  - 発注側が見るのは技術スタックより「自社と似た課題をどう解いたか」。
 *  - results は数字で。数字が出せないものは「何が変わったか」を一文で。
 */

export const WORKS_DRAFT = true

export interface WorkResult {
  /** 指標名 — 例: 'インフラ費用' */
  label: string
  /** 成果 — 例: '-42%' / '週 1 回 → 日次' */
  value: string
}

export interface Work {
  slug: string
  /** 案件の見出し。社名ではなく「何をしたか」で書く */
  title: string
  /** 一覧で読む 1〜2 文の要約 */
  summary: string
  /** 業界 — 例: '製造業' */
  industry: string
  /** 規模 — 例: '従業員 1,000 名規模 / 開発チーム 8 名' */
  scale: string
  /** 期間 — 例: '2024年4月〜2025年3月 (12 か月)' */
  period: string
  /** 稼働・契約形態 — 例: '週 3 日 / 準委任 / フルリモート' */
  engagement: string
  /** 自分の役割 — 体制の中での位置がわかるように */
  role: string
  /** 課題 */
  challenge: string
  /** 実際にやったこと */
  actions: string[]
  /** 成果 */
  results: WorkResult[]
  /** 技術スタック */
  stack: string[]
}

export const WORKS: Work[] = [
  {
    slug: 'onprem-to-aws-migration',
    title: 'オンプレミス基幹システムの AWS 移行',
    summary:
      'データセンター撤去の期限に合わせ、10 年以上運用されてきた基幹システムを AWS へ移行。停止時間を最小化する切り替え手順の設計から実行まで担当。',
    industry: '製造業',
    scale: '従業員 1,000 名規模 / 移行対象 40 サーバ',
    period: '2024年4月〜2025年3月（12 か月）',
    engagement: '週 4 日 / 準委任 / フルリモート',
    role: 'クラウドアーキテクト（インフラチーム 5 名のリード）',
    challenge:
      'データセンター契約の終了が決まっている一方で、対象システムの構成図が現存せず、依存関係が把握できていなかった。',
    actions: [
      '現行環境の棚卸しと依存関係の可視化',
      'Terraform による移行先環境のコード化と再現可能なリハーサル',
      '切り戻し手順つきの段階移行計画の策定と実施',
    ],
    results: [
      { label: 'インフラ費用', value: '-38%' },
      { label: '計画停止時間', value: '4 時間以内' },
      { label: '環境構築', value: '2 週間 → 1 日' },
    ],
    stack: ['AWS', 'Terraform', 'Aurora', 'ECS', 'CloudWatch'],
  },
  {
    slug: 'kubernetes-cicd-platform',
    title: 'Kubernetes 基盤と CI/CD パイプラインの整備',
    summary:
      '手作業のリリースがボトルネックになっていた開発組織に対し、コンテナ化と GitHub Actions によるデプロイ自動化を導入。',
    industry: 'SaaS',
    scale: '開発チーム 20 名 / マイクロサービス 12 本',
    period: '2023年7月〜2024年2月（8 か月）',
    engagement: '週 3 日 / 準委任 / フルリモート',
    role: 'DevOps エンジニア（基盤チームの立ち上げから参加）',
    challenge:
      'リリースが特定の担当者の手順書頼みで、深夜作業と切り戻しの失敗が常態化していた。',
    actions: [
      'アプリケーションのコンテナ化と Helm チャートの整備',
      'GitHub Actions によるビルド〜デプロイの自動化',
      '監視・アラートとオンコール体制の設計',
    ],
    results: [
      { label: 'デプロイ頻度', value: '月 1 回 → 日次' },
      { label: 'リードタイム', value: '-70%' },
      { label: '深夜作業', value: '実質ゼロ' },
    ],
    stack: ['Kubernetes', 'Docker', 'Helm', 'GitHub Actions', 'Prometheus'],
  },
  {
    slug: 'spring-boot-api-modernization',
    title: '基幹 API のマイクロサービス化と性能改善',
    summary:
      '肥大化したモノリスから業務単位でサービスを切り出し、ピーク時に頻発していたタイムアウトを解消。',
    industry: '流通・小売',
    scale: '月間 3,000 万リクエスト規模',
    period: '2022年10月〜2023年6月（9 か月）',
    engagement: '週 5 日 / 準委任 / 一部出社',
    role: 'バックエンドエンジニア（設計・実装・性能検証）',
    challenge:
      'セール時間帯に応答が劣化し、注文の取りこぼしが発生していた。原因の切り分けができる計測基盤もなかった。',
    actions: [
      '分散トレーシングの導入によるボトルネックの特定',
      '業務境界に沿ったサービス分割と段階的な移行',
      '負荷試験の自動化と性能目標の設定',
    ],
    results: [
      { label: 'p95 応答時間', value: '-65%' },
      { label: 'ピーク時エラー率', value: '2.1% → 0.05%' },
    ],
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Kafka', 'OpenTelemetry'],
  },
]
