import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [{
    url: 'https://www.miguelsmuller.dev.br',
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1
  }]
}
