---
title: Gradle 入門
subtitle: インストールから基本タスクまで、Gradle の使い始めを整理する
layout: post
date:   2019-07-24T11:00:00+0900
categories: blogs
tags: gradle build java
---

## Gradle とは

Gradle は、Groovy（または Kotlin）の DSL でビルドスクリプトを記述できるビルドシステムです。Java の世界では Maven の後継的に広く使われており、依存関係の解決からコンパイル・テスト・パッケージングまでを自動化できます。Android アプリの標準ビルドツールでもあります。

## 環境構築（Windows）

1. [Gradle](https://gradle.org/releases/) をダウンロードして解凍する（例：`gradle-5.5.1-bin.zip`）

2. 環境変数を設定する

    | 変数 | 値 | 種別 |
    | --- | --- | --- |
    | `GRADLE_HOME` | 解凍先のパス | 新規 |
    | `Path` | `%GRADLE_HOME%\bin` | 追記 |

3. インストールを確認する

    ```powershell
    $ gradle -v

    ------------------------------------------------------------
    Gradle 5.5.1
    ------------------------------------------------------------
    Kotlin:       1.3.31
    Groovy:       2.5.4
    JVM:          11.0.2 (Oracle Corporation)
    OS:           Windows 10 amd64
    ```

> 実際のプロジェクトでは、Gradle 本体をインストールせずに **Gradle Wrapper**（`gradlew` / `gradlew.bat`）を使うのが一般的です。プロジェクトごとに指定されたバージョンの Gradle が自動でダウンロードされ、環境差異を避けられます。

## タスクの確認

Gradle の操作単位は「タスク」です。プロジェクトで利用できるタスクは以下で一覧できます。

```bash
gradle tasks
```

## よく使うタスク

日常的に使うのは、ごく一部です。まずは次のあたりを押さえておけば十分です。

| タスク | 説明 |
| --- | --- |
| `build` | ビルドとテストをまとめて実行する |
| `assemble` | 成果物（jar など）を生成する（テストは行わない） |
| `test` | ユニットテストを実行する |
| `check` | test を含む各種検証を実行する |
| `clean` | `build` ディレクトリを削除する |
| `run` | アプリケーションとして実行する（application プラグイン） |
| `jar` | main クラスを含む jar を生成する |
| `javadoc` | Javadoc を生成する |
| `dependencies` | 依存関係をツリー表示する |
| `init` | 新しい Gradle ビルドを初期化する |
| `wrapper` | Gradle Wrapper のファイル群を生成する |

## 典型的なワークフロー

新規プロジェクトを作って動かすまでの流れは、おおむね次のようになります。

```bash
# プロジェクトの雛形を作成
gradle init

# 依存関係を確認したいとき
gradle dependencies

# ビルド＋テスト
gradle build

# アプリを実行
gradle run
```

依存関係の解決やタスクの依存グラフは Gradle が面倒を見てくれるので、`gradle build` を実行すれば、必要なコンパイルやテストが自動的に順序立てて実行されます。
