---
title: "Flutter Version Management (FVM)にてマルチプロジェクトのFlutterバージョン管理"
layout: post
date: 2024-06-18T18:09:18+0900
categories: blogs
tags: ["Flutter", "FVM"]
---

## Flutter のマルチプロジェクトのお悩み

Flutterは、モバイル、ウェブ、デスクトップアプリケーションの開発において人気のあるフレームワークです。しかし、プロジェクトごとに異なるバージョンのFlutterを使用する必要がある場合、バージョン管理が課題となります。

Flutterのバージョンアップで前に作成したサンプルは動かなくなりました。
当時のFlutterとDartのバージョン情報も残ってないため、大変苦労しました。

そこで、Flutterのバージョン管理の探しに行きました。「Flutter Version Management（FVM）」っていうツールを見つかりました。

## Flutter Version Management（FVM）とは？

FVMは、Flutter SDKの異なるバージョンを簡単にインストール、管理、および切り替えるためのコマンドラインツールです。これにより、複数のプロジェクトで異なるFlutterバージョンを使用する場合でも、効率的に管理できます。

## FVMの主な機能

1. **複数バージョンの管理**:

    FVMを使うと、複数のFlutterバージョンを簡単にインストールして管理できます。プロジェクトごとに特定のバージョンを指定できるため、異なるバージョン間の互換性問題を回避できます。

2. **バージョンの切り替え**:

    プロジェクト間でFlutter SDKのバージョンを切り替えるのが非常に簡単です。プロジェクトディレクトリに移動してコマンドを実行するだけで、指定されたバージョンが自動的に適用されます。

3. **安定性と一貫性**:

    特定のFlutterバージョンをプロジェクトに固定することで、開発チーム全体での環境の一貫性を保てます。これにより、異なるバージョンによるバグや予期しない挙動を防ぐことができます。

## FVMのインストールと設定

以下のコマンドを実行することで、FVMをインストールできます。

### Windows

```powershell
choco install fvm
```

### Mac

```bash
curl -fsSL https://fvm.app/install.sh | bash
```

## FVMを使ったバージョン管理の実例

### 特定のFlutterバージョンで新しいプロジェクト作成

```bash
fvm spawn 3.22.2 create --platforms ios,android --org co.example --project-name demo .
```

### 既存プロジェクトでのFlutterバージョン指定

既存のプロジェクトでFVMを使用する場合も同様です。プロジェクトディレクトリに移動してから、指定したいバージョンを設定します。

```bash
fvm use 3.22.2
```

### VSCodeでFVM関するコンフィグ

1. Flutterバージョンの指定

    **`.fvmrc`**

    ```json
    {
      "flutter": "3.22.2",
      "flavors": {
        "dev": "3.22.2",
        "stg": "3.22.2",
        "prd": "3.22.2"
      },
      "runPubGetOnSdkChanges": true,
      "updateVscodeSettings": true,
      "updateGitIgnore": true
    }
    ```

    > `fvm use dev`でdevのバージョンに簡単に切り替えられます。Flutterバージョンアップの検証時に便利ではないかと思います。

2. VSCodeのコンフィグ

    **`.vscode/settings.json`**

    ```json
    {
      "dart.flutterSdkPath": ".fvm/versions/3.22.2",
      // 検索時にfvmを除外
      "search.exclude": {
        "**/.fvm": true
      },
      // ワークスペースの監視から除外
      "files.watcherExclude": {
        "**/.fvm": true
      }
    }
    ```

## コマンド一覧

| コマンド | 概要                                                            |
| -------- | --------------------------------------------------------------- |
| api      | JSON API for FVM data                                           |
| config   | Set global configuration settings for FVM                       |
| dart     | Proxies Dart Commands                                           |
| destroy  | Destroy FVM cache by deleting FVM directory                     |
| doctor   | Shows information about environment, and project configuration. |
| exec     | Executes scripts with the configured Flutter SDK                |
| flutter  | Proxies Flutter Commands                                        |
| global   | Sets Flutter SDK Version as a global                            |
| install  | Installs Flutter SDK Version                                    |
| list     | Lists installed Flutter SDK Versions                            |
| releases | View all Flutter SDK releases available for install.            |
| remove   | Removes Flutter SDK Version                                     |
| spawn    | Spawns a command on a Flutter version                           |
| use      | Sets Flutter SDK Version you would like to use in a project     |

## まとめ

FVMは、Flutter開発におけるバージョン管理を大幅に簡素化するツールです。特に、複数のプロジェクトを扱う場合やチーム開発において、その利便性と安定性は非常に有用です。まだFVMを使用していない開発者やチームは、ぜひ導入を検討してみてください。Flutterのバージョン管理がより効率的になり、開発の生産性が向上することでしょう。

## 参照

1. [Simple Flutter Version Management](https://fvm.app/)
