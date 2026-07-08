---
title: "Gradle プロジェクトの依存ライブラリー＆ライブラリー登録"
layout: post
date: 2023-04-05T21:16:43+0900
categories: blogs
tags: ["Gradle", "Maven"]
---

## Gradle の資材管理

Gradle プロジェクトの依存ライブラリーは`Maven`と同じセントラルリポジトリーからダウンロードできます。ダウンロードされた依存されるライブラリーは`~/.gradle/caches/modules-2/files-2.1`にキャッシュされています。

時には、共通やＦＷ等のライブラリーをセントラルリポジトリ(インハウスリポジトリも含め)に登録されない可能性があります。そうして、Mavenのローカルリポジトリへ登録する必要があります。

## プロジェクトのJarをビルドして、Mavenのローカルリポジトリへの登録

1. `build.gradle`に必要な設定を追加します。

    ```gradle
    plugins {
        id 'maven-publish'
    }

    ... other configuration ...

    repositories {
        mavenLocal()
    }
    ```

2. `build.gradle`に必要な設定を追加します。

    ```bash
    ./gradlew clean publishToMavenLocal
    ```

## プロジェクトの依存ライブラリーをGradleキャッシュからMavenのローカルリポジトリへのダウンロード

> ローカルリポジトリのデフォルトパス: `~/.m2/repository`

1. `build.gradle`に必要な設定を追加します。

    Gradleの構成のパス例: 

    > `~/.gradle/caches/modules-2/files-2.1/org.springframework/spring-framework-bom/5.3.6/16d95fb49d7fa839e85a0aa37291e6f8c2e6b62b/spring-framework-bom-5.3.6.pom`

    | parts | value                                    | memo             |
    | ----- | ---------------------------------------- | ---------------- |
    | 0     | org.springframework                      | group id         |
    | 1     | spring-framework-bom                     | artifact id      |
    | 2     | 5.3.6                                    | artifact version |
    | 3     | 16d95fb49d7fa839e85a0aa37291e6f8c2e6b62b | cache key        |
    | 4     | spring-framework-bom-5.3.6.pom           | artifact file    |

    ```gradle
    repositories {
        mavenLocal()
    }
    
    dependencies {
        // dependencies
    }
    
    build {
        finalizedBy 'cacheToMavenLocal'
    }
    
    task cacheToMavenLocal(type: Copy) {
        from new File(gradle.gradleUserHomeDir, 'caches/modules-2/files-2.1')
        into repositories.mavenLocal().url
        eachFile {
            List<String> parts = it.path.split('/')
            it.path = [parts[0].replace('.','/'), parts[1], parts[2], parts[4]].join('/')
        }
        includeEmptyDirs false
    }
    ```

2. ビルドコマンドを追加します。

    ```bash
    ./gradlew clean build
    ```

## 参照

1. [Gradle download dependency merge into maven local repository?](https://stackoverflow.com/questions/19396876/gradle-download-dependency-merge-into-maven-local-repository)
