import type { Metadata } from 'next'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import HeroSection from '@/components/organisms/HeroSection'
import ContactForm from '@/components/organisms/ContactForm'
import ContactInfo from '@/components/organisms/ContactInfo'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'gekal へのお問い合わせ。お仕事依頼・技術相談はこちらから。',
}

export default function ContactPage() {
  return (
    <>
      <HeroSection
        title="Contact"
        subtitle="お気軽にご連絡ください"
        backgroundImage="/img/bg-contact.jpg"
        size="sm"
      />
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 5 }}>
            <ContactInfo />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <ContactForm />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
