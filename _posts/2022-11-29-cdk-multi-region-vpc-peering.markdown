---
title: "CDKでマルチリージョン間のVPCのペアリンスをコンフィグしてみる"
layout: post
date: 2022-11-29T12:17:42+0900
categories: blogs
tags: ["cdk", "VPC", "peering"]
---

## マルチリージョンのリソースの参照

CDKのv2.50.0からスタック間＆リージョン間の参照は自動的に構築できるようになりました。
これらのきっかけでリージョン間のVPCペアリング構成をやってみたいと思います。

※リリースノート：
<https://github.com/aws/aws-cdk/releases/tag/v2.50.0>
`core: automatic cross stack, cross region references (under feature flag) `

## インフラ構成

東京リージョンと大坂リージョンにそれぞれVPCを作成して、VPCペアリングを設定しておきます。
![アーキテクチャー](/assets/imgs/zenn/cdk-multi-region-vpc-peering/infra.drawio.png)

## サンプルアプリ

### プロジェクト作成

```bash
# npm install -g aws-cdk
npm install -g typescript
cdk init app --language typescript
```

### CDK情報

The `cdk.json` file tells the CDK Toolkit how to execute your app.

### 環境作成

```bash
$ cdk list
PrimaryRegionStack
SecondRegionStack
PrimaryRegionRouteStack
SecondRegionRouteStack
```

> 各ステックの概要

| スタック                | 説明                                         | メモ                                       |
| ----------------------- | -------------------------------------------- | ------------------------------------------ |
| PrimaryRegionStack      | 東京リージョンのリソース                     |                                            |
| SecondRegionStack       | 大坂リージョンのリソース                     |                                            |
| PrimaryRegionRouteStack | VPCペアリングの東京リージョンVPCのルート設定 | ペアリングリソースもこっちのスタックに追加 |
| SecondRegionRouteStack  | VPCペアリングの大坂リージョンVPCのルート設定 |                                            |

### クロースリージョンの設定

https://github.com/gekal-study-aws/cdk-multi-region-resources/blob/main/bin/cdk-multi-region-resources.ts

## 環境作成

### CDK環境初期化

```bash
ACCOUNT_ID=$(aws sts get-caller-identity --query 'Account' --output text)
AWS_PRIMARY_REGION=ap-northeast-1
AWS_SECONDARY_REGION=ap-northeast-3

cdk bootstrap aws://$ACCOUNT_ID/$AWS_PRIMARY_REGION
cdk bootstrap aws://$ACCOUNT_ID/$AWS_SECONDARY_REGION
```

```bash
cdk deploy "*" --tags tester=gekal
```

### 環境クリア

```bash
$ cdk destroy "*"
Are you sure you want to delete: SecondRegionRouteStack, PrimaryRegionRouteStack, SecondRegionStack, PrimaryRegionStack (y/n)? y
SecondRegionRouteStack: destroying...

 ✅  SecondRegionRouteStack: destroyed
PrimaryRegionRouteStack: destroying...

 ✅  PrimaryRegionRouteStack: destroyed
SecondRegionStack: destroying...

 ✅  SecondRegionStack: destroyed
PrimaryRegionStack: destroying...

 ✅  PrimaryRegionStack: destroyed
```

## おまけ

完成版のソースは下記のリポジトリをご参照ください。

https://github.com/gekal-study-aws/cdk-multi-region-resources

## 参照

1. [Using CDK to perform continuous deployments in multi-region Kubernetes environments](https://aws.amazon.com/jp/blogs/containers/using-cdk-to-perform-continuous-deployments-in-multi-region-kubernetes-environments/)
2. [interface StackProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.StackProps.html)
