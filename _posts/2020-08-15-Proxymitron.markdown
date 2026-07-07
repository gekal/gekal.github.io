---
title: Proxomitron で認証付きプロキシの壁を乗り越える（Windows）
subtitle: ローカルに認証を肩代わりするプロキシを立てて各ツールを楽にする
layout: post
date:   2020-08-15T16:19:00+0900
categories: blogs
tags: proxomitron windows proxy
---

## 認証付きプロキシの悩み

エンタープライズ企業のネットワークでは、インターネットへのアクセスにプロキシを経由するのが一般的で、その多くが **認証付き** です。

これがやっかいで、一部のツール（例：古い JDK 8u111 など）は、HTTPS 接続のトンネリング時に Basic 認証を扱えません。また、パスワードが定期的に変わる環境では、あちこちのツールに認証情報を設定し直すのも手間です。

そこで役立つのが **Proxomitron** です。Windows 上で動くローカルプロキシで、**認証を肩代わりする中継役** として使えます。各ツールからは「認証なしのローカルプロキシ（localhost:8080）」に向けるだけでよくなり、認証情報の管理が一箇所にまとまります。

## Proxomitron のセットアップ

### ダウンロード

<http://proxomitron.sakura.ne.jp/download.html>

1. zip 版
2. インストーラ版

> Windows に余計なものを入れたくない場合は zip 版で十分です。

### 起動

解凍した zip の中の `Proxomitron.exe` をクリックして起動します。設定作業のため、Windows 右下のタスクトレイにある Proxomitron のロゴを右クリックし、「open proxomitron」を選びます。

![Proxomitron のロゴ](/assets/imgs/blogs/2020-08-15/ProxomitronLogo.jpg)

### リモートプロキシの設定

社内プロキシを「上流（リモート）プロキシ」として登録し、認証情報をここに設定します。

1. Remote Proxy を有効にする

    ![Remote Proxy を有効にする](/assets/imgs/blogs/2020-08-15/proxomitron-enable-remote-proxy.png)

2. HTTP Proxy を追加する

    ![HTTP Proxy を追加する](/assets/imgs/blogs/2020-08-15/proxomitron-add-remote-proxy.png)

3. プロキシの認証情報を設定する

    ![認証情報の設定 1](/assets/imgs/blogs/2020-08-15/proxomitron-open-remote-proxy-advanced-setting.png)

    ![認証情報の設定 2](/assets/imgs/blogs/2020-08-15/proxomitron-open-remote-proxy-auth.png)

> これでプロキシの設定は完了です。最後に設定の保存を忘れずに行ってください。

### その他の設定

Proxomitron には他にも多くの設定がありますが、今回は割愛します。

ひとつ注意点として、デフォルトのポートは 8080 です。Tomcat など他の Web サーバーとよく衝突するので、必要なら空いているポートに変更してください。

## 動作確認

各ツールから、ローカルの Proxomitron（`localhost:8080`）をプロキシに指定します。

| 設定 | 値 |
| --- | --- |
| server | localhost |
| port | 8080 |

**1. ブラウザ** — プロキシ設定に `localhost:8080` を指定

**2. Java VM 系のアプリ** — JVM オプションで指定

```conf
-Dhttp.proxyHost=localhost
-Dhttp.proxyPort=8080
-Dhttps.proxyHost=localhost
-Dhttps.proxyPort=8080
-Dhttp.nonProxyHosts=localhost|127.0.0.1
```

**3. 環境変数を参照するツール**

```powershell
SETX HTTP_PROXY  http://localhost:8080
SETX HTTPS_PROXY http://localhost:8080
```

いずれも認証情報が不要になり、認証は Proxomitron が上流プロキシへ肩代わりしてくれます。

## 参照

1. [Proxomitron 導入ガイド](http://site.halfmoon.jp/movielist/29.html)
