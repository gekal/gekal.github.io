---
title: Homebrew Cask で GUI アプリを管理する
subtitle: VirtualBox や VS Code などの GUI アプリもコマンドで導入・更新する
layout: post
date:   2019-03-21T11:00:00+0900
categories: blogs
tags: mac homebrew cask
---

## はじめに

Homebrew の基本的な使い方については、以前に別の記事で紹介しました。

- [macOS のパッケージ管理ツール Homebrew](/posts/2018-11-09-mac-package-manager-brew/)

通常の `brew install` はコマンドラインツール向けですが、VirtualBox や VS Code のような **GUI アプリ** をこれまで手動で「サイトからダウンロード → インストーラを実行」していると、更新のたびに手間がかかります。

そこで登場するのが **Cask** です。GUI アプリも `brew` で一元管理できるようになるので、徐々に Cask へ移行していくことにしました。

> 当時は `brew cask install <app>` という書き方でしたが、現在は Cask が本体に統合され、`brew install --cask <app>` に変わっています。以下のコマンドは適宜読み替えてください。

## Cask のインストール

### 前提条件

Homebrew が入っていれば、Cask は追加インストールなしでそのまま使えます。バージョンを確認しておきます。

```bash
$ brew --version
Homebrew 2.0.5
```

### 補完機能（任意）

コマンド補完を効かせたい場合は、補完用のフォーミュラを入れておきます。

```bash
brew install brew-cask-completion
```

## よく使う Cask のサブコマンド

| コマンド | 説明 |
| --- | --- |
| `info` | Cask の情報を取得する |
| `list` | インストール済みの Cask 一覧を表示する |
| `fetch` | Cask をダウンロードする |
| `doctor` | 設定の問題をチェックする |
| `cleanup` | ダウンロードキャッシュを削除する |
| `home` | Cask のホームページを開く |
| `zap` | Cask に関連するファイルまで含めて削除する |
| `outdated` | 更新可能な Cask を一覧する |
| `upgrade` | すべての Cask を更新する |

## サードパーティのリポジトリ（tap）

`brew tap` は、フォーミュラの取得元となるリポジトリを追加するコマンドです。公式に含まれていないアプリを入れたいときに役立ちます。

```bash
# インストール済みの tap を一覧
$ brew tap

# 任意のリポジトリを追加
$ brew tap <tap_name>
```

## 私がよく入れているアプリ

開発環境のセットアップでは、だいたい以下を一括で入れています。

```bash
# エディタ
brew install --cask visual-studio-code

# 仮想化・コンテナ
brew install --cask virtualbox
brew install --cask vagrant
brew install --cask docker

# ターミナル
brew install --cask iterm2
```

新しい Mac をセットアップするときも、このコマンドを流すだけで一気に環境が整います。

## 参照

1. [Homebrew Cask の使い方](https://github.com/Homebrew/homebrew-cask)
2. [Taps (third-party repositories)](https://github.com/Homebrew/brew/blob/master/docs/Taps.md)
