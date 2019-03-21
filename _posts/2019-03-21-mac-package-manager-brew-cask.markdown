---
title: Macのパッケージ管理ツール - brewのcask
layout: post
date:   2019-03-21T11:00:00+0900
categories: blogs
tags: mac brew cask
---

# 初めに

HomeBrewの使い方に関して、前に関連の記事を書きました。  
※ [Macのパッケージ管理ツール - brew](/_posts/2018-11-09-mac-package-manager-brew.markdown)

でも、ソフトウェア（VirtualBoxなど）をインストールする時、**Download->Install**の手順でした。ちょっと面倒だと思います。特に、更新する時、手間が掛かり過ぎます。

brewのcask機能を使って便利だと感じました。徐々にCaskへ移行しようと思います。備考として、整理します。

# Caskのインストール

## 前提条件

Homebrewのversionが0.9.5以上である。

```bash
$ brew --version
Homebrew 2.0.5
Homebrew/homebrew-core (git revision 9ae4f; last commit 2019-03-20)
Homebrew/homebrew-cask (git revision 2bc7a; last commit 2019-03-21)
```

## caskのインストール

前提条件が満たす場合、すでに使えるはずです。

## 補完機能のインストール

> 検証しなかったが。。。

```bash
$ brew install brew-cask-completion
==> Downloading https://github.com/xyb/homebrew-cask-completion/archive/v2.1.tar.gz
==> Downloading from https://codeload.github.com/xyb/homebrew-cask-completion/tar.gz/v2.1
######################################################################## 100.0%
🍺  /usr/local/Cellar/brew-cask-completion/2.1_1: 5 files, 11.0KB, built in 5 seconds
```

# Caskのサブコマンド一覧

|  No.  | コマンド | 説明                                   |
| :---: | :------- | :------------------------------------- |
|   1   | info     | Caskの情報を取得                       |
|   2   | list     | インストールしたCask一覧を取得         |
|   3   | fetch    | Caskをダウンロード                     |
|   4   | doctor   | 配置のイシューをチェック               |
|   5   | cleanup  | ダウンロードのキャッシュをクリンアップ |
|   6   | home     | Caskのホームページを取得               |
|   7   | zap      | Caskの関連ファイルを削除してみる       |
|   8   | outdated | アウトデータしたCaskの一覧を取得       |
|   9   | upgrade  | 全部Caskを更新                         |

# 公式以外のリポジトリ（tap）

brew tapは、追跡、更新、およびインストールに使用する式のリストにリポジトリを追加します。 

サードパーティ製のアプリをインストールする時、非常に有用だと思う。

## Tabコマンドの説明

1. パラメーターなし

    ```bash
    # List all installed taps
    $ brew tap
    caskroom/versions
    homebrew/cask
    homebrew/core
   ```

2. tap名付き

    ```bash
    # taps a formula repository
    $ brew tap <tap_name>
   ```

# 参照

1. [How to Use Homebrew Cask](https://github.com/Homebrew/homebrew-cask/blob/master/USAGE.md)
2. [Taps (third-party repositories)](https://github.com/Homebrew/brew/blob/master/docs/Taps.md)
