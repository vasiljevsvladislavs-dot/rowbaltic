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
      languages: Object.fromEntries(LANGS.map((l) => [l, `https://rowbaltics.com/${l}`])),
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return <div lang={lang}>{children}</div>
}
