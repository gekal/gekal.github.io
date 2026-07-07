---
title: Finder ⇄ ターミナルを素早く行き来する（Mac）
subtitle: フォルダからターミナルを開く操作をホットキーに割り当てる
layout: post
date:   2020-04-08T21:30:00+0900
categories: blogs
tags: mac terminal finder
---

## 課題：GUI 操作が地味に面倒

Finder で開いているフォルダをターミナルで開く（またはその逆）という操作は、日常的によく発生します。

Finder からターミナルを開くこと自体は数クリックでできますが、マウスに手を伸ばして右クリックメニューをたどる動作は、地味に集中を切らします。これをキーボードだけで完結できるように改善します。

## 環境

- OS：macOS Catalina (10.15.4)
- ターミナル：[iTerm2](https://www.iterm2.com/)（画面分割やタブ表示ができて便利）

## GUI での操作

まずは標準の操作方法です。

1. Finder でフォルダを右クリック
2. 「サービス」を選択
3. 以下のいずれかをクリック
    - New iTerm2 Window Here
    - New iTerm2 Tab Here

![Finder からターミナルを開く](/assets/imgs/blogs/2020-04-08/open-terminal-from-finder.png)

## ホットキーに割り当てる

この「サービス」はショートカットキーに割り当てられます。私は以下のように設定しました。

| サービス | ホットキー |
| --- | --- |
| New iTerm2 Tab Here | ⌘ + @ |
| New iTerm2 Window Here | ⌘ + ⇧ + @ |

### 設定手順

1. 画面左上のアップルメニューを開く
2. 「システム環境設定...」をクリック
3. 「キーボード」を開く
4. 「ショートカット」タブ →「サービス」を選択
5. 左のリストから対象のサービスを選び、右側でホットキーを設定する

![iTerm2 のホットキー設定](/assets/imgs/blogs/2020-04-08/hotkey-setting-capture-for-iTerm2.png)

これで操作は次のように短くなります。

1. Finder で対象フォルダを選択
2. ホットキーを押す → すぐにターミナルが開く

## ターミナルから Finder を開く場合

こちらは便利なコマンドがあるので、特別な設定は不要です。`open` にパスを渡すだけです。

```bash
# カレントディレクトリを Finder で開く
open .

# ホームディレクトリを開く
open ~
```

## 参照

1. [Finder から terminal を開く](https://qiita.com/yamagh/items/02608e97be22c85cefaa)
