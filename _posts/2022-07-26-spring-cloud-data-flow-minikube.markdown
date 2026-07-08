---
title: "素早く Spring Cloud Dataflow @ Minikuber を構築しましょう"
layout: post
date: 2022-07-26T18:59:20+0900
categories: blogs
tags: ["scdf", "kubernetes"]
---

## Minikubeクラスタの作成

自分の環境に合わせてMinikubeクラスタを作成してください。

- [WindowsのHyper-Vでminikubeの基本的な使い方](/posts/2022-05-02-minikube-on-window10-hyperv-as-local-k8s-env/)
- [Macでminikubeの基本的な使い方](/posts/2022-03-19-minikube-on-mac-as-local-k8s-env/)

> 今回はWindows環境でテストするので、下記のコマンドでクラスタを作成します。

```powershell
minikube start --driver hyperv --cpus 6 --memory 8192
```

## Helmからインストール

簡単にテストしたい場合、こちらの方式を参照したほうが楽だと思います。
実案件などメンテナンス性等を慎重に検討してから使ってください。

### リポジトリの追加

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```

### チャートのインストール

```bash
helm install gekal bitnami/spring-cloud-dataflow \
    --set kafka.enabled=true,rabbitmq.enabled=false \
    --set kafka.replicaCount=3 \
    --set server.service.type=NodePort \
    --set skipper.service.type=NodePort \
    --set mariadb.auth.rootPassword=mysqlpwd
```

### チャートの更新

```bash
export MARIADB_ROOT_PASSWORD=$(kubectl get secret --namespace default gekal-mariadb -o jsonpath="{.data.mariadb-root-password}" | base64 -d)
export MARIADB_PASSWORD=$(kubectl get secret --namespace default gekal-mariadb -o jsonpath="{.data.mariadb-password}" | base64 -d)
# Kafka Brokerのレプリカカウントの修正
helm upgrade gekal bitnami/spring-cloud-dataflow \
    --set kafka.enabled=true,rabbitmq.enabled=false \
    --set kafka.replicaCount=1 \
    --set server.service.type=NodePort \
    --set skipper.service.type=NodePort \
    --set mariadb.auth.password=$MARIADB_PASSWORD \
    --set mariadb.auth.rootPassword=$MARIADB_ROOT_PASSWORD
```

### チャートのアンインストール

```bash
helm uninstall gekal
```

### 管理画面へのアクセス

1. Windows

    ```powershell
    # Powershell
    start "$(minikube service --url gekal-spring-cloud-dataflow-server)/dashboard"
    ```

2. Mac

    ```bash
    open "$(minikube service --url gekal-spring-cloud-dataflow-server)/dashboard"
    ```

## アプリケーションの登録

### Streamアプリケーション

1. Windows

    ```powershell
    # RabbitMQ
    Invoke-WebRequest "$(minikube service --url gekal-spring-cloud-dataflow-server)/apps" -Method POST -Body 'uri=https://dataflow.spring.io/rabbitmq-docker-latest&force=true'
    # Kafka
    Invoke-WebRequest "$(minikube service --url gekal-spring-cloud-dataflow-server)/apps" -Method POST -Body 'uri=https://dataflow.spring.io/kafka-docker-latest&force=true'
    ```

2. Mac/Linux

    ```bash
    # RabbitMQ
    wget -qO- "$(minikube service --url my-release-data-flow-server)/apps" --post-data="uri=https://dataflow.spring.io/rabbitmq-docker-latest&force=true";
    # Kafka
    wget -qO- "$(minikube service --url my-release-data-flow-server)/apps" --post-data="uri=https://dataflow.spring.io/kafka-docker-latest&force=true";
    ```

### Taskアプリケーション

1. Windows

    ```powershell
    Invoke-WebRequest "$(minikube service --url gekal-spring-cloud-dataflow-server)/apps" -Method POST -Body 'uri=https://dataflow.spring.io/task-docker-latest&force=true'
    ```

2. Mac/Linux

    ```bash
    wget -qO- "$(minikube service --url my-release-data-flow-server)/apps" --post-data="uri=https://dataflow.spring.io/task-docker-latest&force=true";
    ```


## 参照

1. [Spring Cloud Stream Reference Documentations](https://docs.spring.io/spring-cloud-stream/docs/current/reference/html/)
2. [Spring Cloud Data Flow - Documentation](https://dataflow.spring.io/docs/)
3. [Spring Cloud Data Flow packaged by Bitnami](https://bitnami.com/stack/spring-cloud-dataflow/helm)
