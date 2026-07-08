---
title: "Azure Pipelinesのコマンドの基本的な使い方"
layout: post
date: 2022-07-20T00:04:01+0900
categories: blogs
tags: ["Azure", "Devops", "Pipelines"]
---

## 前提条件

> devopsへのログインは完了していること。

```bash
$ az devops login --organization https://dev.azure.com/gekal
Token: <認証のToken情報>
```

![Personal Access Tokens](/assets/imgs/zenn/azure-devops-pipeline-cli-sample/personal-access-tokens.png)

## pipelines管理

### 新規

```bash
$ az pipelines create --name 'GekalBuild' --description 'Pipeline for gekal project' \
    --organization https://dev.azure.com/gekal --project sample \
    --repository gekal-study-azure/devops-sample-app \
    --branch main \
    --repository-type github \
    --yaml-path ./azure-pipelines.yml \
    --folder-path gekal \
    --skip-first-run
Which service connection do you want to use to communicate with GitHub?
Please enter a choice [Default choice(1)]: gekal-study-azure
```

![Pipeline結果](/assets/imgs/zenn/azure-devops-pipeline-cli-sample/2022-07-20-00-01-33.png)

> **⚠️ 注意**
>
> 下記のオプションを付けると、下記のエラーが発生してパイプラインを作成できません。

```bash
# Error: Could not create service hooks subscription. The repository does not reference a service connection.
--service-connection gekal-study-azure \
```

## パイプライン変数管理

### 追加

```bash
az pipelines variable create --name myvariable --allow-override true --value test \
    --organization https://dev.azure.com/gekal --project sample \
    --pipeline-name GekalBuild
```

### 削除

```bash
az pipelines variable delete --name myvariable \
    --organization https://dev.azure.com/gekal --project sample \
    --pipeline-name GekalBuild \
    --yes
# 下記のエラーのせいで削除できません。（要確認）
# There were no build definitions matching name "myvariable" in project "sample".
```

### 一覧表示

```bash
az pipelines variable list \
    --organization https://dev.azure.com/gekal --project sample \
    --pipeline-name GekalBuild
```

### 更新

```bash
az pipelines variable update --name myvariable --allow-override true --value test \
    --organization https://dev.azure.com/gekal --project sample \
    --pipeline-name GekalBuild
```


## ビルド管理

### ビルド定義

#### 一覧表示

```bash
az pipelines build definition list \
    --organization https://dev.azure.com/gekal --project sample \
    --top 10
```

#### 詳細取得

```bash
az pipelines build definition show --name GekalBuild \
    --organization https://dev.azure.com/gekal --project sample
```

### ビルド結果

### ビルド要求 (キュー)

### ビルドの詳細

### ビルド タグ

#### 追加

#### 削除

#### 取得

## 変数グループ

### 新規

```bash
az pipelines variable-group create --name myvariablegroup --variables key1=var1 key2=var2 --description "my variable group" \
    --organization https://dev.azure.com/gekal \
    --project sample
```

### 削除

```bash
# Group Idを取得します。
GROUPID=$(az pipelines variable-group list --organization https://dev.azure.com/gekal --project sample | jq '.[] | select(.name == "myvariablegroup") | .id')
az pipelines variable-group delete --group-id ${GROUPID} \
    --organization https://dev.azure.com/gekal \
    --project sample
```

### 一覧表示

```bash
az pipelines variable-group list \
    --organization https://dev.azure.com/gekal \
    --project sample
```

### 詳細の表示

### 更新

### 変数の管理

#### 追加

#### 削除

#### 一覧表示

#### 更新

## 参照

1. [Azure Pipelines](https://docs.microsoft.com/ja-jp/cli/azure/service-page/azure%20pipelines?view=azure-cli-latest)
