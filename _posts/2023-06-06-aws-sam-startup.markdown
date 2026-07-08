---
title: "AWS Serverless Application Model (AWS SAM)を使いましょう"
layout: post
date: 2023-06-06T20:44:33+0900
categories: blogs
tags: ["aws", "sam"]
---

## SAM とは

AWS Serverless Application Model (AWS SAM) は、AWS 上でサーバーレスアプリケーションを構築および実行するデベロッパーのエクスペリエンスを改善するツールキットです。AWS SAM は次の 2 つの主要な部分で構成されます。

1. AWS SAM テンプレート仕様 – AWS でサーバーレスアプリケーションインフラストラクチャを定義するために使用できるオープンソースフレームワーク。
2. AWS SAM コマンドラインインターフェイス (AWS SAM CLI) – AWS SAM テンプレートやサポートされているサードパーティーの統合と併用することで、サーバーレスアプリケーションを構築し、実行できるコマンドラインツール。

## SAM Cli

```bash
$ wget https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-x86_64.zip
$ unzip aws-sam-cli-linux-x86_64.zip -d sam-installation
$ sudo ./sam-installation/install
$ sam --version
SAM CLI, version 1.116.0
```

SAMLの[リリースページ](https://github.com/aws/aws-sam-cli/releases)でご確認ください。

## リソース

[AWS SAM resource and property reference](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification-resources-and-properties.html)

- AWS::Serverless::Api
- AWS::Serverless::Application
- AWS::Serverless::Connector
- AWS::Serverless::Function
- AWS::Serverless::GraphQLApi
- AWS::Serverless::HttpApi
- AWS::Serverless::LayerVersion
- AWS::Serverless::SimpleTable
- AWS::Serverless::StateMachine

## 参照

1. [AWS Serverless Application Model (AWS SAM) とは](https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/what-is-sam.html)
2. [AWS SAM transform - Github](https://github.com/aws/serverless-application-model/)
3. [AWS SAM CLI -Github](https://github.com/aws/aws-sam-cli)
4. [AWS SAM CLIのインストール](https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/install-sam-cli.html)
