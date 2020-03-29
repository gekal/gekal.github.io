---
title: DockerのLayer確認ツール(dive)
layout: post
date:   2019-03-22T02:00:00+0900
categories: blogs
tags: docker layer viewer dive
---

## 初めに

Dockerのイメージを確認しようと思う時、各レイヤーを解析する必要があります。

Diveの公式に、下記のDemoがあります。すごいでしょう。
![dive demo](/assets/imgs/blogs/2019-03-22/dive-demo.gif)

## diveをインストール

## インストール(MacOS)

```bash
# Mac
$ brew tap wagoodman/dive
$ brew install dive
Updating Homebrew...
==> Auto-updated Homebrew!
Updated 2 taps (homebrew/cask and caskroom/cask).
No changes to formulae.

==> Installing dive from wagoodman/dive
==> Downloading https://github.com/wagoodman/dive/releases/download/v0.7.0/dive_0.7.0_darwin_amd64.tar.gz
Already downloaded: /Users/gekal/Library/Caches/Homebrew/downloads/c352a41fa19d4fbbd2fc43b13848d758f047efc7c63d1314cb86654555cbb9ac--dive_0.7.0_darwin_amd64.tar.gz
🍺  /usr/local/Cellar/dive/0.7.0: 5 files, 11.8MB, built in 4 seconds
```

### バージョン確認

```bash
$ dive --version
dive 0.7.0
```

## 動作確認

```bash
$ dive ruby:2.5-slim
Fetching image... (this can take a while with large images)
Parsing image...
Analyzing image...
Building cache...
# 詳細を確認・・・
```

## 使い方

```bash
$ dive --help
This tool provides a way to discover and explore the contents of a docker image. Additionally the tool estimates
the amount of wasted space and identifies the offending files from the image.

Usage:
  dive [IMAGE] [flags]
  dive [command]

Available Commands:
  build       Builds and analyzes a docker image from a Dockerfile (this is a thin wrapper for the `docker build` command).
  help        Help about any command
  version     print the version number and exit (also --version)

Flags:
      --ci-config string   If CI=true in the environment, use the given yaml to drive validation rules. (default ".dive-ci")
      --config string      config file (default is $HOME/.dive.yaml, ~/.config/dive/*.yaml, or $XDG_CONFIG_HOME/dive.yaml)
  -h, --help               help for dive
  -j, --json string        Skip the interactive TUI and write the layer analysis statistics to a given file.
  -v, --version            display version number

Use "dive [command] --help" for more information about a command.
```

## 参照

1. [dive](https://github.com/wagoodman/dive)
