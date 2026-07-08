---
title: "Gitブランチのオペレーションズ(作成・削除・リネーム)"
layout: post
date: 2022-02-28T17:00:47+0900
categories: blogs
tags: ["git", "branch"]
---

## Gitのブランチ管理

バグ対応のhotfixや新規機能のfeatureはmainブランチを切って対応するのは一般的です。
ブランチの操作に関して、少しまとめました。

## ローカルのブランチ

### ブランチ作成

> 前提条件

```
$ git branch -av
* main                   f2113c7 first commit
  remotes/origin/develop 7ec725e commit1
  remotes/origin/main    f2113c7 first commit
```

### HEADからブランチを新規作成

```bash
$ git branch develop

$ git branch -av
  develop                f2113c7 first commit
* main                   f2113c7 first commit
  remotes/origin/develop 7ec725e commit1
  remotes/origin/main    f2113c7 first commit
```

> HEADからブランチを作成しますが、カレントブランチにセットしていません。
> 一時にブランチをバックアップとして使うのは適しているかと思います。

### リモート側にブランチがある場合

```bash
$ git checkout develop
Switched to a new branch 'develop'

$ git branch -av
* develop                7ec725e commit1
  main                   f2113c7 first commit
  remotes/origin/develop 7ec725e commit1
  remotes/origin/main    f2113c7 first commit
```

> リモート側にブランチがある時、ターゲットブランチに切り替える場合、適していると思います。

> **⚠️ 注意**
>
> `-b`オプションを付けると、HEADからの作成となるので、upstreanとのバインドをしていません。
> リモートからブランチを作成する時、`-b`オプションを付けないでください。

### リモート側にブランチがない場合

#### HEADからブランチを作成

```bash
$ git checkout -b test
Switched to a new branch 'test'

$ git branch -av
  main                   f2113c7 first commit
* test                   f2113c7 first commit
  remotes/origin/develop 7ec725e commit1
  remotes/origin/main    f2113c7 first commit
```

> 不具合などを発生する場合、利用すると思います。

#### 特定のブランチからブランチを作成

1. ローカルブランチから

  ```bash
  $ git checkout -b test develop
  Switched to a new branch 'test'
  ```


2. リモートブランチから

  ```bash
  $ git checkout --no-track -b test remotes/origin/develop
  Switched to a new branch 'test'
  Branch 'test' set up to track remote branch 'develop' from 'origin'.
  ```

> ブランチをプッシュして、origionブランチをセットする

```bash
  $ git push --set-upstream origin test
  Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
  remote: 
  remote: Create a pull request for 'test' on GitHub by visiting:
  remote:      https://github.com/gekal-study-tools/git-branch-operations/pull/new/test
  remote:
  To https://github.com/gekal-study-tools/git-branch-operations.git
  * [new branch]      test -> test
  Branch 'test' set up to track remote branch 'test' from 'origin'.

  $ git branch -avv
    develop                7ec725e [origin/develop] commit1
    main                   f2113c7 [origin/main] first commit
  * test                   7ec725e [origin/test] commit1
    remotes/origin/develop 7ec725e commit1
    remotes/origin/main    f2113c7 first commit
    remotes/origin/test    7ec725e commit1
```

### ブランチ削除

```bash
$ git branch
  develop
* main

# ブランチ削除
$ git branch -d develop
warning: deleting branch 'develop' that has been merged to
         'refs/remotes/origin/develop', but not yet merged to HEAD.
Deleted branch develop (was 7ec725e).

$ git branch
* main
```

| オプション     | 説明                               |
| -------------- | ---------------------------------- |
| `-d, --delete` | delete fully merged branch         |
| `-D`           | delete branch (even if not merged) |

> **⚠️ 注意**
>
> ブランチを削除する前に、別ブランチに切り替える必要があります。

### ブランチ名変更

```bash

$ git checkout -b test1
Switched to a new branch 'test1'

$ git branch
  main
* test1

# ブランチ名変更
$ git branch -m test2

$ git branch
  main
* test2
```

## リモートのブランチ

### ブランチ作成

```bash
$ git branch -a
* test2
  remotes/origin/develop
  remotes/origin/main

# ローカルのブランチを準備する
$ git checkout -b test
Switched to a new branch 'test'

# リモート側のブランチを作成する
$ git push origin test
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
remote:
remote: Create a pull request for 'test' on GitHub by visiting:
remote:      https://github.com/gekal-study-tools/git-branch-operations/pull/new/test
remote:
To https://github.com/gekal-study-tools/git-branch-operations.git
 * [new branch]      test -> test

$ git branch -av
  main                   f2113c7 first commit
* test                   f2113c7 first commit
  remotes/origin/develop 7ec725e commit1
  remotes/origin/main    f2113c7 first commit
  remotes/origin/test    f2113c7 first commit
```
### ブランチ削除

```bash
# リモート側のブランチを削除する
$ git push origin :test
To https://github.com/gekal-study-tools/git-branch-operations.git
 - [deleted]         test
```

> **⚠️ 注意**
>
> ブランチを削除したら、復旧できないため、間違っていないかをよく確認してください。

## リモートとローカルの同期

### リモートリポジトリの変更内容を取り込む

```bash
# リモートのブランチからローカルのOriginブランチに同期
$ git fetch
# リモートのブランチからローカルのOriginブランチに同期してから、ローカルブランチにマージ
$ git pull
```

### 削除されたリモートブランチにもローカルにも削除

```bash
# リモートブランチのステータスを確認
$ git remote show origin
# ローカルのOriginブランチをクリア
$ git remote prune origin
```
