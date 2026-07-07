---
title: Raspberry Pi 4 Model B を購入してセットアップした
subtitle: ラズパイ 4 の初期設定・SSH・VNC・システム更新までの記録
layout: post
date:   2020-04-05T12:33:00+0900
categories: blogs
tags: raspberry-pi linux
---

## Raspberry Pi とは

[Raspberry Pi（ラズベリー パイ）](https://ja.wikipedia.org/wiki/Raspberry_Pi)は、ARM プロセッサを搭載したシングルボードコンピュータです。

もともとは教育用途を想定して作られたものですが、IoT が盛り上がった 2010 年代後半以降は、安価に手に入るシングルボードコンピュータとして、趣味や業務（試作品の開発）でも広く使われるようになりました。

## 購入したモデル

やや高価でしたが、最新モデルの Raspberry Pi 4 Model B を購入しました。

| 項目 | スペック |
| --- | --- |
| CPU | ARM Cortex-A72 クアッドコア 1.5GHz |
| RAM | 4GB |
| GPU | OpenGL ES 3.0 グラフィックス |

ケースや電源などが同梱されていて手間なくセットできそうだったので、[スターターキット](https://www.amazon.co.jp/gp/product/B083XSRYXW/)を選びました。

![箱の中の部品](/assets/imgs/blogs/2020-04-05/things-in-box.jpeg)

## 起動と初期設定

まず、以下を接続してから電源を入れます。

- 電源
- モニター
- マウス
- キーボード
- LAN ケーブル（任意）

![ラズパイの起動](/assets/imgs/blogs/2020-04-05/power-on-for-my-pi.jpeg)

デスクトップが立ち上がったら、初期設定ウィザードに従って以下を設定します。

- パスワード
- タイムゾーンと言語
- Wi-Fi の SSID とパスワード
- システム更新（時間がかかるので、後で SSH からまとめて行うほうが快適です）

![CPU 情報の確認](/assets/imgs/blogs/2020-04-05/confirm-pi-cpu-info.jpeg)

## SSH でログインする

### 接続情報

| 項目 | 値 |
| --- | --- |
| Host Name | `raspberrypi.local` |
| User | `pi` |
| Password | （設定したパスワード） |

### SSH を有効にしてログイン

`sudo raspi-config` の「Interface Options」から SSH を有効にしたうえで、別マシンから接続します。

```bash
$ ssh pi@raspberrypi.local
pi@raspberrypi.local's password:
Linux raspberrypi 4.19.97-v7l+ ... armv7l
...
Last login: Sat Apr  4 20:39:41 2020
```

## VNC でリモートデスクトップ

GUI をリモートで使いたい場合は VNC を有効にします。

1. [VNC Viewer](https://www.realvnc.com/en/connect/download/viewer/) をインストールする

2. `raspi-config` で VNC を有効にする

    ```bash
    sudo raspi-config
    # Interface Options -> VNC -> Enable
    ```

3. SSH と同じログイン情報で VNC 接続する

### トラブルシューティング

**「Cannot currently show the desktop」と表示される場合**

モニターを接続していないと、この症状が出ることがあります。`/boot/config.txt` の以下の設定のコメントを外すと解決します。

```conf
# uncomment if hdmi display is not detected and composite is being output
hdmi_force_hotplug=1
```

## システムを更新する

Raspberry Pi OS は Debian ベースなので、`apt` で更新できます。

```bash
sudo apt update
sudo apt upgrade
```

> サードパーティのリポジトリを追加していると、`NO_PUBKEY` の署名検証エラーが出ることがあります。その場合は、案内される公開鍵を `apt-key add` で追加してから再度 `apt update` してください。

## 感想

IoT の用途で使われることが多いラズパイですが、**小さな Linux サーバー** としても十分実用的です。ARM とはいえ 4 コア＋4GB メモリがあり、性能も悪くありません。

試しに Nginx を入れてみたところ、問題なく動きました。

```bash
sudo apt update
sudo apt install nginx
sudo /etc/init.d/nginx start
```

![Nginx のテストページ](/assets/imgs/blogs/2020-04-05/nginx-runs-on-raspberry-pi.png)

## 参照

1. [Raspberry Pi 公式サイト](https://www.raspberrypi.org/)
2. [Setting up an NGINX web server on a Raspberry Pi](https://www.raspberrypi.org/documentation/computers/remote-access.html)
