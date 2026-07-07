---
title: 代表的な CI/CD ツールまとめ
subtitle: 継続的インテグレーション／継続的デリバリーを支える主要ツール一覧
layout: post
date:   2019-04-11T11:23:00+0900
categories: blogs
tags: cicd devops
---

## CI/CD とは

CI/CD は **Continuous Integration（継続的インテグレーション）／ Continuous Delivery（継続的デリバリー）** の略です。

- **CI**：コードの変更をこまめにリポジトリへ統合し、そのたびにビルドとテストを自動実行する取り組み。バグの早期発見と「統合地獄」の回避が狙いです。
- **CD**：テストを通過した成果物を、いつでもリリースできる状態に自動で整える（さらに進めて自動デプロイまで行う）取り組み。

これらを支えるのが CI/CD ツールです。用途や実行環境に応じて選択肢は多岐にわたります。

## 主なツール

### セルフホスト型

| ツール | 特徴 |
| --- | --- |
| [Jenkins](https://jenkins.io/) | 老舗の定番。豊富なプラグインで何でも組める |
| [Jenkins X](https://jenkins.io/projects/jenkins-x/) | Kubernetes 向けにクラウドネイティブ化した Jenkins |
| [Concourse CI](https://concourse-ci.org/) | パイプラインを YAML で宣言的に定義する |
| [Spinnaker](https://www.spinnaker.io/) | マルチクラウド対応の継続的デリバリー基盤 |

### SaaS / クラウド型

| ツール | 特徴 |
| --- | --- |
| [Travis CI](https://travis-ci.org/) | OSS でよく使われた SaaS 型 CI |
| [CircleCI](https://circleci.com/) | 設定が手軽で高速なクラウド CI |
| [GitHub Actions](https://github.com/features/actions) | GitHub に統合された CI/CD |
| [GitLab CI/CD](https://docs.gitlab.com/ee/ci/) | GitLab に統合された CI/CD |
| [AWS CodePipeline](https://aws.amazon.com/jp/codepipeline/) | AWS のマネージド CI/CD |
| [Azure Pipelines](https://azure.microsoft.com/ja-jp/services/devops/pipelines/) | Azure DevOps のパイプライン |
| [Cloud Build / Continuous Delivery](https://cloud.google.com/solutions/continuous-delivery/) | Google Cloud の CI/CD |

## まとめ

どのツールを選ぶかは、ソースコードのホスティング先（GitHub / GitLab など）やデプロイ先のクラウドとの相性で決まることが多いです。まずは自分のリポジトリに統合されているもの（GitHub Actions や GitLab CI/CD）から始めると、導入の手間が少なくおすすめです。

## 参照

1. [CI/CD のエキスパートが解説：CI/CD とは何か？ なぜ今、必要とされるのか？](https://codezine.jp/article/detail/11083)
