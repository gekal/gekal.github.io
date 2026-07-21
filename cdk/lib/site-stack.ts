import * as path from 'node:path'
import * as cdk from 'aws-cdk-lib'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3 from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'

export interface SiteStackProps extends cdk.StackProps {
  readonly domainName: string
  readonly certificate: acm.ICertificate
  readonly githubOwner: string
  readonly githubRepo: string
  readonly githubBranch: string
  /** OIDC プロバイダがアカウントに未登録なら true。既にあれば false にして既存を参照する */
  readonly createGithubOidcProvider: boolean
}

/**
 * 静的サイト本体: S3(非公開) + CloudFront(OAC) + GitHub Actions 用のデプロイロール。
 *
 * コンテンツのアップロードは CDK ではなく GitHub Actions が担当する
 * (BucketDeployment を使うと 40MB 超の out/ を毎回 Lambda 経由で転送することになるため)。
 */
export class SiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: SiteStackProps) {
    super(scope, id, props)

    // ── オリジン ────────────────────────────────────────────────
    // パブリックアクセスは全面ブロック。CloudFront からは OAC 経由でのみ読める。
    const bucket = new s3.Bucket(this, 'SiteBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    })

    // ── URI 書き換え ────────────────────────────────────────────
    const rewriteFunction = new cloudfront.Function(this, 'RewriteUriFunction', {
      code: cloudfront.FunctionCode.fromFile({
        filePath: path.join(__dirname, 'functions', 'rewrite-uri.js'),
      }),
      runtime: cloudfront.FunctionRuntime.JS_2_0,
      comment: 'trailingSlash 対応の index.html 解決と正規化リダイレクト',
    })

    // ── セキュリティヘッダ ──────────────────────────────────────
    // GitHub Pages では付けられなかったヘッダ群。移行のうまみのひとつ。
    const responseHeaders = new cloudfront.ResponseHeadersPolicy(this, 'SecurityHeaders', {
      securityHeadersBehavior: {
        strictTransportSecurity: {
          accessControlMaxAge: cdk.Duration.days(365),
          includeSubdomains: false, // 他サブドメインの運用予定がないため限定的にかける
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

    // ── ディストリビューション ──────────────────────────────────
    const distribution = new cloudfront.Distribution(this, 'SiteDistribution', {
      comment: `${props.domainName} (Next.js static export)`,
      domainNames: [props.domainName],
      certificate: props.certificate,
      defaultRootObject: 'index.html',
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      // 日本・アジアのエッジを含みつつ最も高価なリージョンを外す
      priceClass: cloudfront.PriceClass.PRICE_CLASS_200,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      enableIpv6: true,
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        // オリジン(S3)が返す Cache-Control をそのまま尊重する。
        // 実際の TTL はデプロイ時に付ける Cache-Control で制御する (deploy.yml 参照)。
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        responseHeadersPolicy: responseHeaders,
        compress: true,
        functionAssociations: [
          {
            function: rewriteFunction,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
      },
      // OAC 経由だと存在しないキーは 404 ではなく 403 が返るため両方を拾う
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
          ttl: cdk.Duration.minutes(5),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
          ttl: cdk.Duration.minutes(5),
        },
      ],
    })

    // ── GitHub Actions からの引き受けロール ─────────────────────
    const oidcProviderArn = `arn:aws:iam::${this.account}:oidc-provider/token.actions.githubusercontent.com`

    const oidcProvider = props.createGithubOidcProvider
      ? new iam.OpenIdConnectProvider(this, 'GithubOidcProvider', {
          url: 'https://token.actions.githubusercontent.com',
          clientIds: ['sts.amazonaws.com'],
        })
      : iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(
          this,
          'GithubOidcProvider',
          oidcProviderArn
        )

    const deployRole = new iam.Role(this, 'GithubDeployRole', {
      roleName: 'gekal-blog-github-deploy',
      description: `Deploy ${props.domainName} from GitHub Actions`,
      maxSessionDuration: cdk.Duration.hours(1),
      assumedBy: new iam.WebIdentityPrincipal(oidcProvider.openIdConnectProviderArn, {
        StringEquals: {
          'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
          // 指定リポジトリの指定ブランチからの実行だけに限定する
          'token.actions.githubusercontent.com:sub': `repo:${props.githubOwner}/${props.githubRepo}:ref:refs/heads/${props.githubBranch}`,
        },
      }),
    })

    bucket.grantReadWrite(deployRole)
    deployRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['cloudfront:CreateInvalidation', 'cloudfront:GetInvalidation'],
        resources: [distribution.distributionArn],
      })
    )

    // ── 出力 ────────────────────────────────────────────────────
    new cdk.CfnOutput(this, 'BucketName', { value: bucket.bucketName })
    new cdk.CfnOutput(this, 'DistributionId', { value: distribution.distributionId })
    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: distribution.distributionDomainName,
      description: 'Aliyun DNS の www CNAME をこの値に向ける',
    })
    new cdk.CfnOutput(this, 'DeployRoleArn', {
      value: deployRole.roleArn,
      description: 'GitHub Actions の AWS_DEPLOY_ROLE_ARN に設定する',
    })
  }
}
