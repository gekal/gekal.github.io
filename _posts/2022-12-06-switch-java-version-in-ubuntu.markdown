---
title: "UbuntuでマルチJavaバージョン(Temurin)の切替"
layout: post
date: 2022-12-06T08:49:49+0900
categories: blogs
tags: ["ubuntu", "java", "temurin"]
---

## 前描き

現在LTSのJavaバージョンでは三つがあります。

1. 21
2. 17（2023年12月の現在のメイジャーバージョン）
3. 11
4. 8（新規プロジェクトには殆ど使わない）

案件によりますが、使用するバージョンが違うかも知れません。コマンドラインからビルドする時、JAVA_HOMEを指定しての実施ではないかと思います。
しかし、手でコマンドを打つ時、一時的にバージョンを切り替えたい場合、インストールしたパスを暗記しないと無理です。
この時、Java切替のアリスを用意すれば、ストレスがなく切り替えられると思います。

Javaのベンダーが沢山ありますが、Eclipse Temurinを愛用しています。
以降説明はEclipse Temurinをベースに説明します。

## メジャーバージョンのJDKのインストール

### リポジトリの追加

```bash
sudo apt-get install -y wget apt-transport-https
wget -O - https://packages.adoptium.net/artifactory/api/gpg/key/public | sudo tee /etc/apt/keyrings/adoptium.asc
echo "deb [signed-by=/etc/apt/keyrings/adoptium.asc] https://packages.adoptium.net/artifactory/deb $(awk -F= '/^VERSION_CODENAME/{print$2}' /etc/os-release) main" | sudo tee /etc/apt/sources.list.d/adoptium.list

sudo apt-get update # update if you haven't already
```
### v21のインストール

```shell
sudo apt-get install temurin-21-jdk
```

### v17のインストール

```shell
sudo apt-get install temurin-17-jdk
```

### v11のインストール

```shell
sudo apt-get install temurin-11-jdk
```

### v8のインストール

```shell
sudo apt-get install temurin-8-jdk
```

### インストール済みのバージョンの確認

```shell
$ ll /usr/lib/jvm/
total 16K
drwxr-xr-x 9 root root 4.0K Dec 10 17:22 temurin-11-jdk-amd64
drwxr-xr-x 9 root root 4.0K Dec 10 17:25 temurin-17-jdk-amd64
drwxr-xr-x 9 root root 4.0K Dec 10 17:28 temurin-21-jdk-amd64
drwxr-xr-x 8 root root 4.0K Dec 10 17:22 temurin-8-jdk-amd64
```

## バージョンの切替

### 切替の事前準備

下記のスクリプトをBASHのリソースに追加します。
zshの場合、`~/.zshrc`に下記のコマンドを追記してください。

```shell
# Jave Environment
export JAVA_21_HOME="/usr/lib/jvm/temurin-21-jdk-amd64"
export JAVA_17_HOME="/usr/lib/jvm/temurin-17-jdk-amd64"
export JAVA_11_HOME="/usr/lib/jvm/temurin-11-jdk-amd64"
export JAVA_8_HOME="/usr/lib/jvm/temurin-8-jdk-amd64"

# Default Java Version
export JAVA_HOME="${JAVA_21_HOME}"
sudo ln -sf ${JAVA_21_HOME}/bin/java /etc/alternatives/java

# Change Java Version
alias java21="export JAVA_HOME=$JAVA_21_HOME && sudo ln -sf ${JAVA_21_HOME}/bin/java /etc/alternatives/java"
alias java17="export JAVA_HOME=$JAVA_17_HOME && sudo ln -sf ${JAVA_17_HOME}/bin/java /etc/alternatives/java"
alias java11="export JAVA_HOME=$JAVA_11_HOME && sudo ln -sf ${JAVA_11_HOME}/bin/java /etc/alternatives/java"
alias java8="export JAVA_HOME=$JAVA_8_HOME && sudo ln -sf ${JAVA_8_HOME}/bin/java /etc/alternatives/java"
```
### バージョンの切替確認

```shell
$ java8
$ java -version
openjdk version "1.8.0_392"
OpenJDK Runtime Environment (Temurin)(build 1.8.0_392-b08)
OpenJDK 64-Bit Server VM (Temurin)(build 25.392-b08, mixed mode)
$ java11
$ java -version
openjdk version "11.0.21" 2023-10-17
OpenJDK Runtime Environment Temurin-11.0.21+9 (build 11.0.21+9)
OpenJDK 64-Bit Server VM Temurin-11.0.21+9 (build 11.0.21+9, mixed mode)
$ java17
$ java -version
openjdk version "17.0.9" 2023-10-17
OpenJDK Runtime Environment Temurin-17.0.9+9 (build 17.0.9+9)
OpenJDK 64-Bit Server VM Temurin-17.0.9+9 (build 17.0.9+9, mixed mode, sharing)
$ java21
$ java -version
openjdk version "21.0.1" 2023-10-17 LTS
OpenJDK Runtime Environment Temurin-21.0.1+12 (build 21.0.1+12-LTS)
OpenJDK 64-Bit Server VM Temurin-21.0.1+12 (build 21.0.1+12-LTS, mixed mode, sharing)
```
## 参照資料

1. [Eclipse Temurin](https://projects.eclipse.org/projects/adoptium.temurin)
2. [Linux (RPM/DEB/APK) installer packages](https://adoptium.net/installation/linux/)
3. [Upgrade to OpenJDK Temurin using Homebrew](https://www.yippeecode.com/topics/upgrade-to-openjdk-temurin-using-homebrew/)
