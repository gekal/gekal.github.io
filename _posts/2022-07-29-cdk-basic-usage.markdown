---
title: "CDKの基本的な使い方"
layout: post
date: 2022-07-29T23:09:01+0900
categories: blogs
tags: ["cdk", "aws"]
---

## CDKとは

The AWS CDK lets you build reliable, scalable, cost-effective applications in the cloud with the considerable expressive power of a programming language.

![AppStacks](/assets/imgs/zenn/cdk-basic-usage/AppStacks.png)

## インストール

1. nodejsのインストール

    [Nodejs環境構築](/posts/2022-01-20-nodejs-environment-n-command/)をご参照ください。

2. cdk

   ```bash
   sudo npm i -g aws-cdk
   ```

3. CDKツールキットスタック

    ```bash
    cdk bootstrap
    ```

## CDKアプリ

### CDKアプリの作成

```bash
$ cdk init app --language typescript
Applying project template app for typescript
# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

Executing npm install...
✅ All done!
```

### CDKアプリのデプロイ

```bash
# リソースにタグを一律つける
cdk deploy --tags user=gekal
```

### CDKアプリのアンデプロイ

```bash
cdk destroy
```

## サブコマンド一覧

| サブコマンド                   | 別名  | 説明                                                                                                                                |
| ------------------------------ | ----- | ----------------------------------------------------------------------------------------------------------------------------------- |
| cdk list [STACKS..]            | ls    | Lists all stacks in the app                                                                                                         |
| cdk synthesize [STACKS..]      | synth | Synthesizes and prints the CloudFormation template for this stack                                                                   |
| cdk bootstrap [ENVIRONMENTS..] |       | Deploys the CDK toolkit stack into an AWS environment                                                                               |
| cdk deploy [STACKS..]          |       | Deploys the stack(s) named STACKS into your AWS account                                                                             |
| cdk import [STACK]             |       | Import existing resource(s) into the given STACK                                                                                    |
| cdk watch [STACKS..]           |       | Shortcut for 'deploy --watch'                                                                                                       |
| cdk destroy [STACKS..]         |       | Destroy the stack(s) named STACKS                                                                                                   |
| cdk diff [STACKS..]            |       | Compares the specified stack with the deployed stack or a local template file, and returns with status 1 if any difference is found |
| cdk metadata [STACK]           |       | Returns all metadata associated with this stack                                                                                     |
| cdk acknowledge [ID]           | ack   | Acknowledge a notice so that it does not show up anymore                                                                            |
| cdk notices                    |       | Returns a list of relevant notices                                                                                                  |
| cdk init [TEMPLATE]            |       | Create a new, empty CDK project from a template.                                                                                    |
| cdk context                    |       | Manage cached context values                                                                                                        |
| cdk docs                       | doc   | Opens the reference documentation in a browser                                                                                      |
| cdk doctor                     |       | Check your set-up for potential problems                                                                                            |

## 参照

1. [AWS Cloud Development Kit (AWS CDK) v2](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
2. [API Reference](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-construct-library.html)
3. [CDK Workshop](https://cdkworkshop.com/)
4. [AWS CDK の3種類の Construct を使ってデプロイしてみた](https://dev.classmethod.jp/articles/aws-cdk-construct-explanation/)
