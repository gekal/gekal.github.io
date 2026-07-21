import * as cdk from 'aws-cdk-lib'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import { Construct } from 'constructs'

export interface CertificateStackProps extends cdk.StackProps {
  readonly domainName: string
}

/**
 * CloudFront が使う ACM 証明書。us-east-1 に置く必要がある。
 *
 * gekal.cn の権威 DNS は Aliyun のままなので Route53 による自動検証が使えない。
 * このスタックは検証待ちで停止するので、その間に ACM コンソール（us-east-1）で
 * 検証用 CNAME を確認し、Aliyun DNS に手動で登録すること。登録すれば数分で完了する。
 *
 * 証明書だけを別スタックにしてあるのは、検証がタイムアウトしてロールバックしても
 * S3 バケットや CloudFront を巻き添えにしないため。
 */
export class CertificateStack extends cdk.Stack {
  public readonly certificate: acm.ICertificate

  constructor(scope: Construct, id: string, props: CertificateStackProps) {
    super(scope, id, props)

    this.certificate = new acm.Certificate(this, 'SiteCertificate', {
      domainName: props.domainName,
      validation: acm.CertificateValidation.fromDns(),
    })

    new cdk.CfnOutput(this, 'CertificateArn', {
      value: this.certificate.certificateArn,
      description: 'ACM certificate ARN (us-east-1)',
    })
  }
}
