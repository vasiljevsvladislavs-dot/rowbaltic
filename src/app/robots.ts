import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://rowbaltics.com/sitemap.xml',
    host: 'https://rowbaltics.com',
  }
}
