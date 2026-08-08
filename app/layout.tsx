import React from 'react'
import type { Metadata } from 'next'
import { Providers } from './provider/Provider'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.miguelsmuller.dev.br'),
  title: {
    default: 'Miguel Müller — Software Engineer',
    template: '%s — Miguel Müller'
  },
  description: 'Perfil profissional, experiência, formação, artigos e projetos de Miguel Müller.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Miguel Müller',
    title: 'Miguel Müller — Software Engineer',
    description: 'Perfil profissional, experiência, formação, artigos e projetos de Miguel Müller.',
    images: ['/og.png']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miguel Müller — Software Engineer',
    description: 'Perfil profissional, experiência, formação, artigos e projetos de Miguel Müller.',
    images: ['/og.png']
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
