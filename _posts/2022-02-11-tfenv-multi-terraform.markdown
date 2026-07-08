---
title: "Terraformのマルチバージョン管理(tfenv)"
layout: post
date: 2022-02-11T20:58:05+0900
categories: blogs
tags: ["Terraform", "tfenv"]
---

https://github.com/tfutils/tfenv

## Terraformのマルチバージョンの問題

複数のプロジェクトは同じバージョンのTerraformを使う可能性があります。
特定のバージョンを使わないと実施できない可能性があります。
そして、バージョンの切り替えが必要です。

## tfenvのインストール(WSL)

```bash
$ brew install tfenv
Running `brew update --preinstall`...
==> Auto-updated Homebrew!
Updated 1 tap (homebrew/core).
==> New Formulae
webp-pixbuf-loader                                                                                       xidel
==> Updated Formulae
Updated 56 formulae.

==> Downloading https://ghcr.io/v2/homebrew/core/tfenv/manifests/2.2.3
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/tfenv/blobs/sha256:d58555c2a79b2425a495e4bcdf48297067578c42c863493845030ed8f51e8d53
==> Downloading from https://pkg-containers.githubusercontent.com/ghcr1/blobs/sha256:d58555c2a79b2425a495e4bcdf48297067578c42c863493845030ed8f51e8d53?se=2022-02-11T11%3A10%3A00Z&sig=rFWcnFew2iR7q7D2hCuEmUncdqH
######################################################################## 100.0%
==> Pouring tfenv--2.2.3.all.bottle.tar.gz
🍺  /home/linuxbrew/.linuxbrew/Cellar/tfenv/2.2.3: 24 files, 113KB
==> Running `brew cleanup tfenv`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
```

## コマンド一覧

1. install
    
    Install a specific version of Terraform
    
    ```bash
    $ tfenv install latest
    Installing Terraform v1.1.5
    Downloading release tarball from https://releases.hashicorp.com/terraform/1.1.5/terraform_1.1.5_linux_amd64.zip
    ######################################################################################################## 100.0%
    Downloading SHA hash file from https://releases.hashicorp.com/terraform/1.1.5/terraform_1.1.5_SHA256SUMS
    No keybase install found, skipping OpenPGP signature verification
    Archive:  /tmp/tfenv_download.puPbRe/terraform_1.1.5_linux_amd64.zip
      inflating: /home/linuxbrew/.linuxbrew/Cellar/tfenv/2.2.3/versions/1.1.5/terraform
    Installation of terraform v1.1.5 successful. To make this your default version, run 'tfenv use 1.1.5'
    ```
    
2. use
    
    Switch a version to use
    
    ```bash
    $ tfenv use 1.1.5
    Switching default version to v1.1.5
    Switching completed
    $ terraform version
    Terraform v1.1.5
    on linux_amd64
    ```
    
3. uninstall
    
    Uninstall a specific version of Terraform
    
4. list
    
    List all installed versions
    
    ```bash
    $ tfenv list
    * 1.1.5 (set by /home/linuxbrew/.linuxbrew/Cellar/tfenv/2.2.3/version)
    ```
    
5. list-remote
    
    List all installable versions
    
    ```bash
    $ tfenv list-remote
    1.1.5
    1.1.4
    1.1.3
    1.1.2
    1.1.1
    1.1.0
    ```
    
6. version-name
    
    Print current version
    
    ```bash
    $ tfenv version-name
    1.1.5
    ```
    
7. init
    
    Update environment to use tfenv correctly.
    
8. pin
    
    Write the current active version to ./.terraform-version
