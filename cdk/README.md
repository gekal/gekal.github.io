# インフラ (S3 + CloudFront)

`www.gekal.cn` を配信する AWS リソースを CDK で定義している。
サイト本体とは独立した npm プロジェクトなので、依存をルートの `package.json` に足さないこと。

```bash
cd cdk && npm install
npx cdk synth        # テンプレート生成
npx cdk diff         # 差分確認
npx cdk deploy --all # デプロイ
```

## 構成

| スタック | 内容 |
|---|---|
| `GekalBlogCertificate` | `www.gekal.cn` の ACM 証明書 |
| `GekalBlogSite` | S3 バケット(非公開)、CloudFront + OAC、URI 書き換え Function、セキュリティヘッダ、GitHub OIDC デプロイロール |

どちらも **us-east-1**。CloudFront が使う ACM 証明書は us-east-1 にしか置けず、
バケットも同居させてクロスリージョン参照を避けている
(配信は CloudFront 経由なのでバケットのリージョンは体感速度に影響しない)。

証明書を別スタックにしているのは意図的。`gekal.cn` の権威 DNS は Aliyun で
Route 53 ではないため検証が手動になり、スタックが検証待ちで停止する。
分離しておけば検証がタイムアウトしても S3 バケットや CloudFront を巻き添えにしない。

ドメイン名やリポジトリ名は `cdk.json` の `context` にある。
アカウントに `token.actions.githubusercontent.com` の OIDC プロバイダが既にある場合は
`createGithubOidcProvider` を `false` にすること (重複作成はエラーになる)。

## ドメイン方針: www 一本化

apex (`gekal.cn`) は使わない。Aliyun DNS の無料版は apex の CNAME (CNAME 扁平化) に
対応しておらず、CloudFront には固定 IP がないため A レコードでも向けられないため。

これに合わせてサイト側も www を正規オリジンとして宣言している:

- `lib/site.ts` の `SITE_URL`
- `app/layout.tsx` の `metadataBase` と `alternates.canonical`
- `app/sitemap.ts` / `app/robots.ts`

**apex を DNS から削除すると `gekal.cn` は名前解決できなくなる。**
アドレスバーに `gekal.cn` と直接入力した訪問者はエラーになる。
これが困る場合は、Aliyun DNS の「显性URL转发」で `http://gekal.cn` →
`https://www.gekal.cn` の 301 を後から追加できる (無料版でも apex に設定可能)。
ただし apex 用の証明書はないので `https://gekal.cn` は救済できない。

## 初回デプロイ手順

### 1. ブートストラップ

```bash
npx cdk bootstrap aws://<ACCOUNT_ID>/us-east-1
```

### 2. 証明書スタック (手動 DNS 検証あり)

```bash
npx cdk deploy GekalBlogCertificate
```

`CREATE_IN_PROGRESS` のまま停止する。これは正常。停止している間に:

1. AWS コンソール → Certificate Manager (**リージョンを us-east-1 に切り替える**)
2. 発行待ちの証明書を開き、CNAME 名と CNAME 値を確認
3. Aliyun DNS の `gekal.cn` に、その CNAME レコードを追加
   (ホスト名は `.gekal.cn` を除いた部分だけを入れる)
4. 数分でスタックが完了する

出力された `CertificateArn` を控えておく。

### 3. サイトスタック

```bash
npx cdk deploy GekalBlogSite
```

出力される 4 つの値を控える:

| 出力 | 用途 |
|---|---|
| `BucketName` | GitHub Secrets の `AWS_S3_BUCKET` |
| `DistributionId` | GitHub Secrets の `AWS_CLOUDFRONT_DISTRIBUTION_ID` |
| `DeployRoleArn` | GitHub Secrets の `AWS_DEPLOY_ROLE_ARN` |
| `DistributionDomainName` | Aliyun DNS の `www` CNAME の向き先 |

### 4. GitHub Secrets

リポジトリの Settings → Secrets and variables → Actions に上記 3 つを登録。

### 5. 初回コンテンツ投入と動作確認

`master` に push すると `.github/workflows/deploy.yml` が走る。
DNS を切り替える**前に**、`https://<DistributionDomainName>` で確認しておく:

- トップ、記事一覧、記事詳細が表示される
- `/posts` (末尾スラッシュなし) が `/posts/` に 301 される
- 存在しない URL が 404 ページを返す
- ファビコンが出る

### 6. DNS 切り替え

事前に `www` の TTL を 600 秒程度に下げておくと切り戻しが速い。

1. `www` の CNAME を `gekal.github.io` → `<DistributionDomainName>` に変更
2. 反映を確認: `dig +short www.gekal.cn`
3. `https://www.gekal.cn` が CloudFront から配信されていることを確認
4. **apex (`gekal.cn`) の A レコード 4 件 (GitHub Pages の `185.199.10x.153`) を削除**

### 7. 後始末

1. GitHub Pages を無効化 (Settings → Pages → Source を None に)
2. リポジトリを private に変更
3. Google Search Console でサイトマップ `https://www.gekal.cn/sitemap.xml` を再送信

## 切り戻し

DNS 切り替え後に問題が出た場合、`www` の CNAME を `gekal.github.io` に戻せば復旧する
(GitHub Pages を無効化する前なら)。AWS リソースはそのまま残しておいてよい。

## 運用メモ

- S3 バケットは `RemovalPolicy.RETAIN`。`cdk destroy` してもバケットとコンテンツは残る
- CloudFront のキャッシュ TTL は S3 オブジェクトの `Cache-Control` で決まる。
  設定しているのは CDK ではなくデプロイワークフロー側 (`.github/workflows/deploy.yml`)
- 無効化 (invalidation) は月 1,000 パスまで無料。デプロイごとに `/*` を 1 パス使う
- デプロイロールは `master` ブランチからの実行のみ引き受ける。
  ブランチを変える場合は `cdk.json` の `githubBranch` も更新すること
