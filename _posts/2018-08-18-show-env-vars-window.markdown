---
layout: post
title:  "コマンドで環境変数の画面を開き"
date:   2018-08-18T23:08:00+0900
categories: blogs
tags: windows Environment Variables
---

# なぜコマンドラインなの

    環境変数を変更したい場合、Windowsの画面を利用する人が少ないでしょう。
    毎回メニューから開きます。メニューの階層が深いため、うんざりします。
    コマンドラインの便利さを借りて、できればいいなと思います。

# コマンドラインの利用準備

1. コマンドバッチ

    > ファイル名：　envars.cmd
    ```cmd
    @ECHO OFF
    start rundll32.exe sysdm.cpl,EditEnvironmentVariables >NULL
    ```

2. どこに置くか

    > コマンドラインに通れば、どこでも  
    > 俺が下記のフォルダに置きました。  
    >> C:\Windows\System32


# コマンドラインの試し

コマンドラインにコマンド(envars)を実行すれば、環境変数の画面ができていきます

![結果画面](../assets/imgs/blogs-20180818-envars-run-result.jpg)
