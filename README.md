# gekal's blog

URL: [https://www.gekal.cn/](https://www.gekal.cn/)

Next.js 15 static site, deployed to GitHub Pages via GitHub Actions.

## ローカル開発

```bash
npm install
npm run dev      # http://localhost:3000
```

## ビルド

```bash
npm run build    # 静的ファイルを out/ に生成
```

## 記事の追加

`_posts/` に `YYYY-MM-DD-slug.markdown` を作成する。

```yaml
---
title: 記事タイトル
date: 2024-01-01T12:00:00+0900
categories: blogs
tags: tag1 tag2
background: /assets/imgs/blogs/YYYY-MM-DD/image.png
---
本文...
```

記事内で使う画像は `public/assets/imgs/blogs/<slug>/` に置く（VS Code の pasteImage 拡張で自動保存される）。

## デプロイ

`master` へのプッシュで GitHub Actions が自動的にビルド・デプロイする。
