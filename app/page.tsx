import React from 'react'
import { Metadata } from 'next'
import HomePage from './components/home-page'
import { getHashnodeArticles } from './data/hashnode-articles'
import { getHygraphHomeContent } from './data/hygraph-content'
import { siteContent } from './data/site-content'

// The homepage must run on the server for every request so its article list
// reflects the current Hashnode RSS feed instead of the build-time snapshot.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Miguel Müller — Software Engineer',
  description: 'Perfil profissional, experiência, formação, artigos e projetos de Miguel Müller.'
}

function toMailto(value: string) {
  return value.startsWith('mailto:') ? value : `mailto:${value}`
}

export default async function Home() {
  const [articles, hygraph] = await Promise.all([
    getHashnodeArticles(),
    getHygraphHomeContent()
  ])

  const profile = { ...siteContent.profile, ...(hygraph.resumeUrl ? { resumeUrl: hygraph.resumeUrl } : {}) }
  const socialLinks = [
    ...(hygraph.contact.githubUrl
      ? [{ label: 'github', href: hygraph.contact.githubUrl, kind: 'github' as const }]
      : []),
    ...(hygraph.contact.linkedinUrl
      ? [{ label: 'linkedin', href: hygraph.contact.linkedinUrl, kind: 'linkedin' as const }]
      : []),
    ...(hygraph.contact.email
      ? [{ label: 'email', href: toMailto(hygraph.contact.email), kind: 'email' as const }]
      : []),
    ...(hygraph.resumeUrl
      ? [{ label: 'currículo', href: hygraph.resumeUrl, kind: 'resume' as const }]
      : [])
  ]

  return (
    <HomePage
      content={{ ...siteContent, ...hygraph.content, articles, profile, socialLinks }}
      remoteContentAvailable={{
        education: hygraph.available,
        projects: hygraph.available
      }}
    />
  )
}
