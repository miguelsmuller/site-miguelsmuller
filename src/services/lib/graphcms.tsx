// eslint-disable-next-line @typescript-eslint/no-var-requires
const functions = require('firebase-functions')

const env = functions.config().graphcms

async function fetchAPI(query: any) {
  const res = await fetch(env.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.key}`
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
        personalUrlCurriculo
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
      Academic: studies(first: 3, where: {studyType: Academic}) {
        title
        local
      }
      Certification: studies(first: 3, where: {studyType: Certification}) {
        title
        local
      }
      Course: studies(first: 3, where: {studyType: Course}) {
        title
        local
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
