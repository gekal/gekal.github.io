---
title: "Gitで管理しているソースの改行コードに注意"
layout: post
date: 2022-07-23T11:57:22+0900
categories: blogs
tags: ["git", "autocrlf", "LF", "CRLF"]
---

## 改行コード

| 改行コード名        | 改行コード | OS            |
| ------------------- | ---------- | ------------- |
| LF(Line Feed)       | `\n`       | UNIX系全般    |
| CR(Carriage Return) | `\r`       | Mac OS(9以前) |
| CRLF                | `\r\n`     | Windows系全般 |

## 改行コード不一致のトラブル

チームで開発する時、改行コードを統一しないと、不注意にトラブルが発生する恐れがあります。

1. スクリプト実施不可

    - Linuxのシェルの改行コードがLFではないと、実行できません。
    - 逆にWindowsのコマンドスクリプトの改行コードがCRLFではないと、実行出ません。

2. 差分比較不可

    ソースを修正してないのに、改行が違う場合、行の差分は出ています。
    実際の変更内容は見づらくなります。

## ローカル開発時の改行コードのプラクティス

### Gitクライアントのデフォルト動きの制御

> グローバルのコンフィグ(core.autocrlf)をコンフィグする

| 設定  | チェックアウト時 | コミット時 |
| ----- | ---------------- | ---------- |
| true  | LF -> CRLF       | CRLF -> LF |
| input | 変換しない       | CRLF -> LF |
| false | 変換しない       | 変換しない |

> コンフィグ修正のコマンドです。
> ```bash
> # Windows で作業をする場合
> git config --global core.autocrlf true
> # Linux や Mac などの行末に LF を使うシステムで作業をしている場合
> git config --global core.autocrlf input
> # 単一種類の端末の場合
> git config --global core.autocrlf false
> ```

### リポジトリに`.gitattributes`で制御

リポジトリのルートフォルダーに`.gitattributes`を追加して、ソースの改行コードを制御します。

> Java開発のサンプル例：

**`.gitattributes`**

```properties
# デフォルトの改行コードをLFにする。
* text=auto eol=lf

# Linuxシェル
*.sh    text eol=lf

# Windowsシェル
*.bat   text eol=crlf
*.cmd   text eol=crlf
*.ps1   text eol=crlf

# 完全にバイナリで変更すべきでないファイルをすべて示す。
*.png   binary
*.jpg   binary
*.jar   binary

# ビルドツールのLinux用シェル
mvnm    text eol=lf
gradlew text eol=lf
```

## 参照

1. [気をつけて！Git for Windowsにおける改行コード](https://qiita.com/uggds/items/00a1974ec4f115616580)
2. [行終端を処理するようGitを設定する](https://docs.github.com/ja/get-started/getting-started-with-git/configuring-git-to-handle-line-endings)
3. [Git のカスタマイズ - Git の属性](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA-Git-%E3%81%AE%E5%B1%9E%E6%80%A7)
