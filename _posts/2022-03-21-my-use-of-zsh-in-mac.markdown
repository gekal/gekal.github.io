---
title: "MacでZ Shellをカスタマイズして効率をアップさせる"
layout: post
date: 2022-03-21T09:32:44+0900
categories: blogs
tags: ["zsh", "mac"]
---

## Z Shell

Z shell（ズィーシェル、zsh）は、Unixのコマンドシェルの1つである。対話的なログインコマンドシェルとしても、強力なシェルスクリプトコマンドのインタープリターとしても使うことができる。

https://ja.wikipedia.org/wiki/Z_Shell

macOS Catalina からは、デフォルトシェルが bash から zsh に変更されていました。

https://support.apple.com/ja-jp/HT208050

## 環境設定

1. zshのインストール

    ```shell
    # 基本的にインストール不要ですが、下記のコマンドでインストールできます。
    $ brew install zsh
    ```
2. カレントシェルの確認・修正

    ```shell
    # 使えるシェルの一覧の確認
    $ cat /etc/shells
    # List of acceptable shells for chpass(1).
    # Ftpd will not allow users to connect who are not using
    # one of these shells.

    /bin/bash
    /bin/csh
    /bin/dash
    /bin/ksh
    /bin/sh
    /bin/tcsh
    /bin/zsh
    /usr/local/bin/pwsh

    # カレントシェルの確認
    $ echo $SHELL
    # カレントシェルの修正
    $ chsh -s /bin/zsh
    ```

3. oh-my-zsh

    ```shell
    sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
    ```

## プラグイン

### git

gitはデフォルトで有効されています。
gitのあるフォルダーに移動すると、カレントブランチが表示されます。gitをいざと操作する時、大変参考になります。

### zsh-autosuggestions

同じコマンドで何回実行しないといけないと思います。

1. インストール

    ```shell
    git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
    ```

2. コンフィグ

    **`~/.zshrc`**

    ```shell
    plugins=( 
        # other plugins...
        zsh-autosuggestions
    )
    ```

## おまけ

### よければ俺のzshrcのコンフィグをご参照ください

https://raw.githubusercontent.com/gekal/environment-configurations/main/mac.zshrc
