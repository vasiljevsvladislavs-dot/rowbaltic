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
  title: 'ROW BALTIC 2026 — Ielu Mākslas Festivāls',
  description:
    'ROW BALTIC (Riga Open Wall) — viens no straujāk augošajiem ielu mākslas notikumiem Latvijā un Baltijā. Festivāls 2026. gadā ar tēmu "Cīņa".',
  keywords: ['ROW BALTIC', 'ielu māksla', 'grafiti', 'festivāls', 'Rīga', 'Latvija', '2026'],
  authors: [{ name: 'ROW BALTIC' }],
  metadataBase: new URL('https://rowbaltics.com'),
  openGraph: {
    title: 'ROW BALTIC 2026 — Ielu Mākslas Festivāls',
    description:
      'Pieteikties zīmēšanas konkursam. Tēma: "Cīņa". 22. augusts, Sarkandaugava, Rīga.',
    url: 'https://rowbaltics.com',
    siteName: 'ROW BALTIC',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ROW BALTIC 2026',
      },
    ],
    locale: 'lv_LV',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROW BALTIC 2026',
    description: 'Ielu mākslas festivāls. Tēma: "Cīņa". Rīga, 2026.',
    images: ['/og-image.jpg'],
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
    <html lang="lv" className={`${bebasNeue.variable} ${inter.variable} ${spaceMono.variable}`}>
      <body className="grain">
        {children}
      </body>
    </html>
  )
}
