---
title: Window で Proxomitron(ProxN45j) 導入して、気楽にプロキシの峠を飛び越え
layout: post
auther: gekal
date:   2020-08-15T16:19:00+0900
categories: blogs
tags: Proxomitron ProxN45j 導入 認証
---

## 認証付きプロキシのお悩み

エンタープライズ企業のネットワークなら、インターネットへのアクセスは、プロキシを通すのは、一般ではないか思います。

その中、認証付きのプロキシは、大半を占めていると思われます。

## Proxomitron のセットアップ

### ダウンロード

<http://proxomitron.sakura.ne.jp/download.html>

1. zip 版
2. インストーラ

> Windowsに余計なものをインストールしたくない方は zip 版を使っても結構です。

### App 起動

展開した zip ファイル中の 「Proxomitron.exe」をクリックして起動する。

設定したりの作業があるので、Windows右下のクイックスタートメニューから、 Proxomitron ロゴを右メニューの [open proxomitron]を選びください。

LOGO: ![Proxomitron ロゴ](../assets/imgs/blogs/2020-08-15/ProxomitronLogo.jpg)

### リモートプロキシコンフィグ

1. Remote Proxy を有効する。

    ![Remote Proxy を有効する。](../assets/imgs/blogs/2020-08-15/proxomitron-enable-remote-proxy.png)

2. HTTP Proxy を追加する。

    ![HTTP Proxy を追加する。](../assets/imgs/blogs/2020-08-15/proxomitron-add-remote-proxy.png)

3. Proxy 認証情報を設定する。

    ![Proxy 認証情報を設定する。](../assets/imgs/blogs/2020-08-15/proxomitron-open-remote-proxy-advanced-setting.png)

    ![Proxy 認証情報を設定する。](../assets/imgs/blogs/2020-08-15/proxomitron-open-remote-proxy-auth.png)

## 参照先

1. [Proxomitron導入ガイド](http://site.halfmoon.jp/movielist/29.html)
