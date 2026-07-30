import 'server-only'

import type {
  AcademicItem,
  LearningItem,
  Project,
  ProjectContentItem,
  ProjectLink
} from './site-content'

const hygraphQuery = `
  {
    studies(stage: PUBLISHED, first: 100, orderBy: completionDate_DESC) {
      title
      local
      completionDate
      certificateURl
      hours
      theme
      studyType
    }
    pageHomes(stage: PUBLISHED, first: 1, orderBy: updatedAt_DESC) {
      personalUrlCurriculo {
        url
      }
    }
    portifolios(stage: PUBLISHED, first: 100, orderBy: date_DESC) {
      title
      description
      slug
      stack
      links {
        label
        url
      }
      content {
        label
        text
        items
      }
    }
  }
`

type HygraphStudy = {
  title?: string
  local?: string | null
  completionDate?: string | null
  certificateURl?: string | null
  hours?: number | null
  theme?: string[] | null
  studyType?: 'Academic' | 'Certification' | 'Course' | null
}

type HygraphProjectLink = {
  label?: string | null
  url?: string | null
}

type HygraphProjectContent = {
  label?: string | null
  text?: string | null
  items?: string[] | null
}

type HygraphProject = {
  title?: string
  description?: string | null
  slug?: string | null
  stack?: string[] | null
  links?: HygraphProjectLink[] | null
  content?: HygraphProjectContent[] | null
}

type HygraphPageHome = {
  personalUrlCurriculo?: {
    url?: string | null
  } | null
}

type HygraphResponse = {
  data?: {
    studies?: HygraphStudy[]
    pageHomes?: HygraphPageHome[]
    portifolios?: HygraphProject[]
  }
  errors?: Array<{ message?: string }>
}

export type HygraphHomeContent = {
  academics: AcademicItem[]
  learning: LearningItem[]
  projects: Project[]
}

export type HygraphHomeContentResult =
  | { available: true, content: HygraphHomeContent, resumeUrl?: string }
  | { available: false, content: HygraphHomeContent, resumeUrl?: undefined }

const unavailableContent: HygraphHomeContent = {
  academics: [],
  learning: [],
  projects: []
}

const themeLabels: Record<string, string> = {
  Angular: 'Angular',
  AWS: 'AWS',
  Azure: 'Azure',
  Banco_De_Dados: 'Banco de dados',
  Banco_de_Grafos: 'Banco de grafos',
  Banco_nao_relacional: 'Banco não relacional',
  Banco_Relacional: 'Banco relacional',
  Cloud: 'Cloud',
  CSharp: 'C#',
  Data_Engineering: 'Engenharia de dados',
  Data_Science: 'Ciência de dados',
  Design_Patterns: 'Padrões de projeto',
  DevOps: 'DevOps',
  Elastic_Search: 'Elasticsearch',
  Firebase: 'Firebase',
  GCP: 'GCP',
  Ionic: 'Ionic',
  Java: 'Java',
  JavaScript: 'JavaScript',
  Laravel: 'Laravel',
  Material_Design: 'Material Design',
  Mensageria: 'Mensageria',
  Metodologia_Agil: 'Metodologias ágeis',
  MongoDB: 'MongoDB',
  NextJS: 'Next.js',
  Node: 'Node.js',
  Observabilidade: 'Observabilidade',
  PHP: 'PHP',
  Python: 'Python',
  React: 'React',
  Soft_Skills: 'Soft skills',
  Software_Architecture: 'Arquitetura de software',
  Software_Engineering: 'Engenharia de software',
  TDD: 'TDD',
  Testes: 'Testes',
  WordPress: 'WordPress'
}

function normalizeText(value?: string | null) {
  const normalized = value?.trim()
  return normalized || undefined
}

function formatAcademicPeriod(value?: string | null) {
  if (!value) return undefined

  const date = new Date(`${value}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return undefined

  return new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(date)
}

function formatMonthYear(value?: string | null) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined

  return `${value.slice(5, 7)}/${value.slice(0, 4)}`
}

function formatLearningDescription(study: HygraphStudy) {
  const details: string[] = []

  if (typeof study.hours === 'number') {
    const hours = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(study.hours)
    details.push(`${hours} horas`)
  }

  for (const theme of study.theme ?? []) {
    details.push(themeLabels[theme] ?? theme.replace(/_/g, ' '))
  }

  return details.length > 0 ? details.join(' · ') : undefined
}

function slugFromTitle(title: string) {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toProjectLinks(links?: HygraphProjectLink[] | null): ProjectLink[] {
  return (links ?? []).flatMap(link => {
    const label = normalizeText(link.label)
    const href = normalizeText(link.url)
    return label && href ? [{ label, href }] : []
  })
}

function toProjectContent(content?: HygraphProjectContent[] | null): ProjectContentItem[] {
  return (content ?? []).flatMap<ProjectContentItem>(section => {
    const label = normalizeText(section.label)
    const items = (section.items ?? []).map(item => item.trim()).filter(Boolean)
    const text = normalizeText(section.text)

    if (!label || (!text && items.length === 0)) return []

    if (text && items.length > 0) return [{ label, value: [text, ...items] }]
    if (items.length > 0) return [{ label, value: items }]
    return text ? [{ label, value: text }] : []
  })
}

function toHomeContent(data: HygraphResponse['data']): HygraphHomeContent {
  const studies = data?.studies ?? []
  const academics = studies.flatMap<AcademicItem>(study => {
    const title = normalizeText(study.title)
    if (!title || study.studyType !== 'Academic') return []

    return [{
      title,
      institution: normalizeText(study.local) ?? 'Não informado',
      period: formatAcademicPeriod(study.completionDate)
    }]
  })

  const learning = studies.flatMap<LearningItem>(study => {
    const title = normalizeText(study.title)
    if (!title || (study.studyType !== 'Certification' && study.studyType !== 'Course')) return []

    return [{
      title,
      provider: study.studyType === 'Certification'
        ? undefined
        : normalizeText(study.local) ?? 'Não informado',
      year: formatMonthYear(study.completionDate),
      certificateUrl: normalizeText(study.certificateURl),
      type: study.studyType === 'Certification' ? 'certification' : 'course',
      description: formatLearningDescription(study)
    }]
  })

  const projects = (data?.portifolios ?? []).flatMap<Project>(project => {
    const name = normalizeText(project.title)
    if (!name) return []

    return [{
      name,
      slug: normalizeText(project.slug) ?? slugFromTitle(name),
      stack: (project.stack ?? []).map(item => item.trim()).filter(Boolean),
      links: toProjectLinks(project.links),
      content: toProjectContent(project.content)
    }]
  })

  return { academics, learning, projects }
}

function getHygraphConfig() {
  const url = normalizeText(process.env.HYGRAPH_URL)
  const key = normalizeText(process.env.HYGRAPH_KEY)

  if (!url || !key) throw new Error('Hygraph environment variables are not configured.')
  return { url, key }
}

export async function getHygraphHomeContent(): Promise<HygraphHomeContentResult> {
  try {
    const { url, key } = getHygraphConfig()
    const response = await fetch(url, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`
      },
      body: JSON.stringify({ query: hygraphQuery })
    })

    if (!response.ok) throw new Error(`Hygraph request failed with status ${response.status}.`)

    const payload = await response.json() as HygraphResponse
    if (payload.errors?.length) throw new Error('Hygraph returned GraphQL errors.')

    return {
      available: true,
      content: toHomeContent(payload.data),
      resumeUrl: normalizeText(payload.data?.pageHomes?.[0]?.personalUrlCurriculo?.url)
    }
  } catch (error) {
    console.error('Unable to load Hygraph home content.', error)
    return { available: false, content: unavailableContent }
  }
}
