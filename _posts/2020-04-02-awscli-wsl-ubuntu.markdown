---
title: awscli@wsl+ubuntu
layout: post
auther: gekal
date:   2020-04-02T22:51:00+0900
categories: blogs
tags: aws cli wsl ubuntu
---

## 前提条件

Python3とpip3がインストールされていること。

```bash
$ python3 --version
Python 3.6.9
$ pip3 --version
pip 9.0.1 from /usr/lib/python3/dist-packages (python 3.6)
```

## AWS CLIのインストール

```bash
$ uname -a
Linux home 4.4.0-18362-Microsoft #476-Microsoft Fri Nov 01 16:53:00 PST 2019 x86_64 x86_64 x86_64 GNU/Linux

$ pip3 install awscli --upgrade --user

# 下記のコマンドが上手く表示できない場合、プロンプトを再起動してください。
$ aws --version
aws-cli/1.18.34 Python/3.6.9 Linux/4.4.0-18362-Microsoft botocore/1.15.34
```

## AWS CLI の設定

```bash
$ aws configure --profile myprofile
AWS Access Key ID [None]: XXXXXXXXXXXXXXXXXXXXXXXXXX
AWS Secret Access Key [None]: YYYYYYYYYYYYYYYYYYYYYYY
Default region name [None]: ap-northeast-1
Default output format [None]: json

# 設定を確認する。
$ aws s3 ls --profile myprofile
2019-11-25 23:58:12 aaaaaaaaaaaaaa
2018-04-21 09:42:11 bbbbbbbbbbbbbb
2018-05-12 14:26:47 cccccccccccccc
2018-06-09 03:06:43 dddddddddddddd
2018-11-13 23:56:33 eeeeeeeeeeeeee
```

## 参照

1. [Linux で AWS CLI バージョン 1 をインストールする](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/install-linux.html)
