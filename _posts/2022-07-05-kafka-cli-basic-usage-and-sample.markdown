---
title: "Kafka Cliの基本的な使い方(サンプル付き)"
layout: post
date: 2022-07-05T08:48:56+0900
categories: blogs
tags: ["kafka", "cli"]
---

## 検証環境


| 対象  | Version                  | 備考                                                                                                               |
| ----- | ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| OS    | Ubuntu 20.04.4 LTS(WSL2) |                                                                                                                    |
| JDK   | Temurin-17.0.3+7         |                                                                                                                    |
| Kafka | 6.2.4-ccs                | [ローカル開発用のKafka環境構築](/posts/2022-04-29-kafka-env-for-local-developmen-use-docker-compose/) |

## インストール

1. JDK

    jdk 1.8以降のバージョンは基本的に問題ありません。OSに合わせてインストールしてください。

2. Kafka Cli

    ```bash
    wget https://archive.apache.org/dist/kafka/2.6.2/kafka_2.12-2.6.2.tgz
    tar -xzf kafka_2.12-2.6.2.tgz
    ```

## 基本操作

```bash
export ZOOKEEPER_CONNECT_STRING=localhost:2181
export BOOTSTRAP_SERVER_CONNECT_STRING=localhost:9092
```

### Topic

#### 作成

```bash
$ bin/kafka-topics.sh --create --zookeeper ${ZOOKEEPER_CONNECT_STRING} --replication-factor 1 --partitions 1 --topic mytopic
Created topic mytopic.
```

> zookeeperやbrokerのどちらを指定すれば操作できます。高可用性を考慮してzookeeperの接続情報を指定しましょう。

1. zookeeperに接続

    ```bash
    export ZOOKEEPER_CONNECT_STRING=localhost:2181
    bin/kafka-topics.sh --create --zookeeper ${ZOOKEEPER_CONNECT_STRING} --replication-factor 1 --partitions 1 --topic mytopic
    ```


2. brokerに接続

    ```bash
    export BOOTSTRAP_SERVER_CONNECT_STRING=localhost:9092
    bin/kafka-topics.sh --create --bootstrap-server ${BOOTSTRAP_SERVER_CONNECT_STRING} --replication-factor 1 --partitions 1 --topic mytopic
    ```

#### 詳細

```bash
$ bin/kafka-topics.sh --describe --zookeeper ${ZOOKEEPER_CONNECT_STRING} --topic mytopic
Topic: mytopic  PartitionCount: 1       ReplicationFactor: 1    Configs:
        Topic: mytopic  Partition: 0    Leader: 1001    Replicas: 1001  Isr: 1001
```

#### 削除

```bash
$ bin/kafka-topics.sh --delete --zookeeper ${ZOOKEEPER_CONNECT_STRING} --topic mytopic
# 存在しないTopicを指定した場合、エラーが発生します。
```

#### 一覧

```bash
$ bin/kafka-topics.sh --list --zookeeper ${ZOOKEEPER_CONNECT_STRING}
mytopic
```

### プロデューサ

1. コンソールでメッセージを送信する。

    ```bash
    bin/kafka-console-producer.sh --bootstrap-server ${BOOTSTRAP_SERVER_CONNECT_STRING} --topic mytopic
    ```

2. 数字のメッセージデータを送信する。

    ```bash
    bin/kafka-verifiable-producer.sh --bootstrap-server ${BOOTSTRAP_SERVER_CONNECT_STRING} --topic mytopic --max-messages 10000
    ```

### コンシューマ

1. コンソールでメッセージを受信する。

    ```bash
    bin/kafka-console-consumer.sh --bootstrap-server ${BOOTSTRAP_SERVER_CONNECT_STRING} --topic mytopic --group gekal
    ```

2. コンシューマを検証する。


    ```bash
    bin/kafka-verifiable-consumer.sh --bootstrap-server ${BOOTSTRAP_SERVER_CONNECT_STRING} --topic mytopic --group-id gekal
    ```


#### コンシューマグループ

1. コンシューマグループを取得する。

    ```bash
    bin/kafka-consumer-groups.sh --list --bootstrap-server ${BOOTSTRAP_SERVER_CONNECT_STRING}
    ```

2. コンシューマグループの詳細情報を表示する。

    ```bash
    bin/kafka-consumer-groups.sh --describe --bootstrap-server ${BOOTSTRAP_SERVER_CONNECT_STRING} --group gekal --offsets
    ```

3. グループを削除する。

    ```bash
    bin/kafka-consumer-groups.sh --delete --bootstrap-server ${BOOTSTRAP_SERVER_CONNECT_STRING} --group gekal
    ```

4. オフセット情報をリセットする。

    ```bash
    bin/kafka-consumer-groups.sh --reset-offsets --bootstrap-server ${BOOTSTRAP_SERVER_CONNECT_STRING} --topic mytopic --group gekal --to-earliest
    ```

5. オフセット情報を削除する。

    ```bash
    bin/kafka-consumer-groups.sh --delete-offsets --bootstrap-server ${BOOTSTRAP_SERVER_CONNECT_STRING} --topic mytopic --group gekal
    ```

## 参照

1. [APACHE KAFKA QUICKSTART](https://kafka.apache.org/quickstart)
