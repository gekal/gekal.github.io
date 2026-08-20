'use client'

import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import type { Post } from '@/lib/posts'
import { parseTags, type TagSummary } from '@/lib/tags'
import PostCard from '@/components/organisms/PostCard'

interface PostSearchProps {
  posts: Post[]
  /** 絞り込みチップに出すタグ (多い順に渡す) */
  tags: TagSummary[]
}

/**
 * 記事一覧の絞り込み。
 *
 * 静的書き出しなので検索 API は持てない。記事数が 3 桁に届くまでは
 * 一覧のデータをそのままクライアントに渡して絞り込むほうが速く、
 * 依存も増えない (本文は含めず、タイトル・抜粋・タグだけを対象にする)。
 */
export default function PostSearch({ posts, tags }: PostSearchProps) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter((post) => {
      const postTags = parseTags(post.tags).map((t) => t.toLowerCase())
      if (activeTag && !postTags.includes(activeTag)) return false
      if (!q) return true
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        postTags.some((t) => t.includes(q))
      )
    })
  }, [posts, query, activeTag])

  const byYear = useMemo(() => {
    const acc = new Map<string, Post[]>()
    for (const post of filtered) {
      const year = new Date(post.date).getFullYear().toString()
      acc.set(year, [...(acc.get(year) ?? []), post])
    }
    return [...acc.entries()].sort((a, b) => Number(b[0]) - Number(a[0]))
  }, [filtered])

  return (
    <>
      <Stack spacing={2} sx={{ mb: 6 }}>
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="キーワードで絞り込む（例: kubernetes, git）"
          fullWidth
          size="small"
          type="search"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
            htmlInput: { 'aria-label': '記事をキーワードで絞り込む' },
          }}
        />

        <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: 'wrap' }}>
          <Chip
            label="すべて"
            size="small"
            variant={activeTag ? 'outlined' : 'filled'}
            color={activeTag ? 'default' : 'primary'}
            onClick={() => setActiveTag(null)}
          />
          {tags.map(({ label, slug, count }) => (
            <Chip
              key={slug}
              label={`${label} (${count})`}
              size="small"
              variant={activeTag === slug ? 'filled' : 'outlined'}
              color={activeTag === slug ? 'primary' : 'default'}
              onClick={() => setActiveTag(activeTag === slug ? null : slug)}
            />
          ))}
        </Stack>

        <Typography variant="body2" color="text.secondary" aria-live="polite">
          {filtered.length} 件
        </Typography>
      </Stack>

      {byYear.map(([year, yearPosts]) => (
        <Box key={year} sx={{ mb: 8 }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'baseline', mb: 4 }}>
            <Typography
              component="p"
              sx={{ color: 'text.disabled', userSelect: 'none', fontSize: 48, fontWeight: 700 }}
            >
              {year}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {yearPosts.length} 記事
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            {yearPosts.map((post) => (
              <Grid key={post.slug} size={{ xs: 12, sm: 6, lg: 4 }}>
                <PostCard post={post} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      {filtered.length === 0 && (
        <Typography color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
          該当する記事がありませんでした。
        </Typography>
      )}
    </>
  )
}
