---
title: CKAD試験の準備
layout: post
date:   2019-03-26T11:00:00+0900
categories: blogs
tags: Kubernetes CKAD
---

## はじめに

CKADの試験を準備中ですが、注意点をメモしたいと思います。

## CKAD詳細

Certified Kubernetes Application Developer試験は、ユーザーがKubernetes用のクラウドネイティブアプリケーションを設計、構築、構成、および公開できることを証明します。

## 試験詳細

* 13% – Core Concepts
* 18% Configuration
* 10% Multi-Container Pods
* 18% – Observability
* 20% – Pod Design
* 13% – Services & Networking
* 8% – State Persistence

> [CKAD_Curriculum_V1.13.0.pdf](https://github.com/cncf/curriculum/blob/master/CKAD_Curriculum_V1.13.0.pdf)

## Candidate Handbook

## 試験中にアクセスできるサイト(ワンタブ)

1. https://kubernetes.io/docs/
2. https://github.com/kubernetes/
3. https://kubernetes.io/blog/

## [Exam Tips](https://www2.thelinuxfoundation.org/ckad-tips)

## CKAD CLUSTERS

| Cluster | Members            | CNI     | Description |
| ------- | ------------------ | ------- | ----------- |
| k8s     | 1 master, 2 worker | flannel | k8s cluster |
| dk8s    | 1 master, 1 worker | flannel | k8s cluster |
| nk8s    | 1 master, 2 worker | calico  | k8s cluster |
| sk8s    | 1 master, 1 worker | flannel | k8s cluster |

### 試験中注意点

1. 認証情報切り替え

    ```shell
    # コンテツ一覧
    kubectl config get-contexts
    # コンテツ切り替え
    kubectl config use-context k8s
    ```

2. Nodeへのログイン

    ```bash
    ssh k8s-node-0
    ```

3. 特権へ昇格

    ```sh
    sudo -i
    # -i, --login                 run login shell as the target user; a command may also be specified
    ```

## 参照

1. [Certified Kubernetes Application Developer (CKAD) Program](https://www.cncf.io/certification/ckad/)
2. [CKAD-exercises](https://github.com/dgkanatsios/CKAD-exercises)
3. [CKA/CKADに合格したので比較してみた + Tips](https://qiita.com/oke-py/items/e8bf3863c8f48d750427)
4. [ckad-prep-notes](https://github.com/twajr/ckad-prep-notes)
5. [CKADをさっさと合格するためのTips](https://qiita.com/kentakozuka/items/c1a30f1545752264dfe6)
