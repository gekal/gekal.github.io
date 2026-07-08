---
title: "MacでマルチJavaバージョン(Temurin)の切替"
layout: post
date: 2022-03-16T22:04:26+0900
categories: blogs
tags: ["mac", "java", "temurin"]
---

## 前描き

現在LTSのJavaバージョンでは五つがあります。

1. 25
2. 21
3. 17
4. 11
5. 8（新規プロジェクトには殆ど使わない）

案件によりますが、使用するバージョンが違うかも知れません。コマンドラインからビルドする時、JAVA_HOMEを指定しての実施ではないかと思います。
しかし、手でコマンドを打つ時、一時的にバージョンを切り替えたい場合、インストールしたパスを暗記しないと無理です。
この時、Java切替のアリスを用意すれば、ストレスがなく切り替えられると思います。

Javaのベンダーが沢山ありますが、Eclipse Temurinを愛用しています。
以降説明はEclipse Temurinをベースに説明します。

## メジャーバージョンのJDKのインストール

### v25のインストール

```shell
brew install --cask temurin@25
```

### v21のインストール

```shell
brew install --cask temurin@21
```

### v17のインストール

```shell
brew install --cask temurin@17
```

### v11のインストール

```shell
brew install --cask temurin@11
```

### v8のインストール

```shell
brew install --cask temurin@8
```

### インストール済みのバージョンの確認

```shell
$ /usr/libexec/java_home -V
Matching Java Virtual Machines (11):
    25 (arm64) "Eclipse Adoptium" - "OpenJDK 25" /Library/Java/JavaVirtualMachines/temurin-25.jdk/Contents/Home
    25 (arm64) "Eclipse Adoptium" - "OpenJDK 25" /Users/gekal/Library/Java/JavaVirtualMachines/temurin-25/Contents/Home
    21.0.8 (arm64) "Eclipse Adoptium" - "OpenJDK 21.0.8" /Users/gekal/Library/Java/JavaVirtualMachines/temurin-21.0.8/Contents/Home
    21.0.8 (arm64) "Eclipse Adoptium" - "OpenJDK 21.0.8" /Library/Java/JavaVirtualMachines/temurin-21.jdk/Contents/Home
    17.0.16 (arm64) "Eclipse Adoptium" - "OpenJDK 17.0.16" /Library/Java/JavaVirtualMachines/temurin-17.jdk/Contents/Home
    17.0.16 (arm64) "Eclipse Adoptium" - "OpenJDK 17.0.16" /Users/gekal/Library/Java/JavaVirtualMachines/temurin-17.0.16/Contents/Home
    17.0.15 (arm64) "Eclipse Adoptium" - "OpenJDK 17.0.15" /Users/gekal/Library/Java/JavaVirtualMachines/temurin-17.0.15/Contents/Home
    17.0.14 (arm64) "Eclipse Adoptium" - "OpenJDK 17.0.14" /Users/gekal/Library/Java/JavaVirtualMachines/temurin-17.0.14/Contents/Home
    17.0.13 (arm64) "Eclipse Adoptium" - "OpenJDK 17.0.13" /Users/gekal/Library/Java/JavaVirtualMachines/temurin-17.0.13/Contents/Home
    11.0.28 (arm64) "Eclipse Adoptium" - "OpenJDK 11.0.28" /Library/Java/JavaVirtualMachines/temurin-11.jdk/Contents/Home
    1.8.0_462 (x86_64) "Eclipse Temurin" - "Eclipse Temurin 8" /Library/Java/JavaVirtualMachines/temurin-8.jdk/Contents/Home
/Library/Java/JavaVirtualMachines/temurin-25.jdk/Contents/Home
```

## バージョンの切替

### 切替の事前準備

下記のスクリプトをBASHのリソースに追加します。
zshの場合、`~/.zshrc`に下記のコマンドを追記してください。

```shell
# 各バージョンのJAVA_HOMEを設定
export JAVA_25_HOME=$(/usr/libexec/java_home -v 25)
export JAVA_21_HOME=$(/usr/libexec/java_home -v 21)
export JAVA_17_HOME=$(/usr/libexec/java_home -v 17)
export JAVA_11_HOME=$(/usr/libexec/java_home -v 11)
export JAVA_8_HOME=$(/usr/libexec/java_home -v 1.8)

# Java Versionの切替アリスを設定
alias java25="export JAVA_HOME=$JAVA_25_HOME"
alias java21="export JAVA_HOME=$JAVA_21_HOME"
alias java17="export JAVA_HOME=$JAVA_17_HOME"
alias java11="export JAVA_HOME=$JAVA_11_HOME"
alias java8="export JAVA_HOME=$JAVA_8_HOME"
```
### バージョンの切替確認

```shell
$ java8
$ java -version
openjdk version "1.8.0_322"
OpenJDK Runtime Environment (Temurin)(build 1.8.0_322-b06)
OpenJDK 64-Bit Server VM (Temurin)(build 25.322-b06, mixed mode)
$ java11       
$ java -version
openjdk version "11.0.14.1" 2022-02-08
OpenJDK Runtime Environment Temurin-11.0.14.1+1 (build 11.0.14.1+1)
OpenJDK 64-Bit Server VM Temurin-11.0.14.1+1 (build 11.0.14.1+1, mixed mode)
$ java17       
$ java -version
openjdk version "17.0.2" 2022-01-18
OpenJDK Runtime Environment Temurin-17.0.2+8 (build 17.0.2+8)
OpenJDK 64-Bit Server VM Temurin-17.0.2+8 (build 17.0.2+8, mixed mode, sharing)
$ java21    
$ java -version
openjdk version "21.0.1" 2023-10-17 LTS
OpenJDK Runtime Environment Temurin-21.0.1+12 (build 21.0.1+12-LTS)
OpenJDK 64-Bit Server VM Temurin-21.0.1+12 (build 21.0.1+12-LTS, mixed mode)
$ java25
$ java -version
openjdk version "25" 2025-09-16 LTS
OpenJDK Runtime Environment Temurin-25+36 (build 25+36-LTS)
OpenJDK 64-Bit Server VM Temurin-25+36 (build 25+36-LTS, mixed mode, sharing)
```

## 参照資料

1. [Eclipse Temurin](https://projects.eclipse.org/projects/adoptium.temurin)
2. [Upgrade to OpenJDK Temurin using Homebrew](https://www.yippeecode.com/topics/upgrade-to-openjdk-temurin-using-homebrew/)
