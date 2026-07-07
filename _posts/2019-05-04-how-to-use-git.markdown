---
title: Git コマンドチートシート
subtitle: 日常的に使う Git コマンドを用途別に整理する
layout: post
date:   2019-05-04T19:00:00+0900
categories: blogs
tags: git version-control
---

## Git とは

Git は、ソースコードなどの変更履歴を記録・追跡するための **分散型バージョン管理システム** です。各開発者の手元にリポジトリの完全な複製があるため、オフラインでもコミットでき、複数人での並行開発にも強いのが特徴です。

ここでは、よく使うコマンドを用途別にまとめます。`git help everyday` の分類にならって整理しています。

## リポジトリの作成・取得

| コマンド | 説明 |
| --- | --- |
| `git init` | 空のリポジトリを新規作成する |
| `git clone <repo>` | 既存のリポジトリを複製する |

```bash
# リポジトリをクローン
git clone <repository url>

# ブランチを指定してクローン
git clone -b <branch> <repository url>
```

## 変更を記録する

| コマンド | 説明 |
| --- | --- |
| `git add` | 変更をインデックス（ステージ）に追加する |
| `git mv` | ファイルの移動・リネームを記録する |
| `git rm` | ファイルを削除して記録する |
| `git reset` | インデックスや HEAD の状態を戻す |
| `git commit` | 変更をリポジトリに記録する |

## 状態や履歴を確認する

| コマンド | 説明 |
| --- | --- |
| `git status` | 作業ツリーの状態を表示する |
| `git diff` | 変更内容の差分を表示する |
| `git log` | コミット履歴を表示する |
| `git show` | コミットやオブジェクトの内容を表示する |
| `git grep` | パターンに一致する行を検索する |
| `git bisect` | 二分探索でバグを混入したコミットを特定する |

## ブランチとマージ

| コマンド | 説明 |
| --- | --- |
| `git branch` | ブランチの一覧・作成・削除を行う |
| `git checkout` / `git switch` | ブランチを切り替える |
| `git merge` | 別のブランチの変更を取り込む |
| `git rebase` | 別のベースの上にコミットを積み直す |
| `git tag` | タグを作成・一覧・削除する |

```bash
# develop ブランチに切り替え
$ git checkout develop
Switched to branch 'develop'
```

## リモートとの連携

| コマンド | 説明 |
| --- | --- |
| `git fetch` | リモートのオブジェクトと参照を取得する |
| `git pull` | fetch ＋ merge をまとめて行う |
| `git push` | ローカルのコミットをリモートへ反映する |

## 作業ツリーの掃除

`git clean` は、追跡されていない（untracked な）ファイルを削除するコマンドです。**取り消せない操作** なので、まず `-n`（ドライラン）で対象を確認してから実行するのが安全です。

```bash
# 削除対象を確認するだけ（実際には消さない）
git clean -n

# 未追跡のファイルとディレクトリを削除
git clean -fd

# .gitignore の対象も含めて完全にクリーンな状態へ戻す
git clean -fdx
```

主なオプション：

- `-n` — 実際には削除せず、対象を表示するだけ
- `-d` — ファイルに加えてディレクトリも削除する
- `-f` — 実際に削除する（`--force`）
- `-x` — `.gitignore` の除外ルールを無視して削除する

## 参照

1. [git clean で Untracked files（未追跡ファイル）をまとめて削除](https://easyramble.com/how-to-use-git-clean.html)
2. [Git 公式リファレンス](https://git-scm.com/doc)
