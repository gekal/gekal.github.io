---
title: "AWS CDK と STS で実現する、セキュアで快適な Claude Code ローカル開発環境の構築"
layout: post
date: 2026-07-02T19:27:08+0900
categories: blogs
tags: ["claudecode", "bedrock", "cdk", "aws", "sts"]
---

## はじめに

[Claude Code](https://docs.anthropic.com/claude/docs/claude-code) は Anthropic 公式の CLI コーディングエージェントです。バックエンドとして Anthropic API のほかに **Amazon Bedrock** を指定でき、AWS アカウント内で完結する形で利用できます。

一方で、ローカルから Bedrock を叩くための認証をどう用意するかは悩みどころです。安易に IAM ユーザーの長期アクセスキーを発行すると、

- キーが漏洩した際の被害が大きい
- ローテーションの運用が面倒
- 権限を絞り忘れて過剰な権限を持たせてしまう

といった問題が起こりがちです。また、従量課金である Bedrock は「気づいたら高額請求」というクラウド破産のリスクも無視できません。

そこで本記事では、**AWS CDK** を使って以下を一括構築する構成を紹介します。

- Bedrock 呼び出しに必要な**最小権限の IAM ロール**
- 長期キーを発行せず、**STS の一時認証情報**で Claude Code を起動する仕組み
- **AWS Budgets** による予算アラート（クラウド破産防止）

コードはすべて以下のリポジトリで公開しています。

https://github.com/gekal-study-aws/bedrock-claude-cdk

## 全体像

構成はシンプルです。

```
┌─────────────┐   assume-role   ┌──────────────────────┐
│  ローカル PC  │ ──────────────► │ claude-code-sts-role  │
│ (claude cli) │ ◄────────────── │  (一時認証情報を発行)    │
└─────────────┘  一時credentials └──────────────────────┘
       │                                    │
       │ CLAUDE_CODE_USE_BEDROCK=1          │ bedrock:InvokeModel
       ▼                                    ▼
┌────────────────────────────────────────────────────┐
│                  Amazon Bedrock                      │
│              (Anthropic Claude models)               │
└────────────────────────────────────────────────────┘
```

ポイントは **長期アクセスキーを一切発行しない** ことです。CDK が作るのは「assume-role できる IAM ロール」だけで、実際に Bedrock を呼ぶための認証情報は、利用時に `sts assume-role` で都度取得します。取得した認証情報は最長 1 時間で自動失効するため、漏洩時のリスクを大きく下げられます。

## CDK スタックの実装

`lib/bedrock-claude-cdk-stack.ts` が本体です。順番に見ていきます。

### 1. Bedrock 呼び出し用の IAM ポリシー

Claude Code / 自作アプリが必要とする Bedrock の権限だけを許可します。

```ts
const bedrockPolicy = new iam.PolicyStatement({
  effect: iam.Effect.ALLOW,
  actions: [
    'bedrock:InvokeModel',
    'bedrock:InvokeModelWithResponseStream',
    'bedrock:GetFoundationModel',
    'bedrock:ListFoundationModels',
  ],
  resources: ['*'],
});
```

`InvokeModelWithResponseStream` はストリーミング応答（Claude Code の逐次出力）に必要です。`ListFoundationModels` / `GetFoundationModel` は、利用可能なモデル ID を CLI から確認するために入れています。

### 2. AWS Marketplace 購読確認用のポリシー

Bedrock のモデルによっては AWS Marketplace の購読状態を参照するため、購読確認用の権限も付与しておきます。

```ts
const marketplacePolicy = new iam.PolicyStatement({
  effect: iam.Effect.ALLOW,
  actions: [
    'aws-marketplace:ViewSubscriptions',
    'aws-marketplace:Subscribe',
  ],
  resources: ['*'],
});
```

### 3. 一時認証（STS）用の IAM ロール

本構成の核心です。同一アカウント（`AccountRootPrincipal`）から `assume-role` できるロールを作り、上記 2 つのポリシーをアタッチします。

```ts
const claudeRole = new iam.Role(this, 'ClaudeCodeRole', {
  roleName: 'claude-code-sts-role',
  assumedBy: new iam.AccountRootPrincipal(),
  description: 'IAM Role for Claude Code temporary STS credentials',
});

claudeRole.addToPolicy(bedrockPolicy);
claudeRole.addToPolicy(marketplacePolicy);
```

`AccountRootPrincipal` を信頼ポリシーに指定することで、同一 AWS アカウント内の（assume-role 権限を持つ）プリンシパルがこのロールを引き受けられます。ロール自体は長期の認証情報を持たないため、キーの管理・ローテーションが不要になります。

### 4. AWS Budgets による予算アラート

従量課金のクラウド破産を防ぐため、月額予算とアラートを設定します。ここでは月 $50 を上限に、80%・100% 到達でメール通知します。

```ts
const notificationEmail = 'your-email@example.com';
const monthlyBudgetLimit = 50; // 月間 $50

new budgets.CfnBudget(this, 'ClaudeMonthlyBudget', {
  budget: {
    budgetName: 'ClaudeCode-Monthly-Budget',
    budgetType: 'COST',
    timeUnit: 'MONTHLY',
    budgetLimit: { amount: monthlyBudgetLimit, unit: 'USD' },
  },
  notificationsWithSubscribers: [
    {
      notification: {
        comparisonOperator: 'GREATER_THAN',
        notificationType: 'ACTUAL',
        threshold: 80,
        thresholdType: 'PERCENTAGE',
      },
      subscribers: [{ address: notificationEmail, subscriptionType: 'EMAIL' }],
    },
    {
      notification: {
        comparisonOperator: 'GREATER_THAN',
        notificationType: 'ACTUAL',
        threshold: 100,
        thresholdType: 'PERCENTAGE',
      },
      subscribers: [{ address: notificationEmail, subscriptionType: 'EMAIL' }],
    },
  ],
});
```

> `notificationEmail` は必ず実在する自分のメールアドレスに変更してください。初回のデプロイ後に AWS から届く確認メール（Confirm subscription）をクリックしないと、以降のアラートメールは届きません。

### 5. ロール ARN の出力

利用側（CLI）がロールを assume-role できるよう、ロール ARN を CloudFormation Output に出します。

```ts
new cdk.CfnOutput(this, 'ClaudeCodeRoleArn', {
  value: claudeRole.roleArn,
});
```

## デプロイ

### 前提条件

| 項目 | 内容 |
|---|---|
| Node.js | 18 以上（推奨 20 LTS） |
| AWS CLI | v2 系 |
| AWS CDK CLI | 2.1129.0 以上（`npm i -g aws-cdk@latest`） |
| Bedrock モデルアクセス | コンソールで Claude モデルの利用申請が承認済み |

Bedrock は初回に **Model access** の申請が必要です。AWS コンソール → Amazon Bedrock → Model access から、利用したい Claude モデル（例: Claude Opus 4.8, Claude Haiku 4.5）を **Request model access** し、ステータスが **Access granted** になるのを確認してください。この設定を忘れると、IAM 権限があっても `AccessDeniedException` になります。

### デプロイ手順

管理者権限のあるプロファイルで実行します。

```bash
git clone https://github.com/gekal-study-aws/bedrock-claude-cdk.git
cd bedrock-claude-cdk
npm ci

# 通知先メールを自分のアドレスに変更（lib/bedrock-claude-cdk-stack.ts）

export AWS_PROFILE=your-admin-profile
export AWS_REGION=us-east-1   # Bedrock が有効なリージョン

npm run build
npx cdk bootstrap   # 初回のみ
npx cdk diff
npx cdk deploy
```

デプロイが完了すると、Output に `ClaudeCodeRoleArn` が表示されます。この ARN を次のステップで使います。

## Claude Code から使う

### インストール

```bash
npm install -g @anthropic-ai/claude-code
```

### 起動ラッパーの設定

`~/.zshrc`（または `~/.bashrc`）に以下の関数を追加します。ふだんは Anthropic 契約（サブスクログイン）で起動し、`--bedrock`（`-b`）を付けたときだけ CloudFormation からロール ARN を取得 → `sts assume-role` で一時認証情報を発行 → Bedrock 経由で Claude Code を起動する、という切り替え式のラッパーです。役割ごとに `claude-clean` / `claude-bedrock-auth` / `claude-start` の 3 つに分けています。

```bash
# ==========================================
# 環境変数のクリア
# ==========================================
# Bedrock 関連の環境変数（STS一時認証など）をすべて解除する
claude-clean() {
  unset CLAUDE_CODE_USE_BEDROCK
  unset AWS_REGION
  unset AWS_ACCESS_KEY_ID
  unset AWS_SECRET_ACCESS_KEY
  unset AWS_SESSION_TOKEN
  unset ANTHROPIC_MODEL
  unset ANTHROPIC_SMALL_FAST_MODEL
  echo "✅ Bedrock credentials and settings cleared."
}

# ==========================================
# Bedrock 用の STS 一時認証を取得して環境変数にセット
# ==========================================
claude-bedrock-auth() {
  local STACK_NAME="BedrockClaudeCdkStack"

  # 念のため既存の認証情報をクリアしてから設定し直す
  claude-clean >/dev/null

  # CloudFormation から Role ARN を取得
  export AWS_REGION="us-east-1"
  local ROLE_ARN=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --query "Stacks[0].Outputs[?OutputKey=='ClaudeCodeRoleArn'].OutputValue" \
    --output text 2>/dev/null)

  if [ -z "$ROLE_ARN" ]; then
    echo "❌ Role ARNが見つかりません。デプロイされているか確認してください。"
    return 1
  fi

  # STS で一時認証情報を取得
  local CREDENTIALS=$(aws sts assume-role \
    --role-arn "$ROLE_ARN" \
    --role-session-name "ClaudeCodeSession" \
    --duration-seconds 3600 \
    --query "Credentials.[AccessKeyId,SecretAccessKey,SessionToken]" \
    --output text)

  if [ -z "$CREDENTIALS" ]; then
    echo "❌ STS一時認証の取得に失敗しました。AWSログイン状態を確認してください。"
    return 1
  fi

  export AWS_ACCESS_KEY_ID=$(echo "$CREDENTIALS" | awk '{print $1}')
  export AWS_SECRET_ACCESS_KEY=$(echo "$CREDENTIALS" | awk '{print $2}')
  export AWS_SESSION_TOKEN=$(echo "$CREDENTIALS" | awk '{print $3}')

  # Bedrock 設定
  export CLAUDE_CODE_USE_BEDROCK=1
  export AWS_REGION="us-east-1"
  export ANTHROPIC_MODEL="us.anthropic.claude-opus-4-8"
  export ANTHROPIC_SMALL_FAST_MODEL="us.anthropic.claude-haiku-4-5-20251001-v1:0"
}

# ==========================================
# Claude Code 起動用ラッパー
# ==========================================
# 使い方:
#   claude              デフォルト（Anthropic契約 / サブスクログイン）で起動
#   claude --anthropic  Anthropic契約を明示して起動 (-a も可)
#   claude --bedrock    AWS Bedrock を使って起動 (-b も可, STS一時認証を取得)
# それ以外の引数はそのまま claude 本体に渡されます。
claude-start() {
  local provider="anthropic"  # デフォルトは Anthropic 契約

  # プロバイダ指定フラグだけ先頭で解釈し、残りはそのまま本体へ渡す
  case "$1" in
    --bedrock|-b)
      provider="bedrock"
      shift
      ;;
    --anthropic|-a)
      provider="anthropic"
      shift
      ;;
  esac

  if [ "$provider" = "bedrock" ]; then
    claude-bedrock-auth || return 1
    echo "🚀 AWS Bedrock で Claude Code を起動します..."
  else
    # Anthropic 契約（サブスクログイン）: Bedrock 系の変数を残さない
    claude-clean >/dev/null
    echo "🚀 Anthropic 契約（サブスク）で Claude Code を起動します..."
  fi

  command claude "$@"
}

# いつもの「claude」コマンドでこの関数が動くようにエイリアスを設定
alias claude=claude-start
```

反映します。

```bash
source ~/.zshrc
```

`CLAUDE_CODE_USE_BEDROCK=1` が Bedrock バックエンドを有効化するフラグ、`ANTHROPIC_MODEL` / `ANTHROPIC_SMALL_FAST_MODEL` が使用するモデルの指定です。これらは `--bedrock` 起動時のみセットされ、フラグなしの `claude` では `claude-clean` によって解除されます。利用可能なモデル ID は次のコマンドで確認できます。

```bash
aws bedrock list-foundation-models \
  --region us-east-1 \
  --by-provider anthropic \
  --query "modelSummaries[*].modelId" \
  --output table
```

### 動作確認

Bedrock 経由で起動するには `--bedrock`（`-b`）を付けます。

```bash
claude --bedrock --version
claude --bedrock "こんにちは。あなたのモデル名を教えてください。"
```

Bedrock 経由で応答が返れば成功です。`--bedrock` を付けたときだけ STS 一時認証を取得して Bedrock を使い、フラグなしの `claude` は Anthropic 契約（サブスクログイン）で起動します。認証情報が失効しても、`claude --bedrock` を実行し直すだけで再取得されます。

## 自作アプリからの利用

`claude --bedrock`（内部的には `claude-bedrock-auth`）を実行したシェルには一時認証情報が環境変数としてセットされるため、そのまま AWS SDK / boto3 からも Bedrock を呼び出せます。認証情報だけ取得したい場合は `claude-bedrock-auth` を直接実行しても構いません。リポジトリには Node.js の呼び出しサンプル（`sample/bedrock-call-sample.mjs`）も同梱しています。

```js
import { AnthropicBedrock } from "@anthropic-ai/bedrock-sdk";

const client = new AnthropicBedrock({ awsRegion: "us-east-1" });

const message = await client.messages.create({
  model: "us.anthropic.claude-haiku-4-5-20251001-v1:0",
  max_tokens: 64,
  messages: [{ role: "user", content: "自己紹介してください" }],
});

console.log(message.content[0].text);
```

Python（boto3）から直接 `bedrock-runtime` を叩く場合は以下のようになります。

```python
import boto3, json

client = boto3.client("bedrock-runtime", region_name="us-east-1")

resp = client.invoke_model(
    modelId="us.anthropic.claude-haiku-4-5-20251001-v1:0",
    body=json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 512,
        "messages": [{"role": "user", "content": "自己紹介してください"}],
    }),
    contentType="application/json",
)
print(json.loads(resp["body"].read())["content"][0]["text"])
```

## この構成のメリット

- **長期キーを発行しない**：漏洩リスクとローテーション運用から解放される。認証情報は最長 1 時間で自動失効。
- **最小権限**：ロールには Bedrock 呼び出しと Marketplace 購読確認しか許可されていない。
- **コスト暴走を防ぐ**：Budgets で 80% / 100% 到達時にメール通知。上限や閾値は CDK 側の定数を変えるだけ。
- **再現性**：CDK なので、別アカウント・別リージョンへの展開も `cdk deploy` 一発。

## 運用 Tips

- **有効期限の調整**：`assume-role` の `--duration-seconds` で変更できます（デフォルト 1 時間）。長くしたい場合はロールの `MaxSessionDuration` も併せて調整します。
- **リージョンの一致**：モデルアクセスを有効化したリージョンと `AWS_REGION` は必ず一致させてください。
- **推論プロファイル**：`aws bedrock list-inference-profiles --region us-east-1` で利用可能な推論プロファイル ID を確認できます。

## 片付け

不要になったら一発で削除できます。

```bash
npx cdk destroy
```

IAM ロールと Budgets はスタック削除時にそのまま削除されます。

## おわりに

AWS CDK で「最小権限のロール + STS 一時認証情報 + 予算アラート」をまとめて構築することで、長期キーを持たずにセキュアかつ低リスクで Claude Code を Bedrock 経由で使える環境が作れました。ローカル開発で安心して AI コーディングエージェントを使いたい方の参考になれば幸いです。

リポジトリはこちらです。Issue や PR も歓迎です。

https://github.com/gekal-study-aws/bedrock-claude-cdk
