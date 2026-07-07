---
title: minikube に Spring Cloud Data Flow を素早く構築する
subtitle: Helm を使ってローカルの Kubernetes 上にデータパイプライン基盤を立てる
layout: post
date:   2019-04-13T16:00:00+0900
update: 2020-04-13T23:00:00+0900
categories: blogs
tags: spring-cloud-dataflow kubernetes minikube helm
---

## Spring Cloud Data Flow とは

[Spring Cloud Data Flow](https://cloud.spring.io/spring-cloud-dataflow/) は、データ連携やリアルタイムデータ処理のパイプラインを構築するためのツールキットです。ストリーム処理やバッチ処理を、GUI やコマンドから宣言的に組み立てられます。

ここでは、ローカルの minikube 上に Helm を使って Spring Cloud Data Flow（SCDF）を構築します。

## 前提環境

1. macOS
2. [minikube](/posts/2019-04-12-minikube-over-virtualbox/)（Kubernetes v1.14.0）
3. [Helm](https://helm.sh/)（v2.13.1）

    ```bash
    brew install helm
    ```

## クラスタの起動

SCDF は複数のコンポーネント（サーバー、MySQL、RabbitMQ など）を同時に動かすため、デフォルトの 2GB では足りません。**4GB 以上** を割り当てて minikube を起動します。

```bash
minikube start --memory 4096
```

## Helm でのインストール

Helm のバージョンによって手順が異なります。LoadBalancer は minikube では使えないため、サービスタイプを `NodePort` に変更する点が共通のポイントです。

**Helm 2 系の場合**

```bash
# minikube に Helm のサーバー（tiller）を初期化
helm init

helm install --name my-release \
  --set server.service.type=NodePort \
  stable/spring-cloud-data-flow
```

**Helm 3 系の場合**

```bash
helm repo add stable https://kubernetes-charts.storage.googleapis.com/

helm install my-release \
  --set server.service.type=NodePort \
  stable/spring-cloud-data-flow
```

## 起動の確認

以下のコンポーネントが立ち上がります。

- **mysql** — アプリケーションレジストリやストリーム／タスクのリポジトリを保持する RDBMS
- **rabbitmq** — メッセージングミドルウェア
- **server** — SCDF 本体のサーバー
- **skipper** — アプリのライフサイクル管理を担うコンポーネント

すべての Pod が `Running` になれば準備完了です。

```bash
$ kubectl get pods
NAME                                           READY   STATUS    RESTARTS   AGE
my-release-data-flow-server-96fccf48c-992mn    1/1     Running   0          105m
my-release-data-flow-skipper-6c584bb9d-s5pxv   1/1     Running   0          105m
my-release-mysql-85bfd59986-jgsqg              1/1     Running   0          105m
my-release-rabbitmq-5657497d7c-ljwms           1/1     Running   0          105m
```

## GUI へのアクセス

アクセス URL は `http://<minikube の IP>:<サーバーの NodePort>/dashboard` の形になります。IP とポートを個別に調べてもよいのですが、minikube には URL を組み立ててくれる便利なコマンドがあります。

```bash
# サービスの URL を取得
$ minikube service --url my-release-data-flow-server
http://192.168.99.102:30553

# デフォルトブラウザでダッシュボードを開く
$ open $(minikube service --url my-release-data-flow-server)/dashboard
```

![Spring Cloud Data Flow の GUI](/assets/imgs/blogs/2019-04-13/spring-cloud-data-flow-gui.png)

## デモ：ストリームを作る

**1. アプリの登録**

まず、利用するストリーム／タスク用アプリをまとめて登録します。

```bash
wget -qO- "$(minikube service --url my-release-data-flow-server)/apps" \
  --post-data="uri=https://dataflow.spring.io/rabbitmq-docker-latest&force=true"
echo "Stream apps imported"

wget -qO- "$(minikube service --url my-release-data-flow-server)/apps" \
  --post-data="uri=https://dataflow.spring.io/task-docker-latest&force=true"
echo "Task apps imported"
```

**2. ストリームの作成**

公式デモにならって、`time | log`（時刻を生成してログに流す）という定番のストリームを作成します。

![ticktock ストリームの作成](/assets/imgs/blogs/2019-04-13/create-ticktock-stream.png)

デプロイすると、ストリームを構成するアプリが Deployment として増えていることを確認できます。

```bash
$ kubectl get deployment
NAME                           READY   UP-TO-DATE   AVAILABLE   AGE
my-release-data-flow-server    1/1     1            1           19h
my-release-data-flow-skipper   1/1     1            1           19h
my-release-mysql               1/1     1            1           19h
my-release-rabbitmq            1/1     1            1           19h
ticktock-log-v1                1/1     1            1           2m17s
ticktock-time-v1               1/1     1            1           2m17s
```

## 参照

1. [Getting Started - Kubernetes](http://docs.spring.io/spring-cloud-dataflow/docs/2.0.2.RELEASE/reference/htmlsingle/#getting-started-kubernetes)
2. [Helm charts（spring-cloud-data-flow）](https://github.com/helm/charts/tree/master/incubator/spring-cloud-data-flow)
