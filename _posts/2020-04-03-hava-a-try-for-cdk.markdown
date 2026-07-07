---
title: AWS CDK を触ってみる
subtitle: 使い慣れた言語でクラウドインフラを定義する Infrastructure as Code
layout: post
date:   2020-04-03T01:51:00+0900
categories: blogs
tags: aws cdk typescript iac
---

## AWS CDK とは

> AWS クラウド開発キット (AWS CDK) は、使い慣れたプログラミング言語を使用してクラウドアプリケーションリソースをモデル化およびプロビジョニングするためのオープンソースのソフトウェア開発フレームワークです。
>
> — [AWS CDK 公式サイト](https://aws.amazon.com/jp/cdk/)

CloudFormation の YAML/JSON を手書きする代わりに、**TypeScript や Python などの一般的なプログラミング言語** でインフラを定義できるのが CDK です。変数・ループ・関数といった言語機能をそのまま使えるため、繰り返しや条件分岐の多い構成を簡潔に書けます。最終的には CloudFormation テンプレートに合成（synth）されてデプロイされます。

ここでは TypeScript を使って、CDK を動かすところまで試します。

## 事前準備

### Node.js

```bash
$ brew install node
$ node --version
v13.2.0
```

### TypeScript

```bash
$ npm i -g typescript
$ tsc --version
Version 3.7.2
```

## CDK のインストール

CDK の CLI をグローバルにインストールします。

```bash
$ npm install -g aws-cdk
$ cdk --version
1.31.0 (build 8f3ac79)
```

## Hello World

サンプルアプリを生成し、デプロイまで行ってみます。ソース一式は [GitHub のリポジトリ](https://github.com/gekal-study-azure/cdk-hello-world)に置いています。

```bash
# サンプルアプリを作成
$ cdk init sample-app --language=typescript

# CloudFormation テンプレートに合成して確認
$ cdk synth

# デプロイ
$ cdk deploy
```

`cdk synth` で生成されるテンプレートを確認してから `cdk deploy` する流れが基本です。不要になったら `cdk destroy` でまとめて削除できます。

## 参照

1. [AWS クラウド開発キット (CDK)](https://aws.amazon.com/jp/cdk/)
2. [Getting Started With the AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html)
