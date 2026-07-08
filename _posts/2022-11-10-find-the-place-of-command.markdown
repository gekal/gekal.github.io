---
title: "コマンド場所探す"
layout: post
date: 2022-11-10T18:04:46+0900
categories: blogs
tags: ["where", "command"]
---

## 前下記

時々コマンドを探す必要があります。

## コマンド探すのコマンド

### Windows

1. CMD

    ```cmd
    where cmd
    C:\Windows\System32\cmd.exe
    ```

2. Posershell

    ```powershell
    $ Get-Command powershell

    CommandType     Name                                               Version    Source
    -----------     ----                                               -------    ------
    Application     powershell.exe                                     10.0.19... C:\WINDOWS\System32\WindowsPowerShell\v1.0\powershell.exe
    ```

### Linux

```bash
$ where bash
/usr/bin/bash
/bin/bash
```
