---
title: WSL(Ubuntu18.4)にJekyll環境の構築
layout: post
date:   2019-11-29T23:05:00+0900
categories: blogs
tags: jekyll wsl
---

# Jekyllとは

プレーンテキストから静的な Web サイトやブログを作成するツールである。
静的なサイトでも、全部手で作成するのは大変でしょう。じゃ、Jekyllを使ってください。もう一つ大きなメリットがGithubのpagesを利用すれば、無料でホストできます。個人として、ただが一番だと思います。

# WSL(ubuntu)に環境構築

1. システム更新

    ```bash
    sudo apt update
    sudo apt upgrade
    ```

2. 依存ライブラリのインストール

    ```bash
    sudo apt install -y make gcc g++
    ```

3. ruby環境のインストール

    ```bash
    $ sudo apt install -y ruby ruby-dev
    Reading package lists... Done
    Building dependency tree
    Reading state information... Done
    ruby is already the newest version (1:2.5.1).
    ruby-dev is already the newest version (1:2.5.1).
    0 upgraded, 2 newly installed, 0 to remove and 0 not upgraded.
    ```

4. ruby環境のインストール

    ```bash
    sudo gem install bundler jekyll
    ```

# ローカル実施

```bash
jekyll new my-awesome-site
cd my-awesome-site
bundle exec jekyll serve
```

下記のURLへアクセスください。

<http://localhost:4000/>
