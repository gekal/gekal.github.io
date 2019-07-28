---
title: HUAWEI端末のUSBデバッグ
layout: post
date:   2019-07-27T11:00:00+0900
categories: blogs
tags: huawei andorid usb debug
---

## Huawei HiSuiteのインストール

1. [Huawei HiSuite](http://consumer.huawei.com/minisite/hi-suite/)をダウンロード
2. zipファイルを解凍して、インストールを実行
   > デフォル設定でも問題がありません。
3. 初回起動時、更新が尋ねる場合、更新ください。

## 開発者向けオプション

1. 「設定」をタップ
2. 「システム」をタップ
3. 「端末情報」をタップ
4. 「ビルド番号」を連打
5. 「デベロッパーになりました」的なトーストが表示される

## HiSuiteのHDB許可を取り消し

1. 「設定」をタップ
2. 「セキュリティとプライバシー」をタップ
3. 「端末情報」をタップ
4. 「その他の設定」をタップ
5. 「HiSuiteのHDB許可を取り消し」をオンに設定

## USBデバッグモード

1. 「設定」をタップ
2. 「システム」をタップ
3. 「開発者オプション」をタップ
4. デバッグカテゴリーの下記のオプションをオンにする
    1. USBデバッグ
    2. 充電専用モードADBデバッグを許可する

## PCからHiSuiteの許可

![HUAWEI-HDB有効オプション](/assets/imgs/blogs/2019-07-27/huawei-android-HDB-option.jpg)

> 特別な理由がない限り、「このPCからのHiSuite接続を常に許可する」をオンにするでしょう。

---

これで、アンドロイド実機のデバッグが有効にしました。

---

## 動作確認

> [Flutter環境構築（Windows）]({% post_url 2019-07-25-flutter-isntall-windows %})の動作確認サンプルで確認

```powershell
flutter create myapp
cd myapp
flutter run
```

![Flutterサンプル結果](/assets/imgs/blogs/2019-07-25/flutter-sample-starter-app.png)

## 参照

1. [Huawei P20 Proで実機デバッグ](https://dalomo.net/blog/2018/09/24/81/)
