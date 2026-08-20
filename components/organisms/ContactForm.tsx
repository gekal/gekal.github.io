'use client'

import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined'
import { PROFILE } from '@/lib/profile'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const FORMSPREE_URL = 'https://formspree.io/f/xojyvezn'

const INQUIRY_TYPES = [
  '新規開発',
  'クラウド移行 / インフラ構築',
  'DevOps / CI-CD 改善',
  '技術相談 / アーキテクチャレビュー',
  'その他',
]

const BUDGETS = [
  '未定 / 相談したい',
  '〜50 万円',
  '50〜150 万円',
  '150〜500 万円',
  '500 万円〜',
  '月額稼働（週 2〜5 日）',
]

const START_TIMES = ['未定', 'できるだけ早く', '1 か月以内', '3 か月以内', '3 か月以降']

const initialData = {
  name: '',
  company: '',
  email: '',
  inquiryType: '',
  budget: '',
  startTime: '',
  subject: '',
  message: '',
  // Formspree の honeypot。人間には見えない欄なので、埋まっていれば bot と判断される
  _gotcha: '',
}

export default function ContactForm() {
  const [formData, setFormData] = useState(initialData)
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 受信メールの件名を分かりやすくする Formspree の特殊フィールド
        body: JSON.stringify({ ...formData, _subject: `[gekal.cn] ${formData.subject}` }),
      })
      if (res.ok) {
        setStatus('sent')
        setFormData(initialData)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 8 }}>
          <Box sx={{ color: 'success.main', mb: 2 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 56 }} />
          </Box>
          <Typography variant="h5" sx={{ mb: 1 }}>
            送信完了しました
          </Typography>
          <Typography variant="body2" color="text.secondary">
            お問い合わせありがとうございます。
            <br />
            1〜2 営業日以内にご返信いたします。
          </Typography>
        </CardContent>
      </Card>
    )
  }

  const update =
    (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData({ ...formData, [field]: e.target.value })

  return (
    <Card>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  id="name"
                  label="お名前"
                  required
                  fullWidth
                  value={formData.name}
                  onChange={update('name')}
                  placeholder="山田 太郎"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  id="company"
                  label="会社名・組織名"
                  fullWidth
                  value={formData.company}
                  onChange={update('company')}
                  placeholder="株式会社◯◯"
                />
              </Grid>
            </Grid>

            <TextField
              id="email"
              label="メールアドレス"
              type="email"
              required
              fullWidth
              value={formData.email}
              onChange={update('email')}
              placeholder="example@email.com"
            />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  id="inquiryType"
                  label="ご相談内容"
                  select
                  fullWidth
                  value={formData.inquiryType}
                  onChange={update('inquiryType')}
                >
                  {INQUIRY_TYPES.map((v) => (
                    <MenuItem key={v} value={v}>
                      {v}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  id="budget"
                  label="ご予算"
                  select
                  fullWidth
                  value={formData.budget}
                  onChange={update('budget')}
                >
                  {BUDGETS.map((v) => (
                    <MenuItem key={v} value={v}>
                      {v}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  id="startTime"
                  label="希望開始時期"
                  select
                  fullWidth
                  value={formData.startTime}
                  onChange={update('startTime')}
                >
                  {START_TIMES.map((v) => (
                    <MenuItem key={v} value={v}>
                      {v}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <TextField
              id="subject"
              label="件名"
              required
              fullWidth
              value={formData.subject}
              onChange={update('subject')}
              placeholder="お仕事のご相談 / 技術相談 など"
            />

            <TextField
              id="message"
              label="メッセージ"
              required
              fullWidth
              multiline
              rows={6}
              value={formData.message}
              onChange={update('message')}
              placeholder="ご依頼内容・ご質問など詳しくご記入ください"
            />

            {/*
              honeypot。表示はしないが、display:none だと埋めない bot もいるため
              画面外に逃がしている。オートフィルにも拾われないようにしておく
            */}
            <Box
              aria-hidden
              sx={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}
            >
              <label htmlFor="_gotcha">この欄は入力しないでください</label>
              <input
                id="_gotcha"
                name="_gotcha"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData._gotcha}
                onChange={update('_gotcha')}
              />
            </Box>

            {status === 'error' && (
              <Alert severity="error">
                送信に失敗しました。お手数ですが{' '}
                <Link component="a" href={`mailto:${PROFILE.email}`}>
                  {PROFILE.email}
                </Link>{' '}
                宛に直接ご連絡ください。
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={status === 'sending'}
              startIcon={
                status === 'sending' ? <CircularProgress size={18} color="inherit" /> : undefined
              }
            >
              {status === 'sending' ? '送信中...' : '送信する'}
            </Button>

            <Typography variant="caption" color="text.secondary">
              送信いただいた内容は、フォーム配信サービス Formspree を経由して届きます。
              ご返信以外の目的には利用しません。詳しくは{' '}
              <Link href="/privacy">プライバシーポリシー</Link> をご覧ください。
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  )
}
