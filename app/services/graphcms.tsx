import 'server-only'

import fs from 'fs'
import { unstable_cache as unstableCache } from 'next/cache'

export const HOME_CONTENT_CACHE_TAG = 'home-content'
const HOME_CONTENT_REVALIDATE_SECONDS = 600

function loadHygraphConfig() {
  let hygraphConfig = {
    url: null,
    key: null
  }

  try {
    if (fs.existsSync('settings/graphcms.json')) {
      const file = fs.readFileSync('settings/graphcms.json', 'utf-8')
      hygraphConfig = JSON.parse(file)
    }
  } catch (error: any) {
    console.error('Error while loading GraphCMS configuration:', error.message)
  }

  return hygraphConfig
}

async function callHygraphAPI(query: string): Promise<any> {
  const hygraphConfig = loadHygraphConfig()

  if (!hygraphConfig?.url || !hygraphConfig?.key) {
    throw new Error('GraphCMS configuration is missing required fields.')
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
    throw new Error(`GraphCMS request failed with status ${response.status}`)
  }

  const json = await response.json()

  if (json?.errors?.length) {
    const message = json.errors[0]?.message || 'Unknown GraphCMS error'
    throw new Error(`GraphCMS returned errors: ${message}`)
  }

  if (!json?.data) {
    throw new Error('GraphCMS response is missing data.')
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
    throw new Error('Invalid home content payload received from GraphCMS.')
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
