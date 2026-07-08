---
title: "Markdown記事にクリップボードのキャプチャーを楽に貼り付けよう(Paste Imageの紹介)"
layout: post
date: 2022-03-22T17:17:53+0900
categories: blogs
tags: ["vscode", "clipboard", "image"]
---

## Markdownはサクサク書けますが、スクリーンショットの貼り付けは苦労しています。

Markdownにスクリーンショットを入れると、毎回下記のような手順で実施しています。

1. スクリーンショットをとります。
2. 取ったスクリーンショットを画像ファイルとして保存します。
3. 画像をカレントプロジェクトのあるフォルダーにコピーします。
4. Markdownに画像を引用します。

大量のキャプチャーを取るとき、疲れます。

何かツールがあるか調べたところ、下記のVS Codeプラグインを見つかりました。

https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image

![vscode paste image](/assets/imgs/zenn/vscode-markdown-paste-image-from-clipboard/vscode-paste-image.gif)
*公式のサンプル*

## Paste Image

VS Codeの拡張一覧から「Paste Image」を検索して、プラグインの詳細ペースからインストールできます。

### コンフィグ

「[GitHubリポジトリでZennのコンテンツを管理する](https://zenn.dev/zenn/articles/connect-to-github)」のリポジトリ構造にて、設定をカストマイズしています。

1. キャプチャーを「/images/」の配下に保存します。
2. 記事毎にフォルダーを切りたくて、記事のMarkdownファイル名として、サブフォルダーを切ります。
3. 画像ファイル名を編集する可能性が高いため、確認のダイアログを表示します。

**`${projectRoot}/.vscode/settings.json`**

```json
{
    "pasteImage.namePrefix": "",
    "pasteImage.defaultName": "Y-MM-DD-HH-mm-ss",
    "pasteImage.path": "${projectRoot}/images/${currentFileNameWithoutExt}",
    "pasteImage.basePath": "${projectRoot}",
    "pasteImage.prefix": "/",
    "pasteImage.showFilePathConfirmInputBox": true,
    "pasteImage.filePathConfirmInputBoxMode": "onlyName",
}
```

### 基本的な使い方

1. スクリーンショットをクリップボードに保存します。

    - Windows: Windowns + shift + s
    - Mac: Command + Shift + 4

2. Markdownの適切な場所に貼り付けます。

    - Windows: Ctrl + Alt + V
    - Mac: Command + Option + V)

## おまけ

下記のルールで、イメージが作成されます。

1. 何も選択してない場合、ファイル名はカレント時間（フォーマット：Y-MM-DD-HH-mm-ss）です。
2. 文字列を選択した場合、選択した文字はファイル名です。
