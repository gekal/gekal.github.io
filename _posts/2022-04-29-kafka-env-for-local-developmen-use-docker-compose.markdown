---
title: "ローカル開発用のKafka環境構築"
layout: post
date: 2022-04-29T18:59:00+0900
categories: blogs
tags: ["kafka", "docker"]
---

## Apache Kafkaとは

Apache Kafka（以降、Kafka）はスケーラビリティに優れた分散メッセージキューです。
Bigdataの処理にはよく利用しているでしょう。

## 開発環境の構築

ローカル開発で動作確認する時、可用性など考慮不要のため、Dockerを利用して構築すると思います。

### ローカル環境の概要

1. docker-compose.yamlの作成

    :::details docker-composeのコンテンツ
    **`docker-compose.yaml`**

    ```yaml
    version: "3"
    services:
        kafka-broker:
            # https://hub.docker.com/r/confluentinc/cp-kafka
            image: confluentinc/cp-kafka:6.2.4
            restart: always
            depends_on:
                - zookeeper
            ports:
                - "9092:9092"
            environment:
                KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_DOCKER_INTERNAL:PLAINTEXT
                KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka-broker:19092,PLAINTEXT_DOCKER_INTERNAL://localhost:9092
                KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
                KAFKA_ADVERTISED_HOST_NAME: kafka-broker
                KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1

        zookeeper:
            # https://hub.docker.com/r/confluentinc/cp-zookeeper
            image: confluentinc/cp-zookeeper:6.2.4
            restart: always
            ports:
                - "2181:2181"
            environment:
                ZOOKEEPER_CLIENT_PORT: "2181"

        cp-kafka-rest:
            # https://hub.docker.com/r/confluentinc/cp-kafka-rest
            image: confluentinc/cp-kafka-rest:6.2.4
            restart: always
            depends_on:
                - "kafka-broker"
                - "zookeeper"
            environment:
                KAFKA_REST_BOOTSTRAP_SERVERS: "kafka-broker:19092"
                KAFKA_REST_CLIENT_SECURITY_PROTOCOL: "PLAINTEXT"
                KAFKA_REST_HOST_NAME: "cp-kafka-rest"
                KAFKA_REST_LISTENERS: "http://0.0.0.0:8082"

        # 管理コンソール（http://localhost:8000）
        kafka-topic-ui:
            # https://hub.docker.com/r/landoop/kafka-topics-ui
            image: landoop/kafka-topics-ui:0.9.4
            restart: always
            depends_on:
                - "kafka-broker"
                - "zookeeper"
                - "cp-kafka-rest"
            ports:
                - "8000:8000"
            environment:
                KAFKA_REST_PROXY_URL: "http://cp-kafka-rest:8082"
                PROXY: "true"
    ```
    :::

    > 資材

    - kafka broker
    - zookeeper
    - kafka rest
    - kafka topic ui

2. Docker環境の起動

    ```bash
    $ docker-compose up -d
    Creating network "xxxx_default" with the default driver
    Creating dataflow-kafka-zookeeper ... done
    Creating xxxx_kafka-broker_1      ... done
    Creating xxxx_cp-kafka-rest_1     ... done
    Creating xxxx_kafka-topic-ui_1    ... done
    ```

3. Kafka Topic UIのアクセス

    <http://localhost:8000>

## 参照

1. [Apache Kafkaの概要とアーキテクチャ](https://qiita.com/sigmalist/items/5a26ab519cbdf1e07af3)
