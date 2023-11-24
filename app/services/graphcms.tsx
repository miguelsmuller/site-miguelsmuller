/* eslint-disable @typescript-eslint/no-var-requires */

import fs from 'fs'

function loadHygraphConfig() {
  let hygraphConfig = {
    url: null,
    key: null
  }

  try {
    if (fs.existsSync('settings/graphcms.json')) {
      hygraphConfig = require('settings/graphcms.json')
    }
  } catch (error: any) {
    console.error('Error while loading GraphCMS configuration:', error.message)
  }

  return hygraphConfig
}

async function callHygraphAPI(query: string): Promise<any> {
  const hygraphConfig = loadHygraphConfig()

  if (hygraphConfig?.url && hygraphConfig?.key) {
    const urlDefinitiva = hygraphConfig.url || ''
    try {
      const res = await fetch(urlDefinitiva, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${hygraphConfig.key}`
        },
        body: JSON.stringify({ query })
      })

      const json = await res.json()
      return json.data
    } catch (error: any) {
      console.error('Error while fetching data from GraphCMS:', error.message)
    }
  } else {
    console.error('GraphCMS configuration is missing required fields.')
    return null
  }
}

export async function getAllContentForHome(): Promise<any> {
  const data = await callHygraphAPI(`
  {
    pageHome(where: {id: "ckyumldxc382m0b800hvbebqn"}) {
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

  return data
}
