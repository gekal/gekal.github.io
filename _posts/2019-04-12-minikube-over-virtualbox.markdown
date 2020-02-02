---
title: Macでminikubeをインストールしてみる。
layout: post
date:   2019-04-12T23:00:00+0900
update:   2020-02-02T16:00:00+0900
categories: blogs
tags: minikube virtualbox
---

# Minikubeとは

Minikubeでは仮想化ソフトウェアを使ってLinuxがインストールされた仮想マシンを作成し、そこでKubernetesクラスタを動作させることができるツールです。

# 環境構築

## 事前準備

CPUの仮想化機能を有効する。

## Minikubeをインストール

```shell
# Minikubeをインストール
$ brew cask install minikube
Updating Homebrew...
==> Auto-updated Homebrew!
Updated 4 taps (homebrew/core, homebrew/cask, caskroom/versions and caskroom/cask).
==> New Formulae
frps                                                                                                   ospray
==> Updated Formulae
node ✔         coffeescript   flow           gnu-getopt     hyperscan      jid            libdazzle      open-mpi       postgis        simple-scan    typescript     util-linux     xcodegen
apache-flink   ethereum       glm            gomplate       imagemagick    jmeter         lumo           pgcli          riff           svgo           ungit          vim
cmark          faas-cli       glooctl        gtk+3          ipv6calc       kubecfg        mesa           pixman         rust           tbb            unrar          wtf

==> Satisfying dependencies
All Formula dependencies satisfied.
==> Downloading https://storage.googleapis.com/minikube/releases/v1.0.0/minikube-darwin-amd64
######################################################################## 100.0%
==> Verifying SHA-256 checksum for Cask 'minikube'.
==> Installing Cask minikube
==> Linking Binary 'minikube-darwin-amd64' to '/usr/local/bin/minikube'.
🍺  minikube was successfully installed!

# バージョンを確認
$ minikube version
minikube version: v1.0.0

# Kubectlをインストール
$ brew instal kubernetes-cli
==> Downloading https://homebrew.bintray.com/bottles/kubernetes-cli-1.14.0.mojave.bottle.tar.gz
Already downloaded: /Users/gekal/Library/Caches/Homebrew/downloads/878e8c574c331ba1da58211aee9706d791978fc28007672d7c46118f33271bdc--kubernetes-cli-1.14.0.mojave.bottle.tar.gz
==> Pouring kubernetes-cli-1.14.0.mojave.bottle.tar.gz
==> Caveats
Bash completion has been installed to:
  /usr/local/etc/bash_completion.d

zsh completions have been installed to:
  /usr/local/share/zsh/site-functions
==> Summary
```

## Minikubeを開始

```bash
$ minikube start
😄  minikube v1.0.0 on darwin (amd64)
🤹  Downloading Kubernetes v1.14.0 images in the background ...
🔥  Creating virtualbox VM (CPUs=2, Memory=2048MB, Disk=20000MB) ...
💿  Downloading Minikube ISO ...
 142.88 MB / 142.88 MB [============================================] 100.00% 0s
📶  "minikube" IP address is 192.168.99.100
🐳  Configuring Docker as the container runtime ...
🐳  Version of container runtime is 18.06.2-ce
⌛  Waiting for image downloads to complete ...
✨  Preparing Kubernetes environment ...
💾  Downloading kubelet v1.14.0
💾  Downloading kubeadm v1.14.0
🚜  Pulling images required by Kubernetes v1.14.0 ...
🚀  Launching Kubernetes v1.14.0 using kubeadm ...
⌛  Waiting for pods: apiserver proxy etcd scheduler controller dns
🔑  Configuring cluster permissions ...
🤔  Verifying component health .....
💗  kubectl is now configured to use "minikube"
🏄  Done! Thank you for using minikube!
```

`2020/02/02追記`

> 最近のデフォルトドライバは「hyperkit」に変更された様です。
> 起動できない場合があります様での、その時、VirtualBoxを使って見てください。

`[hyperkit]`

```bash
$ minikube start
😄  minikube v1.6.2 on Darwin 10.15.2
✨  Automatically selected the 'hyperkit' driver (alternates: [virtualbox])
🔥  Creating hyperkit VM (CPUs=2, Memory=2000MB, Disk=20000MB) ...

💣  Unable to start VM. Please investigate and run 'minikube delete' if possible
❌  Error: [HYPERKIT_CRASHED] create: Error creating machine: Error in driver during machine creation: hyperkit crashed! command line:
  hyperkit loglevel=3 console=ttyS0 console=tty0 noembed nomodeset norestore waitusb=10 systemd.legacy_systemd_cgroup_controller=yes random.trust_cpu=on hw_rng_model=virtio base host=minikube
💡  Suggestion: Hyperkit is broken. Upgrade to the latest hyperkit version and/or Docker for Desktop. Alternatively, you may choose an alternate --vm-driver
⁉️   Related issues:
    ▪ https://github.com/kubernetes/minikube/issues/6079
    ▪ https://github.com/kubernetes/minikube/issues/5780

😿  If the above advice does not help, please let us know:
👉  https://github.com/kubernetes/minikube/issues/new/choose
```

`[virtualbox]`

```bash
$ minikube start --vm-driver=virtualbox
😄  minikube v1.6.2 on Darwin 10.15.2
✨  Selecting 'virtualbox' driver from user configuration (alternates: [hyperkit])
🔥  Creating virtualbox VM (CPUs=2, Memory=2000MB, Disk=20000MB) ...
🐳  Preparing Kubernetes v1.17.0 on Docker '19.03.5' ...
🚜  Pulling images ...
🚀  Launching Kubernetes ...
⌛  Waiting for cluster to come online ...
🏄  Done! kubectl is now configured to use "minikube"
```

## Minikubeのステータスを確認

1. Minikubeコマンド

    ```shell
    $ minikube status
    host: Running
    kubelet: Running
    apiserver: Running
    kubectl: Correctly Configured: pointing to minikube-vm at 192.168.99.100
    ```

2. kubectlコマンド

    ```shell
    $ kubectl get nodes
    NAME       STATUS   ROLES    AGE   VERSION
    minikube   Ready    master   50m   v1.14.0
    ```

3. VirtualBox

    ![minikube virtualbox](/assets/imgs/blogs/2019-04-12/minikube-virtualbox.png)

    > ネットワーク

    1. NAT
    2. ホストオンリー

4. minikube dashboard

    ```shell
    $ minikube dashboard
    🔌  Enabling dashboard ...
    🤔  Verifying dashboard health ...
    🚀  Launching proxy ...
    🤔  Verifying proxy health ...
    🎉  Opening http://127.0.0.1:59308/api/v1/namespaces/kube-system/services/http:kubernetes-dashboard:/proxy/ in your default browser...
    ```

    ![minikube dashboard](/assets/imgs/blogs/2019-04-12/minikube-dashboard.png)

## Minikubeコマンド

| command        | detail                                                                            |
| -------------- | --------------------------------------------------------------------------------- |
| addons         | Modify minikube's kubernetes addons                                               |
| cache          | Add or delete an image from the local cache.                                      |
| completion     | Outputs minikube shell completion for the given shell (bash or zsh)               |
| config         | Modify minikube config                                                            |
| **dashboard**  | Access the kubernetes dashboard running within the minikube cluster               |
| delete         | Deletes a local kubernetes cluster                                                |
| docker-env     | Sets up docker env variables; similar to '$(docker-machine env)'                  |
| help           | Help about any command                                                            |
| ip             | Retrieves the IP address of the running cluster                                   |
| logs           | Gets the logs of the running instance, used for debugging minikube, not user code |
| mount          | Mounts the specified directory into minikube                                      |
| profile        | Profile sets the current minikube profile                                         |
| service        | Gets the kubernetes URL(s) for the specified service in your local cluster        |
| **ssh**        | Log into or run a command on a machine with SSH; similar to 'docker-machine ssh'  |
| ssh-key        | Retrieve the ssh identity key path of the specified cluster                       |
| **start**      | Starts a local kubernetes cluster                                                 |
| **status**     | Gets the status of a local kubernetes cluster                                     |
| **stop**       | Stops a running local kubernetes cluster                                          |
| tunnel         | tunnel makes services of type LoadBalancer accessible on localhost                |
| update-check   | Print current and latest version number                                           |
| update-context | Verify the IP address of the running cluster in kubeconfig.                       |
| **version**    | Print the version of minikube                                                     |

### よく利用するコマンド

1. start

    minikubeを起動する。

    | option             | detail                                                                                                                     |
    | ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
    | --cpus int         | Number of CPUs allocated to the minikube VM (default 2)                                                                    |
    | --memory int       | Amount of RAM allocated to the minikube VM in MB (default 2048)                                                            |
    | --vm-driver string | VM driver is one of: [virtualbox parallels vmwarefusion kvm xhyve hyperv hyperkit kvm2 vmware none] (default "virtualbox") |

2. status

    minikubeのステータスを確認する。

3. stop

    minikubeを停止する。

4. delete

    nimikubeのクラスタを削除する。

# まとめ

v1.0.0にバージョンアップしたため、前より使えやすくになりました。

# 参照

1. [minikube](https://github.com/kubernetes/minikube)
2. [Install Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/)
