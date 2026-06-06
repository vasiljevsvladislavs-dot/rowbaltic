import type { Metadata } from 'next'
import { Bebas_Neue, Inter, Space_Mono } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ROW BALTICS 2026 — Street Art Festival',
  description:
    'ROW BALTICS — one of the fastest-growing street art events in the Baltics. Apply for the drawing competition. Theme: Battle. 22 August, Sarkandaugava, Riga.',
  keywords: ['ROW BALTICS', 'street art', 'graffiti', 'festival', 'Riga', 'Latvia', '2026', 'battle'],
  authors: [{ name: 'ROW BALTICS' }],
  metadataBase: new URL('https://rowbaltics.com'),
  openGraph: {
    title: 'ROW BALTICS 2026 — Street Art Festival',
    description:
      'Apply for the drawing competition. Theme: Battle. 22 August, Sarkandaugava, Riga.',
    url: 'https://rowbaltics.com/en',
    siteName: 'ROW BALTICS',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'ROW BALTICS 2026' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROW BALTICS 2026 — Street Art Festival',
    description: 'Street art festival. Theme: Battle. Riga, 22 August 2026.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://rowbaltics.com/en',
    languages: {
      'x-default': 'https://rowbaltics.com/en',
      en: 'https://rowbaltics.com/en',
      lv: 'https://rowbaltics.com/lv',
      lt: 'https://rowbaltics.com/lt',
      et: 'https://rowbaltics.com/ee',
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable} ${spaceMono.variable}`}>
      <body className="grain">
        {children}
      </body>
    </html>
  )
}
