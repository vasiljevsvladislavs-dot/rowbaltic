import type { MetadataRoute } from 'next'

const BASE = 'https://rowbaltics.com'
const LANGS = ['lv', 'en', 'lt', 'ee'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const main = LANGS.map((lang) => ({
    url: `${BASE}/${lang}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: lang === 'lv' ? 1 : 0.8,
  }))

  const privacy = LANGS.map((lang) => ({
    url: `${BASE}/${lang}/privacy`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.3,
  }))

  const rules = LANGS.map((lang) => ({
    url: `${BASE}/${lang}/rules`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...main, ...rules, ...privacy]
}
