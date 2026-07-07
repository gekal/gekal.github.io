---
title: WSL（Ubuntu 18.04）に Jekyll 環境を構築する
subtitle: Windows の WSL 上に静的サイトジェネレータ Jekyll をセットアップする
layout: post
date:   2019-11-29T23:05:00+0900
categories: blogs
tags: jekyll wsl ubuntu
---

## Jekyll とは

Jekyll は、プレーンテキスト（Markdown など）から静的な Web サイトやブログを生成するツールです。GitHub Pages と組み合わせれば無料でホスティングでき、個人サイトを手軽に始められます。

以前 [Mac に Jekyll 環境を構築する](/posts/2019-01-01-jekyll-mac/)方法を紹介しましたが、今回は Windows の WSL（Ubuntu 18.04）で同じ環境を作ります。普段 Windows を使いつつ、Linux ベースでブログを運用したい場合に便利です。

## WSL（Ubuntu）への環境構築

### 1. システムを更新する

```bash
sudo apt update
sudo apt upgrade
```

### 2. ビルドに必要なツールを入れる

ネイティブ拡張のコンパイルに必要なので、ビルドツールを入れておきます。

```bash
sudo apt install -y make gcc g++
```

### 3. Ruby をインストールする

Jekyll は Ruby 製なので、Ruby と開発用ヘッダを入れます。

```bash
sudo apt install -y ruby ruby-dev
```

### 4. Jekyll と Bundler をインストールする

```bash
sudo gem install bundler jekyll
```

## サイトを作って起動する

新しいサイトを生成し、ローカルサーバーを立ち上げます。

```bash
jekyll new my-awesome-site
cd my-awesome-site
bundle exec jekyll serve
```

ブラウザで <http://localhost:4000/> にアクセスすると、生成されたサイトを確認できます。ファイルを編集すれば自動で再ビルドされるので、ブラウザを更新するだけで変更を反映できます。

> システムの Ruby にそのまま `gem install` すると権限やバージョンで詰まることがあります。`rbenv` などで Ruby を管理すると、より安定して運用できます。
