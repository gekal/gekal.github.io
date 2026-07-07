---
title: macOS のパッケージ管理ツール Homebrew
subtitle: Mac を使うなら最初に入れておきたいパッケージマネージャ
layout: post
date:   2018-11-09T09:05:00+0900
categories: blogs
tags: mac homebrew package-manager
---

## はじめに

Mac で開発するなら、まず入れておきたいのが Homebrew です。コマンドラインツールやアプリケーションのインストール・更新・削除をコマンド一発で管理できるようになります。ここでは基本的な使い方を整理します。

## Homebrew とは

> Homebrew（ホームブルー）は、macOS オペレーティングシステム上でソフトウェアの導入を単純化するパッケージ管理システムのひとつである。
>
> — [Wikipedia](https://ja.wikipedia.org/wiki/Homebrew_(パッケージ管理システム))

Linux の `apt` / `yum` や Windows の Chocolatey にあたるツールで、`brew install <パッケージ名>` の形で目的のソフトを導入できます。

## Homebrew のインストール

公式サイトに掲載されているインストールコマンドをターミナルで実行します。

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

> 記事執筆当時は Ruby ベースのインストーラでしたが、現在は上記の Bash スクリプト方式に変わっています。最新の手順は必ず[公式サイト](https://brew.sh/index_ja)で確認してください。

インストール後、バージョンを確認しておきます。

```bash
$ brew --version
Homebrew 1.8.2
```

## サブコマンドを確認する

Homebrew が持つコマンドは `brew commands` で一覧できます。

```bash
$ brew commands
Built-in commands
--cache        analytics    cleanup      doctor       info         list         outdated     search       uninstall    update       upgrade
--version      cask         config       fetch        install      migrate      pin          tap          unlink       update-report  uses
...
```

数は多いですが、日常的に使うのは一部だけです。全部を覚える必要はありません。よく使うコマンドを図にまとめました。

![brew のよく使うコマンド](/assets/svg/brew.svg)

具体的には、まず次の 4 つを押さえておけば十分です。

| 操作 | コマンド |
| --- | --- |
| インストール | `brew install <pkg>` |
| アンインストール | `brew uninstall <pkg>` |
| 更新（Homebrew 自体＋一覧） | `brew update` |
| インストール済みの一括更新 | `brew upgrade` |

不調を感じたら `brew doctor` を実行すると、環境の問題点を診断してくれます。

## まとめ

Homebrew を入れておけば、開発ツールの導入とメンテナンスがぐっと楽になります。GUI アプリのインストールも `brew install --cask` でまとめて管理できるので、Mac のセットアップをコマンドで再現できるようになります。

## 参照

1. [Homebrew Documentation](https://docs.brew.sh/)
2. [Homebrew 公式サイト（日本語）](https://brew.sh/index_ja)
