---
title: "レジストリを修正して「Code で開く」の右コンテンツメニュー設定"
layout: post
date: 2023-09-22T12:55:52+0900
categories: blogs
tags: ["Code", "Regedit"]
---

## 基本設定

1. パス: <*\VSCode>

    | 名前   | 種類          | データ             | メモ           |
    | ------ | ------------- | ------------------ | -------------- |
    | (既定) | REG_EXPAND_SZ | Code で開く        | メニューの文字 |
    | Icon   | REG_EXPAND_SZ | <path to Code.exe> | 表示Icon       |

2. パス: <*\VSCode\command>

    | 名前   | 種類          | データ                    | メモ                           |
    | ------ | ------------- | ------------------------- | ------------------------------ |
    | (既定) | REG_EXPAND_SZ | "<path to Code.exe>" "%V" | バックグラウンドクリックの時   |
    | (既定) | REG_EXPAND_SZ | "<path to Code.exe>" "%1" | ファイルやフォルダを選択する時 |

## レジストリ修正のコンフィグ

**`regedit.reg`**

```regdit
Windows Registry Editor Version 5.00

; ファイルの右コンテンツメニュー
[HKEY_CLASSES_ROOT\*\shell\VSCode]
@="Code で開く"
"Icon"="C:\\Users\\liuhy\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe"
[HKEY_CLASSES_ROOT\*\shell\VSCode\command]
@="\"C:\\Users\\liuhy\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe\" \"%1\""

; フォルダの右コンテンツメニュー
[HKEY_CLASSES_ROOT\Directory\shell\VSCode]
@="Code で開く"
"Icon"="\"C:\\Users\\liuhy\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe\""
[HKEY_CLASSES_ROOT\Directory\shell\VSCode\command]
@="\"C:\\Users\\liuhy\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe\" \"%1\""

; バックグラウンドの右コンテンツメニュー
[HKEY_CLASSES_ROOT\Directory\Background\shell\VSCode]
@="Code で開く"
"Icon"="\"C:\\Users\\liuhy\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe\""
[HKEY_CLASSES_ROOT\Directory\Background\shell\VSCode\command]
@="\"C:\\Users\\liuhy\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe\" \"%V\""
```
