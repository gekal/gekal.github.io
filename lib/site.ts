/**
 * サイトの正規オリジン。
 *
 * apex (gekal.cn) は使わず www に一本化している。DNS 側でも apex のレコードは
 * 持たないため、正規 URL は必ずこのオリジンを基準にすること。
 */
export const SITE_URL = 'https://www.gekal.cn'
