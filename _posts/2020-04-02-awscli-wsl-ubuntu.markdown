---
title: WSL（Ubuntu）に AWS CLI をインストールする
subtitle: Windows の WSL 上で AWS CLI をセットアップして認証情報を設定する
layout: post
date:   2020-04-02T22:51:00+0900
categories: blogs
tags: aws cli wsl ubuntu
---

## はじめに

Windows で AWS を操作する際、WSL（Ubuntu）上に AWS CLI を入れておくと、Linux と同じ感覚でコマンドを実行できます。ここでは pip を使ったインストール手順をまとめます。

> この記事は AWS CLI v1 を pip で入れる手順です。現在は [v2 の公式インストーラ](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/getting-started-install.html)（`curl` でパッケージを取得して `unzip`／`install`）が推奨されています。

## 前提条件

Python 3 と pip3 が入っていることを確認します。

```bash
$ python3 --version
Python 3.6.9
$ pip3 --version
pip 9.0.1
```

## AWS CLI のインストール

pip でユーザー領域にインストールします。

```bash
$ pip3 install awscli --upgrade --user

# コマンドが見つからない場合は、PATH を反映するため
# シェル（またはターミナル）を再起動してください。
$ aws --version
aws-cli/1.18.34 Python/3.6.9 Linux/4.4.0-18362-Microsoft botocore/1.15.34
```

## 認証情報の設定

`aws configure` でアクセスキーやリージョンを設定します。複数アカウントを使い分けられるよう、`--profile` で名前を付けておくのがおすすめです。

```bash
$ aws configure --profile myprofile
AWS Access Key ID [None]: XXXXXXXXXXXXXXXXXXXX
AWS Secret Access Key [None]: YYYYYYYYYYYYYYYYYYYY
Default region name [None]: ap-northeast-1
Default output format [None]: json
```

設定できたら、S3 のバケット一覧を取得して動作を確認します。

```bash
$ aws s3 ls --profile myprofile
2019-11-25 23:58:12 my-bucket-aaaa
2018-04-21 09:42:11 my-bucket-bbbb
```

以降は `--profile myprofile` を付けるか、環境変数 `AWS_PROFILE=myprofile` を設定することで、そのアカウントに対してコマンドを実行できます。

## 参照

1. [Linux で AWS CLI をインストールする](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/getting-started-install.html)
