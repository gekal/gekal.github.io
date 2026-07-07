---
title: Mac に minikube をインストールして Kubernetes を動かす
subtitle: ローカルに 1 ノードの Kubernetes クラスタを構築する
layout: post
date:   2019-04-12T23:00:00+0900
update:   2020-02-02T16:00:00+0900
categories: blogs
tags: minikube kubernetes virtualbox
---

## minikube とは

minikube は、仮想化ソフトウェア上に Linux VM を作成し、その中で **1 ノードの Kubernetes クラスタ** を動かすためのツールです。本番さながらの Kubernetes を、手元のマシンだけで気軽に立ち上げられます。学習や、マニフェストの動作確認に最適です。

## 環境構築

### 事前準備

VM を動かすため、BIOS/UEFI で **CPU の仮想化機能（Intel VT-x / AMD-V）** を有効にしておきます。

### minikube と kubectl のインストール

Homebrew でまとめて導入します。

```bash
# minikube 本体
brew install minikube

# Kubernetes を操作する CLI
brew install kubernetes-cli
```

バージョンを確認しておきます。

```bash
$ minikube version
minikube version: v1.0.0
```

### クラスタの起動

`minikube start` でクラスタを作成・起動します。初回は Kubernetes 用のイメージや ISO のダウンロードが走るため、数分かかります。

```bash
$ minikube start
😄  minikube v1.0.0 on darwin (amd64)
🔥  Creating virtualbox VM (CPUs=2, Memory=2048MB, Disk=20000MB) ...
🐳  Configuring Docker as the container runtime ...
🚀  Launching Kubernetes using kubeadm ...
💗  kubectl is now configured to use "minikube"
🏄  Done! Thank you for using minikube!
```

> **2020/02/02 追記**：新しい minikube では macOS のデフォルトドライバが `hyperkit` に変わりました。環境によっては hyperkit で起動に失敗する（`HYPERKIT_CRASHED`）ことがあります。その場合は、明示的に VirtualBox ドライバを指定すると回避できます。
>
> ```bash
> minikube start --vm-driver=virtualbox
> ```

## クラスタの状態を確認する

起動後は、いくつかの方法で状態を確認できます。

**1. minikube status**

```bash
$ minikube status
host: Running
kubelet: Running
apiserver: Running
kubectl: Correctly Configured: pointing to minikube-vm at 192.168.99.100
```

**2. kubectl get nodes**

```bash
$ kubectl get nodes
NAME       STATUS   ROLES    AGE   VERSION
minikube   Ready    master   50m   v1.14.0
```

**3. VirtualBox の管理画面**

VirtualBox 側からも、minikube VM が起動していることを確認できます。ネットワークは NAT とホストオンリーの 2 つが構成されます。

![minikube の VirtualBox 画面](/assets/imgs/blogs/2019-04-12/minikube-virtualbox.png)

**4. ダッシュボード**

`minikube dashboard` を実行すると、Kubernetes の Web ダッシュボードがブラウザで開きます。

```bash
$ minikube dashboard
🎉  Opening ... in your default browser...
```

![minikube のダッシュボード](/assets/imgs/blogs/2019-04-12/minikube-dashboard.png)

## よく使うコマンド

| コマンド | 説明 |
| --- | --- |
| `minikube start` | クラスタを起動する |
| `minikube status` | クラスタの状態を確認する |
| `minikube stop` | クラスタを停止する |
| `minikube delete` | クラスタを削除する |
| `minikube dashboard` | Web ダッシュボードを開く |
| `minikube ssh` | VM に SSH ログインする |
| `minikube ip` | クラスタの IP アドレスを取得する |
| `minikube service <name>` | 指定サービスの URL を取得する |

`start` でよく使うオプションは以下のとおりです。メモリやドライバはここで調整します。

| オプション | 説明 |
| --- | --- |
| `--cpus <n>` | 割り当てる CPU 数（既定 2） |
| `--memory <MB>` | 割り当てるメモリ量（既定 2048） |
| `--vm-driver <driver>` | 使用する VM ドライバ（virtualbox, hyperkit など） |

## まとめ

v1.0.0 で安定性が増し、以前よりずっと扱いやすくなりました。ローカルで Kubernetes を試すなら、まず minikube から始めるのがおすすめです。

## 参照

1. [kubernetes/minikube](https://github.com/kubernetes/minikube)
2. [Install Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/)
