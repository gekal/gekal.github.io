---
title: SSH の config ファイルを使いこなす
subtitle: 接続情報を ~/.ssh/config にまとめて short name で SSH する
layout: post
date:   2020-01-01T15:25:00+0900
categories: blogs
tags: ssh config
---

## SSH の config ファイルとは

SSH コマンドを使う機会が増えてくると、毎回ホスト名・ユーザー名・ポート・鍵ファイルを指定するのが面倒になります。`~/.ssh/config` に接続設定を書いておけば、`ssh <別名>` だけで接続できるようになります。設定内容をここで整理しておきます。

主なディレクティブは以下のとおりです。

| 項目 | 説明 |
| --- | --- |
| `Host` | 接続時に指定する別名（エイリアス） |
| `HostName` | 実際のホスト名または IP アドレス |
| `User` | ログインユーザー名 |
| `Port` | 接続ポート |
| `IdentityFile` | 使用する秘密鍵のパス |
| `IdentitiesOnly` | config で指定した鍵だけを使う |
| `PasswordAuthentication` | パスワード認証の有効／無効 |
| `StrictHostKeyChecking` | ホスト鍵の検証を行うか |
| `UserKnownHostsFile` | known_hosts の保存先 |
| `LogLevel` | ログの詳細度 |

## サンプル

### 鍵認証の場合

```
Host 別名
  HostName ホスト名
  User ユーザー名
  Port ポート
  IdentityFile 秘密鍵のパス
  IdentitiesOnly yes
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  LogLevel FATAL
```

### パスワード認証の場合

```
Host 別名
  HostName ホスト名
  User ユーザー名
  Port ポート
  IdentitiesOnly yes
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication yes
  LogLevel FATAL
```

> `UserKnownHostsFile /dev/null` と `StrictHostKeyChecking no` は、頻繁に作り直す検証用サーバー向けの設定です。ホスト鍵の検証を無効化するため、本番サーバーには使わないでください（中間者攻撃を検知できなくなります）。

上記のように書いておけば、あとは `ssh 別名` で接続できます。`scp` や VS Code の Remote-SSH など、SSH を使う他のツールもこの設定を参照してくれるのが便利なポイントです。

## 参照

1. [ssh_config — OpenSSH SSH client configuration files](https://linux.die.net/man/5/ssh_config)
