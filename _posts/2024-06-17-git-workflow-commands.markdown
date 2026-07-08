---
title: "Gitコマンドでファイルのステータスの管理"
layout: post
date: 2024-06-17T15:55:35+0900
categories: blogs
tags: ["git", "Workflow"]
---

### シーケンス図

```mermaid
sequenceDiagram
    participant Untracked as {Untracked}
    participant Index as {Index}
    participant Head as {Head}
    participant RemoteRepo as {Remote Repo}
    Untracked->>Index: git add
    Index->>Head: git commit -m "message"
    Untracked->>Head: git commit -a -m "message"
    Head->>RemoteRepo: git push
    RemoteRepo->>Head: git fetch
    Head->>Untracked: git merge
    RemoteRepo->>Untracked: git pull
    Head->>Untracked: git diff HEAD
    Index->>Untracked: git diff
```

#### ファイルステータスの説明

| Status        | 説明                                      |
| ------------- | ----------------------------------------- |
| {Untracked}   | バージョン管理下に置かれていない          |
| {Index}       | 変更されたファイルのステージング状態      |
| {Head}        | ローカルリポジトリ                        |
| {Remote Repo} | リモートリポジトリ (サーバーにて管理され) |
