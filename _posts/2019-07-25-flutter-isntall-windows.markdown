---
title: Flutter環境構築（Windows）
layout: post
date:   2019-07-25T26:00:00+0900
categories: blogs
tags: flutter winodws
---

## Flutterとは

> Flutter is Google’s portable UI toolkit for building beautiful, natively-compiled applications for mobile, web, and desktop from a single codebase.

Googleが開発したポータブルのUIツールキットである。  
大きなメリットと言えば、一つのソースコードで、いろんなプラットフォームのネイティブアプリにコンパイルできる。  

* モバイル
  * Android
  * IOS
* Web
* デスクトップ

## 環境構築(Windows)

### Visual Studio Code

1. [Visual Studio Code](https://developer.android.com/studio)をダウンロードして、インストール
2. Flutterエクステンションをインストール

### Android Stadio

> 開発はVS Codeで使うが、念のため、構築します。

1. [Android Stadio](https://developer.android.com/studio)をダウンロードして、インストール
2. Flutterプラグインをインストール
3. AVDマネージャーを使って、Androidモニターを作成して起動

### Flutter

1. [Flutter](https://flutter.dev/docs/get-started/install/windows)をダウンロード
2. ダウンロードしたファイルをローカルに解凍

   > 例：C:\tools\flutter\flutter

    ***自体はGithubのクーロンであり・・・***

    <https://github.com/flutter/flutter/tree/stable>

3. 環境変数を設定

    | 変数         | 値                 | 説明 |
    | ------------ | ------------------ | ---- |
    | FLUTTER_HOME | <解凍先>           | 新規 |
    | Path         | %FLUTTER_HOME%\bin | 追記 |

4. 環境確認

    ```powershell
    $ flutter --version
    Flutter 1.7.8+hotfix.3 • channel stable • https://github.com/flutter/flutter.git
    Framework • revision b712a172f9 (2 weeks ago) • 2019-07-09 13:14:38 -0700
    Engine • revision 54ad777fd2
    Tools • Dart 2.4.0
    ```

5. Flutterの確認

    > 初回時、ライセンスの同意が求められますが、全部同意するでしょう。

    ```powershell
    $ flutter doctor
    Doctor summary (to see all details, run flutter doctor -v):
    [√] Flutter (Channel stable, v1.7.8+hotfix.3, on Microsoft Windows [Version 10.0.18362.239], locale ja-JP)

    [√] Android toolchain - develop for Android devices (Android SDK version 29.0.1)
    [√] Android Studio (version 3.4)
    [√] VS Code (version 1.31.1)
    [√] VS Code, 64-bit edition (version 1.36.1)
    [√] Connected device (1 available)

    • No issues found!
    ```

## サンプルで環境確認

1. サンプルアプリを作成

    ```powershell
    $ flutter create myapp
    Creating project myapp...
    ・・・・・・
    myapp\test\widget_test.dart (created)
    Running "flutter pub get" in myapp...                               5.1s
    Wrote 66 files.

    All done!
    [√] Flutter is fully installed. (Channel stable, v1.7.8+hotfix.3, on Microsoft Windows [Version 10.0.18362.239], locale ja-JP)
    [√] Android toolchain - develop for Android devices is fully installed. (Android SDK version 29.0.1)
    [√] Android Studio is fully installed. (version 3.4)
    [√] VS Code is fully installed. (version 1.31.1)
    [√] VS Code, 64-bit edition is fully installed. (version 1.36.1)
    [√] Connected device is fully installed. (1 available)

    In order to run your application, type:

    $ cd myapp
    $ flutter run

    Your application code is in myapp\lib\main.dart.
    ```

2. サンプルアプリ起動

    ```powershell
    $ cd myapp
    $ flutter run
    Using hardware rendering with device Android SDK built for x86 64. If you get graphics artifacts, consider enabling software rendering with "--enable-software-rendering".
    Launching lib/main.dart on Android SDK built for x86 64 in debug mode...
    Initializing gradle...                                              0.9s
    Resolving dependencies...                                           4.6s
    Running Gradle task 'assembleDebug'...
    Running Gradle task 'assembleDebug'... Done                        25.8s
    Built build\app\outputs\apk\debug\app-debug.apk.
    Installing build\app\outputs\apk\app.apk...                         3.0s
    Error connecting to the service protocol: HttpException: Connection closed before full header was received, uri = http://127.0.0.1:11982/xzsrpAX29uM=/ws
    ```

3. 結果確認

    ![Flutterサンプル結果](/assets/imgs/blogs/2019-07-25/flutter-sample-starter-app.png)

## 参照

1. [Flutter](https://flutter.dev/)
