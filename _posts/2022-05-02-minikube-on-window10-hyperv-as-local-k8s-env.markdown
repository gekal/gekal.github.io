---
title: "WindowsのHyper-Vでminikubeの基本的な使い方"
layout: post
date: 2022-05-02T12:00:39+0900
categories: blogs
tags: ["minikube", "windows", "HyperV"]
---

## Minikubeとは

Minikubeでは仮想化ソフトウェアを使ってLinuxのインストールされた仮想マシンを作成し、そこでKubernetesクラスタを動作させることができるツールです。

## 動作環境

| 項目 | バージョン                        |
| ---- | --------------------------------- |
| CPU  | 3.4GHz クアッドコア Intel Core i7 |
| OS   | Windows 10 Enterprise - 21H2      |

## 環境構築

### ドライバー

<https://minikube.sigs.k8s.io/docs/drivers/#windows>

下記のいずれかが使っても、特に問題ありません。
Hyper-VはProfessional以上のエディションが必要です。

1. Hyper-V - VM (preferred)
2. Docker - VM + Container (preferred)
3. VirtualBox - VM
4. VMware Workstation - VM
5. SSH - remote ssh

### Minikubをインストール

<https://minikube.sigs.k8s.io/docs/start/>

```powershell
# Minikubeをインストール
# https://community.chocolatey.org/packages/Minikube
$ choco install minikube
Chocolatey v0.12.1
Installing the following packages:
minikube
By installing, you accept licenses for the packages.
Progress: Downloading Minikube 1.25.2... 100%

Minikube v1.25.2 [Approved]
minikube package files install completed. Performing other installation steps.
 ShimGen has successfully created a shim for minikube.exe
 The install of minikube was successful.
  Software installed to 'C:\ProgramData\chocolatey\lib\Minikube'

Chocolatey installed 1/1 packages.
 See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).

# バージョンを確認
$ minikube version
minikube version: v1.25.2
commit: 362d5fdc0a3dbee389b3d3f1034e8023e72bd3a7
```
### Kubectlをインストール

> 必要があれば、下記のコマンドでkubectlをインストールしてください。

```powershell
# https://community.chocolatey.org/packages/kubernetes-cli
choco install kubernetes-cli
```

### Minikubeを開始

> 管理者権限が必要です。

```bash
# https://minikube.sigs.k8s.io/docs/commands/start/
$ minikube start --driver hyperv --cpus 6 --memory 8192
* Microsoft Windows 10 Enterprise 10.0.19044 Build 19044 上の minikube v1.25.2
* ユーザーの設定に基づいて hyperv ドライバーを使用します
* minikube クラスター中のコントロールプレーンの minikube ノードを起動しています
* hyperv VM (CPUs=6, Memory=8192MB, Disk=20000MB) を作成しています...
* Docker 20.10.12 で Kubernetes v1.23.3 を準備しています...
  - kubelet.housekeeping-interval=5m
  - 証明書と鍵を作成しています...
  - コントロールプレーンを起動しています...
  - RBAC のルールを設定中です...
* Kubernetes コンポーネントを検証しています...
  - gcr.io/k8s-minikube/storage-provisioner:v5 イメージを使用しています
* 有効なアドオン: storage-provisioner, default-storageclass
* 完了しました！ kubectl が「"minikube"」クラスタと「"default"」ネームスペースを使用するよう構成されました
```

### Minikubeのステータスの確認

1. statusでクラスターを確認します。

    ```powershell
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

    ```powershell
    $ minikube profile list
    |----------|-----------|---------|----------------|------|---------|--------|-------|
    | Profile  | VM Driver | Runtime |       IP       | Port | Version | Status | Nodes |
    |----------|-----------|---------|----------------|------|---------|--------|-------|
    | minikube | hyperv    | docker  | 172.20.219.117 | 8443 | v1.23.3 |        |     1 |
    |----------|-----------|---------|----------------|------|---------|--------|-------|
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
