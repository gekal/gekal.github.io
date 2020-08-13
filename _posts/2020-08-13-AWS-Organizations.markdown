---
title: 初心者で AWS Organizations 分かるように解説します。(更新中)
layout: post
auther: gekal
date:   2020-08-13T18:32:00+0900
categories: blogs
tags: 初心者 AWS Organizations 解説
---

## [AWS Organizations](https://docs.aws.amazon.com/ja_jp/organizations/latest/userguide/orgs_introduction.html) とは

AWS Organizations は、作成し一元管理する組織に、複数の AWS アカウントを統合するためのアカウント管理サービスです。

### AWS Organizations 機能

1. AWS アカウントのすべての一元管理
2. すべてのメンバーアカウントの一括請求
3. 予算、セキュリティ、コンプライアンスのニーズを満たすアカウントの階層的なグループ化
4. 各アカウントがアクセスできる AWS サービスと API アクションのコントロール
5. 組織のアカウント内のリソース間でタグを標準化するためのヘルプ
6. AWS Identity and Access Management の統合とサポート (IAM)
7. 他の AWS サービスとの統合
8. 結果的に整合性があるデータのレプリケーション

### AWS Organizations の構成要素

1. [アカウント](https://docs.aws.amazon.com/ja_jp/organizations/latest/userguide/orgs_manage_accounts.html)

    - マスターアカウント

        >　こいつに Organizations を作成する。

        - 組織全体のAWS利用料の支払い
        - 新規AWSアカウントの作成
        - 既存AWSアカウントの招待
        - 組織内に登録されたAWSアカウントの削除
        - 組織ポリシーの適用

    - メンバーアカウント

2. 組織(Organization)

3. [組織単位 (OU) ](https://docs.aws.amazon.com/ja_jp/organizations/latest/userguide/orgs_manage_ous.html)

4. 管理用ルート (root)

5. [組織ポリシー](https://docs.aws.amazon.com/ja_jp/organizations/latest/userguide/orgs_manage_policies.html)

6. [サービス管理ポリシー(SCP)](https://docs.aws.amazon.com/ja_jp/organizations/latest/userguide/orgs_manage_policies_type-auth.html#orgs_manage_policies_scp)


## 参照

1. [AWS Organizations](https://aws.amazon.com/jp/organizations/)
2. [【AWS Black Belt Online Seminar】AWS Organizations](https://d1.awsstatic.com/webinars/jp/pdf/services/20180214_AWS-Blackbelt-Organizations.pdf)
