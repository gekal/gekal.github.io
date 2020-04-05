---
title: VSCodeでREST Clientを使いましょう
layout: post
auther: gekal
date:   2020-04-05T16:33:00+0900
categories: blogs
tags: VSCode Rest Client
---

## RESTful APIとは

RESTful APIとは、Webシステムを外部から利用するためのプログラムの呼び出し規約（API）の種類の一つで、RESTと呼ばれる設計原則に従って策定されたもの。RESTそのものは適用範囲の広い抽象的なモデルだが、一般的にはRESTの考え方をWeb APIに適用したものをRESTful APIと呼んでいる。

REST: Representational State Transfer

## VSCodeにREST Clientの拡張を追加

ExtensionsタグでREST Clientを検索して、インストールください。

![VSCodeにREST Clientをインストールする](/assets/imgs/blogs/2020-04-05/rest-client-extension-for-vscode.png)

## プロキシ

エントプライズの方々は、プロキシの問題を直面しなければなりません。
REST ClientはVSCodeをプロキシを使ってるので、すでにセットした方は追加の設定は不要です。

> プロキシの一般のフォーマット
>>　<http://username:passwd@proxyserver:8080>

## 使い方

### ファイルの拡張子

> 下記のいずれかの拡張子です。

- .rest
- .http

### [Hello world](/assets/rest-client/2020-04-05/hello-world.rest)

```rest
### hello world
GET https://www.gekal.cn/ HTTP/1.1
```

#### リクエストの送信

RESTリクエスト定義の前に「send request」を押せば、レクエストを送信できる。

![VSCodeにREST Clientをインストールする](/assets/imgs/blogs/2020-04-05/rest-client-to-send-request.png)

#### CRULコマンド生成

VSCodeを使えない環境の場合、CURLコマンドを生成すれば、実行すれば、楽だようね。
REST Clientの拡張は、CURLコマンドを生成できるよ。

```bash
curl --request GET \
  --url https://www.gekal.cn/
```

#### ソースコード生成

Java, C#, Nodejs, Pythonなどを対応しています。

> 例：Nodejsのソースコードを生成しました。

```nodejs
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

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
```

## 参照

1. [RESTful API【 REST API 】＠IT用語字典](http://e-words.jp/w/RESTful_API.html)
2. [REST Client for VSCode Extensions](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
