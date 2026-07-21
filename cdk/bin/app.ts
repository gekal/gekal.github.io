#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { CertificateStack } from '../lib/certificate-stack'
import { SiteStack } from '../lib/site-stack'

const app = new cdk.App()

const domainName = app.node.tryGetContext('domainName') as string
const githubOwner = app.node.tryGetContext('githubOwner') as string
const githubRepo = app.node.tryGetContext('githubRepo') as string
const githubBranch = app.node.tryGetContext('githubBranch') as string
const createGithubOidcProvider = app.node.tryGetContext('createGithubOidcProvider') !== false

// CloudFront の証明書は us-east-1 必須。バケットも同居させてクロスリージョン参照を避ける
// (配信は CloudFront 経由なのでバケットのリージョンは体感速度に影響しない)。
const env: cdk.Environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: 'us-east-1',
}

const certificateStack = new CertificateStack(app, 'GekalBlogCertificate', {
  env,
  domainName,
  description: `ACM certificate for ${domainName}`,
})

new SiteStack(app, 'GekalBlogSite', {
  env,
  domainName,
  certificate: certificateStack.certificate,
  githubOwner,
  githubRepo,
  githubBranch,
  createGithubOidcProvider,
  description: `Static hosting for ${domainName}`,
})

cdk.Tags.of(app).add('Project', 'gekal-blog')
