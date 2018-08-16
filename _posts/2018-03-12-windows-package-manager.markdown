---
layout: post
title:  "Windowsのパッケージ管理ツール"
date:   2018-03-12T10:20:00+0900
categories: blogs
tags: choco package
---

# 前書き

最近、Chocoを使って、ソフトウェアのインストール・更新をやりました。すごく便利だと思います。  
手頃な使い方を整理しようと思われます。

# Chocolateyのインストール方法

**管理者権限**で、下記のPSコマンドを実行してください。

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

本家サイトのインストール手順が[ここ](https://chocolatey.org/install)を参照ください。

**プロキシが必要な場合、下記のPSスクリプトを実行ください。**
```powershell
# プロキシ設定
$proxyServer = "<HOSTNAME>:<PORTNUMBER>"
$proxyUser = "<USERNAME>"
$proxyPassword = "<PASSWORD>"

# WebRequest用プロキシ設定
$passwordSecure = ConvertTo-SecureString $proxyPassword -AsPlainText -Force
$creds = New-Object System.Management.Automation.PSCredential $proxyUser, $passwordSecure
$proxy = New-Object System.Net.WebProxy $proxyServer
$proxy.Credentials = $creds
[System.Net.WebRequest]::DefaultWebProxy = $proxy

# Chocoインストール用プロキシ
$env:chocolateyProxyUser = $user
$env:chocolateyProxyPassword = $password
$env:chocolateyProxyLocation = $proxyServer

# Chocoインストール処理
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```
# パッケージのインストール方法

jdk8のインストールを例にして、説明します。

```powershell
# 長いコマンド
choco install jdk8 -y
# 短いコマンド
cinst jdk8 -y
```

**プロキシが必要な社内環境の場合、下記のプロキシ設定を追加ください**

```powershell
choco config set proxy "<HOSTNAME>:<PORTNUMBER>"
choco config set proxyUser "<USERNAME>"
choco config set proxyPassword "<PASSWORD>"
```

```powershell
choco config unset proxy
choco config unset proxyUser
choco config unset proxyPassword
```

# よく利用するコマンド

## インストール  

```powershell
choco install pkgName
# cinst pkgName
```

## アンインストール  

```powershell
choco uninstall pkgName
# cuninst pkgName
```

## パッケージ更新

```powershell
choco upgrade pkgName
# cup pkgName
```

## インストールしたパッケージの調べ  

```powershell
choco list -l
# clist pkgName
```
