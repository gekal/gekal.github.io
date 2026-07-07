---
title: VS Code の REST Client で API を叩く
subtitle: テキストファイルに書いた HTTP リクエストをそのまま送信する拡張機能
layout: post
date:   2020-04-05T16:33:00+0900
categories: blogs
tags: vscode rest-client api
---

## RESTful API とは

RESTful API とは、Web システムを外部から利用するための呼び出し規約（API）の一種で、**REST（Representational State Transfer）** と呼ばれる設計原則に従って策定されたものです。REST そのものは適用範囲の広い抽象的なモデルですが、一般的には REST の考え方を Web API に適用したものを RESTful API と呼びます。

こうした API を手軽にテストするツールといえば Postman や curl が定番ですが、VS Code で作業しているなら **REST Client 拡張** が非常に便利です。リクエストをテキストファイルに書いて、その場で送信できます。

## REST Client 拡張のインストール

VS Code の Extensions タブで「REST Client」を検索してインストールします。

![VS Code に REST Client をインストールする](/assets/imgs/blogs/2020-04-05/rest-client-extension-for-vscode.png)

## プロキシについて

社内ネットワークなどでプロキシが必要な場合でも、REST Client は **VS Code のプロキシ設定を利用する** ため、VS Code 側でプロキシを設定済みなら追加設定は不要です。

> プロキシの一般的な指定形式：`http://username:passwd@proxyserver:8080`

## 使い方

### ファイルの拡張子

リクエストは、以下のいずれかの拡張子のファイルに記述します。

- `.rest`
- `.http`

### Hello World

まずはシンプルな GET リクエストを書いてみます（[サンプルファイル](/assets/rest-client/2020-04-05/hello-world.rest)）。

```http
### hello world
GET https://www.gekal.cn/ HTTP/1.1
```

### リクエストの送信

リクエスト定義の直前に表示される「Send Request」をクリックすると、その場で送信され、レスポンスが別ペインに表示されます。

![REST Client でリクエストを送信する](/assets/imgs/blogs/2020-04-05/rest-client-to-send-request.png)

### curl コマンドの生成

VS Code を使えない環境向けに、リクエストを **curl コマンドに変換** することもできます。

```bash
curl --request GET \
  --url https://www.gekal.cn/
```

### コードスニペットの生成

Java、C#、Node.js、Python など、各言語のリクエストコードも生成できます。以下は Node.js の例です。

```javascript
var http = require("https");

var options = {
  "method": "GET",
  "hostname": "www.gekal.cn",
  "port": null,
  "path": "/",
  "headers": {}
};

var req = http.request(options, function (res) {
  var chunks = [];
  res.on("data", function (chunk) { chunks.push(chunk); });
  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
```

## まとめ

リクエストをファイルとして残せるので、API 仕様の共有やリポジトリ管理にも向いています。VS Code で開発しているなら、Postman を開かずに完結できるのが大きな利点です。

## 参照

1. [RESTful API【 REST API 】＠IT 用語辞典](http://e-words.jp/w/RESTful_API.html)
2. [REST Client（VS Code 拡張）](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
