---
title: Spring Cloud Data Flow @ Minikuber
layout: post
date:   2019-04-13T16:00:00+0900
categories: blogs
tags: Spring Cloud Data Flow Minikube
---

# [Spring Cloud Data Flow](https://cloud.spring.io/spring-cloud-dataflow/)とは

Spring Cloud Data Flow is a toolkit for building data integration and real-time data processing pipelines.

# 環境

1. macOS Mojve
2. [minikube(v1.0.0)]({% post_url 2019-04-12-minikube-over-virtualbox %})
   1. Kubernetes(v1.14.0)
3. [helm](https://helm.sh/)(v2.13.1)

    ```bash
    # macOS
    brew install kubernetes-helm
    ```

## 環境起動

```bash
# デフォルトの２Gが不足ので、⭐️4G以上⭐️をご指定ください。
minikube start --memory 4096

# minikube(namespace:kube-system)にhelmsサーバー（tiller）のサービスをインストール
helm init

# LoadBalanceが使えないため、NodePortへ変更ください。
helm install --name my-release --set server.service.type=NodePort stable/spring-cloud-data-flow
```

## 環境確認

1. mysql

    ```text
    An RDBMS service for the application registry, stream and task repositories, and task management.
    ```

2. rabbitmq

    ```text
    A messaging middleware
    ```

3. server
4. skipper

    ```text
    Skipper is a tool that allows you to discover applications and manage their lifecycle on multiple Cloud Platforms.
    ```

    > Podsステータスが全部Runningになっている。

    ```bash
    $ kubectl get pods
    NAME                                           READY   STATUS    RESTARTS   AGE
    my-release-data-flow-server-96fccf48c-992mn    1/1     Running   0          105m
    my-release-data-flow-skipper-6c584bb9d-s5pxv   1/1     Running   0          105m
    my-release-mysql-85bfd59986-jgsqg              1/1     Running   0          105m
    my-release-rabbitmq-5657497d7c-ljwms           1/1     Running   0          105m
    ```

# GUIへのアクセス

## kubectlで調べ

> アクセスURL（http://<minikubeのIP>:<scdfのServerのNodePort>/dashboard）

1. HTTP
2. MinikuberのIP

   ```bash
    $ minikube ip
    192.168.99.102
    ```

3. Data Flow Serverのkubernetes serverのNodePort

    ```bash
    $ kubectl get services -o wide -l app=spring-cloud-data-flow,component=server
    NAME                          TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE   SELECTOR
    my-release-data-flow-server   NodePort   10.101.21.115   <none>        80:30553/TCP   29m   app=spring-cloud-data-flow,component=server,release=my-release
    ```

## minikubeで調べ

```bash
$ minikube service --url my-release-data-flow-server
http://192.168.99.102:30553

# Macで下記のコマンドを使って、デフォルトのブラウザを開く
$ open $(minikube service --url my-release-data-flow-server)/dashboard
```

## GUI画面

![Spring Cloud Data Flow GUI](/assets/imgs/blogs/2019-04-13/spring-cloud-data-flow-gui.png)

# デモ

1. App登録

    ```bash
    wget -qO- "$(minikube service --url my-release-data-flow-server)/apps" --post-data="uri=http://bit.ly/Einstein-GA-stream-applications-rabbit-docker&force=true";
    echo "Stream apps imported"
    wget -qO- "$(minikube service --url my-release-data-flow-server)/apps" --post-data="uri=http://bit.ly/Dearborn-SR1-task-applications-docker&force=true";
    echo "Task apps imported"
    ```

2. Stream作成

    [official's demo](https://cloud.spring.io/spring-cloud-dataflow/)をご参考ください。

    ![create ticktock stream](/assets/imgs/blogs/2019-04-13/create-ticktock-stream.png)

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

# 参照URL

1. [Getting Started - Kubernetes](http://docs.spring.io/spring-cloud-dataflow/docs/2.0.2.RELEASE/reference/htmlsingle/#getting-started-kubernetes)
2. [helm charts](https://github.com/helm/charts/tree/master/incubator/spring-cloud-data-flow)
