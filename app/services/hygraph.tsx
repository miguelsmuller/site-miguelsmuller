import 'server-only'

import { unstable_cache as unstableCache } from 'next/cache'

export const HOME_CONTENT_CACHE_TAG = 'home-content'
const HOME_CONTENT_REVALIDATE_SECONDS = 600

type HygraphConfig = {
  url: string | null
  key: string | null
}

function sanitizeValue(value: string | null | undefined): string | null {
  if (!value) {
    return null
  }

  const trimmed = value.trim().replace(/^['"]|['"]$/g, '')
  return trimmed.length > 0 ? trimmed : null
}

function isValidHygraphConfig(config: HygraphConfig): boolean {
  return Boolean(config.url && config.key)
}

function loadHygraphConfig(): HygraphConfig {
  const envConfig = {
    url: sanitizeValue(process.env.HYGRAPH_URL),
    key: sanitizeValue(process.env.HYGRAPH_KEY)
  }

  if (isValidHygraphConfig(envConfig)) {
    return envConfig
  }

  return {
    url: null,
    key: null
  }
}

async function callHygraphAPI(query: string): Promise<any> {
  const hygraphConfig = loadHygraphConfig()

  if (!hygraphConfig?.url || !hygraphConfig?.key) {
    throw new Error('Hygraph configuration is missing required fields.')
  }

  const urlDefinitiva = hygraphConfig.url || ''
  const response = await fetch(urlDefinitiva, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${hygraphConfig.key}`
    },
    body: JSON.stringify({ query })
  })

  if (!response.ok) {
    throw new Error(`Hygraph request failed with status ${response.status}`)
  }

  const json = await response.json()

  if (json?.errors?.length) {
    const message = json.errors[0]?.message || 'Unknown Hygraph error'
    throw new Error(`Hygraph returned errors: ${message}`)
  }

  if (!json?.data) {
    throw new Error('Hygraph response is missing data.')
  }

  return json.data
}

async function loadAllContentForHome(): Promise<any> {
  const data = await callHygraphAPI(`
  {
    pageHomes(first: 1, orderBy: createdAt_DESC) {
      coverTitle
      coverTagLine
      personalUrlGithub
      personalUrlLinkedin
      personalUrlTwitter
      personalUrlInstagram
      personalUrlLattes
      personalUrlCurriculo {
        id
        url
        fileName
      }
      overviewImage {
        url
        fileName
        size
        height
        width
      }
      overviewText
      servicesText
      servicesListItems
      principlesText
      principlesMission
      principlesVision
      principlesValues
      portifolioText
      goodChoiceText
      goodChoiceItems
      footerLocation
      footerMail
    }
    portifolios(orderBy: date_DESC) {
      title
      description
      theme
      projectUrl
      date
      image {
        url
        fileName
        height
        width
        size
      }
    }
    study: studies( orderBy: completionDate_DESC) {
      title
      local
      completionDate
      certificateURl
      studyType
      hours
      theme
    }
    testimonies(last: 3) {
      author
      company
      text
    }
  }
  `)

  if (!data?.pageHomes || !Array.isArray(data.pageHomes)) {
    throw new Error('Invalid home content payload received from Hygraph.')
  }

  return data
}

const getCachedAllContentForHome = unstableCache(
  async () => loadAllContentForHome(),
  ['home-content'],
  {
    revalidate: HOME_CONTENT_REVALIDATE_SECONDS,
    tags: [HOME_CONTENT_CACHE_TAG]
  }
)

export async function getAllContentForHome(): Promise<any> {
  return getCachedAllContentForHome()
}
