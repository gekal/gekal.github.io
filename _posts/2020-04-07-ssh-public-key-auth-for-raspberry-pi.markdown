---
title: SSH 公開鍵認証を有効にする（Raspberry Pi）
subtitle: パスワードなしで安全に SSH ログインできるようにする
layout: post
date:   2020-04-07T20:14:00+0900
categories: blogs
tags: ssh public-key raspberry-pi
---

## はじめに

パスワード認証での SSH は手軽ですが、総当たり攻撃に弱く、毎回パスワードを入力する手間もあります。公開鍵認証に切り替えれば、より安全に、かつパスワード入力なしでログインできます。ここでは Raspberry Pi を例に、公開鍵認証を有効にする手順をまとめます。

## 1. 鍵ペアを作成する

クライアント側で SSH の鍵ペア（秘密鍵と公開鍵）を作成します。

```bash
$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/gekal/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/gekal/.ssh/id_rsa.
Your public key has been saved in /home/gekal/.ssh/id_rsa.pub.
```

> 秘密鍵（`id_rsa`）は絶対に外部へ渡さないでください。相手に登録するのは公開鍵（`id_rsa.pub`）だけです。

## 2. 公開鍵をサーバーに登録する

`ssh-copy-id` を使うと一発で登録できます（この操作だけはパスワード入力が必要です）。

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub pi@raspberrypi.local
```

`ssh-copy-id` が使えない環境では、サーバーにログインして手動で登録します。

```bash
mkdir -p ~/.ssh
echo "ssh-rsa AAAA... (公開鍵の内容)" >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

## 3. 鍵でログインできることを確認する

パスワードを求められずにログインできれば成功です。

```bash
$ ssh pi@raspberrypi.local
Linux raspberrypi 4.19.97-v7l+ ... armv7l
...
Last login: Tue Apr  7 09:36:16 2020
```

## 4. config で接続を簡略化する

`~/.ssh/config` に設定を書いておくと、`ssh raspberrypi.local` だけで接続できます。

```conf
Host raspberrypi.local
  HostName raspberrypi.local
  User pi
  Port 22
  IdentityFile ~/.ssh/id_rsa
  IdentitiesOnly yes
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  LogLevel FATAL
```

config の各項目の意味は [SSH の config ファイルを使いこなす](/posts/2020-01-01-ssh-config-file/) にまとめています。

## VS Code からのリモート接続

VS Code の Remote-SSH 拡張を使えば、この config をそのまま利用してリモート接続できます。コマンドパレットから「Remote-SSH: Connect to Host...」を実行し、`raspberrypi.local` を選ぶだけです。

> 初回接続時は、リモート側に VS Code Server をダウンロードするため、少し時間がかかります。

## 参照

1. [CentOS7.3 で SSH 接続（公開鍵認証）する方法](https://qiita.com/uhooi/items/137de4578534c8e7e7f2)
2. [SSH の config ファイルを使いこなす](/posts/2020-01-01-ssh-config-file/)
