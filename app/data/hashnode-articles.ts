import { XMLParser } from 'fast-xml-parser'
import type { ArticleItem } from './site-content'

const hashnodeFeedUrl = 'https://articles.miguelsmuller.dev.br/rss.xml'
const defaultCategory = 'Hashnode'

type RssCategory = string | string[]

type RssItem = {
  title?: string
  description?: string
  link?: string
  pubDate?: string
  category?: RssCategory
}

type RssFeed = {
  rss?: {
    channel?: {
      item?: RssItem | RssItem[]
    }
  }
}

function normalizeText(value?: string) {
  return value
    ?.replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function formatDate(value?: string) {
  if (!value) return ''

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}

function getCategory(category?: RssCategory) {
  if (Array.isArray(category)) return normalizeText(category[0]) || defaultCategory
  return normalizeText(category) || defaultCategory
}

function toArticleItem(item: RssItem): ArticleItem | null {
  const title = normalizeText(item.title)
  const summary = normalizeText(item.description)
  const href = normalizeText(item.link)

  if (!title || !summary || !href) return null

  return {
    title,
    date: formatDate(item.pubDate),
    category: getCategory(item.category),
    summary,
    href
  }
}

export async function getHashnodeArticles(): Promise<ArticleItem[]> {
  try {
    const response = await fetch(hashnodeFeedUrl, {
      cache: 'no-store'
    })

    if (!response.ok) return []

    const xml = await response.text()
    const parser = new XMLParser({
      ignoreAttributes: false,
      trimValues: true
    })
    const feed = parser.parse(xml) as RssFeed
    const items = feed.rss?.channel?.item
    const articleItems = Array.isArray(items) ? items : items ? [items] : []

    return articleItems
      .map(toArticleItem)
      .filter((item): item is ArticleItem => Boolean(item))
  } catch {
    return []
  }
}
