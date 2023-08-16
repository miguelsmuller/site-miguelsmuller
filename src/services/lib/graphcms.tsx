/* eslint-disable @typescript-eslint/no-var-requires */

let jsonData = null

if (process.env.NODE_ENV === 'development') {
  jsonData = require('../../settings/graphcms.json')
}

const functions = require('firebase-functions')

const graphcmsConfig = functions.config().graphcms || jsonData

async function fetchAPI(query: any) {
  const res = await fetch(graphcmsConfig.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${graphcmsConfig.key}`
    },
    body: JSON.stringify({
      query
    })
  })

  const json = await res.json()

  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getAllContentForHome() {
  const data = await fetchAPI(
    `
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
  `
  )

  return data
}
