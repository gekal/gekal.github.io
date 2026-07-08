---
title: "WindowsのフォルダーがIntelliJ IDEAのプロジェクトとして、開きます"
layout: post
date: 2022-11-29T20:09:27+0900
categories: blogs
tags: ["IntelliJ", "Windows"]
---

## IntelliJの右コンテンツメニュー設定

`JetBrains Toolbox`を利用して、IntelliJ IDEAをインストする場合、右コンテンツメニューがセットされていません。
これがなければ、ちょっと不便なので、手動で設定しないといけません。

## IntelliJ IDEのフォルダー開き

下記の通り、レジストリの設定を追加します。

```
`-- HKEY_CLASSES_ROOT\Directory\Background\shell\IntelliJ
    |-- default => 'Open folder as IDEA Project'
    |-- Icon => 'path to idea64.exe'
    `-- command
        `-- default => '"path to idea64.exe" "%V"'
```

## レジストリファイル

下記のファイルを保存して、ダブルクリックすれば、登録できます。

**`Open folder as IDEA Project.reg`**

```ini
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\Background\shell\IntelliJ]
@="Open folder as IDEA Project"
"Icon"="C:\\Users\\liuhy\\AppData\\Local\\JetBrains\\Toolbox\\apps\\IDEA-U\\ch-0\\222.4459.24\\bin\\idea64.exe"

[HKEY_CLASSES_ROOT\Directory\Background\shell\IntelliJ\command]
@="\"C:\\Users\\liuhy\\AppData\\Local\\JetBrains\\Toolbox\\apps\\IDEA-U\\ch-0\\222.4459.24\\bin\\idea64.exe\" \"%V\""
```

## 参照

1. [Open a project in IntelliJ from folder](https://stackoverflow.com/questions/49733733/open-a-project-in-intellij-from-folder)
