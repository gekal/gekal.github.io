---
title: OpenAPI 仕様（OAS）の概要
subtitle: REST API を言語非依存で記述する標準仕様と Swagger ツール群
layout: post
date:   2019-01-11T23:05:00+0900
categories: blogs
tags: swagger api openapi oas
---

## OpenAPI 仕様（OAS）とは

OpenAPI 仕様（OpenAPI Specification, OAS）は、REST API のインターフェースを **プログラミング言語に依存しない形** で記述するための標準仕様です。

API の入出力やエンドポイントを OAS で定義しておくと、人間もコンピュータも、ソースコードや追加ドキュメント、ネットワークトラフィックの解析なしにその API の機能を理解できます。適切に定義されていれば、利用側は最小限の実装で API を呼び出せるようになり、「このパラメータは何だろう？」といった当て推量が不要になります。

もともとは **Swagger** という名前でしたが、3.0 へのバージョンアップ時に OpenAPI Specification（OAS）へと改称されました。ただし、周辺ツールの多くは今も "Swagger" の名前を冠しています。

## Swagger のツール群

OAS を扱うためのツールは充実しており、設計・可視化・コード生成まで一通り揃っています。

### オープンソースツール

1. [Swagger Editor](https://swagger.io/tools/swagger-editor/)

    OpenAPI 仕様で API を設計するためのエディタ。左に定義、右にプレビューが出る。

2. [Swagger UI](https://swagger.io/tools/swagger-ui/)

    OAS 定義を、実際に叩ける対話的な UI として可視化する。

3. [Swagger Codegen](https://swagger.io/tools/swagger-codegen/)

    OAS 定義からサーバースタブやクライアント SDK を自動生成する。

### 有償ツール

1. [SwaggerHub](https://app.swaggerhub.com)

    チームや個人向けの API 設計・ドキュメント管理プラットフォーム。

    > 個人利用なら無料プランがあります。価格は[こちら](https://swagger.io/tools/swaggerhub/pricing/)。

2. [Swagger Inspector](https://inspector.swagger.io)

    ブラウザから API を手軽にテストし、その結果から OAS 定義を生成できる。

## 参照

### 仕様書

- [OpenAPI Specification v3.0.1](http://spec.openapis.org/oas/v3.0.1.html)
- [OpenAPI Specification v2.0](http://spec.openapis.org/oas/v2.0.html)
