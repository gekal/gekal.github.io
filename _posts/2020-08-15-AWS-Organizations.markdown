---
title: AWS Organizations 概要をざっとわかるよう
layout: post
auther: gekal
date:   2020-08-15T11:37:00+0900
categories: blogs
tags: 初心者 AWS Organizations 解説
---

## [AWS Organizations](https://docs.aws.amazon.com/ja_jp/organizations/latest/userguide/orgs_introduction.html) とは

AWS Organizations は、作成し一元管理する組織に、複数の AWS アカウントを統合するためのアカウント管理サービスです。

### AWS Organizations 機能

1. AWS アカウントのすべての一元管理

    既存のアカウントを組織に結合して、アカウントを一元管理することができます。

    - アカウントの新規
    - 既存アカウントの招待

2. すべてのメンバーアカウントの一括請求

    組織のマスターアカウントを使用して、すべてのメンバーアカウントを統合して支払うことができます。

3. 予算、セキュリティ、コンプライアンスのニーズを満たすアカウントの階層的なグループ化

    サービスコントロールポリシー (SCP) を使用して、組織内のメンバーアカウントの最大アクセス権限を指定できます。

4. 各アカウントがアクセスできる AWS サービスと API アクションのコントロール

5. 組織のアカウント内のリソース間でタグを標準化するためのヘルプ

6. AWS Identity and Access Management の統合とサポート (IAM)

7. 他の AWS サービスとの統合

    他サービスと統合して、リソースの一元管理ができます。

8. 結果的に整合性があるデータのレプリケーション

### AWS Organizations の用語

![基本的な組織の図](/assets/imgs/blogs/2020-08-15/BasicOrganization.png)

1. 組織(Organization)

    1 つの単位として管理できるように、AWS アカウントを 統合するために作成するエンティティ。

2. 管理用ルート (root)

3. [組織単位(OU)](https://docs.aws.amazon.com/ja_jp/organizations/latest/userguide/orgs_manage_ous.html)

    ルート内のアカウントのコンテナです。

4. [アカウント](https://docs.aws.amazon.com/ja_jp/organizations/latest/userguide/orgs_manage_accounts.html)

    - マスターアカウント

        >　こいつに Organizations を作成する。

      - 組織にアカウントを作成する
      - 組織に他の既存のアカウントを招待する
      - 組織からアカウントを削除する
      - 招待を管理する
      - 組織内のエンティティ (ルート、OU、またはアカウント) にポリシーを適用する

    - メンバーアカウント

5. 招待

    別のアカウントを組織に招待するプロセスです。

6. ハンドシェイク

    二者間で情報を交換する複数ステップのプロセスです。

7. 利用可能な機能セット

    - すべての機能
    - 一括請求 (コンソリデーティッドビリング)

8. [サービスコントロールポリシー (SCP)](https://docs.aws.amazon.com/ja_jp/organizations/latest/userguide/orgs_manage_policies_type-auth.html#orgs_manage_policies_scp)

    ユーザーやロールが、SCP による影響を受けるアカウントで使用できるサービスやアクションを指定するポリシーです。

    - 組織
    - 組織単位 (OU)
    - アカウント

9. タグポリシー

    特定のリソースのタグ付けルールを指定できます。

10. 許可リストと拒否リスト

    - 許可リスト戦略

        許可されるアクセスを明示的に指定します。

    - 拒否リスト戦略

        許可されないアクセスを明示的に指定します。

## 参照

1. [AWS Organizations](https://aws.amazon.com/jp/organizations/)
2. [【AWS Black Belt Online Seminar】AWS Organizations](https://d1.awsstatic.com/webinars/jp/pdf/services/20180214_AWS-Blackbelt-Organizations.pdf)
