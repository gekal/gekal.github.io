---
layout: post
title:  "楽々ローカルDocker環境構築"
date:   2018-09-19T00:47:00+0900
categories: blogs
tags: choco package
---

# 楽々ローカルDocker環境構築

## 前提条件

* Window/Macos
* Vagrant
* virtual box
    * [vagrant-vbguest](https://github.com/dotless-de/vagrant-vbguest)
    * [vagrant-proxyconf](https://github.com/tmatilai/vagrant-proxyconf)
    * [vagrant-teraterm](https://github.com/tiibun/vagrant-teraterm)
* Tera Term

## なぜ必要

DockerがWindows/Macosをサポートしませんのため、WindowsのユーザがDockerを利用する場合、

1. [Docker for Windows](https://docs.docker.com/docker-for-windows/)
2. LinuxのVM上で構築

が一般だと思います。

１の場合、ローカルにDocker for Windowsソフトをインストールしないといけないと加えて、Linuxでの操作と若干違うともあります。

## 環境構築

> 前提条件がクリスされること

下記のリポジトリをローカルにクローンして、centos7-docker-ceフォルダーに移動する。

    https://github.com/gekal/vagrant-local-env-dev.git

```powershell
# 開始コマンド
vagrant up
```

## その他
社内で利用する場合、プロキシを通すのは一般です。下記の環境変数を設定すれば、ネット周りを意識せず使えます。

```conf
http_proxy="http://username:passwd@proxyserver:8080"
```
