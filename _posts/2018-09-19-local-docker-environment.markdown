---
layout: post
title:  "Vagrant で楽々ローカル Docker 環境を構築する"
subtitle: Windows / macOS 上に VirtualBox の Linux VM を立てて Docker を動かす
date:   2018-09-19T00:47:00+0900
categories: blogs
tags: vagrant virtualbox docker
---

## なぜ Vagrant で構築するのか

当時の Docker はネイティブでは Linux 上でしか動かず、Windows や macOS で使うには次の 2 つの方法が一般的でした。

1. [Docker for Windows](https://docs.docker.com/desktop/) / Docker for Mac を使う
2. VirtualBox などの仮想マシン上に Linux を立て、その中で Docker を動かす

1 の方法は手軽ですが、専用ソフトのインストールが必要で、なおかつ本番でよく使う Linux 上の操作とは細かい部分で差異があります。実運用と同じ Linux 環境で検証したい場合は、2 の「Linux VM を立てる」方法のほうが素直です。

そこで、VM の作成から Docker のインストールまでを **Vagrant** でコード化し、`vagrant up` 一発で再現できるようにします。

## 前提条件

以下をインストールしておきます。

- Windows または macOS
- [Vagrant](https://www.vagrantup.com/)
- [VirtualBox](https://www.virtualbox.org/)
- 便利な Vagrant プラグイン
  - [vagrant-vbguest](https://github.com/dotless-de/vagrant-vbguest) — Guest Additions の自動更新
  - [vagrant-proxyconf](https://github.com/tmatilai/vagrant-proxyconf) — プロキシ設定の自動反映
  - [vagrant-teraterm](https://github.com/tiibun/vagrant-teraterm) — Tera Term 連携
- Tera Term（Windows で SSH 接続する場合）

## 環境構築

前提条件が整ったら、以下のリポジトリをクローンし、`centos7-docker-ce` フォルダへ移動します。

```bash
git clone https://github.com/gekal/vagrant-local-env-dev.git
cd vagrant-local-env-dev/centos7-docker-ce
```

あとは起動コマンドを実行するだけです。初回は Box のダウンロードと Docker のインストールが走るため、少し時間がかかります。

```bash
# VM の作成・起動・プロビジョニングを一括実行
vagrant up
```

完了したら `vagrant ssh` で VM に入り、`docker version` で Docker が動いていることを確認できます。

## プロキシ環境での利用

社内ネットワークなどプロキシ経由でインターネットに出る環境では、以下の環境変数を設定しておくと、VM 内からもネットワークを意識せずにパッケージ取得や `docker pull` ができます（前述の `vagrant-proxyconf` を併用するとさらに楽になります）。

```conf
http_proxy="http://username:passwd@proxyserver:8080"
https_proxy="http://username:passwd@proxyserver:8080"
```

## まとめ

VM の構築を Vagrant でコード化しておけば、マシンを変えても `vagrant up` だけで同じ Docker 環境が手に入ります。使い終わったら `vagrant destroy` できれいに片付けられるのも、ローカル環境を汚さずに済んで気持ちが良いポイントです。
