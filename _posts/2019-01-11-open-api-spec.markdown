---
title: OpenAPI仕様（OAS）概要
layout: post
date:   2019-01-11T23:05:00+0900
categories: blogs
tags: swagger api OAS OpenAPI
---

# OpenAPI仕様（OAS）とは

OpenAPI仕様（OAS）は、REST APIの標準のプログラミング言語にとらわれないインターフェース記述を定義しています。これにより、人間とコンピューターの両方が、ソースコードへのアクセス、追加資料、ネットワークトラフィックの検査を必要とせずにサービスの機能を発見および理解できます。 。 OpenAPIを介して適切に定義されている場合、コンシューマは最小限の実装ロジックでリモートサービスを理解し対話することができます。 低レベルのプログラミングのためにインターフェース記述が行ったことと同様に、OpenAPI仕様はサービスを呼び出す際の当て推量を取り除きます。

旧来の名前がSwaggerですした、３.0へバージョンアップしたとき、OAS(OpenAPI Specification)に名前が変更されました。しかし、現在のツールの名前がSwaggerの名前をつけるのはほとんどです。

# Swaggerのツール群

- Open Source Tools

    1. [Swagger Editor](https://swagger.io/tools/swagger-editor/)

        OpenAPI仕様でAPIを設計するためのAPIエディタ

    2. [Swagger UI](https://swagger.io/tools/swagger-ui/)

        対話型UIでOpenAPI仕様定義を視覚化する

    3. [Swagger Codegen](https://swagger.io/tools/swagger-codegen/)

        OpenAPI仕様の定義からサーバースタブとクライアントSDKを生成する

- Pro Tools

    1. [SwaggerHub](https://app.swaggerhub.com)

        OpenAPI仕様を扱うチームや個人のための設計およびドキュメンテーションプラットフォーム。

        ※ 個人なら、無料で使えますので、ぜひ使ってみてください。
        https://swagger.io/tools/swaggerhub/pricing/

    2. [Swagger Inspector](https://inspector.swagger.io)

        ブラウザからAPIを簡単にテストして試し、すぐにOpenAPI仕様の定義を生成します。

# 参照資料

## spec資料

- [v3.0.1](http://spec.openapis.org/oas/v3.0.1.html)
- [v2.0](http://spec.openapis.org/oas/v2.0.html)
