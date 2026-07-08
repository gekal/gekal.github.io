---
title: "Nodejs環境構築"
layout: post
date: 2022-01-20T11:22:15+0900
categories: blogs
tags: ["Nodejs", "n", "nvs", "nodebrew"]
---

## 環境構築

## WSL(Ubuntu 20.04 LTS)

### [n – Interactively Manage Your Node.js Versions](https://github.com/tj/n)

<details><summary>インストール</summary>

```bash
sudo apt install -y nodejs npm
sudo npm install n -g
sudo n stable

# 古い nodejs, npmを削除
sudo apt purge -y nodejs npm
exec $SHELL -l

node -v
```

</details>

1. 最新のLTSをインストールする

    :::details 最新のLTSのインストール
    ```bash
    $ sudo n lts
      installing : node-v16.13.2
           mkdir : /usr/local/n/versions/node/16.13.2
           fetch : https://nodejs.org/dist/v16.13.2/node-v16.13.2-linux-x64.tar.xz
       installed : v16.13.2 (with npm 8.1.2)
    ```
    :::

2. 任意のバージョンをインストールする

    :::details 最新のLTSのインストール
    ```bash
    $ n ls-remote
    Listing remote... Displaying 20 matches (use --all to see all).
    17.4.0
    17.3.1
    17.3.0
    ...省略...
    $ sudo n install 17.2.0
      installing : node-v17.2.0
           mkdir : /usr/local/n/versions/node/17.2.0
           fetch : https://nodejs.org/dist/v17.2.0/node-v17.2.0-linux-x64.tar.xz
       installed : v17.2.0 (with npm 8.1.4)
    ```
    :::

3. Nodejsを削除する

    :::details Nodejsの削除
    ```bash
    $ sudo n uninstall
    Do you wish to delete node and npm from /usr/local? y

    Uninstalling node and npm
    /usr/local/bin/node
    /usr/local/bin/npm
    /usr/local/bin/npx
    /usr/local/bin/corepack
    /usr/local/include/node
    /usr/local/lib/node_modules/npm
    /usr/local/lib/node_modules/corepack
    /usr/local/share/doc/node
    /usr/local/share/man/man1/node.1
    /usr/local/share/systemtap/tapset/node.stp
    $ node --version
    ```

3. ダウンロードしたバージョンを削除します。

    :::details Nodejsの削除
    ```bash
    $ n ls
    node/16.14.0
    node/16.15.0
    # 特定のバージョンを削除します。
    $ sudo n rm 16.14.0
    ```

    ```bash
    # インストールしたバージョン以外のキャッシュを削除します。
    n prune
    ```
    :::

### [Node Version Manager](https://github.com/nvm-sh/nvm)

<details><summary>インストール</summary>

```bash
export NVS_HOME="$HOME/.nvs"
git clone https://github.com/jasongin/nvs "$NVS_HOME"
. "$NVS_HOME/nvs.sh" install
```

</details>

1. 最新のLTSをインストールする

    :::details 最新のLTSのインストール
    ```bash
    $ nvs add lts
    Downloading [########################################################################################################################################################################################] 100%
    Extracting  [########################################################################################################################################################################################] 100%
    Added at: ~/.nvs/node/16.13.2/x64/bin/node
    To use this version now: nvs use node/16.13.2/x64
    $  nvs use node/16.13.2/x64
    PATH += ~/.nvs/node/16.13.2/x64/bin
    $ node --version
    v16.13.2
    ```
    :::

2. 任意のバージョンをインストールする

    :::details 任意のバージョンのインストール
    ```bash
    $ nvs ls-remote 16
     >node/16.13.2 (Gallium)
      node/16.13.1 (Gallium)
      node/16.13.0 (Gallium)
      node/16.12.0
      node/16.11.1
      node/16.11.0
      node/16.10.0
      node/16.9.1
      node/16.9.0
      node/16.8.0
      node/16.7.0
      node/16.6.2
      node/16.6.1
      node/16.6.0
      node/16.5.0
      node/16.4.2
      node/16.4.1
      node/16.4.0
      node/16.3.0
      node/16.2.0
      node/16.1.0
      node/16.0.0
    $ nvs add node/16.13.1/x64
    Downloading [##############################################################] 100%
    Extracting  [##############################################################] 100%
    Added at: ~/.nvs/node/16.13.1/x64/bin/node
    To use this version now: nvs use node/16.13.1/x64
    $ nvs use node/16.13.1/x64
    PATH -= ~/.nvs/node/16.13.2/x64/bin
    PATH += ~/.nvs/node/16.13.1/x64/bin
    ```
    :::

3. Nodejsを削除する

    :::details 任意のバージョン
    ```bash
    $ nvs ls
      node/16.13.2/x64 (Gallium)
    $ nvs rm 16.13.2
    - /home/gekal/.nvs/node/16.13.2/x64
    ```
    :::


## Mac

### **[nodebrew](https://github.com/hokaccha/nodebrew)**

<details><summary>インストール</summary>

```bash
$ brew install nodebrew
==> Downloading https://ghcr.io/v2/homebrew/core/nodebrew/manifests/1.1.0-1
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/nodebrew/blobs/sha256:f9e68ad3b92827534fc9faf5d7b9c4d1fe61e4e1fa11a99e03c6cc476593fe09
==> Downloading from https://pkg-containers.githubusercontent.com/ghcr1/blobs/sha256:f9e68ad3b92827534fc9faf5d7b9c4d1fe61e4e1fa11a99e03c6cc476593fe09?se=2022-01-22T11%3A15%3A00Z&sig=6Is6HXjShTRc%2B%2FAR7o
######################################################################## 100.0%
==> Pouring nodebrew--1.1.0.all.bottle.1.tar.gz
==> Caveats
You need to manually run setup_dirs to create directories required by nodebrew:
  /usr/local/opt/nodebrew/bin/nodebrew setup_dirs

Add path:
  export PATH=$HOME/.nodebrew/current/bin:$PATH

To use Homebrew's directories rather than ~/.nodebrew add to your profile:
  export NODEBREW_ROOT=/usr/local/var/nodebrew

zsh completions have been installed to:
  /usr/local/share/zsh/site-functions
==> Summary
🍺  /usr/local/Cellar/nodebrew/1.1.0: 8 files, 39KB
==> Running `brew cleanup nodebrew`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
```

</details>

1. 最新のLTSをインストールする

    :::details 最新のLTSのインストール
    ```bash
    $ nodebrew install-binary stable
    Fetching: https://nodejs.org/dist/v16.13.2/node-v16.13.2-darwin-x64.tar.gz
    ##################################################################################################################################################################################################### 100.0%
    Installed successfully
    $ nodebrew ls
    v16.13.2

    current: none
    $ nodebrew use v16.13.2
    use v16.13.2
    $ node --version
    v16.13.2
    $ nodebrew ls
    v16.13.2

    current: v16.13.2
    ```
    :::

2. 任意のバージョンをインストールする

    :::details 任意のバージョンのインストール
    ```bash
    $ nodebrew ls-remote
    ......
    v14.0.0   v14.1.0   v14.2.0   v14.3.0   v14.4.0   v14.5.0   v14.6.0   v14.7.0
    v14.8.0   v14.9.0   v14.10.0  v14.10.1  v14.11.0  v14.12.0  v14.13.0  v14.13.1
    v14.14.0  v14.15.0  v14.15.1  v14.15.2  v14.15.3  v14.15.4  v14.15.5  v14.16.0
    v14.16.1  v14.17.0  v14.17.1  v14.17.2  v14.17.3  v14.17.4  v14.17.5  v14.17.6
    v14.18.0  v14.18.1  v14.18.2  v14.18.3

    v15.0.0   v15.0.1   v15.1.0   v15.2.0   v15.2.1   v15.3.0   v15.4.0   v15.5.0
    v15.5.1   v15.6.0   v15.7.0   v15.8.0   v15.9.0   v15.10.0  v15.11.0  v15.12.0
    v15.13.0  v15.14.0

    v16.0.0   v16.1.0   v16.2.0   v16.3.0   v16.4.0   v16.4.1   v16.4.2   v16.5.0
    v16.6.0   v16.6.1   v16.6.2   v16.7.0   v16.8.0   v16.9.0   v16.9.1   v16.10.0
    v16.11.0  v16.11.1  v16.12.0  v16.13.0  v16.13.1  v16.13.2
    ......
    $ nodebrew install-binary v16.6.2
    Fetching: https://nodejs.org/dist/v16.6.2/node-v16.6.2-darwin-x64.tar.gz
    ##################################################################################################################################################################################################### 100.0%
    Installed successfully
    $ nodebrew ls
    v16.6.2
    v16.13.2

    current: v16.13.2
    $ nodebrew use v16.6.2
    use v16.6.2
    $ node --version
    v16.6.2
    $ nodebrew ls
    v16.6.2
    v16.13.2

    current: v16.6.2
    ```
    :::

3. Nodejsを削除する

    :::details Nodejsの削除
    ```bash
    $ nodebrew ls
    v16.6.2
    v16.13.2

    current: v16.6.2
    $ nodebrew uninstall v16.6.2
    v16.6.2 uninstalled
    ➜  ~ nodebrew uninstall v16.13.2
    v16.13.2 uninstalled
    $ nodebrew ls
    not installed

    current: none
    $ node --version
    zsh: command not found: node
    ```
    :::


### 参照

1. [nodejs org](https://nodejs.org/)
2. [Ubuntuに最新のNode.jsを難なくインストールする](https://qiita.com/seibe/items/36cef7df85fe2cefa3ea)
