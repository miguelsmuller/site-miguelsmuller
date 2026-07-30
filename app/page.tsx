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
  title: 'Miguel Müller — Engenheiro de Software',
  description: 'Perfil profissional, experiência, formação, artigos e projetos de Miguel Müller.'
}

export default async function Home() {
  const [articles, hygraph] = await Promise.all([
    getHashnodeArticles(),
    getHygraphHomeContent()
  ])

  const profile = { ...siteContent.profile, ...(hygraph.resumeUrl ? { resumeUrl: hygraph.resumeUrl } : {}) }
  const socialLinks = hygraph.resumeUrl
    ? [...siteContent.socialLinks, { label: 'currículo', href: hygraph.resumeUrl, kind: 'resume' as const }]
    : siteContent.socialLinks

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
