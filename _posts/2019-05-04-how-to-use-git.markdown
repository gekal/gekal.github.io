---
title: Gitの使い方（継続更新中）
layout: post
date:   2019-05-04T19:00:00+0900
categories: blogs
tags: git
---

## Gitとは

プログラムのソースコードなどの変更履歴を記録・追跡するための分散型バージョン管理システムである。

## コマンド一覧

1. These are common Git commands used in various situations

    | コマンド | 説明                                                           |
    | -------- | -------------------------------------------------------------- |
    | clone    | Clone a repository into a new directory                        |
    | init     | Create an empty Git repository or reinitialize an existing one |

    * clone

        1. usage

           ```bash
           git clone [<options>] [--] <repo> [<dir>]
           ```

        2. Options

           * -b, --branch `<branch>`
           * -o, --origin `<name>`   use `<name>` instead of 'origin' to track upstream

        3. use pattern

            ```bash
            # リポジトリのクローン
            git clone <repository url>
            ```

2. work on the current change (see also: git help everyday)

    | コマンド | 説明                                                  |
    | -------- | ----------------------------------------------------- |
    | add      | Add file contents to the index                        |
    | mv       | Move or rename a file, a directory, or a symlink      |
    | reset    | Reset current HEAD to the specified state             |
    | rm       | Remove files from the working tree and from the index |

3. examine the history and state (see also: git help revisions)

    | コマンド | 説明                                                       |
    | -------- | ---------------------------------------------------------- |
    | bisect   | Use binary search to find the commit that introduced a bug |
    | grep     | Print lines matching a pattern                             |
    | log      | Show commit logs                                           |
    | show     | Show various types of objects                              |
    | status   | Show the working tree status                               |

4. grow, mark and tweak your common history

    | コマンド | 説明                                                        |
    | -------- | ----------------------------------------------------------- |
    | branch   | List, create, or delete branches                            |
    | checkout | Switch branches or restore working tree files               |
    | commit   | Record changes to the repository                            |
    | diff     | Show changes between commits, commit and working tree, etc  |
    | merge    | Join two or more development histories together             |
    | rebase   | Reapply commits on top of another base tip                  |
    | tag      | Create, list, delete or verify a tag object signed with GPG |

5. collaborate (see also: git help workflows)

    | コマンド | 説明                                                               |
    | -------- | ------------------------------------------------------------------ |
    | fetch    | Download objects and refs from another repository                  |
    | pull     | Fetch from and integrate with another repository or a local branch |
    | push     | Update remote refs along with associated objects                   |

6. others

    | コマンド | 説明                                         |
    | -------- | -------------------------------------------- |
    | clean    | Remove untracked files from the working tree |

    * clean（未追跡ファイルの削除）

        1. usage

           ```bash
           git clean [-d] [-f] [-i] [-n] [-q] [-e <pattern>] [-x | -X] [--] <path>...
           ```

        ２. Options

           * -n: Don't actually remove anything, just show what would be done.
           * -d: Remove untracked directories in addition to untracked files.
           * -x: Don't use the standard ignore rules.
           * -f, --force

        ３. use pattern

            ```bash
            # 全てのファイルを削除(クラーンの状態に戻る)
            git clean -fdx
            ```

## 参照

1. [git cleanでUntracked files(未追跡ファイル)をまとめて削除](https://easyramble.com/how-to-use-git-clean.html)
