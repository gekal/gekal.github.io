---
title: "PowerShellでExcelの操作"
layout: post
date: 2023-05-13T15:45:31+0900
categories: blogs
tags: ["Powershell", "Excel"]
---

## 概要

Windows環境でExcelを操作する時、VBAは第一候補ではないかと思います。
VBAは古くからの文法なので、現代人のコーダーとして使いにくいです。
高度の操作はJavaやC＃などを使ったほうが効率は良いですが、簡単な編集なれば、PowerShellも悪くないですよね。

Excelの簡単な操作を少し纏めて置きます。

## Excelファイルの操作

### ファイルの新規作成

ワークブックのインスタンスの`Add()`を使って、ファイルを新規追加します。

```powershell
$workBook = $excel.Workbooks.Add();
```

<details><summary>Excel作成スクリプト</summary>

**`create-excel.ps1`**

```powershell
Set-StrictMode -Version latest;

try {
    # Excelコンポーネント
    $excel = New-Object -ComObject Excel.Application;

    # 表示状態にする
    $excel.Visible = $true;

    # 新規のワークブック
    $workBook = $excel.Workbooks.Add();

    # >>>>>> Excelの操作 <<<<<<

    # 保存する。
    $excel.DisplayAlerts = $FALSE  # 警告を無視する。
    $workBook.SaveAs("$($Env:HOMEPATH)\Desktop\new.xlsx");
} finally {
    # Excelを終了する。
    $excel.Quit()

    $excel = $null;
    [GC]::Collect();
}
```

</details>

### 既存ファイルの編集

ワークブックのインスタンスの`Open("excel path")`を使って、ファイルを開きます。

```powershell
$workBook = $excel.Workbooks.Open("$($Env:HOMEPATH)\Desktop\new.xlsx");
```

<details><summary>Excelの開きスクリプト</summary>

**`open-excel.ps1`**

```powershell
Set-StrictMode -Version latest;

try {
    # Excelコンポーネント
    $excel = New-Object -ComObject Excel.Application;

    # 表示状態とする
    $excel.Visible = $true;

    # 既存のワークブックの開き
    $workBook = $excel.Workbooks.Open("$($Env:HOMEPATH)\Desktop\new.xlsx");

    # >>>>>> Excelの操作 <<<<<<

    # ファイルを保存する。
    $workBook.Save();
} finally {
    # Excelを終了する。
    $excel.Quit()

    $excel = $null;
    [GC]::Collect();
}
```

</details>

## シートの操作

### 新規作成

1. 基本的な追加の仕方

    ```powershell
    $newSheet = $workBook.Worksheets.Add();
    $newSheet.name = "New Sheet";
    ```

2. 特定のシートの前に追加

    ```powershell
    # Sheet1/Sheet2/Sheet3がある想定
    $targetSheet = $workBook.Sheets("Sheet2");
    $newSheet = $workBook.Worksheets.Add($targetSheet);
    $newSheet.name = "New Sheet";
    ```

3. 特定のシートの前に追加

    ```powershell
    # Sheet1/Sheet2/Sheet3がある想定
    $targetSheet = $workBook.Sheets("Sheet2");
    $newSheet = $workBook.Worksheets.Add([System.Reflection.Missing]::Value, $targetSheet);
    $newSheet.name = "New Sheet";
    ```

4. シートの最後に追加

    ```powershell
    $lastSheet = $book.Sheets($book.Sheets.Count);
    $workBook.Worksheets.Add([System.Reflection.Missing]::Value, $lastSheet);
    ```

### 削除

> アラートダイアログの表示を無効にしてから実施してください。
> 無効にしないと、反映できません。

```powershell
$excel.DisplayAlerts = $FALSE  # 警告を無視する。
```

1. シングルシート

    ```powershell
    $deleteWorkSheet = $workBook.Sheets("Sheet2");
    $deleteWorkSheet.Delete();
    ```

2. マルチシート

    ```powershell
    $deleteWorkSheets = $workBook.Sheets(@("Sheet2", "Sheet3"));
    $deleteWorkSheets.Delete();
    ```

### 参照

1. インデックスの参照

    ```powershell
    $workBook.Sheets("Sheet1")
    ```

2. シート名の参照

    ```powershell
    $workBook.Sheets(1)
    ```

## セルの操作

1. セル名での参照(Range)

    ```powershell
    $sheet.Range("A1")
    ```

2. セル座標の参照(Cell)

    ```powershell
    # 行番号&列番号
    $sheet.Cells.Item(row, col)
    ```

## 参照

1. [【PowerShell】Excel チートシート](https://boonx4m312s.hatenablog.com/entry/2022/11/24/180000)
2. [VBAだけじゃない！PowerShellでもExcel操作](https://life-is-command.com/powershell-excel/)

## おまけ

### エクセルの読み込みサンプル

https://github.com/gekal-study-powershell/excel-sample/blob/main/print-all-sheet-names.ps1
