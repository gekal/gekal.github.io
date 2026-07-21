'use client'

import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const FORMSPREE_URL = 'https://formspree.io/f/xojyvezn'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', subject: '', message: '' })
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
            近日中にご返信いたします。
          </Typography>
        </CardContent>
      </Card>
    )
  }

  const update = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) =>
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
                  id="email"
                  label="メールアドレス"
                  type="email"
                  required
                  fullWidth
                  value={formData.email}
                  onChange={update('email')}
                  placeholder="example@email.com"
                />
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

            {status === 'error' && (
              <Alert severity="error">
                送信に失敗しました。直接メールでご連絡ください。
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
          </Stack>
        </Box>
      </CardContent>
    </Card>
  )
}
