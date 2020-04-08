---
title: Raspberry Pi 4 Model Bを購入して、セットアップしました。
layout: post
auther: gekal
date:   2020-04-05T12:33:00+0900
categories: blogs
tags: Raspberry Pi 4 Model B
---

## Raspberry Piとは

[Raspberry Pi（ラズベリー パイ）](https://ja.wikipedia.org/wiki/Raspberry_Pi)は、ARMプロセッサを搭載したシングルボードコンピュータ。

教育で利用されることを想定して制作されたが、IoTが隆盛した2010年代後半以降は、安価に入手できるシングルボードコンピュータとして趣味や業務（試作品の開発）等としても用いられるようになった。

## Amazonから購入した

やや高いですが、最新モジュールのRaspberry Pi 4 Model Bを購入しました。

- CPU

    ARM Cortex-A53 クアッドコア 1.50 GHz

- RAM容量

    4 GB

- グラフィックカード種類

    OpenGL ES 3.0グラフィックス

> この[店舗のStarter Kit](https://www.amazon.co.jp/gp/product/B083XSRYXW/ref=ppx_yo_dt_b_asin_title_o00_s00)から購入しました。

ケース、電源などがあるので、ちょっと手間を掛らずにセットできると思うので、Kitを購入しました。

![箱の中の部品](/assets/imgs/blogs/2020-04-05/things-in-box.jpeg)

## ラズパイを起動して初期化する

1. 下記の設定してから、電源を入れる

    - 電源
    - モニーター
    - マウス
    - キーボード
    - LANケーブル（オプション）

    ![PIの起動](/assets/imgs/blogs/2020-04-05/power-on-for-my-pi.jpeg)

2. デスクトップに入ったら、下記をセットください

    - パスワード
    - タイムゾンと言語
    - WifiのSSIDとパスワード
    - システム更新

        時間が掛かるから、スキップしたほうがいいと思う。

    ![デスクトップ・CPUインフォ](/assets/imgs/blogs/2020-04-05/confirm-pi-cpu-info.jpeg)

## SSHでログインして更新

### SShログイン

1. ログイン情報

    | 項目      | 値                |
    | --------- | ----------------- |
    | Host Name | raspberrypi.local |
    | User      | pi                |
    | Password  | ***               |

2. SSHログインを有効

    ...割愛...

3. SSHログイン

    ```bash
    $ ssh pi@raspberrypi.local
    pi@raspberrypi.local's password:
    Linux raspberrypi 4.19.97-v7l+ #1294 SMP Thu Jan 30 13:21:14 GMT 2020 armv7l

    The programs included with the Debian GNU/Linux system are free software;
    the exact distribution terms for each program are described in the
    individual files in /usr/share/doc/*/copyright.

    Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
    permitted by applicable law.
    Last login: Sat Apr  4 20:39:41 2020
    ```

### VNCリモート

1. VNCクライアントをインストール

    <https://www.realvnc.com/en/connect/download/viewer/>

2. VNC接続有効

    ```bash
    # piにログインして、下記のコマンドをコンフィグを開き
    $ sudo raspi-config
    - Interfacing Options
    -- P3 VNC
    --- ↑有効にしてください↑
    ```

3. VNC接続をしに行く

    > SSHのログイン情報と同じ

#### VNCのトラブルシューティング

1. VNC: Cannot currently show the desktop

    `/boot/config.txt`に下記の設定をコメントアウト

    ```config
    # uncomment if hdmi display is not detected and composite is being output
    hdmi_force_hotplug=1
    ```

### システム更新

> DebianベースのOSなので、apt/apt-getを使って更新

```bash
$ sudo apt update
ヒット:1 https://packagecloud.io/headmelted/codebuilds/debian stretch InRelease
エラー:1 https://packagecloud.io/headmelted/codebuilds/debian stretch InRelease
  公開鍵を利用できないため、以下の署名は検証できませんでした: NO_PUBKEY 0CC3FD642696BFC8
ヒット:2 http://archive.raspberrypi.org/debian buster InRelease
取得:3 http://raspbian.raspberrypi.org/raspbian buster InRelease [15.0 kB]
取得:4 http://raspbian.raspberrypi.org/raspbian buster/main armhf Packages [13.0 MB]
13.0 MB を 19秒 で取得しました (668 kB/s)
パッケージリストを読み込んでいます... 完了
依存関係ツリーを作成しています
状態情報を読み取っています... 完了
アップグレードできるパッケージが 50 個あります。表示するには 'apt list --upgradable' を実行してください。
W: 署名照合中にエラーが発生しました。リポジトリは更新されず、過去のインデックスファイルが使われます。GPG エラー: https://packagecloud.io/headmelted/codebuilds/debian stretch InRelease: 公開鍵を利用できないため、以下の署名は検証できませんでした: NO_PUBKEY 0CC3FD642696BFC8
W: https://packagecloud.io/headmelted/codebuilds/debian/dists/stretch/InRelease の取得に失敗しました  公開鍵を利用できないため、以下の署名は検証できませんでした: NO_PUBKEY 0CC3FD642696BFC8
W: いくつかのインデックスファイルのダウンロードに失敗しました。これらは無視されるか、古いものが代わりに使われます。

# キー検証エラーのため、下記のキーを追加ください。
$ wget -qO - https://packagecloud.io/headmelted/codebuilds/gpgkey | sudo apt-key add -
OK

$ sudo apt update
パッケージを更新するログ。。。。。
```

## 感想

IoTとして、使うのは、多いですが、小さいLinuxサーバーとして使えるだろう。
ARMだけれども、４Core＋４Gのメモリがあるから、性能も悪くないでしょう。

Nginxをインストールして確認して見ましたが、ばっちりですね。

```bash
$ sudo apt update
$ sudo apt install nginx
$ sudo /etc/init.d/nginx start
[ ok ] Starting nginx (via systemctl): nginx.service.
```

![NGINXテストページ](/assets/imgs/blogs/2020-04-05/nginx-runs-on-raspberry-pi.png)

## 参照

1. [Raspberry Piのホームページ](https://www.raspberrypi.org/)
2. [Setting up an NGINX web server on a Raspberry Pi](https://www.raspberrypi.org/documentation/remote-access/web-server/nginx.md)
