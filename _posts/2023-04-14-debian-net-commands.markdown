---
title: "Debian 系OSのネットコマンド"
layout: post
date: 2023-04-14T18:07:25+0900
categories: blogs
tags: ["Debian", "Net", "DNS"]
---

## ネット情報調べツールの必要性

セキュリティとダウンロード時間の削減等の観点から最小限のライブラリーしかContainerのOSにしかインストールしていません。
ネットワークの調査時に必要な

## ネットのコマンド

```bash
apt-get install net-tools
```

### 対象コマンド

1. ifconfig
2. arp
3. route
4. netstat

## DNS系コマンド

```bash
apt-get install dnsutils
```

1. nslookup
2. dig
3. host
