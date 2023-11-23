/* eslint-disable @typescript-eslint/no-var-requires */

import fs from 'fs'

let graphcmsConfig = {
  url: null,
  key: null
}

try {
  if (fs.existsSync('settings/graphcms.json')) {
    graphcmsConfig = require('settings/graphcms.json')
  }
} catch (error: any) {
  console.error('GraphCMS configuration is missing or incomplete.')
}

async function fetchAPI(query: any): Promise<any> {
  let json = {
    data: {}
  }

  if (graphcmsConfig?.url != null || graphcmsConfig?.key != null) {
    const urlDefinitiva = graphcmsConfig.url || ''
    const res = await fetch(urlDefinitiva, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${graphcmsConfig.key}`
      },
      body: JSON.stringify({
        query
      })
    })
    json = await res.json()
  } else {
    console.error('GraphCMS configuration is missing or incomplete.')
  }

  return json.data
}

export async function getAllContentForHome(): Promise<any> {
  const data = await fetchAPI(`
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
    Study: studies( orderBy: completionDate_DESC) {
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
