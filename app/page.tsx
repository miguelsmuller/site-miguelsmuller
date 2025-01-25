import React, { Fragment } from 'react'
import { Metadata } from 'next'

import Header from './components/header/header'
import Overview from './components/overview/overview'
import Study from './components/study/study'
import Portifolio from './components/portifolio/portifolio'
import Footer from './components/footer/footer'

import { getAllContentForHome } from './services/graphcms'

export const metadata: Metadata = {
  title: 'Miguel Müller'
}

export default async function Home() {
  const data = (await getAllContentForHome()) || []

  return (
    <Fragment>
      <Header state={data} />
      <Overview state={data} />
      <Study state={data} />
      <Portifolio state={data} />
      <Footer state={data} />
    </Fragment>
  )
}
