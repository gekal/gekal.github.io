---
title: "長文字列のYAML記載方法"
layout: post
date: 2022-03-02T21:56:57+0900
categories: blogs
tags: ["yaml", "muliti"]
---

## 長文字列の問題

YAMLは人間に優しいフォーマットです。多くのコンフィグはYAMLを採用しておいます。
値の文字列がスクリーンの幅を超えた場合、如何でしょう？
超えてない時でも、適切に改行すれば、読めやすい可能性があります。

## 複数行の記載パータン

<details><summary>テストのフルファイル</summary>

**`test.yaml`**

```yaml
---
# 改行で区切り
foo1: |
  test1
  test2

# 改行で区切り（最後の改行を削除）
foo2: |-
  test1
  test2

# 改行で区切り（最後の改行を保留）
foo3: |+
  test1
  test2

# 半角スペースで区切り
bar1: >
  test1
  test2

# 半角スペースで区切り（最後の改行を削除）
bar2: >-
  test1
  test2

# 半角スペースで区切り（最後の改行を保留）
bar3: >+
  test1
  test2

# そのまま結合
go1: "\
  test1\
  test2\
  "

# そのまま結合（改行の入れ例）
go2: "\
  test1\n\
  test2\
  "


```

</details>

### 改行で区切り

'|'を使って、改行(\n)で複数行のデータを結合する。

#### 最後の改行を一つに纏める

```yaml
foo1: |
  test1
  test2

```

> 設定値の確認

```shell
$ yq -o=json '.foo1' test.yaml
"test1\ntest2\n"
```

#### 最後の改行を全て削除する

```yaml
foo2: |-
  test1
  test2

```

> 設定値の確認

```shell
$ yq -o=json '.foo2' test.yaml
"test1\ntest2"
```

#### 最後の改行を保留する

```yaml
foo3: |+
  test1
  test2

```
> 設定値の確認

```shell
$ yq -o=json '.foo3' test.yaml
"test1\ntest2\n\n"
```

### 半角スペースで区切り

'>'を使って、半角スペースで複数行のデータを結合する。

#### 最後の改行を一つに纏める

```yaml
bar1: >
  test1
  test2

```

> 設定値の確認

```shell
$ yq -o=json '.bar1' test.yaml
"test1 test2\n"
```

#### 最後の改行を全て削除する

```yaml
bar2: >-
  test1
  test2

```

> 設定値の確認

```shell
$ yq -o=json '.bar2' test.yaml
"test1 test2"
```

#### 最後の改行を保留する

```yaml
bar3: >+
  test1
  test2

```

> 設定値の確認

```shell
$ yq -o=json '.bar3' test.yaml
"test1 test2\n\n"
```

### そのまま結合

各行の後ろに'\'を付けると、複数行のデータをそのまま結合する。

#### そのまま結合

```yaml
go1: "\
  test1\
  test2\
  "
```

> 設定値の確認

```shell
$ yq -o=json '.go1' test.yaml
"test1test2"
```

#### 改行の入れ例(\n)

```yaml
go2: "\
  test1\n\
  test2\
  "
```

> 設定値の確認

```shell
$ yq -o=json '.go2' test.yaml
"test1\ntest2"
```

## 参照

1. [YAMLで複数行テキストを書きたい時のあれこれ](https://qiita.com/jerrywdlee/items/d5d31c10617ec7342d56)
2. [yq - a lightweight and portable command-line YAML, JSON and XML processor.](https://github.com/mikefarah/yq/)
