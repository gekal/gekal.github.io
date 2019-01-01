---
title: MacにJekyll環境の構築
layout: post
date:   2018-11-13T01:05:00+0900
categories: blogs
tags: jekyll mac
---

# Jekyllとは

プレーンテキストから静的な Web サイトやブログを作成するツールである。
静的なサイトでも、全部手で作成するのは大変でしょう。じゃ、Jekyllを使ってください。もう一つ大きなメリットがGithubのpagesを利用すれば、無料でホストできます。個人として、ただが一番だと思います。

# Macに環境構築

```bash
gem install bundler jekyll
bundle install
```

# ローカル実施

```bash
bundle exec jekyll serve
```

下記のURLへアクセスください。

    http://localhost:4000/
