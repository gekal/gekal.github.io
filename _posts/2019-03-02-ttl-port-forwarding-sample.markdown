---
title: Tera Term マクロで SSH 自動ログイン＋ポートフォワード
subtitle: TTL スクリプトで踏み台へのログインと転送設定を自動化する
layout: post
date:   2019-03-03T00:10:00+0900
categories: blogs
tags: teraterm ssh port-forwarding
---

## はじめに

Windows から Linux サーバーへ SSH でログインするとき、Tera Term を使う人は多いと思います。毎回ホスト名・ポート・鍵を指定してログインし、さらにポートフォワードを設定するのは手間です。

Tera Term には **TTL（Tera Term Language）** というマクロ機能があるので、これを使ってログインとポートフォワードを自動化してみます。転送設定は外部ファイルに切り出しておき、接続先ごとに書き換えるだけで使い回せるようにします。

## 検証環境

- [Windows 10](https://www.microsoft.com/ja-jp/windows)
- [Tera Term 4.x](https://ja.osdn.net/projects/ttssh2/)

## 自動ログインスクリプト

接続情報を先頭で定義し、鍵ファイルのパスを組み立て、転送設定ファイルを読み込んで接続コマンドを生成する、という流れです。

`ssh_connect.ttl`

```
;=============================================
; Filename    : ssh_connect.ttl
; Description : SSH Auto login
; Author      : gekal
; Created     : 2019/03/02
;==============================================
;; 接続先ホスト／ポート／ユーザ名／鍵ファイル
HOSTADDR = '99.99.99.99'
HOSTPORT = '22'
USERNAME = 'whoami'
KEY_FILE = 'sample.pem'

;==============================================
;; マクロを配置したフォルダの絶対パスを取得
getdir MACRO_DIR
;; 鍵ファイルのフルパスを生成
strconcat KEY_FILE_PATH MACRO_DIR
strconcat KEY_FILE_PATH '\'
strconcat KEY_FILE_PATH KEY_FILE
;==============================================

;==============================================
;; フォワード設定の読み込み
PORTS_FOWARD = ''
fileopen fhandle 'forwords.list' 0
while 1
   filereadln fhandle line
   if result=1 then
       break
   endif
   ; 空白行はスキップ
   strcompare line ''
   if result != 0 then
       ; 「;」で始まる行はコメントなのでスキップ
       strmatch line '^;.*$'
       if result == 0 then
           ; 2 件目以降はカンマ区切りで連結
           strcompare PORTS_FOWARD ''
           if result != 0 then
               strconcat PORTS_FOWARD ','
           endif
           strconcat PORTS_FOWARD line
       endif
   endif
endwhile
fileclose fhandle
;==============================================

;; ① 接続コマンドの組み立て
COMMAND = HOSTADDR
strconcat COMMAND ':'
strconcat COMMAND HOSTPORT
strconcat COMMAND ' /ssh /2 /auth=publickey /user='
strconcat COMMAND USERNAME
strconcat COMMAND ' /keyfile="'
strconcat COMMAND KEY_FILE_PATH
strconcat COMMAND '"'

;; ポートフォワードの追加
strcompare PORTS_FOWARD ''
if result != 0 then
   strconcat COMMAND ' /ssh-L'
   strconcat COMMAND PORTS_FOWARD
endif

;; ② 接続
connect COMMAND

;; ③ マクロ終了
end
```

## 転送設定ファイル

ポートフォワードは `forwords.list` に 1 行 1 設定で記述します。`ローカルポート:転送先IP:転送先ポート` の形式です。

`forwords.list`

```
;; >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
;; 設定の説明
;;     1. 「;」で始まる行はコメント
;;     2. 空行は無視される
;;     3. 転送設定の書式
;;         ローカルポート:転送先IP:転送先ポート
;; <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

; サンプル
; 9999:10.00.00.00:9999
```

## ダウンロード

一式のサンプルは[こちら](/assets/archives/ttl_sample.zip)からダウンロードできます。

## おわりに

一度マクロにしてしまえば、接続先やポート転送が増えても設定ファイルを書き換えるだけで済みます。日々の作業を少しずつ自動化し、開発環境をコード化していきたいところです。
