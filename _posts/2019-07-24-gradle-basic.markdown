---
title: Gradle入門
layout: post
date:   2019-07-24T11:00:00+0900
categories: blogs
tags: gradle
---

## Gradleとは

GradleはGroovyのDSLを利用してビルドスクリプトを記述することのできるビルドシステムである。

## 環境準備

1. [Gradle](https://gradle.org/releases/)をダウンロードして、解凍する

    gradle-5.5.1-bin.zip

2. 環境変数を設定

    | 変数        | 値                | 説明 |
    | ----------- | ----------------- | ---- |
    | GRADLE_HOME | <解凍先>          | 新規 |
    | Path        | %GRADLE_HOME%\bin | 追記 |

3. 環境確認

    ```powershell
    $ gradle -v

    ------------------------------------------------------------
    Gradle 5.5.1
    ------------------------------------------------------------

    Build time:   2019-07-10 20:38:12 UTC
    Revision:     3245f748c7061472da4dc184991919810f7935a5

    Kotlin:       1.3.31
    Groovy:       2.5.4
    Ant:          Apache Ant(TM) version 1.9.14 compiled on March 12 2019
    JVM:          11.0.2 (Oracle Corporation 11.0.2+9-LTS)
    OS:           Windows 10 10.0 amd64
    ```

## コマンド一覧

> `gradle tasks`で確認

### **Application tasks**

| task | detail                                 |
| ---- | -------------------------------------- |
| run  | Runs this project as a JVM application |

### **Build tasks**

| task            | detail                                                                                  |
| --------------- | --------------------------------------------------------------------------------------- |
| run             | Runs this project as a JVM application                                                  |
| assemble        | Assembles the outputs of this project.                                                  |
| bootJar         | Assembles an executable jar archive containing the main classes and their dependencies. |
| build           | Assembles and tests this project.                                                       |
| buildDependents | Assembles and tests this project and all projects that depend on it.                    |
| buildNeeded     | Assembles and tests this project and all projects it depends on.                        |
| classes         | Assembles main classes.                                                                 |
| clean           | Deletes the build directory.                                                            |
| jar             | Assembles a jar archive containing the main classes.                                    |
| testClasses     | Assembles test classes.                                                                 |

### **Build Setup tasks**

| task    | detail                          |
| ------- | ------------------------------- |
| init    | Initializes a new Gradle build. |
| wrapper | Generates Gradle wrapper files. |

### **Documentation tasks**

| task    | detail                                                       |
| ------- | ------------------------------------------------------------ |
| javadoc | Generates Javadoc API documentation for the main source code |

### **Help tasks**

| task                 | detail                                                                               |
| -------------------- | ------------------------------------------------------------------------------------ |
| buildEnvironment     | Displays all buildscript dependencies declared in root project 'demo'.               |
| components           | Displays the components produced by root project 'demo'. [incubating]                |
| dependencies         | Displays all dependencies declared in root project 'demo'.                           |
| dependencyInsight    | Displays the insight into a specific dependency in root project 'demo'.              |
| dependencyManagement | Displays the dependency management declared in root project 'demo'.                  |
| dependentComponents  | Displays the dependent components of components in root project 'demo'. [incubating] |
| help                 | Displays a help message.                                                             |
| model                | Displays the configuration model of root project 'demo'. [incubating]                |
| projects             | Displays the sub-projects of root project 'demo'.                                    |
| properties           | Displays the properties of root project 'demo'.                                      |
| tasks                | Displays the tasks runnable from root project 'demo'.                                |

### **Verification tasks**

| task  | detail               |
| ----- | -------------------- |
| check | Runs all checks.     |
| test  | Runs the unit tests. |
