import type { MetadataRoute } from 'next'

const BASE = 'https://rowbaltics.com'
const LANGS = ['lv', 'en', 'lt', 'ee'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return LANGS.map((lang) => ({
    url: `${BASE}/${lang}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: lang === 'lv' ? 1 : 0.8,
  }))
}
