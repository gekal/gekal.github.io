---
title: "PowerShellのProxy設定(認証あり)"
layout: post
date: 2022-03-12T17:28:07+0900
categories: blogs
tags: ["Windows", "powershell", "proxy"]
---

## プロキシ時のPowershell運用

プロキシのある社内環境でネットをアクセスする時、プロキシを設定する必要があります。

## Profileをセットして、自動反映

1. Profileの場所確認

    ```powershell
    $ Write-Host $PROFILE
    C:\Users\liu\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1
    ```

    > $PROFILE変数

    | [説明]                           | 名前                            |
    | -------------------------------- | ------------------------------- |
    | 現在のユーザー、現在のホスト     | $PROFILE                        |
    | 現在のユーザー、現在のホスト     | $PROFILE.CurrentUserCurrentHost |
    | 現在のユーザー、すべてのホスト   | $PROFILE.CurrentUserAllHosts    |
    | すべてのユーザー、現在のホスト   | $PROFILE.AllUsersCurrentHost    |
    | すべてのユーザー、すべてのホスト | $PROFILE.AllUsersAllHosts       |

2. Profileプロファイル処理

    **`Microsoft.PowerShell_profile.ps1`**

    ```powershell
    # 個別の認証情報
    $proxyUser = "<USERNAME>"
    $proxyPassword = "<PASSWORD>"
    $proxyhost = "<HOSTNAME>:<PORTNUMBER>"

    # 環境変数
    $proxyAddressWithAuthenticattion = "http://$($proxyUser):$($proxy$password)@$($proxyhost)"
    $env:http_proxy = $proxyAddressWithAuthenticattion
    $env:https_proxy = $proxyAddressWithAuthenticattion
    $env:ftp_proxy = $proxyAddressWithAuthenticattion

    # クレデンシャル設定
    $passwordSecure = ConvertTo-SecureString $proxyPassword -AsPlainText -Force
    $creds = New-Object System.Management.Automation.PSCredential $proxyUser, $passwordSecure
    $proxy = New-Object System.Net.WebProxy "http://$($proxyhost)/"
    $proxy.Credentials = $creds
    [System.Net.WebRequest]::DefaultWebProxy = $proxy
    ```

## 参照

1. [About Profiles](https://docs.microsoft.com/ja-jp/powershell/module/microsoft.powershell.core/about/about_profiles)
