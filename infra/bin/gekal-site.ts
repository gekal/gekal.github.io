#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'

import { SiteStack } from '../lib/site-stack.ts'

const app = new cdk.App()

/** cdk.json の context を必須値として読む。未設定なら synth の時点で落とす。 */
function requiredContext(key: string): string {
  const value = app.node.tryGetContext(key)
  if (typeof value !== 'string' || value === '') {
    throw new Error(
      `context "${key}" が未設定です。cdk.json に書くか -c ${key}=... を渡してください。`,
    )
  }
  return value
}

// -c で渡された値は文字列になるので、'false' も偽として扱う。
const oidcProviderContext = app.node.tryGetContext('createGithubOidcProvider')

new SiteStack(app, 'GekalSite', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION ?? 'ap-northeast-1',
  },
  description: 'gekal.cn 静的サイトの配信基盤 (S3 + CloudFront)',
  apexHost: requiredContext('apexHost'),
  canonicalHost: requiredContext('canonicalHost'),
  // 証明書だけは先に手動発行するため、ARN は -c で渡す。
  certificateArn: requiredContext('certificateArn'),
  bucketName: requiredContext('bucketName'),
  githubRepo: requiredContext('githubRepo'),
  createGithubOidcProvider: oidcProviderContext !== false && oidcProviderContext !== 'false',
})
