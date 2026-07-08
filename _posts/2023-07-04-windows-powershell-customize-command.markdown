---
title: "Powershellでカスタマイズコマンドを作成してみよう"
layout: post
date: 2023-07-04T22:38:15+0900
categories: blogs
tags: ["Powershell", "Windows"]
---

## PowerShellとは

現在のWindowsのオペレーティングシステム（OS）に標準搭載されている、拡張可能なコマンドラインインターフェース（CLI）です。
PowershellはDotNetの全ての機能を使えますので、何でもできると思います。

PowerShellの機能だけを利用すれば、簡単な機能を拡張出来るでしょうか。

## カスタマイズコマンド追加の手順

### スクリプトの場所をPath通すように

例として、`C:\tools\bin`をPathに追加します。

### コマンド例

1. base64コマンド

    ```powershell
    $ base64 test
    dGVzdA==
    $ base64 -D dGVzdA==
    test
    ```

> `base64.ps1`スクリプト

https://github.com/gekal/developer-tools/blob/main/bin/base64.ps1

2. xmlコマンド

    ```powershell
    # 正規化する。
    $ xml C:\tmp\test.xml -Indent 4
    # 圧縮する。
    $ xml C:\tmp\test.xml -Compression
    ```

> `xml.ps1`スクリプト

https://github.com/gekal/developer-tools/blob/main/bin/xml.ps1
