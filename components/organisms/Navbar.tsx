'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import AppBar from '@mui/material/AppBar'
import Link from '@mui/material/Link'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import NavLink from '@/components/molecules/NavLink'
import { WORKS_DRAFT } from '@/lib/works'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  // 事例がサンプルのままの間は出さない (lib/works.ts の WORKS_DRAFT)
  ...(WORKS_DRAFT ? [] : [{ href: '/works', label: 'Works' }]),
  { href: '/posts', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

function Logo({ dark }: { dark: boolean }) {
  return (
    <Link
      href="/"
      underline="none"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.25,
        userSelect: 'none',
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          fontWeight: 700,
          fontSize: 15,
        }}
      >
        鷹
      </Box>
      <Typography
        component="span"
        sx={{ fontWeight: 700, fontSize: 16, color: dark ? '#fff' : 'text.primary' }}
      >
        鴻鷹
      </Typography>
    </Link>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isHero, setIsHero] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 1)
      setIsHero(window.scrollY < 60)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ドロワー内の遷移要素はいずれも onClick で閉じているため、
  // pathname を見て閉じる副作用は不要 (effect 内の同期 setState は
  // 連鎖レンダリングを招くと react-hooks/set-state-in-effect が指摘する)

  // 全ページがダークなヒーロー画像で始まるため、スクロールするまでは白文字
  const useDark = isHero

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (t) => t.zIndex.drawer + 1,
          transition: 'background-color 300ms, box-shadow 300ms',
          bgcolor: scrolled
            ? useDark
              ? 'rgba(18,18,18,0.85)'
              : 'rgba(255,255,255,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
          boxShadow: scrolled ? 3 : 0,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 60, justifyContent: 'space-between' }}>
            <Logo dark={useDark} />

            <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {navLinks.map(({ href, label }) => (
                <NavLink
                  key={href}
                  href={href}
                  label={label}
                  isActive={pathname === href}
                  dark={useDark}
                />
              ))}
            </Stack>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button href="/contact" variant="contained" size="small">
                お問い合わせ
              </Button>
            </Box>

            <IconButton
              onClick={() => setIsOpen(true)}
              aria-label="メニューを開く"
              sx={{
                display: { xs: 'inline-flex', md: 'none' },
                color: useDark ? 'rgba(255,255,255,0.85)' : 'text.secondary',
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        slotProps={{ paper: { sx: { width: { xs: '100%', sm: 360 } } } }}
      >
        <Stack
          direction="row"
          sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: 60, px: 2 }}
        >
          <Logo dark={false} />
          <IconButton onClick={() => setIsOpen(false)} aria-label="メニューを閉じる">
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />

        <List sx={{ flex: 1, py: 2 }}>
          {navLinks.map(({ href, label }) => (
            <ListItemButton
              key={href}

              href={href}
              selected={pathname === href}
              onClick={() => setIsOpen(false)}
              sx={{ borderRadius: 2, mx: 1, mb: 0.5 }}
            >
              <ListItemText
                primary={label}
                slotProps={{ primary: { sx: { fontSize: 22, fontWeight: 500 } } }}
              />
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ p: 2 }}>
          <Button

            href="/contact"
            variant="contained"
            fullWidth
            size="large"
            onClick={() => setIsOpen(false)}
          >
            お問い合わせ
          </Button>
        </Box>
      </Drawer>
    </>
  )
}
