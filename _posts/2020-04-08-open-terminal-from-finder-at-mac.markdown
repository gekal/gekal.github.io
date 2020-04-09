---
title: Finder <=> Terminalの切り替え @ Mac
layout: post
auther: gekal
date:   2020-04-08T21:30:00+0900
categories: blogs
tags: terminal finder mac
---

## 面倒なGUI操作が課題

FilderにあるフォルダからTerminalの開き、または、その逆はよくある作業でしょうね。

FilderからTerminalを開くには、数クリックでTerminalを開ますが、マウスの移動など、意外的に精神的な負荷がかかります。

それを改善したいから、どうしようかね。

## MacOS環境の環境

1. OS

    macOS Catalina (10.15.4)

2. Terminal

    [iTerm2](https://www.iterm2.com/)

    > 画面分割やTab表示ができるので、超便利だよ。

## GUIで操作

### Finder から Terminal を開く

1. フォルダーを右クリック
2. サービスを選択
3. 下記のいずれかをクリック

    - New iTerm2 Windows Here
    - New iTerm2 Tab Here

4. 楽々コマンドを打ち

    ![FilderからTerminalを開く](../assets/imgs/blogs/2020-04-08/open-terminal-from-finder.png)

## 便利な設定

### GUIの操作 => ホットキーに変身

#### Hot Keys って下記にしろう

| サービス                | Hot Key |
| ----------------------- | ------- |
| New iTerm2 Tab Here     | ⌘ @     |
| New iTerm2 Windows Here | ⌘ ⬆︎ @  |

#### 設定手順

1. 左上のアプルマックを食え
2. 「システム環境設定...」をクリック
3. 「キーボード」のマックをクリック
4. 「ショートカット」タブを選択
5. 左箱にあるサービスを選択して、右の箱にあるiTerm2のサービスのホットキーを設定

![iTermのホットキー設定キャプチャ](../assets/imgs/blogs/2020-04-08/hotkey-setting-capture-for-iTerm2.png)

#### GUIの手順からどう変わったのか

1. Finderで対象フォルダーを選択
2. 頭中のホットキーを打てから、Go..

### Terminal から Finder は、変わらないのか

> 便利のコマンドがあるので、変わる必要はない

```bash
# openコマンド後に、ターゲットパスを記載ください。
# 例：ユーザーのホームディレクトリーを開く
open ~
```

## 参照

1. [finder から terminal を開く](https://qiita.com/yamagh/items/02608e97be22c85cefaa)
