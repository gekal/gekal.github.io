---
title: highlight.jsを使ってJekyllのサンプルソースをハイライトしよう
subtitle: Syntax highlighting for the Web
layout: post
auther: gekal
date:   2022-01-16T11:15:00+0900
categories: blogs
tags: highlightjs
background: '/assets/imgs/blogs/2022-01-16/highlightjs-example.png'
---

## highlight.jsを導入する。

1. ライブラリを導入する。

    ```html
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/default.min.css">
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/highlight.min.js"></script>
    ```

    243のThemeがあるので、自分が好きなタイプを使って、CSSのStyleを選択してください。

    - [Default](https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/default.min.css)
    - [Dark](https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/dark.min.css)
    - [Github Dark Dimmed](https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark-dimmed.min.css)

2. ハイライトを有効する。

    ```html
    <script>hljs.initHighlightingOnLoad();</script>
    ```

## 参照先

1. [highlightjsの公式サイト](https://highlightjs.org/)
