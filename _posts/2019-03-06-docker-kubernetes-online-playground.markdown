---
title: Docker / Kubernetes をブラウザで試せるオンライン環境
subtitle: インストール不要で Docker と Kubernetes を触れる遊び場まとめ
layout: post
date:   2019-03-06T23:40:00+0900
categories: blogs
tags: docker kubernetes playground
---

## はじめに

Docker や Kubernetes を学ぶには自前で環境を構築するのが基本ですが、「ちょっと試したいだけ」というときにローカル構築は少し重たいものです。そんなときに便利なのが、ブラウザだけで動かせるオンライン環境です。代表的なものを整理しておきます。

## Play with Docker / Kubernetes

Docker 社が提供する、時間制限付きのサンドボックス環境です。ブラウザ上に実際のノードが立ち上がり、そのまま `docker` / `kubectl` コマンドを叩けます。

**Docker**

1. [Play with Docker](https://labs.play-with-docker.com/)
2. [Play with Docker Classroom](https://training.play-with-docker.com/) — ハンズオン形式のチュートリアル

**Kubernetes**

1. [Play with Kubernetes](https://labs.play-with-k8s.com/)
2. [Play with Kubernetes Classroom](https://training.play-with-kubernetes.com/) — ハンズオン形式のチュートリアル

## Katacoda

> Learn new technologies using real environments right in your browser

Katacoda は、解説と実環境のターミナルがセットになったインタラクティブな学習プラットフォームです。手順を読みながら、その場でコマンドを実行して確認できます。

- [Docker のシナリオ](https://katacoda.com/embed/docker?command=docker%20version)
- [minikube のシナリオ](https://katacoda.com/embed/minikube?command=minikube%20version%3B%20minikube%20start)

## まとめ

まず概念や基本コマンドを触ってみたいなら、これらのオンライン環境が手軽です。本格的に使い込む段階になったら、ローカルに minikube などを構築して腰を据えて学ぶとよいでしょう。
