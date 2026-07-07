---
title: dive で Docker イメージのレイヤーを解析する
subtitle: イメージの各レイヤーと無駄なファイルを可視化するツール
layout: post
date:   2019-03-22T02:00:00+0900
categories: blogs
tags: docker dive image
---

## はじめに

Docker イメージを軽量化したり、意図しないファイルが含まれていないか確認したりするには、イメージを構成する各レイヤーを調べる必要があります。

`docker history` でもレイヤーの概要は分かりますが、**dive** を使うと、レイヤーごとに追加・変更されたファイルをツリー表示で確認でき、無駄になっている領域まで教えてくれます。公式のデモを見ると、その便利さが一目で分かります。

![dive のデモ](/assets/imgs/blogs/2019-03-22/dive-demo.gif)

## インストール（macOS）

Homebrew でインストールできます。

```bash
brew install dive
```

バージョンを確認しておきます。

```bash
$ dive --version
dive 0.7.0
```

## 使い方

引数に解析したいイメージ名を渡すだけです。

```bash
$ dive ruby:2.5-slim
Fetching image... (this can take a while with large images)
Parsing image...
Analyzing image...
Building cache...
```

解析が終わると TUI（対話的なターミナル UI）が起動します。左ペインでレイヤーを選び、右ペインでそのレイヤーのファイルツリーを確認できます。画面下部には、レイヤー間で重複・無駄になっている容量の推定値（efficiency score）も表示されます。

CI に組み込みたい場合は、`--ci` オプションと `--json` での結果出力を使うと、イメージの効率を自動チェックできます。

```bash
$ dive --help
This tool provides a way to discover and explore the contents of a docker image.
Additionally the tool estimates the amount of wasted space and identifies the
offending files from the image.
```

## まとめ

イメージが肥大化する原因の多くは、「中間レイヤーで作ったファイルを後のレイヤーで消しているが、レイヤーとしては残っている」といったパターンです。dive を使えばそれを目で確認できるので、Dockerfile の改善に直結します。

## 参照

1. [wagoodman/dive](https://github.com/wagoodman/dive)
