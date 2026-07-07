---
title: HUAWEI 端末で USB デバッグを有効にする
subtitle: HiSuite の導入から開発者オプション・HDB 許可までの手順
layout: post
date:   2019-07-27T11:00:00+0900
categories: blogs
tags: huawei android usb-debug
---

## はじめに

Android アプリを実機でデバッグするには USB デバッグを有効にする必要があります。HUAWEI 端末は独自の **HDB（Huawei Debug Bridge）** 許可が絡むため、一般的な Android とは少し手順が異なります。ここでは HUAWEI 端末で実機デバッグを有効にするまでの流れをまとめます。

## HiSuite のインストール（PC 側）

1. [Huawei HiSuite](http://consumer.huawei.com/minisite/hi-suite/) をダウンロードする
2. zip を解凍してインストーラを実行する（デフォルト設定で問題ありません）
3. 初回起動時に更新を求められたら、更新しておく

## 開発者オプションを有効にする

1. 「設定」を開く
2. 「システム」→「端末情報」を開く
3. 「ビルド番号」を連打する
4. 「デベロッパーになりました」というトーストが表示されれば有効

## HiSuite の HDB 許可を設定する

1. 「設定」→「セキュリティとプライバシー」を開く
2. 「その他の設定」を開く
3. 「HiSuite の HDB 許可」をオンにする

## USB デバッグを有効にする

1. 「設定」→「システム」→「開発者オプション」を開く
2. デバッグ項目の以下をオンにする
    - USB デバッグ
    - 「充電のみ」モードでの ADB デバッグを許可する

## PC からの接続を許可する

端末を USB で接続すると、PC からの接続を許可するかどうかの確認が表示されます。

![HUAWEI HDB 有効化オプション](/assets/imgs/blogs/2019-07-27/huawei-android-HDB-option.jpg)

> 特別な理由がなければ「この PC からの接続を常に許可する」をオンにしておくと、以降は毎回確認されずに済みます。

これで、Android 実機でのデバッグが有効になりました。

## 動作確認

[Flutter の環境構築（Windows）](/posts/2019-07-25-flutter-isntall-windows/)で作ったサンプルアプリを、今度は実機で動かして確認します。

```powershell
flutter create myapp
cd myapp
flutter run
```

![Flutter サンプルアプリの実行結果](/assets/imgs/blogs/2019-07-25/flutter-sample-starter-app.png)

## 参照

1. [Huawei P20 Pro で実機デバッグ](https://dalomo.net/blog/2018/09/24/81/)
