// CloudFront Functions (JS runtime 2.0) の viewer-request ハンドラ。
//
// 下の 2 つの定数のプレースホルダは SiteStack がデプロイ時に実際のホスト名へ
// 置換する。ホスト名をここに直書きしないこと (cdk.json の context が唯一の定義)。
//
// やること:
//   1. apex (gekal.cn) 宛のリクエストを www へ 301。GitHub Pages が public/CNAME に
//      基づいて行っていたリダイレクトの代替。
//      CloudFront のドメイン (d111111abcdef8.cloudfront.net) はそのまま通すので、
//      DNS 切替前でも配信内容を検証できる。
//   2. next.config.ts の `trailingSlash: true` に合わせたパス解決。
//      `/about`  → 301 `/about/`      (正規形へ寄せる)
//      `/about/` → `/about/index.html` へ書き換え (S3 にディレクトリの概念はない)
//
// ランタイム 2.0 は ES5.1 相当が確実に動く範囲なので、endsWith 等は使わず
// charAt / indexOf で書いている。

var APEX_HOST = '__APEX_HOST__'
var CANONICAL_HOST = '__CANONICAL_HOST__'

// request.querystring はオブジェクトなので、リダイレクト先 URL 用に組み立て直す。
function buildQueryString(querystring) {
  var parts = []
  for (var key in querystring) {
    var entry = querystring[key]
    if (entry.multiValue) {
      for (var i = 0; i < entry.multiValue.length; i++) {
        parts.push(key + '=' + entry.multiValue[i].value)
      }
    } else if (entry.value === '') {
      parts.push(key)
    } else {
      parts.push(key + '=' + entry.value)
    }
  }
  return parts.length === 0 ? '' : '?' + parts.join('&')
}

function movedPermanently(location) {
  return {
    statusCode: 301,
    statusDescription: 'Moved Permanently',
    headers: { location: { value: location } },
  }
}

function handler(event) {
  var request = event.request
  var uri = request.uri
  var host = request.headers.host ? request.headers.host.value.toLowerCase() : ''

  if (host === APEX_HOST) {
    return movedPermanently('https://' + CANONICAL_HOST + uri + buildQueryString(request.querystring))
  }

  if (uri.charAt(uri.length - 1) === '/') {
    request.uri = uri + 'index.html'
    return request
  }

  // 末尾セグメントに拡張子がなければディレクトリ扱い。スラッシュ付きへ寄せる。
  var lastSegment = uri.slice(uri.lastIndexOf('/') + 1)
  if (lastSegment.indexOf('.') === -1) {
    return movedPermanently(
      'https://' + host + uri + '/' + buildQueryString(request.querystring),
    )
  }

  return request
}
