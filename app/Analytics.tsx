import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '@/lib/site'

/**
 * アクセス解析 (GA4)。
 *
 * 測定 ID が未設定のときは何も描画しない = スクリプトも Cookie も出さない。
 * 「どの記事から問い合わせに繋がっているか」が分からないと改善が回らないので、
 * 営業導線を足すのと同時に計測も入れておく。
 */
export default function Analytics() {
  if (!GA_MEASUREMENT_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });`}
      </Script>
    </>
  )
}
