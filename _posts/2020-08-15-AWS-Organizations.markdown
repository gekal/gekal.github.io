---
title: AWS Organizations の概要をざっと把握する
subtitle: 複数の AWS アカウントを一元管理するためのアカウント管理サービス
layout: post
date:   2020-08-15T11:37:00+0900
categories: blogs
tags: aws organizations governance
---

## AWS Organizations とは

[AWS Organizations](https://docs.aws.amazon.com/ja_jp/organizations/latest/userguide/orgs_introduction.html) は、複数の AWS アカウントを 1 つの「組織」に統合して一元管理するためのサービスです。

事業部やプロジェクトごとにアカウントを分けると、権限や課金の境界が明確になる一方で、アカウントが増えるほど管理が煩雑になります。Organizations を使うと、これら複数アカウントを組織としてまとめ、請求・権限・ガバナンスをまとめてコントロールできます。

## 主な機能

1. **複数アカウントの一元管理** — アカウントを新規作成したり、既存アカウントを招待したりして組織に統合できる
2. **一括請求（Consolidated Billing）** — 管理アカウントで全メンバーアカウントの支払いをまとめられる。ボリューム割引も効きやすい
3. **アカウントの階層的なグループ化** — 予算・セキュリティ・コンプライアンスの要件に応じて OU（組織単位）でグルーピングできる
4. **SCP による権限のガードレール** — 各アカウントで使えるサービスや API アクションの上限を制御できる
5. **タグの標準化** — 組織横断でリソースのタグ付けルールを統一できる
6. **IAM や他 AWS サービスとの統合** — 組織単位でサービスを有効化し、リソースを一元管理できる

## 主要な用語

![基本的な組織の構成図](/assets/imgs/blogs/2020-08-15/BasicOrganization.png)

- **組織（Organization）** — 複数の AWS アカウントを 1 単位として管理するために作成するエンティティ
- **ルート（Root）** — 組織内のすべての OU・アカウントの最上位にあたる管理用のコンテナ
- **[組織単位（OU）](https://docs.aws.amazon.com/ja_jp/organizations/latest/userguide/orgs_manage_ous.html)** — ルート内でアカウントをグループ化するコンテナ。入れ子にできる
- **[アカウント](https://docs.aws.amazon.com/ja_jp/organizations/latest/userguide/orgs_manage_accounts.html)**
  - **管理アカウント（旧マスターアカウント）** — 組織を作成するアカウント。アカウントの作成・招待・削除や、各エンティティへのポリシー適用を行う
  - **メンバーアカウント** — 組織に属するその他のアカウント
- **招待 / ハンドシェイク** — 別のアカウントを組織に加えるためのやり取りのプロセス
- **利用可能な機能セット** — 「すべての機能」または「一括請求のみ」を選べる
- **[サービスコントロールポリシー（SCP）](https://docs.aws.amazon.com/ja_jp/organizations/latest/userguide/orgs_manage_policies_type-auth.html#orgs_manage_policies_scp)** — アカウント／OU／組織全体で使用可能なサービスやアクションの上限を定めるポリシー
- **タグポリシー** — リソースのタグ付けルールを定義するポリシー
- **許可リスト / 拒否リスト** — アクセスを明示的に許可する戦略と、明示的に拒否する戦略

## まとめ

Organizations は、複数アカウント運用（マルチアカウント戦略）の土台となるサービスです。OU でアカウントを整理し、SCP でガードレールを敷き、請求を一本化する——この 3 点を押さえると、全体像が理解しやすくなります。

## 参照

1. [AWS Organizations](https://aws.amazon.com/jp/organizations/)
2. [【AWS Black Belt】AWS Organizations（PDF）](https://d1.awsstatic.com/webinars/jp/pdf/services/20180214_AWS-Blackbelt-Organizations.pdf)
