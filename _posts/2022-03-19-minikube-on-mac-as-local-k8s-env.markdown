---
title: "Macでminikubeの基本的な使い方"
layout: post
date: 2022-03-19T15:31:18+0900
categories: blogs
tags: ["minikube", "mac", "hyperkit"]
---

## Minikubeとは

Minikubeでは仮想化ソフトウェアを使ってLinuxのインストールされた仮想マシンを作成し、そこでKubernetesクラスタを動作させることができるツールです。w

## 動作環境

| 項目 | バージョン                      |
| ---- | ------------------------------- |
| CPU  | 2GHz クアッドコア Intel Core i5 |
| OS   | macOS Monterey 12.3             |

## 環境構築

### ドライバー

<https://minikube.sigs.k8s.io/docs/drivers/#macos>

下記のいずれかが使っても、特に問題ありません。
Docker Desktopを使ってるなら、hyperkitを使えます。

1. Docker - VM + Container (preferred)
2. hyperkit

    ```shell
    brew install hyperkit
    ```

3. VirtualBox - VM
4. Parallels - VM
5. VMware Fusion - VM
6. SSH - remote ssh

### Minikubeをインストール

<https://minikube.sigs.k8s.io/docs/start/>

```shell
# Minikubeをインストール
$ brew install minikube
Running `brew update --preinstall`...
==> Auto-updated Homebrew!
Updated 1 tap (homebrew/core).
==> Updated Formulae
Updated 5 formulae.

==> Downloading https://ghcr.io/v2/homebrew/core/minikube/manifests/1.25.2
Already downloaded: /Users/gekal/Library/Caches/Homebrew/downloads/fa0034afe1330adad087a8b3dc9ac4917982d248b08a4df4cbc52ce01d5eabff--minikube-1.25.2.bottle_manifest.json
==> Downloading https://ghcr.io/v2/homebrew/core/minikube/blobs/sha256:888a850d809aa5c62c3e3ccb40b059faf52a4519881f08bf93ec1267558b622e
Already downloaded: /Users/gekal/Library/Caches/Homebrew/downloads/bd6123a468a67f63dd664bec951b99b78c45f2eabe18150eeaafb7ddd3ff4827--minikube--1.25.2.monterey.bottle.tar.gz
==> Pouring minikube--1.25.2.monterey.bottle.tar.gz
==> Caveats
zsh completions have been installed to:
  /usr/local/share/zsh/site-functions
==> Summary
🍺  /usr/local/Cellar/minikube/1.25.2: 9 files, 72.3MB
==> Running `brew cleanup minikube`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).

# バージョンを確認
$ minikube version
minikube version: v1.25.2
commit: 362d5fdc0a3dbee389b3d3f1034e8023e72bd3a7
```
### Kubectlをインストール

> 必要があれば、下記のコマンドでkubectlをインストールしてください。

```
brew install kubernetes-cli
```

### Minikubeを開始

```bash
# https://minikube.sigs.k8s.io/docs/commands/start/
$ minikube start --cpus 2 --memory 4096
😄  Darwin 12.2.1 上の minikube v1.25.2
✨  hyperkit ドライバーが自動的に選択されました
👍  minikube クラスター中のコントロールプレーンの minikube ノードを起動しています
🔥  hyperkit VM (CPUs=2, Memory=4096MB, Disk=20000MB) を作成しています...
🐳  Docker 20.10.12 で Kubernetes v1.23.3 を準備しています...
    ▪ kubelet.housekeeping-interval=5m
    ▪ 証明書と鍵を作成しています...
    ▪ コントロールプレーンを起動しています...
    ▪ RBAC のルールを設定中です...
🔎  Kubernetes コンポーネントを検証しています...
    ▪ gcr.io/k8s-minikube/storage-provisioner:v5 イメージを使用しています
🌟  有効なアドオン: default-storageclass, storage-provisioner
🏄  完了しました！ kubectl が「"minikube"」クラスタと「"default"」ネームスペースを使用するよう構成されました
```

### Minikubeのステータスの確認

1. statusでクラスターを確認します。

    ```shell
    $ minikube status
    minikube
    type: Control Plane
    host: Running
    kubelet: Running
    apiserver: Running
    kubeconfig: Configured
    ```

2. kubectlコマンドでリソースを確認します。

3. dashboardでクラスターを確認します。

    ```shell
    $ minikube dashboard
    🔌  ダッシュボードを有効化しています...
        ▪ kubernetesui/dashboard:v2.3.1 イメージを使用しています
        ▪ kubernetesui/metrics-scraper:v1.0.7 イメージを使用しています
    🤔  ダッシュボードの状態を検証しています...
    🚀  プロキシーを起動しています...
    🤔  プロキシーの状態を検証しています...
    🎉  デフォルトブラウザーで http://127.0.0.1:56361/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/ を開いています...
    ```

## よく利用するコマンド

1. start

    minikubeを起動する。

    | option                      | detail                                                                                                                                        |
    | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
    | --cpus int                  | Number of CPUs allocated to Kubernetes. Use "max" to use the maximum number of CPUs.                                                          |
    | --memory int                | Amount of RAM to allocate to Kubernetes (format: <number>[<unit>], where unit = b, k, m or g). Use "max" to use the maximum amount of memory. |
    | -n, --nodes int             | 起動するノード数。デフォルトは 1。                                                                                                            |
    | --kubernetes-version string | The Kubernetes version that the minikube VM will use (ex: v1.2.3, 'stable' for v1.23.3, 'latest' for v1.23.4-rc.0). Defaults to 'stable'.     |
    | --driver string             | Driver is one of: virtualbox, parallels, vmwarefusion, hyperkit, vmware, docker, podman (experimental), ssh (defaults to auto-detect)         |

2. status

    minikubeのステータスを確認する。

3. profile

    ```shell
    $ minikube profile list
    |----------|-----------|---------|---------------|------|---------|---------|-------|
    | Profile    | VM Driver   | Runtime   | IP              | Port   | Version   | Status    | Nodes   |
    | ---------- | ----------- | --------- | --------------- | ------ | --------- | --------- | ------- |
    | minikube   | hyperkit    | docker    | 192.168.64.18   | 8443   | v1.23.3   | Running   | 1       |
    | ---------- | ----------- | --------- | --------------- | ------ | --------- | --------- | ------- |
    ```

3. stop

    minikubeを停止する。

4. delete

    nimikubeのクラスタを削除する。

## まとめ

ローカルで簡単にkubenetesの環境を遊びたい時、minikubeが一番使いやすい案ではないかと思います。

## 参照

1. [minikube](https://github.com/kubernetes/minikube)
2. [Install Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/)
