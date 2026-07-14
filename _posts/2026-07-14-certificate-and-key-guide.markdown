---
title: "証明書・秘密鍵・PEM・PKCS#12・JWKの違いと変換コマンド"
layout: post
date: 2026-07-14T07:46:50+0900
categories: blogs
tags: ["openssl", "ssl", "certificate", "jwt", "security"]
subtitle: "証明書と鍵の形式を整理し、OpenSSLによる確認・変換方法をまとめる"
---


## はじめに

TLS で使う X.509 証明書には `.crt`、`.cer`、`.pem` など似た拡張子があり、秘密鍵を含む `.p12` や、Web API で使われる JWK も登場します。

混乱しやすい理由は、**拡張子、データ形式、格納される内容がそれぞれ別の概念**だからです。本記事では、それらの関係と OpenSSL を使った確認・変換方法をまとめます。

> 秘密鍵を外部サービスへアップロードしたり、Git にコミットしたりしないでください。本番の秘密鍵は、可能であれば KMS、HSM、シークレット管理サービスなどで生成・保管してください。

## まず押さえたい3つの観点

ファイルを判別するときは、拡張子だけでなく次の3点を確認します。

1. **内容**: 証明書、秘密鍵、公開鍵、CSR のどれか
2. **エンコーディング**: テキストの PEM か、バイナリの DER か
3. **コンテナ**: 複数の証明書や秘密鍵を格納できる PKCS#12 か

たとえば `.crt` は PEM の場合も DER の場合もあります。また `.pem` は証明書とは限らず、秘密鍵や公開鍵を格納することもあります。

## 主な拡張子と形式

| 拡張子 | 一般的な内容 | 一般的なユースケース | 補足 |
| --- | --- | --- | --- |
| `.crt` / `.cer` | X.509 証明書 | Web サーバーへの証明書設定、OS やブラウザーへの CA 証明書の登録 | PEM または DER。拡張子だけでは判別できない |
| `.key` | 秘密鍵 | Nginx、Apache、ロードバランサーなどが TLS 通信で使用する秘密鍵 | PEM が一般的だが、形式は運用次第。外部へ公開しない |
| `.pem` | 証明書、秘密鍵、公開鍵、証明書チェーンなど | Linux 系サーバーでの証明書設定、複数の CA 証明書を連結したチェーンの受け渡し | Base64 とヘッダーを使うテキスト表現 |
| `.der` | 証明書や鍵 | Java や組み込み機器など、バイナリ形式を要求するシステムへの取り込み | ASN.1 DER で符号化されたバイナリ |
| `.csr` | 証明書署名要求（CSR） | CA にサーバー証明書やクライアント証明書の発行を申請する | PEM または DER。通常は秘密鍵を作成した環境で生成する |
| `.p12` / `.pfx` | PKCS#12 コンテナ | Windows、IIS、macOS、Java などへの証明書と秘密鍵の一括インポート、システム間の移行 | 秘密鍵、証明書、証明書チェーンをまとめてパスワード保護できる |
| `.jwk` / `.json` | JSON Web Key | JWT の署名・検証、OIDC プロバイダーの公開鍵配布、JWE の暗号化・復号 | JOSE で扱う鍵パラメーターの JSON 表現。公開用には秘密鍵を含めない |

### 各形式のファイル例

以下はファイルの見え方を示すための例です。Base64 や鍵パラメーターは省略または説明用の値に置き換えているため、証明書や鍵としては使用できません。

#### `.crt` / `.cer`: X.509 証明書

PEM 形式の証明書をテキストエディターで開くと、`CERTIFICATE` ヘッダーが見えます。

```text
-----BEGIN CERTIFICATE-----
MIID...（Base64で符号化された証明書本体）...QAB
-----END CERTIFICATE-----
```

同じ `.cer` でも、Windows などで使われるファイルは DER 形式のバイナリである場合があります。次のように OpenSSL へ入力形式を指定すると内容を確認できます。

```bash
openssl x509 -inform DER -in server.cer -noout -subject -issuer
```

```text
subject=CN=example.com, O=Example Inc., C=JP
issuer=CN=Example Intermediate CA, O=Example CA, C=JP
```

#### `.key`: 秘密鍵

一般的な PKCS#8 秘密鍵は、次のヘッダーを持つ PEM ファイルです。

```text
-----BEGIN PRIVATE KEY-----
MIIE...（Base64で符号化された秘密鍵。外部公開禁止）...AB
-----END PRIVATE KEY-----
```

パスフレーズで暗号化された PKCS#8 秘密鍵では、ヘッダーが `BEGIN ENCRYPTED PRIVATE KEY` になります。どちらも秘密情報であり、記事、チャット、Git リポジトリなどへ実データを貼り付けてはいけません。

#### `.pem`: 証明書チェーン

`.pem` は内容を限定しない拡張子です。たとえば `fullchain.pem` には、サーバー証明書と中間 CA 証明書を順番に連結できます。

```text
-----BEGIN CERTIFICATE-----
...（サーバー証明書）...
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
...（中間CA証明書）...
-----END CERTIFICATE-----
```

#### `.der`: DER 形式の証明書

DER はバイナリなので、テキストエディターで読めるヘッダーはありません。16進数で表示すると次のように見えます。

```bash
xxd -l 32 server.der
```

```text
00000000: 3082 035d 3082 0245 a003 0201 0202 1401  0..]0..E........
00000010: 2345 6789 abcd ef01 2345 6789 abcd ef01  #Eg.....#Eg.....
```

先頭の `30 82` だけでファイルの用途を断定することはできません。内容は `openssl x509 -inform DER` など、対象形式に対応したコマンドで確認します。

#### `.csr`: 証明書署名要求

PEM 形式の CSR は、証明書とは異なる `CERTIFICATE REQUEST` ヘッダーを持ちます。

```text
-----BEGIN CERTIFICATE REQUEST-----
MIIC...（公開鍵、申請情報、申請者の署名）...AB
-----END CERTIFICATE REQUEST-----
```

CSR には公開鍵や申請する SAN などが含まれますが、秘密鍵は含まれません。

#### `.p12` / `.pfx`: PKCS#12 コンテナ

PKCS#12 はバイナリファイルです。直接開く代わりに、OpenSSL で格納内容の概要を確認します。

```bash
openssl pkcs12 -in server.p12 -info -noout
```

```text
MAC: sha256, Iteration 2048
PKCS7 Encrypted data: PBES2, PBKDF2, AES-256-CBC
Certificate bag
PKCS7 Data
Shrouded Keybag: PBES2, PBKDF2, AES-256-CBC
```

実際の表示は、作成に使ったソフトウェア、暗号方式、OpenSSL のバージョンによって異なります。`Certificate bag` は証明書、`Shrouded Keybag` は暗号化された秘密鍵が格納されていることを示します。

#### `.jwk` / `.json`: JSON Web Key

RSA 公開鍵の JWK は、次のような JSON オブジェクトです。

```json
{
  "kty": "RSA",
  "use": "sig",
  "alg": "RS256",
  "kid": "2026-01",
  "n": "Base64urlで符号化されたRSAのmodulus",
  "e": "AQAB"
}
```

`kty` は鍵種別、`n` と `e` は RSA 公開鍵のパラメーターです。秘密 RSA JWK にはさらに `d`、`p`、`q` などが含まれます。公開 JWKS にそれらの秘密パラメーターが含まれていないことを必ず確認してください。

複数の公開 JWK を配布するときは、次のように `keys` 配列へ格納します。

```json
{
  "keys": [
    {
      "kty": "RSA",
      "use": "sig",
      "alg": "RS256",
      "kid": "2026-01",
      "n": "Base64urlで符号化されたRSAのmodulus",
      "e": "AQAB"
    }
  ]
}
```

### よくある利用パターン

#### Web サーバーで HTTPS を有効にする

Nginx や Apache では、一般にサーバー証明書の `.crt`、秘密鍵の `.key`、中間 CA 証明書を連結した `.pem` を設定します。製品によっては、サーバー証明書と中間 CA 証明書を1つの PEM ファイルにまとめた `fullchain.pem` を指定します。

```text
server.crt または fullchain.pem  +  server.key
          証明書                         秘密鍵
```

#### WindowsやIISへ証明書を移行する

証明書だけでなく対応する秘密鍵も移行する場合は、両方を格納できる `.pfx` がよく使われます。CA から受け取った `.cer` に秘密鍵が含まれているとは限らないため、証明書だけをコピーしても別のサーバーで TLS 通信に使用できない場合があります。

#### CAへ証明書の発行を申請する

秘密鍵を手元で生成し、公開鍵と申請情報を含む `.csr` を CA に渡します。CA からは署名済みの `.crt` や `.cer` が返されます。秘密鍵そのものは CA へ渡しません。

```text
server.key -- CSRを生成 --> server.csr -- CAへ申請 --> server.crt
  手元で保管                  CAへ渡す                 発行された証明書
```

#### JWTの署名を検証する

OIDC プロバイダーは通常、公開 JWK を複数まとめた JWKS を HTTPS エンドポイントで提供します。API は JWT ヘッダーの `kid` に対応する公開鍵を選び、署名を検証します。署名用の秘密 JWK は認証サーバー側だけで管理します。

### PEM のヘッダーで内容を見分ける

PEM は、先頭のヘッダーから内容を判別できます。

```text
-----BEGIN CERTIFICATE-----        # X.509 証明書
-----BEGIN CERTIFICATE REQUEST----- # CSR
-----BEGIN PRIVATE KEY-----        # PKCS#8 秘密鍵
-----BEGIN ENCRYPTED PRIVATE KEY----- # 暗号化された PKCS#8 秘密鍵
-----BEGIN RSA PRIVATE KEY-----    # PKCS#1 RSA 秘密鍵
-----BEGIN PUBLIC KEY-----         # SubjectPublicKeyInfo 形式の公開鍵
```

秘密鍵における PKCS#1 は RSA 固有の形式です。PKCS#8 は RSA や EC など複数の鍵アルゴリズムを共通の形式で扱えます。

## X.509 証明書、CSR、鍵の関係

```text
[秘密鍵] -- 公開鍵を導出 --> [公開鍵]
   |
   +-- 識別情報と署名を付ける --> [CSR] -- CAが署名 --> [X.509証明書]
   |                                              |
   +---------------- PKCS#12へ格納 ---------------+

[秘密鍵または公開鍵] -- 鍵パラメーターをJSON化 --> [JWK]
```

証明書には公開鍵と発行先、発行者、有効期限などが含まれ、CA の秘密鍵による署名が付いています。**証明書から秘密鍵を取り出すことはできません**。PKCS#12 から秘密鍵を取り出せるのは、作成時に秘密鍵も格納されている場合だけです。

### 変換の全体像

証明書と鍵の主な生成・変換経路を図にすると、次のようになります。矢印上の番号は、後述する「生成・変換コマンド」の番号に対応しています。

```mermaid
flowchart LR
    KEY["秘密鍵<br/>server.key<br/>PEM / PKCS#8"]
    PUB["公開鍵<br/>public-key.pem"]
    CSR["証明書署名要求<br/>server.csr"]
    CERTPEM["X.509 証明書<br/>server.crt<br/>PEM"]
    CERTDER["X.509 証明書<br/>server.der<br/>DER"]
    P12["PKCS#12<br/>server.p12<br/>証明書＋秘密鍵＋チェーン"]
    CHAIN["CA 証明書チェーン<br/>chain.pem"]
    JWK["JSON Web Key<br/>public.jwk"]

    KEY e1@-->|"2. CSR を作成"| CSR
    CSR e2@-->|"CA が署名"| CERTPEM
    KEY e3@-->|"3. 自己署名"| CERTPEM
    KEY e4@-->|"7. 公開鍵を抽出"| PUB
    CERTPEM -->|"7. 公開鍵を抽出"| PUB
    CERTPEM <-->|"6. PEM ⇄ DER"| CERTDER
    KEY -->|"4. 格納"| P12
    CERTPEM -->|"4. 格納"| P12
    CHAIN -->|"4. 格納"| P12
    P12 -->|"5. 取り出す"| KEY
    P12 -->|"5. 取り出す"| CERTPEM
    P12 -->|"5. 取り出す"| CHAIN
    PUB -->|"8. JSON に変換"| JWK

    e1@{ animation: fast }
    e2@{ animation: fast }
    e3@{ animation: slow }
    e4@{ animation: fast }
```

この図で重要なのは、次の2点です。

- PEM と DER の変換では、証明書の内容は変わらず、エンコーディングだけが変わる
- 証明書から公開鍵は取り出せるが、対応する秘密鍵を復元することはできない

PKCS#12 は別種の証明書へ変換する形式ではなく、証明書、秘密鍵、CA 証明書チェーンをまとめて持ち運ぶためのコンテナです。

## JOSE（JWS / JWE / JWT / JWK）との関係

OAuth 2.0 や OpenID Connect では、JSON と相性のよい JOSE（JSON Object Signing and Encryption）関連の仕様がよく使われます。

| 略称 | 名称 | 役割 |
| --- | --- | --- |
| JWS | JSON Web Signature | データに署名し、改ざんを検出する。ペイロードは暗号化されない |
| JWE | JSON Web Encryption | データを暗号化し、機密性と完全性を保護する |
| JWT | JSON Web Token | クレームを JSON オブジェクトとして表現する。JWS または JWE の構造で保護できる |
| JWK | JSON Web Key | RSA の `n`、`e` や EC の `x`、`y` など、鍵のパラメーターを JSON で表す |
| JWKS | JSON Web Key Set | 複数の JWK を `keys` 配列にまとめたもの |

JWS のコンパクト形式は3要素、JWE のコンパクト形式は5要素です。

```text
JWS: BASE64URL(header).BASE64URL(payload).BASE64URL(signature)
JWE: BASE64URL(header).BASE64URL(encrypted_key).BASE64URL(iv).BASE64URL(ciphertext).BASE64URL(tag)
```

JWK に秘密鍵パラメーターを含めることもできますが、JWKS エンドポイントで公開するのは通常、公開鍵だけです。`kid` は複数の鍵から署名検証に使う鍵を選ぶための識別子であり、それ自体が暗号学的な保護を提供するものではありません。

## OpenSSL で内容を確認する

拡張子を信用せず、まず内容を確認します。以降の例では OpenSSL 3.x を想定しています。

```bash
# PEM形式の証明書
openssl x509 -in server.crt -noout -subject -issuer -dates -fingerprint -sha256

# DER形式の証明書
openssl x509 -inform DER -in server.cer -noout -subject -issuer -dates

# CSR
openssl req -in server.csr -noout -text -verify

# 秘密鍵（RSA、ECなどを自動判別）
openssl pkey -in server.key -noout -text

# PKCS#12に含まれる証明書などの情報。秘密鍵は出力しない
openssl pkcs12 -in server.p12 -info -noout
```

秘密鍵の詳細表示は機密情報を端末に出力します。共有端末やログが保存される環境では、次の整合性チェックだけを使うほうが安全です。

```bash
openssl pkey -in server.key -check -noout
```

## 生成・変換コマンド

### 1. 秘密鍵を生成する

RSA 3072 bit の PKCS#8 秘密鍵を生成します。

```bash
openssl genpkey -algorithm RSA \
  -pkeyopt rsa_keygen_bits:3072 \
  -out server.key

# ファイルを所有者だけが読み書きできるようにする
chmod 600 server.key
```

秘密鍵をパスフレーズで暗号化する場合は `-aes-256-cbc` を加えます。

```bash
openssl genpkey -algorithm RSA \
  -aes-256-cbc \
  -pkeyopt rsa_keygen_bits:3072 \
  -out server.key
```

### 2. 秘密鍵から CSR を作成する

```bash
openssl req -new -key server.key -out server.csr
```

TLS サーバー証明書では、ホスト名を Subject Alternative Name（SAN）に含めます。

```bash
openssl req -new -key server.key -out server.csr \
  -subj "/CN=example.com" \
  -addext "subjectAltName=DNS:example.com,DNS:www.example.com"
```

作成した CSR は、CA へ渡す前に内容と署名を確認します。

```bash
openssl req -in server.csr -noout -text -verify
```

### 3. テスト用の自己署名証明書を作成する

次の証明書はローカル検証用です。公開サービスでは、信頼された CA が発行した証明書を使用してください。

```bash
openssl req -x509 -new -key server.key \
  -sha256 -days 365 \
  -subj "/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,IP:127.0.0.1" \
  -out server.crt
```

### 4. 証明書と秘密鍵を PKCS#12 にまとめる

`chain.pem` には中間 CA 証明書を格納します。実行時にエクスポート用パスワードを求められます。

```bash
openssl pkcs12 -export \
  -inkey server.key \
  -in server.crt \
  -certfile chain.pem \
  -name "example.com" \
  -out server.p12
```

中間 CA 証明書がない場合は `-certfile chain.pem` を省略します。

### 5. PKCS#12 から証明書と秘密鍵を取り出す

秘密鍵と証明書は別々のファイルに取り出すと管理しやすくなります。

```bash
# エンドエンティティ証明書のみ
openssl pkcs12 -in server.p12 -clcerts -nokeys -out server.crt

# CA証明書のみ
openssl pkcs12 -in server.p12 -cacerts -nokeys -out chain.pem

# 秘密鍵。出力される鍵はパスフレーズで暗号化される
openssl pkcs12 -in server.p12 -nocerts -out server.key
```

自動起動するサーバーなど、暗号化されていない秘密鍵が必要な場合は、アクセス権と保管場所を十分に制限したうえで変換します。

```bash
openssl pkey -in server.key -out server-unencrypted.key
chmod 600 server-unencrypted.key
```

OpenSSL のバージョンによっては `pkcs12` コマンドの `-nodes` も利用できますが、OpenSSL 3.x では `-noenc` が推奨されています。

### 6. PEM と DER を相互変換する

```bash
# 証明書: PEM -> DER
openssl x509 -in server.crt -outform DER -out server.der

# 証明書: DER -> PEM
openssl x509 -inform DER -in server.der -out server.crt

# 秘密鍵: PEM -> DER（PKCS#8）
openssl pkcs8 -topk8 -in server.key -outform DER -out server-key.der

# 秘密鍵: DER（PKCS#8）-> PEM
openssl pkcs8 -inform DER -in server-key.der -out server.key
```

### 7. 秘密鍵から公開鍵を取り出す

```bash
openssl pkey -in server.key -pubout -out public-key.pem
```

証明書に含まれる公開鍵を取り出す場合は次のとおりです。

```bash
openssl x509 -in server.crt -pubkey -noout -out public-key.pem
```

### 8. PEM 形式の鍵を JWK に変換する

OpenSSL 単体には JWK を直接出力する機能がないため、ここでは Node.js の `jose` パッケージを使います。

```bash
npm install jose
```

公開鍵を JWK に変換する例です。

```js
import { readFile, writeFile } from "node:fs/promises";
import { exportJWK, importSPKI } from "jose";

const pem = await readFile("public-key.pem", "utf8");
const key = await importSPKI(pem, "RS256");
const jwk = await exportJWK(key);

jwk.use = "sig";
jwk.alg = "RS256";
jwk.kid = "2026-01";

await writeFile("public.jwk", `${JSON.stringify(jwk, null, 2)}\n`);
```

```bash
node public-key-to-jwk.mjs
```

`importSPKI` の第2引数は用途に合うアルゴリズムを指定します。秘密鍵を変換する場合は `importPKCS8` を使用できますが、出力された JWK には秘密鍵パラメーターが含まれるため、公開用 JWKS には配置しないでください。

## 秘密鍵と証明書が対になっているか確認する

RSA や EC の違いを意識せず比較できるよう、それぞれから公開鍵を取り出して SHA-256 ハッシュを比較します。

```bash
openssl pkey -in server.key -pubout -outform DER | openssl sha256
openssl x509 -in server.crt -pubkey -noout \
  | openssl pkey -pubin -outform DER \
  | openssl sha256
```

2つのハッシュ値が同じなら、証明書に含まれる公開鍵と秘密鍵は対になっています。

## 証明書チェーンを検証する

ルート CA 証明書を `root-ca.crt`、中間 CA 証明書を `intermediate-ca.crt` とした例です。

```bash
openssl verify \
  -CAfile root-ca.crt \
  -untrusted intermediate-ca.crt \
  server.crt
```

TLS 接続先が提示する証明書とチェーンを確認するには、次のコマンドを使います。

```bash
openssl s_client \
  -connect example.com:443 \
  -servername example.com \
  -showcerts </dev/null
```

`-servername` は SNI を送信するために必要です。なお、`s_client` の出力を見るだけでなく、終了付近の検証結果も確認してください。

## 運用上の注意点

- 秘密鍵は Git に含めず、所有者だけが読める権限にする
- コマンドライン引数へパスワードを直接書かない。シェル履歴やプロセス一覧から漏れる可能性がある
- 証明書の更新前に、有効期限だけでなく SAN、鍵の用途、証明書チェーンも確認する
- JWK を公開するときは秘密鍵パラメーターが含まれていないことを確認する
- 鍵をローテーションするときは、新旧の公開鍵を JWKS に一時的に併存させ、古いトークンの有効期限を考慮して旧鍵を削除する
- 変換後の秘密鍵や一時ファイルも、不要になったら安全な方法で破棄する

## まとめ

`.crt` や `.pem` といった拡張子だけでは、ファイルの内容やエンコーディングを断定できません。**内容、エンコーディング、コンテナ**を分けて考え、OpenSSL で実体を確認してから変換することが重要です。

また、X.509 証明書と JWK は競合する形式ではありません。X.509 は公開鍵と主体情報を CA の署名で結び付ける仕組み、JWK は鍵パラメーターを JSON で表現する仕組みです。目的の違いを理解すると、TLS と JOSE の両方で鍵を安全に扱いやすくなります。
