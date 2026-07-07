---
title: Mac に Jekyll 環境を構築する
subtitle: 静的サイトジェネレータ Jekyll をローカルで動かす
layout: post
date:   2019-01-01T22:05:00+0900
categories: blogs
tags: jekyll mac
---

## Jekyll とは

Jekyll は、プレーンテキスト（Markdown など）から静的な Web サイトやブログを生成するツールです。

静的サイトは高速で安全ですが、ページを一枚ずつ手で書くのは大変です。Jekyll を使えば、記事を Markdown で書くだけでサイト全体を自動生成できます。さらに GitHub Pages と組み合わせれば無料でホスティングできるため、個人サイトを始めるにはうってつけです。

## Mac に環境を構築する

Mac には Ruby が同梱されているので、`gem` で Jekyll と Bundler を入れるだけで始められます。

```bash
gem install bundler jekyll
bundle install
```

> システム標準の Ruby ではなく、`rbenv` などでバージョン管理した Ruby を使うと、権限まわりのトラブルを避けやすくなります。

## ローカルで起動する

以下のコマンドでローカルサーバーが立ち上がります。

```bash
bundle exec jekyll serve
```

起動したら、ブラウザで次の URL にアクセスすると、ローカルでサイトを確認できます。

```
http://localhost:4000/
```

ファイルを編集すると自動で再ビルドされるので、ブラウザを更新するだけで変更を確認できます。

## まとめ

Jekyll はセットアップが軽く、Markdown で記事を書けば静的サイトが完成します。GitHub Pages への公開まで含めて無料で完結するので、まずは手元の Mac で動かして感触をつかんでみるとよいでしょう。
