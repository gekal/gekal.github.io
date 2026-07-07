---
title: 独自ドメインでアリババクラウドの無料メールを使う
subtitle: gekal.cn の独自ドメインメールを設定した記録
layout: post
date:   2018-11-13T01:05:00+0900
categories: blogs
tags: alibaba-cloud mail dns
---

## はじめに

先日、中国向けの独自ドメイン `gekal.cn` を取得しました。アリババクラウド（阿里云）では、ドメインに無料のメールサービス（企業メール）が付いてくるため、`xxx@gekal.cn` のような独自ドメインメールを無料で使えます。

サービスの詳細は公式ドキュメントを参照してください。
[https://help.aliyun.com/product/35466.html](https://help.aliyun.com/product/35466.html)

この記事では、独自ドメインメールを使えるようにするための設定をまとめます。

## メールの設定

### DNS レコードの設定

まず、ドメインの DNS に以下のレコードを追加します。SPF（TXT）と MX でメールの送受信経路を、CNAME で各プロトコルのホスト名を指定します。

| レコードタイプ | ホスト | 値 |
| --- | --- | --- |
| TXT | @ | `v=spf1 include:spf.mxhichina.com -all` |
| MX | @ | `mxw.mxhichina.com` |
| MX | @ | `mxn.mxhichina.com` |
| CNAME | imap | `imap.mxhichina.com` |
| CNAME | mail | `mail.mxhichina.com` |
| CNAME | smtp | `smtp.mxhichina.com` |
| CNAME | pop3 | `pop3.mxhichina.com` |

### POP / SMTP / IMAP の接続情報

メールクライアントから接続する際のサーバー情報は以下のとおりです。

| プロトコル | ホスト | ポート | SSL ポート |
| --- | --- | --- | --- |
| POP | `pop3.mxhichina.com` | 110 | 995 |
| IMAP | `imap.mxhichina.com` | 143 | 993 |
| SMTP | `smtp.mxhichina.com` | 25 | 465 |

> 独自ドメイン名をサーバーホストとして使うこともできますが、その場合は証明書の検証で問題が出ることがあります。上記の `mxhichina.com` 系のホストを指定するほうが無難です。

### Web からのログイン

ブラウザからも利用できます。

- メールの Web ログイン画面： [https://qiye.aliyun.com/](https://qiye.aliyun.com/)
- 管理コンソール（DingTalk）： [https://oa.dingtalk.com](https://oa.dingtalk.com)

## おわりに

これで独自ドメインのメールが使えるようになりました。DNS レコードと接続情報を一度整理しておくと、クライアントの設定やトラブル時の確認がスムーズになります。
