---
title: "Resin アプリケーションサーバー"
layout: post
date: 2023-05-20T11:32:51+0900
categories: blogs
tags: ["resin", "JavaEE"]
---

## Resinとは

Resinは米Caucho Technology社が開発しているオープンソースのWebサーバ兼Javaアプリケーションサーバである。

## Resin 環境構築

### 前提環境

- JDK --> Temurin-11.0.16.1+1 (build 11.0.16.1+1)

### Resin 取得

> [こちら](https://caucho.com/products/resin/download)から`resin pro`をダウンロードしてください。

> **⚠️ 注意**
>
> ライセンスがないと、一部の機能が制限されていますが、勉強用としては問題ないかと思います。

### Resin 起動

1. Linux

    ```bash
    ./bin/resin.sh start
    ```

2. Windows

    ```powershell
    .\bin\start.bat
    ```

3. Javaから起動

    ```bash
    java -jar lib/resin.jar start
    ```

<details><summary>起動ログ例</summary>

```log
Resin Professional 4.0.66 (built Mon, 29 Nov 2021 04:23:00 PST)
Copyright(c) 1998-2012 Caucho Technology.  All rights reserved.

  Resin Professional has not found any valid licenses.
  Licenses belong in c:\web\resin-pro-4.0.66\licenses.
  See http://www.caucho.com/resin/sales for licensing information.

[23-05-20 13:25:02.968] {main}   Resin Professional has not found any valid licenses.
                         Licenses belong in c:\web\resin-pro-4.0.66\licenses.
                         See http://www.caucho.com/resin/sales for licensing information.

Starting Resin on Sat, 20 May 2023 13:25:02 +0900 (JST)

[23-05-20 13:25:03.104] {main} <proxy-cache> requires Resin Professional.  Please see http://www.caucho.com for Resin Professional information and licensing.
[23-05-20 13:25:03.169] {main}
[23-05-20 13:25:03.169] {main} Resin Professional 4.0.66 (built Mon, 29 Nov 2021 04:23:00 PST)
[23-05-20 13:25:03.169] {main}
[23-05-20 13:25:03.169] {main} Windows 10 10.0 amd64
[23-05-20 13:25:03.169] {main} OpenJDK Runtime Environment 11.0.16.1+1, MS932, ja
[23-05-20 13:25:03.169] {main} OpenJDK 64-Bit Server VM 11.0.16.1+1, 64, mixed mode, Eclipse Adoptium
[23-05-20 13:25:03.169] {main}
[23-05-20 13:25:03.169] {main} user.name  = liuhy
[23-05-20 13:25:03.233] {main}
[23-05-20 13:25:03.242] {main} server listening to view-localhost:6800
[23-05-20 13:25:03.244] {main}
[23-05-20 13:25:03.310] {main} Table[mnode:2,c:\web\resin-pro-4.0.66\resin-data\app-0\distcache\mnode.db] validating indexes due to unclean shutdown.
[23-05-20 13:25:03.330] {main} Table[data:3,c:\web\resin-pro-4.0.66\resin-data\app-0\distcache\data.db] validating indexes due to unclean shutdown.
[23-05-20 13:25:03.342] {main}
[23-05-20 13:25:03.343] {main} resin.home = c:\web\resin-pro-4.0.66
[23-05-20 13:25:03.343] {main} resin.root = c:\web\resin-pro-4.0.66
[23-05-20 13:25:03.343] {main} resin.conf = c:\web\resin-pro-4.0.66\conf\resin.xml
[23-05-20 13:25:03.343] {main}
[23-05-20 13:25:03.343] {main} server    = 127.0.0.1:6800 (app:app-0)
[23-05-20 13:25:03.343] {main} stage      = production
[23-05-20 13:25:03.645] {resin-31} WebApp[production/webapp/default/resin-admin] active
[23-05-20 13:25:03.676] {resin-33} WebApp[production/webapp/default/ROOT] active
[23-05-20 13:25:03.853] {resin-34} WebApp[production/webapp/default/resin-doc] active
[23-05-20 13:25:03.854] {main} Host[production/host/default] active
[23-05-20 13:25:03.854] {main} ServletService[id=app-0,cluster=app] active
[23-05-20 13:25:03.854] {main}
[23-05-20 13:25:03.855] {main} http listening to *:8080
[23-05-20 13:25:03.855] {main}
[23-05-20 13:25:03.856] {main} Resin[id=app-0] started in 1624ms
[23-05-20 13:25:28.336] {resin-port-8080-39} Loading .tld files from global classpath
[23-05-20 13:25:29.390] {resin-port-8080-39} In-place class redefinition (HotSwap) is available.
```

</details>

### Resin のリンク一覧

| Column1      | URL                                  | Column3      |
| ------------ | ------------------------------------ | ------------ |
| アプリ       | <http://localhost:8080/>             |              |
| ドキュメント | <http://localhost:8080/resin-doc/>   |              |
| 管理画面     | <http://localhost:8080/resin-admin/> |              |
| watchdog     | <http://localhost:6600/>             | 使い方要調査 |

## 参照

1. [caucho](https://caucho.com/)
2. [Web Application Server の起動・停止](https://document.intra-mart.jp/library/iap/public/setup/iap_setup_guide/texts/start_end/index.html#windows)
3. [Resin Webサーバ/Javaアプリケーションサーバ](http://itref.fc2web.com/technology/resin.html)
