# infra — AWS 配信基盤 (CDK)

`out/` に書き出した静的サイトを AWS から配信するための CDK アプリ。

```
読者 → Aliyun DNS → CloudFront → (OAC) → S3 (非公開)
                        │
                        └ CloudFront Function
                            ・gekal.cn → www.gekal.cn の 301
                            ・/about/ → /about/index.html の解決
                            ・/about  → /about/ の 301
```

S3 の「静的ウェブサイトホスティング」は使っていない。あれは HTTP 専用でバケットの
公開が前提になるため、代わりに OAC でバケットを閉じたまま CloudFront から署名付きで
読ませ、ディレクトリ→`index.html` の解決は CloudFront Function に任せている。

構成の値は `cdk.json` の `context` が唯一の定義。ホスト名を `.ts` や `.js` に
直書きしないこと (関数のホスト名はデプロイ時に置換される)。

## 前提

- Node.js 24 以上。`cdk.json` は `node bin/gekal-site.ts` を直接実行する
  (Node のネイティブ型ストリップ)。そのため `enum` や parameter property など
  消去できない構文は書けない。`tsconfig.json` の `erasableSyntaxOnly` で縛ってある。
- AWS の認証。`aws sso login --profile <プロファイル名>`。
- 初回のみ CDK ブートストラップ:

  ```bash
  npx cdk bootstrap aws://<アカウントID>/ap-northeast-1
  ```

```bash
cd infra && npm install
```

## 手順

### 1. ACM 証明書を発行する

CloudFront が使える証明書は us-east-1 のものだけで、DNS 検証レコードは Aliyun に
手で入れる必要がある。CloudFormation に待たせると数時間タイムアウトを抱えるので、
証明書だけスタックの外で先に発行する。

```bash
./scripts/request-certificate.sh
```

表示された CNAME を Aliyun DNS (gekal.cn) に追加してから、

```bash
./scripts/request-certificate.sh --wait
```

で `ISSUED` になるまで待つ。最後に表示される ARN を次の手順で使う。

### 2. スタックをデプロイする

```bash
npx cdk deploy -c certificateArn=arn:aws:acm:us-east-1:...:certificate/...
```

アカウントに GitHub の OIDC プロバイダが既にある場合 (1 アカウントに 1 つしか
作れない) は `-c createGithubOidcProvider=false` を足す。

出力される `DeployRoleArn` を GitHub リポジトリの Secret `AWS_DEPLOY_ROLE_ARN`
に設定する。ロール ARN にはアカウント ID が含まれるため、公開リポジトリでは
variables ではなく secrets に置くこと。

### 3. 中身を配置する

`.github/workflows/deploy-aws.yml` を `workflow_dispatch` で手動実行する。
バケット名と Distribution ID はスタックの出力から引くので、ワークフロー側に
書き写す値はない。

### 4. DNS を切り替える前に検証する

CloudFront のドメイン宛のリクエストはリダイレクトせず素通しにしてあるので、
DNS を触らずに実物を確認できる。`--connect-to` を使えば Host と SNI だけを
本番のホスト名にしたまま、接続先を CloudFront に向けられる。

```bash
DIST=d1234567890abc.cloudfront.net

# 記事が引けること
curl -sI --connect-to www.gekal.cn:443:$DIST:443 https://www.gekal.cn/posts/ | head -5

# apex が www へ 301 すること
curl -sI --connect-to gekal.cn:443:$DIST:443 https://gekal.cn/posts/ | grep -i '^location'

# スラッシュなしが 301 されること
curl -sI --connect-to www.gekal.cn:443:$DIST:443 https://www.gekal.cn/about | grep -i '^location'

# 存在しないパスが 404 を返すこと (403 が漏れないこと)
curl -so /dev/null -w '%{http_code}\n' --connect-to www.gekal.cn:443:$DIST:443 https://www.gekal.cn/nope/
```

### 5. DNS を切り替える

Aliyun DNS で `www` の CNAME を `gekal.github.io` から CloudFront のドメインに
変更する。TTL は切替の前日までに 600 秒程度へ下げておくと、切り戻しが速い。

## apex (gekal.cn) の扱い — 案B を採用

CloudFront に固定 IP はなく、DNS の仕様上 apex に CNAME は張れない。Aliyun DNS の
ALIAS レコードは企業版限定なので、無料/個人プランでは **apex を CloudFront に
向けられない**。追加費用を出さない方針から、apex は GitHub Pages に残す。

移行後の DNS はこうなる。

| ホスト | レコード | 向き先 | 応答する場所 |
|---|---|---|---|
| `gekal.cn` | A ×4 | GitHub Pages の IP (現状のまま) | GitHub Pages が www へ 301 |
| `www.gekal.cn` | CNAME | `d….cloudfront.net` | CloudFront → S3 |

apex の 301 は `public/CNAME` に書かれた `www.gekal.cn` に従って GitHub Pages が
出す。つまり **`public/CNAME` と `deploy.yml` は消せない**。CloudFront Function 側の
apex→www の 301 は、将来 apex を CloudFront に向けたときのために残してあるが、
案B では発火しない (apex が CloudFront に届かないため)。

### 抱えるリスク: GitHub Pages の証明書

GitHub Pages が発行している証明書は、1 枚で apex と www の両方をカバーしている。

```
$ echo | openssl s_client -connect gekal.cn:443 -servername gekal.cn 2>/dev/null \
    | openssl x509 -noout -enddate -ext subjectAltName
notAfter=Nov 19 00:33:42 2026 GMT
X509v3 Subject Alternative Name:
    DNS:gekal.cn, DNS:www.gekal.cn
```

www の DNS を CloudFront に向けると、更新時の Let's Encrypt HTTP-01 検証が www 側で
通らなくなる。更新が丸ごと落ちれば apex の HTTPS も道連れになる。落ちるかどうかは
GitHub の実装次第で、実際に更新が走るまで確定しない。

更新は期限の 30 日前あたりから試行される。上記の期限なら **2026-10-20 前後の更新が
最初の山**になる (2026-08-21 時点の確認。期限は更新のたびに動くので、日付ではなく
残り日数で見ること)。

見張りは `.github/workflows/check-apex-certificate.yml` が週次で自動的に行う。
残り 21 日を切るか、apex→www の 301 が壊れると Actions が失敗して通知が飛ぶ。

### 証明書が更新されなかったら

DNS を移すしかない。ネームサーバだけを移し (レジストラは Aliyun のまま)、apex・www
とも CloudFront に向ける。apex の 301 は CloudFront Function が引き継ぐので、
GitHub Pages から完全に降りられる。

- **Cloudflare DNS**: 無料。CNAME flattening で apex を CloudFront に向けられる。
  費用を増やさずにこのリスクを消せる唯一の選択肢。
- **Route 53**: ホストゾーン月 $0.50。ALIAS レコードで同じことができる。

移した後の手順は下の「GitHub Pages を停止する」を参照。

## 切り戻し

DNS を戻すだけでよい。`www` の CNAME を `gekal.github.io` に戻せば GitHub Pages が
そのまま応答する (Pages のワークフローは止めずに併存させてある)。CloudFront と
S3 は残しておいても課金はほぼ発生しない。

## GitHub Pages を停止する

**案B のままでは止められない。** apex の 301 と証明書を GitHub Pages に依存している。
DNS を Cloudflare か Route 53 に移し、apex も CloudFront に向けたうえで、しばらく
問題がないことを確認してから:

1. `.github/workflows/deploy.yml` を削除
2. `public/CNAME` を削除
3. リポジトリの Settings → Pages で Source を None にする
4. DNS から GitHub Pages 向けの A レコードを削除

## 運用メモ

- **キャッシュ**: CloudFront は `CACHING_OPTIMIZED` でオリジンの `Cache-Control` を
  尊重する。実際の TTL は `deploy-aws.yml` の `aws s3 sync --cache-control` で決まる。
  `_next/static/*` は 1 年 (immutable)、画像は 1 日、HTML は毎回再検証。
  デプロイの最後に `/*` を無効化しているので、反映の遅れは実質ない。
- **古いアセット**: `--delete` は `_next/static/*` を除外している。デプロイ中に
  読み込まれた HTML が古いハッシュ付きアセットを参照し続けるため、即時削除は危険。
  1 ビルドあたり数百 KB なので放置してよい。
- **費用**: S3 数セント + CloudFront (月 1TB まで無料枠) + ACM 無料 + CloudFront
  Function (月 200 万回まで無料枠)。案B では DNS も GitHub Pages も無料のままなので、
  月あたりの増分は S3 のストレージ代 (出力 84MB で $0.01 未満) が実質すべて。
- **バケットの削除保護**: `RemovalPolicy.RETAIN`。`cdk destroy` してもバケットは
  残るので、消すときは手動で。

## コマンド

```bash
npm run typecheck   # tsc --noEmit
npm test            # CloudFront Function のリダイレクト規則を検証
npm run synth       # CloudFormation テンプレートを確認
npm run diff        # デプロイ済みとの差分
npm run deploy      # デプロイ (-c certificateArn=... が必要)
```
