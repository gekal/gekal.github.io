---
layout: post
title: "Windows のパッケージ管理ツール Chocolatey"
subtitle: コマンド一発でソフトのインストールと更新をまとめて自動化する
date:   2018-03-12T10:20:00+0900
categories: blogs
tags: windows chocolatey package
---

## Chocolatey とは

Chocolatey（チョコレイティ）は Windows 向けのパッケージ管理ツールです。macOS の Homebrew や Linux の `apt` / `yum` に相当するもので、ソフトウェアのインストール・アップデート・アンインストールをすべてコマンドラインから実行できます。

GUI で「サイトを開いてインストーラをダウンロードし、ウィザードをクリックしていく」という手順を、`choco install <パッケージ名>` の一行に置き換えられるのが最大の魅力です。複数のマシンを同じ構成でセットアップしたいときや、環境をコード化して再現したいときに特に威力を発揮します。

## Chocolatey のインストール

**管理者権限の PowerShell** を開き、以下のコマンドを実行します。

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

最新の手順は[公式のインストールガイド](https://chocolatey.org/install)を確認してください。

### プロキシ環境下でのインストール

社内ネットワークなどプロキシ経由でしかインターネットに出られない環境では、インストール前にプロキシ情報を設定しておく必要があります。以下のスクリプトの `<HOSTNAME>` などを自分の環境に合わせて書き換えてから実行してください。

```powershell
# プロキシ設定
$proxyServer = "<HOSTNAME>:<PORTNUMBER>"
$proxyUser = "<USERNAME>"
$proxyPassword = "<PASSWORD>"

# WebRequest 用プロキシ設定
$passwordSecure = ConvertTo-SecureString $proxyPassword -AsPlainText -Force
$creds = New-Object System.Management.Automation.PSCredential $proxyUser, $passwordSecure
$proxy = New-Object System.Net.WebProxy $proxyServer
$proxy.Credentials = $creds
[System.Net.WebRequest]::DefaultWebProxy = $proxy

# Chocolatey インストール用プロキシ
$env:chocolateyProxyUser = $proxyUser
$env:chocolateyProxyPassword = $proxyPassword
$env:chocolateyProxyLocation = $proxyServer
$env:chocolateyUseWindowsCompression = 'true'

# Chocolatey インストール処理
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

## パッケージのインストール

ここでは JDK 8 を例に説明します。`-y` を付けると確認プロンプトを省略できます。

```powershell
# 長いコマンド
choco install jdk8 -y
# 短いエイリアス
cinst jdk8 -y
```

プロキシが必要な社内環境では、次のように Chocolatey 自体にプロキシを設定しておくと便利です。

```powershell
choco config set proxy "<HOSTNAME>:<PORTNUMBER>"
choco config set proxyUser "<USERNAME>"
choco config set proxyPassword "<PASSWORD>"
```

設定を解除したいときは `unset` を使います。

```powershell
choco config unset proxy
choco config unset proxyUser
choco config unset proxyPassword
```

## よく使うコマンド

| 操作 | コマンド | エイリアス |
| --- | --- | --- |
| インストール | `choco install <pkg>` | `cinst <pkg>` |
| アンインストール | `choco uninstall <pkg>` | `cuninst <pkg>` |
| アップグレード | `choco upgrade <pkg>` | `cup <pkg>` |
| インストール済み一覧 | `choco list -l` | `clist -l` |

すべてを一括更新したいときは `choco upgrade all -y` が便利です。定期的に実行するだけで、インストール済みのソフトを最新の状態に保てます。

## まとめ

Chocolatey を使うと、Windows のソフト管理が Linux/macOS と同じ感覚でコマンド化できます。手順書に「このサイトからダウンロードして…」と書く代わりに `choco install` の一覧を残しておけば、セットアップの再現性が一気に高まります。

## 参照

1. [Chocolatey 公式サイト](https://chocolatey.org/)
2. [Chocolatey のインストール手順](https://chocolatey.org/install)
