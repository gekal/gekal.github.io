---
title: WSL（Ubuntu 16.04）上で Docker を動かす
subtitle: Windows Subsystem for Linux に Docker Engine を入れて検証する
layout: post
date:   2019-02-21T22:51:00+0900
categories: blogs
tags: wsl docker ubuntu
---

## はじめに

普段の仕事では Windows を使っていますが、Linux も併用したいときに便利なのが WSL（Windows Subsystem for Linux）です。ここでは、その WSL 上で Docker Engine を直接動かせるか検証してみます。

> 注：この記事は WSL1 の時代（2019 年）の内容です。現在は WSL2 + Docker Desktop の組み合わせが標準的で、はるかに簡単に動かせます。当時の記録としてお読みください。

## 検証環境

- [Windows 10 Enterprise 1803](https://support.microsoft.com/ja-jp/help/4099479)
- [Ubuntu 16.04 LTS](https://www.microsoft.com/ja-jp/p/ubuntu-1604-lts/9pjn388hp8c9)

## 事前準備

### WSL の有効化

管理者権限の PowerShell で以下を実行し、再起動します。

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
# 参考: https://docs.microsoft.com/ja-jp/windows/wsl/install
```

### Ubuntu 16.04 のインストール

[Microsoft Store](https://www.microsoft.com/ja-jp/p/ubuntu-1604-lts/9pjn388hp8c9) から Ubuntu 16.04 LTS を入手して起動します。

### 初期セットアップ

初回起動時に UNIX ユーザー名とパスワードを作成します。作成後、`sudo` をパスワードなしで使えるようにしておくと、以降の作業が楽になります。

```bash
sudo visudo
# 最後に以下の行を追加
gekal ALL=(ALL) NOPASSWD:ALL
```

## Docker のインストール

当時、最新版の Docker は WSL1 上で正常に動作しなかったため、あえて安定して動く **17.09** を指定してインストールします。

```bash
# システム更新
sudo apt update
sudo apt upgrade

# Docker 17.09 を取得してインストール
curl -O https://download.docker.com/linux/debian/dists/stretch/pool/stable/amd64/docker-ce_17.09.0~ce-0~debian_amd64.deb
sudo dpkg -i docker-ce_17.09.0\~ce-0\~debian_amd64.deb

# 現在のユーザーを docker グループに追加（sudo なしで docker を使うため）
sudo usermod -aG docker $USER

# cgroup をマウントして Docker を起動
sudo cgroupfs-mount
sudo service docker start
```

## 動作確認

Apache（httpd）のコンテナを起動して、ブラウザからアクセスできるか確認します。

```bash
docker run -p 8080:80 --rm httpd
```

ブラウザで [http://localhost:8080/](http://localhost:8080/) を開き、"It works!" が表示されれば成功です。

## プロキシ設定

社内環境などプロキシ経由の場合は、Docker のデフォルト設定にプロキシを指定します。

```bash
# /etc/default/docker
export http_proxy="http://username:passwd@proxyserver:8080"
export https_proxy="http://username:passwd@proxyserver:8080"
```

## 参照

1. [どうしても Docker on Ubuntu 18.04 on WSL したかった](https://qiita.com/guchio/items/3eb0818df44fdbab3d14)
2. [WSL 上で Docker Engine が動くようになっていたっぽいという話](https://qiita.com/yanoshi/items/dcecbf117d9cbd14af87)
