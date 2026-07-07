---
title: Windows でのプロキシ設定との戦い
subtitle: 認証付きプロキシ環境で各ツールにプロキシを行き渡らせる
layout: post
date:   2020-04-07T00:09:00+0900
categories: blogs
tags: windows proxy wsl
---

## プロキシとは

> プロキシとは、企業などの内部ネットワークとインターネットの境界にあり、内部のコンピュータの「代理」（proxy）としてインターネット上のコンピュータへ接続を行うコンピュータのこと。また、そのような機能を持つサーバソフトウェア。
>
> — IT 用語辞典

企業ネットワークでは、社内端末からインターネットへアクセスする際、セキュリティの観点からプロキシサーバーを経由するのが一般的です。開発者にとっては、この「認証付きプロキシ」に各ツールを対応させるのが地味に大変です。ここでは Windows と WSL でのプロキシ設定をまとめます。

## プロキシ設定に必要な要素

1. プロキシのホスト名または IP
2. プロキシのポート
3. ユーザー名
4. パスワード
5. プロキシ対象外のホスト（no proxy）

以降の例では、あらかじめ次の変数を定義しておくものとします。

```bat
SET proxy_host=proxyserver
SET proxy_port=port
SET proxy_user=user
SET proxy_pass=pass
```

## Windows でのプロキシ設定

### 環境変数

多くの CLI ツールは環境変数 `http_proxy` / `https_proxy` を参照します。`SETX` で永続化しておきます。

```bat
SETX http_proxy  http://%proxy_user%:%proxy_pass%@%proxy_host%:%proxy_port%
SETX https_proxy http://%proxy_user%:%proxy_pass%@%proxy_host%:%proxy_port%
SETX no_proxy    localhost,127.0.0.1
```

### PowerShell

PowerShell の `Invoke-WebRequest` などにプロキシを効かせるには、プロファイル（`%USERPROFILE%\Documents\WindowsPowerShell\Profile.ps1`）に以下を書いておきます。

```powershell
# プロキシ設定
$proxyServer = $Env:proxy_host + ":" + $Env:proxy_port
$proxyUser = $Env:proxy_user
$proxyPassword = $Env:proxy_pass

$passwordSecure = ConvertTo-SecureString $proxyPassword -AsPlainText -Force
$creds = New-Object System.Management.Automation.PSCredential $proxyUser, $passwordSecure
$proxy = New-Object System.Net.WebProxy $proxyServer
$proxy.Credentials = $creds
[System.Net.WebRequest]::DefaultWebProxy = $proxy
```

## WSL（Ubuntu）でのプロキシ設定

WSL 側でも、シェルの起動時に環境変数を設定しておきます。`~/.bashrc`（または `~/.profile`）の末尾に追記します。

```bash
# ~/.bashrc
export http_proxy="http://user:pass@proxyserver:port"
export https_proxy="$http_proxy"
export no_proxy="localhost,127.0.0.1"

# 大文字版を参照するツール向け
export HTTP_PROXY="$http_proxy"
export HTTPS_PROXY="$https_proxy"
export NO_PROXY="$no_proxy"
```

`apt` は環境変数とは別に設定が必要な場合があります。その場合は `/etc/apt/apt.conf.d/proxy.conf` を作成します。

```conf
Acquire::http::Proxy  "http://user:pass@proxyserver:port";
Acquire::https::Proxy "http://user:pass@proxyserver:port";
```

## 補足：認証付きプロキシがつらいとき

ツールによっては、URL 埋め込みのユーザー名・パスワード（Basic 認証）に対応していないものがあります。その場合は、ローカルで動くプロキシ中継ソフトを挟むと解決できることがあります（別記事の [Proxomitron 導入](/posts/2020-08-15-Proxymitron/) を参照）。

## 参照

1. [IT 用語辞典：プロキシ](http://e-words.jp/w/%E3%83%97%E3%83%AD%E3%82%AD%E3%82%B7.html)
2. [Wikipedia：プロキシ](https://ja.wikipedia.org/wiki/%E3%83%97%E3%83%AD%E3%82%AD%E3%82%B7)
