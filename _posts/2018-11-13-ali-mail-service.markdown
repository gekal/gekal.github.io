---
title: アリババのメールサービス
layout: post
date:   2018-11-13T01:05:00+0900
categories: blogs
tags: ali mail dingding
---

# 前書き

先日からgekal.cnの中国のドメインを購入しました。無料のメールサービスも付いています。
詳細は下記のURLを参考ください。
[https://help.aliyun.com/product/35466.html](https://help.aliyun.com/product/35466.html)
gmail,hotmailなど

# メールの設定

## DNSの設定

| レコードタイプ | 記録レコード | 記録値                                |
| -------------- | ------------ | ------------------------------------- |
| TXT            | @            | v=spf1 include:spf.mxhichina.com -all |
| MX             | @            | mxw.mxhichina.com                     |
| MX             | @            | mxn.mxhichina.com                     |
| CNAME          | imap         | imap.mxhichina.com                    |
| CNAME          | mail         | mail.mxhichina.com                    |
| CNAME          | smtp         | smtp.mxhichina.com                    |
| CNAME          | pop3         | pop3.mxhichina.com                    |

## POP\SMTP\IMAPの接続情報

| プロトコール | ホスト             | ポート | SSLポート |
| ------------ | ------------------ | ------ | --------- |
| POP          | pop3.mxhichina.com | 110    | 995       |
| IMAP         | imap.mxhichina.com | 143    | 993       |
| SMTP         | pop3.mxhichina.com | 25     | 465       |

> 上記以外にも、個人ドメインでも行けますか、証明証の問題があります。上記のホストを使った方が無難です。

## Webログイン

### メールログイン画面
        
[https://qiye.aliyun.com/](https://qiye.aliyun.com/)

### 管理コンソール

[https://oa.dingtalk.com](https://oa.dingtalk.com)

# 終りに

今回独自のDomainのMailを使えるようになりました。メールの設定に関しても、ちょっと整理ました。
