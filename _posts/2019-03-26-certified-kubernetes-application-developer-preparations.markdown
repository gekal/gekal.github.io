---
title: CKAD 試験の準備メモ
subtitle: Certified Kubernetes Application Developer 受験に向けた出題範囲と実践 Tips
layout: post
date:   2019-03-26T11:00:00+0900
categories: blogs
tags: kubernetes ckad certification
---

## はじめに

CKAD（Certified Kubernetes Application Developer）の受験を準備中です。出題範囲や、試験本番で役立つ注意点をメモしておきます。

> 出題比率や試験環境は改定されることがあります。受験前に必ず[公式のカリキュラム](https://github.com/cncf/curriculum)で最新情報を確認してください。

## CKAD とは

CKAD は、Kubernetes 上でクラウドネイティブなアプリケーションを **設計・構築・構成・公開** できることを証明する認定資格です。すべて実機で操作するハンズオン形式で、決められた時間内に課題を解いていきます。

## 出題範囲（当時）

| 分野 | 比率 |
| --- | --- |
| Core Concepts | 13% |
| Configuration | 18% |
| Multi-Container Pods | 10% |
| Observability | 18% |
| Pod Design | 20% |
| Services & Networking | 13% |
| State Persistence | 8% |

詳細は [CKAD_Curriculum.pdf](https://github.com/cncf/curriculum) を参照してください。

## 試験本番の Tips

### 試験中にアクセスできるサイト

ブラウザの 1 タブに限り、以下の公式ドキュメントを参照できます。検索の勘所をつかんでおくと時短になります。

1. [https://kubernetes.io/docs/](https://kubernetes.io/docs/)
2. [https://github.com/kubernetes/](https://github.com/kubernetes/)
3. [https://kubernetes.io/blog/](https://kubernetes.io/blog/)

### 複数クラスタの切り替え

試験では複数のクラスタを行き来します。設問ごとに指定されたコンテキストへ **必ず最初に切り替える** のが鉄則です。

```bash
# コンテキスト一覧
kubectl config get-contexts
# コンテキストの切り替え
kubectl config use-context k8s
```

### ノードへのログインと権限昇格

問題によっては、ノードに SSH でログインして作業する必要があります。

```bash
# 対象ノードへ SSH
ssh k8s-node-0
# root へ昇格
sudo -i
```

### 時短のための alias

冒頭で以下を設定しておくと、`kubectl` を大量に打つ負担が減ります。

```bash
alias k=kubectl
export do="--dry-run=client -o yaml"   # マニフェストの雛形生成に便利
```

## 参照

1. [Certified Kubernetes Application Developer (CKAD)](https://www.cncf.io/certification/ckad/)
2. [dgkanatsios/CKAD-exercises](https://github.com/dgkanatsios/CKAD-exercises)
3. [CKA/CKAD に合格したので比較してみた + Tips](https://qiita.com/oke-py/items/e8bf3863c8f48d750427)
4. [CKAD をさっさと合格するための Tips](https://qiita.com/kentakozuka/items/c1a30f1545752264dfe6)
