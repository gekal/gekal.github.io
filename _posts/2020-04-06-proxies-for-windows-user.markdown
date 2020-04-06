---
title: Windowsプロキシとの戦い
layout: post
auther: gekal
date:   2020-04-07T00:09:00+0900
categories: blogs
tags: windows proxy
---

## プロキシとは

IT用語辞典から定義は牡蠣となります。

    プロキシとは、企業などの内部ネットワークとインターネットの境界にあり、内部のコンピュータの「代理」（proxy）としてインターネット上のコンピュータへ接続を行うコンピュータのこと。また、そのような機能を持つサーバソフトウェア。

企業のネットワークの業界のやつですね。
内部ネットにある端末をインターネットをアクセスする時、セキュリティーの観点からプロキシサーバーを通るのは、必須です。

## プロキシの設定要素

1. プロキシのホスト名またはIP
2. プロキシのポート
3. ユーザー名
4. パスワード
5. プロキシ対象外ホスト（no proxy）

## プロキシ設定

> 事前に定義ずみの変数

```bat
SET proxy_host=proxyserver
SET proxy_port=port
SET proxy_user=user
SET proxy_pass=pass
```

### Windows環境のプロキシ

1. プロキシの環境数設定

    ```bat
    SETX http_proxy  http://%proxy_user%:%proxy_pass%@%proxy_host%:%proxy_port%
    SETX https_proxy  http://%proxy_user%:%proxy_pass%@%proxy_host%:%proxy_port%
    SETX no_proxy  %no_proxy%
    ```

2. Powershell

    > Powershellのプロファイルに書き込む。
    >> %USERPROFILE%\Documents\WindowsPowerShell\Profile.ps1

    ```powershell
    # プロキシ設定
    $proxyServer = $Env:proxy_host+":"+$Env:proxy_port
    $proxyUser = $Env:proxy_user
    $proxyPassword = $Env:proxy_pass

    # WebRequest用プロキシ設定
    $passwordSecure = ConvertTo-SecureString $proxyPassword -AsPlainText -Force
    $creds = New-Object System.Management.Automation.PSCredential $proxyUser, $passwordSecure
    $proxy = New-Object System.Net.WebProxy $proxyServer
    $proxy.Credentials = $creds
    [System.Net.WebRequest]::DefaultWebProxy = $proxy
    ```

### WSL(Ubuntu)環境のプロキシ

## 参照

1. [IT用語辞典：プロキシ  【 Proxy 】  プロクシ / プロキシサーバ / proxy server](http://e-words.jp/w/%E3%83%97%E3%83%AD%E3%82%AD%E3%82%B7.html)
1. [wiki:プロキシ](https://ja.wikipedia.org/wiki/%E3%83%97%E3%83%AD%E3%82%AD%E3%82%B7)
