import type { Metadata } from 'next'
import type { Lang } from '@/i18n'
import { getDictionary } from '@/i18n'

const LANGS: Lang[] = ['lv', 'en', 'lt', 'ee']

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = (LANGS.includes(rawLang as Lang) ? rawLang : 'lv') as Lang
  const dict = getDictionary(lang)

  const localeMap: Record<Lang, string> = {
    lv: 'lv_LV',
    en: 'en_US',
    lt: 'lt_LT',
    ee: 'et_EE',
  }

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: ['ROW BALTICS', 'street art', 'graffiti', 'festival', 'Riga', 'Latvia', '2026'],
    authors: [{ name: 'ROW BALTICS' }],
    metadataBase: new URL('https://rowbaltics.com'),
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `https://rowbaltics.com/${lang}`,
      siteName: 'ROW BALTICS',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'ROW BALTICS 2026' }],
      locale: localeMap[lang],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
      images: ['/og-image.jpg'],
    },
    icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
    alternates: {
      canonical: `https://rowbaltics.com/${lang}`,
      languages: {
        'x-default': 'https://rowbaltics.com/en',
        ...Object.fromEntries(LANGS.map((l) => [l === 'ee' ? 'et' : l, `https://rowbaltics.com/${l}`])),
      },
    },
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'ROW BALTICS 2026',
  description: 'Street art festival and drawing competition. Theme: Battle.',
  startDate: '2026-08-22T10:00:00+03:00',
  endDate: '2026-08-22T17:00:00+03:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Sarkandaugava',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Zāģeru iela',
      addressLocality: 'Rīga',
      addressCountry: 'LV',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'ROW BALTICS',
    url: 'https://rowbaltics.com',
    email: 'info@rowbaltics.com',
  },
  image: 'https://rowbaltics.com/og-image.jpg',
  url: 'https://rowbaltics.com/en',
  offers: {
    '@type': 'Offer',
    name: 'Apply for Drawing Competition',
    url: 'https://rowbaltics.com/en#registracija',
    availability: 'https://schema.org/InStock',
    validFrom: '2026-06-01',
    validThrough: '2026-06-28',
  },
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return (
    <div lang={lang}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  )
}
