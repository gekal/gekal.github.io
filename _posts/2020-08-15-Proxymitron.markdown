---
title: Window で Proxomitron (ProxN45j) 導入して、気楽にプロキシの峠を飛び越え
subtitle: Scott R. Lemmonが開発したWindows上で動作するプロキシソフトウェア
layout: post
auther: gekal
date:   2020-08-15T16:19:00+0900
categories: blogs
tags: Proxomitron ProxN45j 導入 認証
# background: '/img/posts/01.jpg'
---

## 認証付きプロキシのお悩み

エンタープライズ企業のネットワークなら、インターネットへのアクセスは、プロキシを通すのは、一般ではないか思います。

その中、認証付きのプロキシは、大半を占めていると思われます。

セキュリティのため、一部のツール（例：jdk 8u111）は、HTTPS接続する際のトンネリングに Basic 認証を利用することができません。

> (定期的なパスワードの面倒を減らす理由も有ります。)

## Proxomitron のセットアップ

### ダウンロード

<http://proxomitron.sakura.ne.jp/download.html>

1. zip 版
2. インストーラ

> Windowsに余計なものをインストールしたくない方は zip 版を使っても結構です。

### App 起動

展開した zip ファイル中の 「Proxomitron.exe」をクリックして起動する。

設定したりの作業があるので、Windows右下のクイックスタートメニューから、 Proxomitron ロゴを右メニューの [open proxomitron]を選びください。

LOGO: ![Proxomitron ロゴ](/assets/imgs/blogs/2020-08-15/ProxomitronLogo.jpg)

### リモートプロキシコンフィグ

1. Remote Proxy を有効する。

    ![Remote Proxy を有効する。](/assets/imgs/blogs/2020-08-15/proxomitron-enable-remote-proxy.png)

2. HTTP Proxy を追加する。

    ![HTTP Proxy を追加する。](/assets/imgs/blogs/2020-08-15/proxomitron-add-remote-proxy.png)

3. Proxy 認証情報を設定する。

    ![Proxy 認証情報を設定する。](/assets/imgs/blogs/2020-08-15/proxomitron-open-remote-proxy-advanced-setting.png)

    ![Proxy 認証情報を設定する。](/assets/imgs/blogs/2020-08-15/proxomitron-open-remote-proxy-auth.png)

> これで、Proxomitronプロキシの設定は終わりました。  
> 後、設定の保存を忘れないでね。

### その他の設定

他の設定は色々がありますが、今回は割愛します。

ただ、デフォルトのポートは 8080 なので、Tomcatなどの Web サーバーはよく利用するので、衝突の場合、適当に空いているポートに変換ください。

## プロキシのテスト

| 設定   | 値        |
| ------ | --------- |
| server | localhost |
| port   | 8080      |

1. ブラウザ
2. Java VM 系の App

    ```conf
    -Dhttp.proxyHost=localhost
    -Dhttp.proxyPort=8080
    -Dhttps.proxyHost=localhost
    -Dhttps.proxyPort=8080
    -Dhttps.nonProxyHosts=localhost|127.0.0.1
    ```

3. 環境変数利用のツール

    ```powershell
    SETX HTTP_PROXY http://loalhost:8080
    SETX HTTPS_PROXY http://loalhost:8080
    ```

## 参照先

1. [Proxomitron導入ガイド](http://site.halfmoon.jp/movielist/29.html)
