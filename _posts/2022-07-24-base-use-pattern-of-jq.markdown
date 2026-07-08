---
title: "jqコマンドの基本的な利用パターン"
layout: post
date: 2022-07-24T10:53:03+0900
categories: blogs
tags: ["jq"]
---

## jqコマンドとは

jqは、軽量で柔軟なコマンドラインJSONプロセッサです。
JSONデータの加工・整形等の機能があります。

## jqコマンドの基本的な利用パータン

### JSONデータのハイライト表示

echoコマンド等のJSON出力データはハイライト表示していません。
`jq .`にパイプしておくと、コンパクトなJSONデータを整形して表示できます。

<details><summary>ハイライト表示</summary>

```bash
# コンパクトなJSONデータを整形して表示できます。
$ echo '{"id":1,"name":"john","age": 18}' | jq .
{
  "id": 1,
  "name": "john",
  "age": 18
}
```

</details>

### 配列から特定のデータの抽出

配列から特定の条件に当てはまるデータを抽出する時、この機能は

<details><summary>あるプロパティの値と一致の条件</summary>

```bash
cat << EOF | jq '.[] | select( .name | contains("linda"))'
[
    {"id": 1,"name": "john","age": 18},
    {"id": 2,"name": "linda","age": 28},
    {"id": 3,"name": "porter","age": 38}
]
EOF
```

</details>

<details><summary>数字プロパティの比較</summary>

```bash
cat << EOF | jq '.[] | select( .age < 30)'
[
    {"id": 1,"name": "john","age": 18},
    {"id": 2,"name": "linda","age": 28},
    {"id": 3,"name": "porter","age": 38}
]
EOF
```

</details>

### 配列要素の増減

#### 配置に要素の追加

```bash
echo '["aaa","bbb","ccc"]' | jq '. + ["ddd","eee"]'
```

#### 配置に要素の削除

オブジェクトのプロパティと値が全一致の場合のみ、JSONオブジェクトを削除します。

```bash
echo '["aaa","bbb","ccc"]' | jq '. - ["bbb","eee"]'
```

### マルチJSONファイルのマージ

<details><summary>テストデータ</summary>

**`hoge.json`**

```json
{
    "hoge1": {
        "aaa": {
            "user": "user_aaa",
            "password": "pass_hoge1aaa"
        }
    },
    "hoge2": {
        "bbb": {
            "user": "user_bbb",
            "password": "pass_hoge2bbb"
        }
    }
}
```

**`fuga.json`**

```json
{
    "fuga1": {
        "aaa": {
            "user": "user_aaa",
            "password": "pass_fuga1aaa"
        }
    },
    "fuga2": {
        "bbb": {
            "user": "user_bbb",
            "password": "pass_fuga2bbb"
        }
    }
}
```

</details>

hoge.jsonとfuga.jsonのJSONデータをマージします。重複データがある場合、あとの方で勝ちます。

<details><summary>マルチJSONファイルのマージ</summary>

```bash
$ jq -s add hoge.json fuga.json
{
  "hoge1": {
    "aaa": {
      "user": "user_aaa",
      "password": "pass_hoge1aaa"
    }
  },
  "hoge2": {
    "bbb": {
      "user": "user_bbb",
      "password": "pass_hoge2bbb"
    }
  },
  "fuga1": {
    "aaa": {
      "user": "user_aaa",
      "password": "pass_fuga1aaa"
    }
  },
  "fuga2": {
    "bbb": {
      "user": "user_bbb",
      "password": "pass_fuga2bbb"
    }
  }
}
```

</details>

### プロパティの値変更

1. プロパティの値更新

    ```bash
    echo '{"id":1,"name":"john","age": 18}' | jq '.age = .age + 1'
    ```

2. プロパティの追加

    ```bash
    echo '{"id":1,"name":"john","age": 18}' | jq '.added = "I am added by jq"'
    ```

3. プロパティの削除

    ```bash
    echo '{"id":1,"name":"john","age": 18}' | jq '. | del(.age)'
    ```

## おまけ

jqplayのサイトでリアルタイムでJQコマンドを検証できます。

https://jqplay.org/s/KsJNDSeALRk


## 参照

1. [jq](https://stedolan.github.io/jq/)
2. [複数のjsonファイルをjqを使ってmergeする](https://dev.classmethod.jp/articles/merge_multiple_json/)
