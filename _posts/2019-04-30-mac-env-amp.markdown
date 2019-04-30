---
title: Mac中のPHPの実行環境
layout: post
date:   2019-04-30T16:00:00+0900
categories: blogs
tags: mac apache php
---

## 前書き

PHPの動作環境には、LAMPが有名ですが、Macには、ApacheとPHPがプレインストールされたので、超楽だと思います。

> インストールされたバージョン

```bash
# OSバージョン
$ sw_vers
ProductName:    Mac OS X
ProductVersion: 10.14.4
BuildVersion:   18E226

# Apache
$ httpd -v
Server version: Apache/2.4.34 (Unix)
Server built:   Feb 22 2019 19:30:04

# PHP
$ php -v
PHP 7.1.23 (cli) (built: Feb 22 2019 22:08:13) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.1.0, Copyright (c) 1998-2018 Zend Technologies
```

## Apacheの使い方

### よく利用するコマンド

```bash
# 開始
sudo apachectl start
# 再起動
sudo apachectl restart
# 停止
sudo apachectl stop

# 優雅な起動
sudo apachectl graceful
# 優雅な停止
sudo apachectl graceful-stop

# そのほかのオプションいは、下記のコマンドでご確認ください。
apachectl -h
```

### コンフィグ

#### コンフィグファイル

> コンフィグファイルの配置先: /private/etc/apache2/

```bash
$ ll /private/etc/apache2/
total 168
drwxr-xr-x  25 root  wheel    800 11 23 11:21 extra
-rw-r--r--   1 root  wheel  21150 11 23 11:13 httpd.conf
-rw-r--r--   1 root  wheel  20905  2  7  2017 httpd.conf.pre-update
-rw-r--r--   1 root  wheel  21084 12 16  2017 httpd.conf~previous
-rw-r--r--   1 root  wheel  13077  8 18  2018 magic
-rw-r--r--   1 root  wheel  61118  8 18  2018 mime.types
drwxr-xr-x   4 root  wheel    128  8 18  2018 original
drwxr-xr-x   3 root  wheel     96  8 18  2018 other
drwxr-xr-x   3 root  wheel     96 11 23 11:20 users
```

#### DocumentRoot

> DocumentRoot: /Library/WebServer/Documents

```bash
$ cat /private/etc/apache2/httpd.conf | grep "^DocumentRoot"
DocumentRoot "/Library/WebServer/Documents"
```

> テスト用ファイル： /Library/WebServer/Documents/index.php

```php
<?php
phpinfo();
?>
```

> 結果確認

<http://localhost/index.php>

![PHP導入なし](/assets/imgs/blogs/2019-04-30/apahce-result-confim-nosupport-php.png)

## PHP導入

### PHPモジュールのロードをアンコメント

```bash
# ファイル編集
$ sudo vi /private/etc/apache2/httpd.conf

# start ------------------------------------------------------
177 #LoadModule php7_module libexec/apache2/libphp7.so
⬇️⬇️⬇️⬇️⬇️⬇️⬇️
177 LoadModule php7_module libexec/apache2/libphp7.so
# end --------------------------------------------------------

Apacheの再起動
sudo apachectl restart
```

### 環境の再確認

![PHP導入済み](/assets/imgs/blogs/2019-04-30/apahce-result-confim-with-php.png)

## 最後に

愛用のOSがCentosですが、手元の端末がMacなので、PHPの動作環境をちょっと整理しました。

Mysqlには、Dockerを利用しようと思います。ここには、割愛させて頂きます。
