import React, { Fragment } from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { DataProvider } from './context/DataContext'
import { getAllContentForHome } from './services/hygraph'

const Header = dynamic(() => import('./components/header/header'), { ssr: false })
const Overview = dynamic(() => import('./components/overview/overview'), { ssr: false })
const Study = dynamic(() => import('./components/study/study'), { ssr: false })
const Portifolio = dynamic(() => import('./components/portifolio/portifolio'), { ssr: false })
const Footer = dynamic(() => import('./components/footer/footer'), { ssr: false })

export const metadata: Metadata = {
  title: 'Miguel Müller'
}

export default async function Home() {
  const data = await getAllContentForHome()

  return (
    <DataProvider initialData={data}>
      <Fragment>
        <Header />
        <Overview />
        <Study />
        <Portifolio />
        <Footer />
      </Fragment>
    </DataProvider>
  )
}
