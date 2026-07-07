---
title: Flutter の環境構築（Windows）
subtitle: 1 つのコードベースからマルチプラットフォームアプリを作る準備
layout: post
date:   2019-07-25T11:00:00+0900
categories: blogs
tags: flutter windows
---

## Flutter とは

> Flutter is Google's portable UI toolkit for building beautiful, natively-compiled applications for mobile, web, and desktop from a single codebase.

Flutter は Google が開発したポータブルな UI ツールキットです。最大の魅力は、**1 つのソースコードから複数プラットフォームのネイティブアプリにコンパイルできる** 点です。

- モバイル（Android / iOS）
- Web
- デスクトップ

ここでは Windows での開発環境の構築手順をまとめます。

## 環境構築（Windows）

### Visual Studio Code

普段の開発は VS Code で行います。

1. [Visual Studio Code](https://code.visualstudio.com/) をダウンロードしてインストール
2. **Flutter 拡張機能** をインストール

### Android Studio

開発は VS Code で行いますが、Android SDK やエミュレータのために Android Studio も入れておきます。

1. [Android Studio](https://developer.android.com/studio) をダウンロードしてインストール
2. **Flutter プラグイン** をインストール
3. AVD マネージャーで Android エミュレータを作成して起動

### Flutter SDK

1. [Flutter SDK](https://flutter.dev/docs/get-started/install/windows) をダウンロード
2. 任意のフォルダに解凍する（例：`C:\tools\flutter`）

    > SDK 自体が GitHub リポジトリのクローンになっており、`flutter upgrade` で更新できます。

3. 環境変数を設定する

    | 変数 | 値 | 種別 |
    | --- | --- | --- |
    | `FLUTTER_HOME` | 解凍先のパス | 新規 |
    | `Path` | `%FLUTTER_HOME%\bin` | 追記 |

4. バージョンを確認する

    ```powershell
    $ flutter --version
    Flutter 1.7.8+hotfix.3 • channel stable
    Tools • Dart 2.4.0
    ```

5. `flutter doctor` で環境を診断する

    初回はライセンス同意を求められるので、すべて同意します（`flutter doctor --android-licenses`）。

    ```powershell
    $ flutter doctor
    [√] Flutter (Channel stable, v1.7.8+hotfix.3)
    [√] Android toolchain - develop for Android devices (Android SDK version 29.0.1)
    [√] Android Studio (version 3.4)
    [√] VS Code (version 1.31.1)
    [√] Connected device (1 available)

    • No issues found!
    ```

    すべて `[√]` になれば準備完了です。

## サンプルアプリで動作確認

新規プロジェクトを作成して実行します。

```powershell
# プロジェクトを作成
flutter create myapp

# 実行（エミュレータまたは実機を接続しておく）
cd myapp
flutter run
```

エミュレータ上にカウンターアプリのサンプルが起動すれば成功です。

![Flutter サンプルアプリの実行結果](/assets/imgs/blogs/2019-07-25/flutter-sample-starter-app.png)

## 参照

1. [Flutter 公式サイト](https://flutter.dev/)
