// CloudFront Function は CDK 経由でしかデプロイされず、npm run build の型検査も
// 通らない。ロジックの取り違えがそのまま本番の 404 やリダイレクトループになるため、
// ここだけは実行して確かめる。
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import assert from 'node:assert/strict'
import { test } from 'node:test'

const HERE = dirname(fileURLToPath(import.meta.url))
const APEX = 'gekal.cn'
const CANONICAL = 'www.gekal.cn'

// SiteStack と同じ置換をしてから、関数本体だけを取り出して評価する。
const source = readFileSync(join(HERE, '..', 'lib', 'functions', 'viewer-request.js'), 'utf8')
  .replaceAll('__APEX_HOST__', APEX)
  .replaceAll('__CANONICAL_HOST__', CANONICAL)
const handler = new Function(`${source}; return handler`)()

function request(host, uri, querystring = {}) {
  return handler({ request: { uri, querystring, headers: { host: { value: host } } } })
}

test('apex は www へ 301 する', () => {
  const result = request(APEX, '/posts/')
  assert.equal(result.statusCode, 301)
  assert.equal(result.headers.location.value, 'https://www.gekal.cn/posts/')
})

test('apex のリダイレクトはクエリを保つ', () => {
  const result = request(APEX, '/posts/', { tag: { value: 'aws' } })
  assert.equal(result.headers.location.value, 'https://www.gekal.cn/posts/?tag=aws')
})

test('値のないクエリは = を付けない', () => {
  const result = request(APEX, '/posts/', { draft: { value: '' } })
  assert.equal(result.headers.location.value, 'https://www.gekal.cn/posts/?draft')
})

test('末尾スラッシュは index.html に書き換える', () => {
  const result = request(CANONICAL, '/about/')
  assert.equal(result.uri, '/about/index.html')
  assert.equal(result.statusCode, undefined)
})

test('ルートも index.html に書き換える', () => {
  assert.equal(request(CANONICAL, '/').uri, '/index.html')
})

test('スラッシュなしは末尾スラッシュへ 301 する', () => {
  const result = request(CANONICAL, '/about')
  assert.equal(result.statusCode, 301)
  assert.equal(result.headers.location.value, 'https://www.gekal.cn/about/')
})

test('拡張子のあるパスはそのまま通す', () => {
  for (const uri of ['/feed.xml', '/icon.png', '/_next/static/chunks/main.js', '/robots.txt']) {
    const result = request(CANONICAL, uri)
    assert.equal(result.uri, uri, uri)
    assert.equal(result.statusCode, undefined, uri)
  }
})

test('CloudFront のドメイン宛はリダイレクトせず検証に使える', () => {
  const dist = 'd1234567890abc.cloudfront.net'
  assert.equal(request(dist, '/posts/').uri, '/posts/index.html')
  // ホストを跨がないので、切替前でも CloudFront 上で完結して確認できる。
  assert.equal(
    request(dist, '/about').headers.location.value,
    `https://${dist}/about/`,
  )
})
