import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import * as cdk from 'aws-cdk-lib'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3 from 'aws-cdk-lib/aws-s3'
import type { Construct } from 'constructs'

const HERE = dirname(fileURLToPath(import.meta.url))

export type SiteStackProps = cdk.StackProps & {
  /** apex ホスト。www へ 301 する側。 */
  apexHost: string
  /** 正規ホスト。lib/site.ts の SITE_URL と一致していること。 */
  canonicalHost: string
  /**
   * us-east-1 の ACM 証明書 ARN。apex と canonical の両方を含むこと。
   * CloudFront は us-east-1 の証明書しか受け付けず、DNS 検証レコードは
   * Aliyun DNS に手で入れる必要があるため、証明書だけはスタック外で
   * scripts/request-certificate.sh を使って先に発行する。
   */
  certificateArn: string
  /** S3 バケット名。グローバルに一意である必要がある。 */
  bucketName: string
  /** OIDC でデプロイを許可する GitHub リポジトリ (owner/repo)。 */
  githubRepo: string
  /**
   * GitHub Actions 用の OIDC プロバイダをこのスタックで作るか。
   * アカウント内に既に存在する場合 (他のリポジトリで作成済みなど) は false。
   * OIDC プロバイダはアカウントに 1 つしか作れない。
   */
  createGithubOidcProvider: boolean
}

/**
 * gekal.cn 静的サイトの配信基盤。
 *
 *   ブラウザ → CloudFront (ACM 証明書 / CloudFront Function) → OAC → S3 (非公開)
 *
 * S3 の「静的ウェブサイトホスティング」は使わない。あれは HTTP 専用でバケットを
 * 公開する必要があるため、代わりに OAC でバケットを閉じたまま配信し、
 * ディレクトリ→index.html の解決は CloudFront Function に担わせている。
 */
export class SiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: SiteStackProps) {
    super(scope, id, props)

    const bucket = new s3.Bucket(this, 'SiteBucket', {
      bucketName: props.bucketName,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      // 中身は out/ から毎回作り直せるが、バケット名は再取得できないことがあるため残す。
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    })

    const viewerRequest = new cloudfront.Function(this, 'ViewerRequestFunction', {
      comment: `${props.apexHost} → ${props.canonicalHost} の 301 と trailingSlash の解決`,
      runtime: cloudfront.FunctionRuntime.JS_2_0,
      code: cloudfront.FunctionCode.fromInline(
        readFileSync(join(HERE, 'functions', 'viewer-request.js'), 'utf8')
          .replaceAll('__APEX_HOST__', props.apexHost)
          .replaceAll('__CANONICAL_HOST__', props.canonicalHost),
      ),
    })

    // CSP は入れていない。MUI/Emotion がインラインスタイルを出すうえ、GA を後から
    // 有効化する余地もあるため、壊れ方が分かりにくい割に得るものが少ない。
    const responseHeaders = new cloudfront.ResponseHeadersPolicy(this, 'SecurityHeadersPolicy', {
      comment: 'gekal.cn static site security headers',
      securityHeadersBehavior: {
        strictTransportSecurity: {
          accessControlMaxAge: cdk.Duration.days(730),
          // gekal.cn のサブドメインすべてを HTTPS 必須にはしない (別用途の余地を残す)。
          includeSubdomains: false,
          preload: false,
          override: true,
        },
        contentTypeOptions: { override: true },
        frameOptions: {
          frameOption: cloudfront.HeadersFrameOption.SAMEORIGIN,
          override: true,
        },
        referrerPolicy: {
          referrerPolicy: cloudfront.HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN,
          override: true,
        },
      },
    })

    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      comment: `${props.canonicalHost} static site`,
      domainNames: [props.canonicalHost, props.apexHost],
      certificate: acm.Certificate.fromCertificateArn(this, 'Certificate', props.certificateArn),
      defaultRootObject: 'index.html',
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      // 100 は北米と欧州だけで、読者の多い日本がフォールバックになる。
      priceClass: cloudfront.PriceClass.PRICE_CLASS_200,
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        // オリジンの Cache-Control を尊重する。実際の TTL はデプロイ時に
        // aws s3 sync --cache-control で付ける値で決まる。
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        responseHeadersPolicy: responseHeaders,
        compress: true,
        functionAssociations: [
          { function: viewerRequest, eventType: cloudfront.FunctionEventType.VIEWER_REQUEST },
        ],
      },
      // OAC では s3:ListBucket を与えないので、鍵が無いとき S3 は 404 ではなく 403 を返す。
      errorResponses: [403, 404].map((httpStatus) => ({
        httpStatus,
        responseHttpStatus: 404,
        responsePagePath: '/404.html',
        ttl: cdk.Duration.minutes(5),
      })),
    })

    const oidcProvider = props.createGithubOidcProvider
      ? new iam.OpenIdConnectProvider(this, 'GithubOidcProvider', {
          url: 'https://token.actions.githubusercontent.com',
          clientIds: ['sts.amazonaws.com'],
        })
      : iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(
          this,
          'GithubOidcProvider',
          `arn:aws:iam::${this.account}:oidc-provider/token.actions.githubusercontent.com`,
        )

    // アクセスキーは発行しない。GitHub Actions は OIDC でこのロールを引き受ける。
    const deployRole = new iam.Role(this, 'DeployRole', {
      roleName: 'gekal-site-deploy',
      // IAM の description は Latin-1 しか通らないため英語で書く。
      description: `Deploys the static site from the main branch of ${props.githubRepo}`,
      maxSessionDuration: cdk.Duration.hours(1),
      assumedBy: new iam.WebIdentityPrincipal(oidcProvider.openIdConnectProviderArn, {
        StringEquals: { 'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com' },
        StringLike: {
          'token.actions.githubusercontent.com:sub': `repo:${props.githubRepo}:ref:refs/heads/main`,
        },
      }),
    })

    bucket.grantReadWrite(deployRole)
    deployRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['cloudfront:CreateInvalidation', 'cloudfront:GetInvalidation'],
        resources: [
          `arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`,
        ],
      }),
    )
    // ワークフローはバケット名と Distribution ID をスタックの出力から引く。
    deployRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['cloudformation:DescribeStacks'],
        resources: [this.stackId],
      }),
    )

    new cdk.CfnOutput(this, 'BucketName', {
      value: bucket.bucketName,
      description: 'デプロイ先の S3 バケット',
    })
    new cdk.CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
      description: 'キャッシュ無効化に使う CloudFront Distribution ID',
    })
    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: distribution.distributionDomainName,
      description: 'DNS の CNAME 先。切替前の動作確認もこのドメインで行う',
    })
    new cdk.CfnOutput(this, 'DeployRoleArn', {
      value: deployRole.roleArn,
      description: 'GitHub Actions の AWS_DEPLOY_ROLE_ARN に設定する値',
    })
  }
}
