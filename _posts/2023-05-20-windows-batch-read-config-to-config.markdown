---
title: "Windows Batchで外部のコンフィグを環境変数を一括設定する。"
layout: post
date: 2023-05-20T12:14:30+0900
categories: blogs
tags: ["Windows", "Batch", "ENV"]
---

## 外部環境変数

外部環境の設定を別ファイルに切り出せば、実行環境関連の設定を別のコンフィグに切り出す必要があります。
Windows Batchファイルで読み込む処理を簡単で整理しておきます。

## Windows Batchのサンプル実装

一行ずつ読み込んで環境変数を設定します。

```powershell
@ECHO off

SETLOCAL EnableDelayedExpansion

for /f "delims=" %%a in (test.config) do (
    for /F "tokens=1,* delims=\=" %%b in ("%%a") do (
        @REM KEYが存在する場合のみ、変数を設定する。(要件にて修正してください)
        if NOT "%%b"=="" if NOT "%%c"=="" ( SET %%b=%%c )
    )
)

PAUSE
```

### ポイント解析

1. コマンド本文を出力しないようにする。

    ```powershell
    @ECHO off
    ```

2. 変数の内容を遅延展開させてる。

    ```powershell
    SETLOCAL EnableDelayedExpansion
    ```

3. 文字列を分解して、変数に設定する。

    ```powershell
    for /F "tokens=1,* delims=\=" %%b in ("%%a") do (
        # do some thing with vars(%%b %%c).
    )
    ```

### テストデータ

> 上記のバッチと同じフォルダーに置いてから実行してください。

**`test.config`**

```ini
AAA=testa
BBB=testb
CCC=testc
DDD=testd=ddd
```

## 参照

1. [バッチファイルで繰り返し処理を使う(FOR)](https://www.javadrive.jp/command/bat/index9.html)
2. [forは、ループ処理を行うコマンドです。](https://windows.command-ref.com/cmd-for.html)
