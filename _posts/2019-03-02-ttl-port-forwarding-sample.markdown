---
title: SSH自動ログインの話(teraterm)
layout: post
date:   2019-03-03T00:10:00+0900
categories: blogs
tags: teraterm auto port forwarding
---

# 前書き

Windowのユーザなら、LinuxにSSHログインするとき、何を使いますか。Teratermを選べますでしょうか。ログインの自動処理シェルを作成したと思います。

# 検証環境

- [Windows 10](https://www.microsoft.com/ja-jp/store/b/windows)
- [Teraterm 4.*](https://ja.osdn.net/projects/ttssh2/)

# Teratermの自動ログイン

## TTLスクリプト

> 自動ログインスクリプト

```ttl:ssh_connect.ttl
;============================================= 
; Filename    : ssh_connect.ttl
; Description : SSH Auto login
; Author      : gekal
; Created     : 2019/03/02
; modified    : 
;============================================== 
;; 接続先ホスト／接続先ポート／ユーザ名／パスワード設定 
HOSTADDR = '99.99.99.99' 
HOSTPORT = '22' 
USERNAME = 'whoami'
KEY_FILE = 'sample.pem'

;============================================== 
;; マクロを配置したフォルダの絶対パス取得
getdir MACRO_DIR
;; 鍵ファイルパス生成
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
   ; 空白行のスキップする。
   strcompare line ''
   if result != 0 then
       ; 文字(;)始まるものがコメントのため、スキップする。
       strmatch line '^;.*$'
       if result == 0 then
           ; レコード間、カンマ区切りを置く。
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

;; ①コマンド組立て 
COMMAND = HOSTADDR 
strconcat COMMAND ':' 
strconcat COMMAND HOSTPORT 
strconcat COMMAND ' /ssh /2 /auth=publickey /user=' 
strconcat COMMAND USERNAME
strconcat COMMAND ' /keyfile="' 
strconcat COMMAND KEY_FILE_PATH
strconcat COMMAND '"'

;; ポートフォワードの設定
strcompare PORTS_FOWARD ''
if result != 0 then 
   strconcat COMMAND ' /ssh-L'
   strconcat COMMAND PORTS_FOWARD
endif

;; ②接続 
connect COMMAND
 
;; ③マクロ終了 
end
```

> 転送設定

```teraterm:forwords.list
;; >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
;; 設定の説明
;;     １．;で始まる行がコメントである。
;;     ２．空行が無視させれる。
;;     ３．転送設定
;;         ローカルポート：転送先IP：転送先ポート
;; <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

; サンプル
; 9999:10.00.00.00:9999
```

## ダウンロード

TTLのサンプルを[ここ](/assets/archives/ttl_sample.zip)からダウンロード下さい。

# 終わりに

自動化が凄いなので、自分が日々自動化を考えて、開発環境をコード化に頑張ろうか思います。
