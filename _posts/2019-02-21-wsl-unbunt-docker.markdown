---
title: WSL上でDocker(17.09)を動いてみます。
layout: post
date:   2019-02-21T22:51:00+0900
categories: blogs
tags: wsl docker ubuntu
---

# 前書き

普段の仕事では、Windowsを使っています。Linuxを利用したいなら、WSLが一選択肢です。Dockerを使いたいですが、WSL上でも動けますでしょうか。

# 検証環境

- [Windows 10 Enterprise 1803](https://support.microsoft.com/ja-jp/help/4099479)
- [Ubuntu 16.04 LTS](https://www.microsoft.com/ja-jp/p/ubuntu-1604-lts/9pjn388hp8c9?activetab=pivot:overviewtab)

# 事前準備

## WSL(Microsoft-Windows-Subsystem-Linux)の有効

```powershell
# 管理者権限で、下記のコマンドを実行して、再起動します。
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
# 参照資料
# https://docs.microsoft.com/ja-jp/windows/wsl/install-win10

```

## Ubuntu 16.04のインストール

[Ubuntu 16.04 LTS](https://www.microsoft.com/ja-jp/p/ubuntu-1604-lts/9pjn388hp8c9?activetab=pivot:overviewtab)からMicrosoft Storeを起動して、入手する。

## Ubuntu 16.04の初期化

```bash
# Installing, this may take a few minutes...
# Please create a default UNIX user account. The username does not need to match your Windows username.
# For more information visit: https://aka.ms/wslusers
# Enter new UNIX username: gekal
# Enter new UNIX password:
# Retype new UNIX password:
# passwd: password updated successfully
# Installation successful!
# To run a command as administrator (user "root"), use "sudo <command>".
# See "man sudo_root" for details.

> sudo visudo
# 最後に下記の行を追加（visudoでsudo権限の設定）
gekal ALL=(ALL) NOPASSWD:ALL
```

# Dockerをインストール

> **★下記設定は管理者権限で実施ください。★**

```bash
# システム更新
sudo apt update
sudo apt upgrade

# Dockerをインストール
# ※※最新のバージョンが問題ありますので、17.09をインストールします。※※
curl -O https://download.docker.com/linux/debian/dists/stretch/pool/stable/amd64/docker-ce_17.09.0~ce-0~debian_amd64.deb
sudo dpkg -i docker-ce_17.09.0\~ce-0\~debian_amd64.deb

# カレントユーザーをdockerグループに追加
sudo usermod -aG docker $USER

sudo cgroupfs-mount

# Dockerを起動する
sudo service docker start
```

# 環境確認

## Apache起動

```bash
# Apacheを起動
docker run -p 8080:80 --rm httpd
```

## 動作確認

[http://localhost:8080/](http://localhost:8080/)

# Proxy設定

> 社内の環境には、プロキシがほとんどです。  
> 下記の通り、プロキシを設定ください。

```bash
# /etc/default/docker
export http_proxy="http://your-proxy...:your-port"
export https_proxy="http://your-proxy...:your-port"
```

# 参照資料

1. [どうしても Docker on Ubuntu 18.04 on WSL したかった](https://qiita.com/guchio/items/3eb0818df44fdbab3d14)
2. [WSL上でDocker Engineが動くようになっていたっぽいという話](https://qiita.com/yanoshi/items/dcecbf117d9cbd14af87)
