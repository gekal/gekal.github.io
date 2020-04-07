---
title: SSHの公開鍵認証を有効(For Raspberry PI)
layout: post
auther: gekal
date:   2020-04-07T20:14:00+0900
categories: blogs
tags: ssh "public key" raspebrrypi
---

## SSH認証用キーを作成

```bash
$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/gekal/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/gekal/.ssh/id_rsa.
Your public key has been saved in /home/gekal/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:tlRjt9k73ouJgHxXZOHP+RU1WNvjQWxeitRG+k/YHhI gekal@home
The key's randomart image is:
+---[RSA 2048]----+
|             +=+.|
|            oo=o*|
|          +.oEo*o|
|         o o+=*+=|
|        S   oo+*+|
|      .o..  . .=+|
|       o.o .  o +|
|        . o ..oo |
|           . o..o|
+----[SHA256]-----+
```

## Publicキーをホストに登録

```bash
# ローカルの鍵をリモートサーバーにコピー（パスワードの入力が必要）
ssh-copy-id -i ~/.ssh/id_rsa.pub pi@raspberrypi.local
```

又は

```bash
# リモートサーバーにログインしてから、公開鍵を書き込む
$ mkdir ~/.ssh
$ echo "ssh-rsa public key contents" > ~/.ssh/authorized_keys
$ chmod 700 ~/.ssh/
$ chmod 600 ~/.ssh/authorized_keys
$ cat ~/.ssh/authorized_keys
ssh-rsa public key contents
```

## 鍵を使ってログイン

```bash
$ ssh pi@raspberrypi.local
Linux raspberrypi 4.19.97-v7l+ #1294 SMP Thu Jan 30 13:21:14 GMT 2020 armv7l

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Tue Apr  7 09:36:16 2020 from 192.168.0.XXX
```

## SSHコンフィグの設定

> ~/.ssh/config

```conf
Host raspberrypi.local
  HostName raspberrypi.local
  User pi
  Port 22
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  IdentityFile ~/.ssh/id_rsa
  IdentitiesOnly yes
  LogLevel FATAL
```

```bash
$ ssh raspberrypi.local
Linux raspberrypi 4.19.97-v7l+ #1294 SMP Thu Jan 30 13:21:14 GMT 2020 armv7l

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Tue Apr  7 09:39:00 2020 from fe80::d80b:e725:e2b5:fa5b%wlan0
```

## VSCodeからのリモート接続

「`Remote-SSH: Connect to Host...`」のコマンドを実施してから、`raspberrypi.local`をリモート接続ください。

> 初回起動時に、VSCodeサーバーをダウンロードする必要があるので、時間をかかる場合あります。

## 参照

1. [CentOS7.3でSSH接続(公開鍵認証)する方法](https://qiita.com/uhooi/items/137de4578534c8e7e7f2)
2. [SSHコンフィグファイル]({% post_url 2020-01-01-ssh-config-file %})
