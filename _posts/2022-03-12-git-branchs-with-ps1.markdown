---
title: "PowershellのスクリプトでGitの一括操作"
layout: post
date: 2022-03-12T19:45:18+0900
categories: blogs
tags: ["git", "prune", "powershell"]
---

## リポジトリが多い時のお悩み

マイクロサービス化のせいで独立のアプリが多くなりました。
個々の開発者が同時に管理するリポジトリも多数があります。

実際の作業はfeatureブランチを作成して進めます。
テストが終わった時メインのブランチにマージする運用が殆どだと思います。

特定のfeatureブランチに対して何か処理する時、スクリプトで一括処理出来れば嬉しいと思います。

Window端末でPowershellを使って、よく利用するパータンを紹介します。

## カレントフォルダーの一括作業

### 概要

カレントフォルダー直下のフォルダーをループして処理します。
※ドット(.)で始めるフォルダーを除外します。

### ローカルとリモートのブランチをクリアにします。

**`git-branch-prune.ps1`**

```powershell
# 作業ディレクトリ
$localtion = $PSScriptRoot

# サブフォルダー一覧(Eclipseワークスペースなどのフォルダーを除外します。)
$folders = Get-ChildItem -Path $localtion | Where-Object { $_.PSIsContainer -And -Not $_.Name.StartsWith(".") }

foreach ($folder in $folders) {
    # マージ済みのローカルブランチを削除
    # ？？mainをチェックアウトしますか？？
    $branchs = git -C $folder.fullname branch | Select-String -NotMatch -Pattern '^\* .*' | ForEach-Object { $_.Line.trim() }
    foreach ($branch in $branchs) {
        Write-Host "git -C ""$($folder.fullname)"" branch -d $branch"
        git -C "$($folder.fullname)" branch -d $branch
    }

    # 削除されたリモートブランチを削除
    Write-Host "git -C ""$($folder.fullname)"" remote prune origin"
    git -C "$($folder.fullname)" remote prune origin
}

Read-Host 'Press Enter key to end.'
```

### 特定のリモートブランチを詳細を出力します。

**`:git-show-remote-branch.ps1`**

```powershell
$branch = Read-Host "Witch branch do you like to check"

# 作業ディレクトリ
$localtion = $PSScriptRoot

# サブフォルダー一覧(Eclipseワークスペースなどのフォルダーを除外します。)
$folders = Get-ChildItem -Path $localtion | Where-Object { $_.PSIsContainer -And -Not $_.Name.StartsWith(".") }

foreach ($folder in $folders) {

    # 特定のリモートブランチの存在をチェックします。
    git -C $folder.fullname show-branch "remotes/origin/$($branch)" >${NULL} 2>&1

    # 存在する場合、何々を処理します。
    if ($?) {
        Write-Host " #################### $($folder.fullname) - $($branch) #################### "
        git -C $folder.fullname show-branch "remotes/origin/$($branch)"
    }
}

Read-Host 'Press Enter key to end.'
```

### その他

1. ローカルブランチ一覧を表示します。
2. リモートブランチ一覧を表示します。
