---
title: highlight.js でコードをシンタックスハイライトする
subtitle: Syntax highlighting for the Web
layout: post
date:   2022-01-16T11:15:00+0900
categories: blogs
tags: highlightjs jekyll web
background: '/assets/imgs/blogs/2022-01-16/highlightjs-example.png'
---

## はじめに

ブログにソースコードを載せるとき、色が付いていないと読みづらいものです。[highlight.js](https://highlightjs.org/) を使えば、`<pre><code>` で囲んだコードを、言語を自動判定してきれいにシンタックスハイライトしてくれます。CDN から読み込むだけで導入でき、静的サイトとも相性が良いので、Jekyll のブログに組み込んでみます。

## 導入手順

### 1. ライブラリを読み込む

`<head>` などにスタイルシートとスクリプトを追加します。

```html
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/default.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/highlight.min.js"></script>
```

テーマは 240 種類以上あります。好みのものを選んで、CSS の URL を差し替えてください。

- [Default](https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/default.min.css)
- [Dark](https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/dark.min.css)
- [GitHub Dark Dimmed](https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark-dimmed.min.css)

### 2. ハイライトを有効にする

ページ読み込み後にハイライトを実行します。

```html
<script>hljs.highlightAll();</script>
```

> 以前よく使われていた `hljs.initHighlightingOnLoad()` は 11.x 系で非推奨になりました。代わりに `hljs.highlightAll()` を使ってください。

これで、ページ内のすべてのコードブロックが自動的にハイライトされます。

## 参照

1. [highlight.js 公式サイト](https://highlightjs.org/)
