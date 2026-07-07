---
title: Mac 標準の Apache と PHP で実行環境を作る
subtitle: プリインストールされた Apache・PHP を使って手早く PHP を動かす
layout: post
date:   2019-04-30T16:00:00+0900
categories: blogs
tags: mac apache php
---

## はじめに

PHP の実行環境というと LAMP（Linux + Apache + MySQL + PHP）が有名ですが、macOS には **Apache と PHP が最初から入っている** ため、追加インストールなしで手軽に PHP を動かせます。

まずは標準で入っているバージョンを確認します。

```bash
# OS バージョン
$ sw_vers
ProductName:    Mac OS X
ProductVersion: 10.14.4

# Apache
$ httpd -v
Server version: Apache/2.4.34 (Unix)

# PHP
$ php -v
PHP 7.1.23 (cli)
```

> 補足：macOS Monterey（12）以降では PHP が同梱されなくなりました。新しい macOS では `brew install php` などで別途導入してください。この記事は PHP が同梱されていた頃の内容です。

## Apache の基本操作

Apache は `apachectl` コマンドで制御します。

```bash
# 起動
sudo apachectl start
# 再起動
sudo apachectl restart
# 停止
sudo apachectl stop

# 設定を反映しつつ無停止で再起動（graceful）
sudo apachectl graceful
```

## 設定ファイルとドキュメントルート

設定ファイルは `/private/etc/apache2/` 以下にあり、本体は `httpd.conf` です。

```bash
$ ls /private/etc/apache2/
extra   httpd.conf   magic   mime.types   original   other   users
```

公開ディレクトリ（DocumentRoot）は `httpd.conf` で確認できます。

```bash
$ grep "^DocumentRoot" /private/etc/apache2/httpd.conf
DocumentRoot "/Library/WebServer/Documents"
```

動作確認用に、ドキュメントルートへ PHP ファイルを置きます。

```php
// /Library/WebServer/Documents/index.php
<?php
phpinfo();
```

この時点でブラウザから <http://localhost/index.php> を開くと、PHP がまだ有効になっていないため、コードがそのまま表示されてしまいます。

![PHP モジュール読み込み前](/assets/imgs/blogs/2019-04-30/apahce-result-confim-nosupport-php.png)

## PHP モジュールを有効にする

`httpd.conf` で PHP モジュールのロード行のコメントを外します。

```apache
# 変更前
#LoadModule php7_module libexec/apache2/libphp7.so

# 変更後（先頭の # を削除）
LoadModule php7_module libexec/apache2/libphp7.so
```

Apache を再起動して反映します。

```bash
sudo apachectl restart
```

再度ブラウザで開くと、今度は `phpinfo()` が正しく実行され、PHP の情報ページが表示されます。

![PHP モジュール読み込み後](/assets/imgs/blogs/2019-04-30/apahce-result-confim-with-php.png)

## おわりに

普段は CentOS を使っていますが、手元の端末が Mac なので、標準の Apache・PHP でさっと環境を整えました。データベースが必要な場合は、MySQL を Docker で立てるのが手軽でおすすめです（本記事では割愛します）。
