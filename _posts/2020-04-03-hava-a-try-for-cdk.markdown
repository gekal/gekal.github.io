---
title: AWS Cloud Development Kit (AWS CDK)を触ってみる
layout: post
auther: gekal
date:   2020-04-03T01:51:00+0900
categories: blogs
tags: cdk TypeScript
---

## 事前準備

1. nodejs

    - Mac

        ```bash
        $ brew install node
        $ node --version
        v13.2.0
        ```

2. typescript

    ```bash
    $ npm i -g typescript
    $ tsc --version
    Version 3.7.2
    ```

## CDKのインストール

```bash
$ npm install -g aws-cdk
/Users/gekal/.nodebrew/node/v13.2.0/bin/cdk -> /Users/gekal/.nodebrew/node/v13.2.0/lib/node_modules/aws-cdk/bin/cdk
+ aws-cdk@1.31.0
added 200 packages from 185 contributors in 14.249s

$ cdk --version
1.31.0 (build 8f3ac79)
```

## [CDKのHellow World](https://github.com/gekal-study-azure/cdk-hello-world)

```bash
$ cdk init sample-app --language=typescript
サンプルアプリを作成
$ cdk deploy
サンプルアプリをデプロイ
```

## 参照

1. [Getting Started With the AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html)
