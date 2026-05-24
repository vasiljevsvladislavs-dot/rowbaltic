import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ROW BALTIC 2026 — Ielu Mākslas Festivāls',
  description:
    'ROW BALTIC (Riga Open Wall) — viens no straujāk augošajiem ielu mākslas notikumiem Latvijā un Baltijā. Festivāls 2026. gadā ar tēmu "Cīņa".',
  keywords: ['ROW BALTIC', 'ielu māksla', 'grafiti', 'festivāls', 'Rīga', 'Latvija', '2026'],
  authors: [{ name: 'ROW BALTIC' }],
  metadataBase: new URL('https://rowbaltic.com'),
  openGraph: {
    title: 'ROW BALTIC 2026 — Ielu Mākslas Festivāls',
    description:
      'Pieteikties zīmēšanas konkursam. Tēma: "Cīņa". 22. augusts, Sarkandaugava, Rīga.',
    url: 'https://rowbaltic.com',
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
    <html lang="lv">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain">
        {children}
      </body>
    </html>
  )
}
