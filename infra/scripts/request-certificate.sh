#!/usr/bin/env bash
#
# CloudFront 用の ACM 証明書を us-east-1 に発行し、DNS 検証レコードを表示する。
#
# CDK スタックから切り出してある理由:
#   - CloudFront が使える証明書は us-east-1 に限られる (サイト本体は別リージョン)
#   - DNS が Aliyun にあるため検証レコードは手で追加するしかなく、
#     CloudFormation に待たせると数時間タイムアウトを抱えることになる
#
# 使い方:
#   ./scripts/request-certificate.sh                 # 発行して検証レコードを表示
#   ./scripts/request-certificate.sh --wait          # 検証完了 (ISSUED) まで待つ
#
set -euo pipefail

REGION=us-east-1
APEX=${APEX_HOST:-gekal.cn}
CANONICAL=${CANONICAL_HOST:-www.gekal.cn}

# 既に同じドメインの証明書があれば作り直さない (ACM の証明書は無料だが増えると紛らわしい)。
existing=$(aws acm list-certificates --region "$REGION" \
  --query "CertificateSummaryList[?DomainName=='${APEX}'].CertificateArn | [0]" \
  --output text)

if [ "$existing" != "None" ] && [ -n "$existing" ]; then
  arn=$existing
  echo "既存の証明書を使います: $arn"
else
  arn=$(aws acm request-certificate --region "$REGION" \
    --domain-name "$APEX" \
    --subject-alternative-names "$CANONICAL" \
    --validation-method DNS \
    --key-algorithm RSA_2048 \
    --tags Key=Project,Value=gekal-site \
    --query CertificateArn --output text)
  echo "証明書をリクエストしました: $arn"
fi

# 検証レコードは発行直後には空なので、埋まるまで少し待つ。
for _ in $(seq 1 30); do
  records=$(aws acm describe-certificate --region "$REGION" --certificate-arn "$arn" \
    --query 'Certificate.DomainValidationOptions[?ResourceRecord].ResourceRecord' \
    --output json)
  [ "$(printf '%s' "$records" | tr -d '[:space:]')" != "[]" ] && break
  sleep 2
done

echo
echo "── Aliyun DNS (gekal.cn) に以下の CNAME を追加してください ─────────────"
echo "  ホスト記録は末尾の .${APEX}. を除いた部分です。"
echo
node -e '
  const [json, apex] = process.argv.slice(1)
  const suffix = "." + apex + "."
  const seen = new Set()
  for (const r of JSON.parse(json)) {
    if (seen.has(r.Name)) continue
    seen.add(r.Name)
    const host = r.Name.endsWith(suffix) ? r.Name.slice(0, -suffix.length) : r.Name
    console.log(`  ホスト記録: ${host}`)
    console.log(`  種別      : ${r.Type}`)
    console.log(`  値        : ${r.Value.replace(/\.$/, "")}`)
    console.log()
  }
' "$records" "$APEX"

echo "───────────────────────────────────────────────────────────────────────"
echo
echo "証明書 ARN (cdk deploy に渡す値):"
echo "  $arn"

if [ "${1:-}" = "--wait" ]; then
  echo
  echo "検証の完了を待っています (レコード追加後、通常は数分)…"
  aws acm wait certificate-validated --region "$REGION" --certificate-arn "$arn"
  echo "証明書が ISSUED になりました。"
fi
