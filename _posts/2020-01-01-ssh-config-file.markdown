---
title: SSHコンフィグファイル
layout: post
date:   2020-01-01T15:25:00+0900
categories: blogs
tags: SSH Config file
---

## SSH config file

SSHコマンドを使うチャンスが増えたので、SSHコンフィグの内容をちょっと纏めます。

## サンプル

1. キー認証

    ```config
    Host 别名
    HostName ホスト名
    User ユーザー名
    Port ポート
    UserKnownHostsFile /dev/null
    StrictHostKeyChecking no
    PasswordAuthentication no
    IdentityFile アイデンティティーファイルパス
    IdentitiesOnly yes
    LogLevel FATAL
    ```

2. パスワード認証

    ```config
    Host 别名
    HostName ホスト名
    User ユーザー名
    Port ポート
    UserKnownHostsFile /dev/null
    StrictHostKeyChecking no
    PasswordAuthentication yes
    IdentitiesOnly yes
    LogLevel FATAL
    ```

## 参照

1. [OpenSSH SSH client configuration files](https://linux.die.net/man/5/ssh_config)
