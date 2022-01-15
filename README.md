# gekal's blogs

URL：[https://www.gekal.cn/](https://www.gekal.cn/)

## ローカルテスト

1. ローカルインストール

    1. [WSL(Ubuntu20.4)にJekyll環境の構築](https://www.gekal.cn/blogs/2019/11/29/jekyll-wsl-ubuntu18.html)

    2. [MacにJekyll環境の構築](https://www.gekal.cn/blogs/2019/01/01/jekyll-mac.html)

2. [Jekyll Docker](https://github.com/envygeeks/jekyll-docker)

    ```bash
    docker run --rm \
        --volume="$PWD:/srv/jekyll" \
        --volume="$PWD/vendor/bundle:/usr/local/bundle" \
        -it jekyll/jekyll:4 \
        jekyll serve
    ```

3. [Docker Composer](docker-compose.yaml)

    ```bash
    # 開始
    docker-compose up
    ```

## 参照

1. [プレーンテキストを静的サイトやブログに変えましょう。](http://jekyllrb-ja.github.io/)
