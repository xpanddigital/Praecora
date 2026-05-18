import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/login', '/checkout/'],
      },
    ],
    sitemap: 'https://www.praecora.com/sitemap.xml',
    host: 'https://www.praecora.com',
  }
}
