---
title: Macのパッケージ管理ツール - brew
layout: post
date:   2018-11-09T09:05:00+0900
categories: blogs
tags: mac brew package manager
---

## 初めに

Macを利用するなら、Homebrewを知らないといけないため、Homebrewの使い方を整理します。

## Homebrewとは

Homebrew（ホームブルー）は、macOSオペレーティングシステム上でソフトウェアの導入を単純化するパッケージ管理システムのひとつである。
※ [wikipediaにより](https://ja.wikipedia.org/wiki/Homebrew_(パッケージ管理システム))

## Homebrewのインストール

```bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
==> This script will install:
/usr/local/bin/brew
/usr/local/share/doc/homebrew
/usr/local/share/man/man1/brew.1
/usr/local/share/zsh/site-functions/_brew
/usr/local/etc/bash_completion.d/brew
/usr/local/Homebrew

Press RETURN to continue or any other key to abort
==> /usr/bin/sudo /bin/mkdir -p /Library/Caches/Homebrew
Password:
==> /usr/bin/sudo /bin/chmod g+rwx /Library/Caches/Homebrew
==> /usr/bin/sudo /usr/sbin/chown gekal /Library/Caches/Homebrew
==> Downloading and installing Homebrew...
remote: Enumerating objects: 155, done.
remote: Counting objects: 100% (155/155), done.
remote: Compressing objects: 100% (34/34), done.
remote: Total 206 (delta 121), reused 151 (delta 119), pack-reused 51
Receiving objects: 100% (206/206), 70.76 KiB | 418.00 KiB/s, done.
Resolving deltas: 100% (123/123), completed with 47 local objects.
From https://github.com/Homebrew/brew
   f625d7ca7..d06795fd7  master     -> origin/master
HEAD is now at d06795fd7 Merge pull request #5190 from MikeMcQuaid/rubocop-cask
==> Migrating /Library/Caches/Homebrew to /Users/gekal/Library/Caches/Homebrew...
==> Deleting /Library/Caches/Homebrew...
Already up-to-date.
==> Installation successful!

==> Homebrew has enabled anonymous aggregate formulae and cask analytics.
Read the analytics documentation (and how to opt-out) here:
  https://docs.brew.sh/Analytics.html

==> Homebrew is run entirely by unpaid volunteers. Please consider donating:
  https://github.com/Homebrew/brew#donations
==> Next steps:
- Run `brew help` to get started
- Further documentation:
    https://docs.brew.sh
$ brew --version
Homebrew 1.8.2
Homebrew/homebrew-core (git revision 101e1; last commit 2018-11-09)
Homebrew/homebrew-cask (git revision 01853; last commit 2018-11-09)
```

* 詳細を[本家サイト](https://brew.sh/index_ja)をご参考ください。

## Homebrewのサブコマンド一覧

> コマンドで確認すると、下記のコメントが有ります。

```bash
$ brew commands
Built-in commands
--cache          --version        command          diy              home             list             outdated         reinstall        switch           uninstall        update           vendor-install
--cellar         analytics        commands         doctor           info             log              pin              search           tap              unlink           update-report
--env            cask             config           fetch            install          migrate          postinstall      sh               tap-info         unpack           update-reset
--prefix         cat              deps             gist-logs        leaves           missing          prune            shellenv         tap-pin          unpin            upgrade
--repository     cleanup          desc             help             link             options          readall          style            tap-unpin        untap            uses

Built-in developer commands
audit               bump-formula-pr     edit                formula             linkage             mirror              pull                ruby                test                update-test
bottle              create              extract             irb                 man                 prof                release-notes       tap-new             tests

External commands
aspell-dictionaries
```

ざっと見ると、多いですね。当然、全部覚える必要が有りません。
よく利用するので、

![brewコマンド](/assets/svg/brew.svg)

## 終わり

Macを楽々に使いましょう。

## 参照

1. [Homebrew Documentation](https://docs.brew.sh/)
