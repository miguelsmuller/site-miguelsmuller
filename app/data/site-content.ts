export type SocialLink = {
  label: string
  href: string
  kind: 'github' | 'linkedin' | 'email' | 'resume'
}

export type Experience = {
  role: string
  company: string
  period: string
  location: string
  summary: string
  stack: string[]
  logo?: string
  marker?: string
}

export type AcademicItem = {
  title: string
  institution: string
  period?: string
  description?: string
}

export type LearningItem = {
  title: string
  provider?: string
  year?: string
  certificateUrl?: string
  type: 'certification' | 'course'
  description?: string
}

export type ArticleItem = {
  title: string
  date: string
  category: string
  summary: string
  href?: string
}

export type ProjectLink = {
  label: string
  href: string
}

export type ProjectContentValue = string | string[]

export type ProjectContentItem = {
  label: string
  value: ProjectContentValue
}

export type Project = {
  slug: string
  name: string
  stack: string[]
  links: ProjectLink[]
  content: ProjectContentItem[]
}

export type SiteContent = {
  profile: {
    name: string
    role: string
    statement: string
    location: string
    availability: string
    resumeUrl?: string
  }
  socialLinks: SocialLink[]
  specialties: Array<{ label: string, items: string[] }>
  experiences: Experience[]
  academics: AcademicItem[]
  learning: LearningItem[]
  articles: ArticleItem[]
  projects: Project[]
}

type LocalSiteContent = Omit<SiteContent, 'socialLinks' | 'academics' | 'learning' | 'articles' | 'projects'>

export const siteContent: LocalSiteContent = {
  profile: {
    name: 'Miguel Silva - Müller',
    role: 'Engenheiro de Software - Desenvolvimento e Arquitetura',
    statement: 'Engenharia de software de ponta a ponta para transformar domínios complexos em sistemas preparados para produção.',
    location: 'Brasil',
    availability: 'Remoto'
  },
  specialties: [
    { label: 'Backend e APIs', items: ['Java, Kotlin e Python', 'Mensageria e eventos', 'APIs, microsserviços e integrações', 'Modelagem de dados'] },
    { label: 'Frontend e Experiência Web', items: ['React e Angular', 'Interfaces responsivas', 'Performance e acessibilidade', 'Experiência do usuário'] },
    { label: 'Inteligência Artificial', items: ['IA generativa aplicada a produtos', 'Integração com modelos de linguagem', 'Agentes e assistentes inteligentes', 'Automação de processos'] },
    { label: 'Arquitetura e Engenharia', items: ['Arquitetura de software', 'CI/CD e observabilidade', 'Qualidade e revisão técnica', 'Evolução contínua'] }
  ],
  experiences: [
    {
      role: 'Engenheiro de Software Sênior',
      company: 'PicPay',
      period: 'Jun/2026 - atual',
      location: 'Remoto',
      summary: 'Atuação em sistemas críticos de conciliação financeira para pagamentos, liquidações e repasses. Evolução de serviços com foco em consistência, rastreabilidade, auditoria e confiabilidade operacional.',
      stack: ['Java', 'Kotlin', 'Spring', 'Kafka', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'AWS', 'Observabilidade'],
      logo: '/icons/experience/picpay_logo.jpeg',
      marker: 'PP'
    },
    {
      role: 'Engenheiro de Software',
      company: 'Loggi',
      period: 'Fev/2024 - Jun/2026',
      location: 'Remoto',
      summary: 'Atuação backend em produtos de finance, pricing, integrações B2B e aquisição. Evoluí microsserviços e sistemas legados, com melhorias em rastreabilidade, automação, performance e integrações estratégicas.',
      stack: ['Kotlin', 'Micronaut', 'Python', 'FastAPI', 'Django', 'Kubernetes', 'AWS', 'PostgreSQL'],
      logo: '/icons/experience/loggi_logo.jpeg',
      marker: 'LG'
    },
    {
      role: 'Engenheiro de Software',
      company: 'BTG Pactual',
      period: 'Dez/2023 - Fev/2024',
      location: 'Híbrido',
      summary: 'Sustentação e evolução de sistemas críticos ligados à arquitetura Calypso para operações offshore. Trabalhei em performance, integrações e confiabilidade de processos automatizados de back-office.',
      stack: ['Java', 'Spring', 'Oracle', 'Calypso', 'Dynatrace'],
      logo: '/icons/experience/btgpactual_logo.jpeg',
      marker: 'BTG'
    },
    {
      role: 'Engenheiro de Software',
      company: 'Globo',
      period: 'Mai/2022 - Nov/2023',
      location: 'Remoto',
      summary: 'Desenvolvimento de APIs e pipelines para geração, enriquecimento e consulta de metadados no Knowledge Graph. Atuação em soluções de dados semânticos para produtos como G1, GE, Gshow e Globoplay.',
      stack: ['Python', 'FastAPI', 'Elasticsearch', 'AWS Neptune', 'Kubernetes'],
      logo: '/icons/experience/globo_logo.jpeg',
      marker: 'GB'
    },
    {
      role: 'Desenvolvedor Full Stack Freelancer',
      company: 'Projetos independentes via Workana',
      period: '2010 - 2022',
      location: 'Remoto',
      summary: 'Atuação freelancer em projetos sob demanda para clientes de diferentes segmentos pela plataforma Workana. Entrega ponta a ponta de sistemas, integrações, infraestrutura, manutenção e soluções web personalizadas.',
      stack: ['JavaScript', 'PostgreSQL', 'Freelancer', 'Backend', 'Frontend', 'Infraestrutura'],
      logo: '/icons/experience/untitle_logo.jpeg',
      marker: 'WK'
    },
    {
      role: 'Desenvolvedor de Software Júnior',
      company: 'Werks Sistemas e Automação',
      period: '2007 - 2008',
      location: 'Barra Mansa, presencial',
      summary: 'Desenvolvimento de funcionalidades para sistema de automação comercial, suporte técnico a clientes e criação de websites. Atuação em instalação, configuração, manutenção e evolução de sistemas.',
      stack: ['Visual Basic', 'Automação comercial', 'Suporte técnico', 'Web'],
      logo: '/icons/experience/untitle_logo.jpeg',
      marker: 'WS'
    }
  ]
}
