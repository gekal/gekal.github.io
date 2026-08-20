import type { Metadata } from 'next'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import HeroSection from '@/components/organisms/HeroSection'
import BreadcrumbNav from '@/components/molecules/BreadcrumbNav'
import { BUSINESS } from '@/lib/business'
import { PROFILE } from '@/lib/profile'
import { GA_MEASUREMENT_ID } from '@/lib/site'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description:
    '当サイトにおける個人情報の取得・利用・第三者提供およびアクセス解析の取り扱いについて。',
}

/** 内容を変えたらこの日付も更新する */
const LAST_UPDATED = '2026年8月21日'

function Section({
  index,
  title,
  children,
}: {
  index: number
  title: string
  children: React.ReactNode
}) {
  return (
    <Box component="section">
      <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
        {index}. {title}
      </Typography>
      <Stack spacing={1.5} sx={{ color: 'text.secondary' }}>
        {children}
      </Stack>
    </Box>
  )
}

/** 空の項目は行ごと出さない。屋号・登録番号は未取得のこともあるため。 */
function InfoRow({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <Typography variant="body2">
      <Box component="span" sx={{ color: 'text.primary', fontWeight: 500 }}>
        {label}
      </Box>
      ：{value}
    </Typography>
  )
}

/**
 * 章立て。アクセス解析の節は計測が有効なときだけ出す
 * (タグを出していないのに「Cookie を使う」と書くのは実態と合わない)。
 * 番号は配列の順序から振るので、節を足しても採番がずれない。
 */
const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: '取得する情報',
    body: (
      <Typography variant="body2">
        お問い合わせフォームから送信いただいた、お名前・会社名・メールアドレス・
        ご相談内容・ご予算・希望開始時期・件名・メッセージ本文を取得します。
        これらはすべて任意にご入力いただくものです。
      </Typography>
    ),
  },
  {
    title: '利用目的',
    body: (
      <Typography variant="body2">
        お問い合わせへの返信、およびご相談いただいた案件の検討・お見積り・ご連絡のためにのみ
        利用します。営業目的での送付や、他の目的への転用は行いません。
      </Typography>
    ),
  },
  {
    title: '第三者への提供・外部サービスの利用',
    body: (
      <>
        <Typography variant="body2">
          フォームの送信には外部のフォーム配信サービス{' '}
          <Link
            component="a"
            href="https://formspree.io/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Formspree
          </Link>
          （米国）を利用しており、入力内容は同サービスを経由して管理者のメールアドレスへ
          送信されます。同サービスのサーバーは日本国外に所在します。
        </Typography>
        <Typography variant="body2">
          これ以外に、ご本人の同意なく個人情報を第三者へ提供することはありません
          （法令に基づく開示請求があった場合を除きます）。
        </Typography>
      </>
    ),
  },
  ...(GA_MEASUREMENT_ID
    ? [
        {
          title: 'アクセス解析',
          body: (
            <Typography variant="body2">
              当サイトではサイト改善のため Google Analytics を利用しています。Google Analytics は
              Cookie を用いて閲覧情報を収集しますが、これらは匿名で収集されており個人を特定する
              ものではありません。IP アドレスは匿名化して送信しています。収集を望まない場合は、
              ブラウザの設定で Cookie を無効にするか、
              <Link
                component="a"
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google のオプトアウトアドオン
              </Link>
              をご利用ください。
            </Typography>
          ),
        },
      ]
    : []),
  {
    title: '保存期間と開示・削除',
    body: (
      <Typography variant="body2">
        お問い合わせ内容は、対応の記録として必要な期間のみ保管します。ご自身の情報の開示・訂正・
        削除をご希望の場合は、下記の連絡先までお申し出ください。ご本人であることを確認のうえ、
        速やかに対応します。
      </Typography>
    ),
  },
  {
    title: '事業者情報・連絡先',
    body: (
      <>
        <Stack spacing={0.75}>
          <InfoRow label="運営者" value={`${PROFILE.name}（${PROFILE.handle}）`} />
          <InfoRow label="事業形態" value={BUSINESS.form} />
          <InfoRow label="屋号" value={BUSINESS.tradeName} />
          <InfoRow label="所在地" value={BUSINESS.location} />
          <InfoRow label="適格請求書発行事業者 登録番号" value={BUSINESS.invoiceNumber} />
        </Stack>
        <Typography variant="body2">
          連絡先：
          <Link component="a" href={`mailto:${BUSINESS.email}`}>
            {BUSINESS.email}
          </Link>
        </Typography>
      </>
    ),
  },
  {
    title: '改定',
    body: (
      <Typography variant="body2">
        本ポリシーの内容は、必要に応じて予告なく変更することがあります。変更後の内容は当ページに
        掲載した時点から適用されます。
      </Typography>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <>
      <HeroSection
        title="プライバシーポリシー"
        backgroundImage="/img/bg-contact.jpg"
        size="sm"
      />

      <Container maxWidth="md" sx={{ py: 8 }}>
        <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'Privacy' }]} />

        <Stack spacing={5}>
          <Typography variant="body2" color="text.secondary">
            当サイト（www.gekal.cn）における個人情報の取り扱いについて、以下のとおり定めます。
          </Typography>

          {sections.map(({ title, body }, i) => (
            <Section key={title} index={i + 1} title={title}>
              {body}
            </Section>
          ))}

          <Typography variant="caption" color="text.secondary">
            最終更新：{LAST_UPDATED}
          </Typography>
        </Stack>
      </Container>
    </>
  )
}
