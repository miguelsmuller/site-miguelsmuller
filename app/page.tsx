import React, { Fragment } from 'react'
import { Metadata } from 'next'

import Header from './components/header/header'
import Overview from './components/overview/overview'
import Study from './components/study/study'
import Portifolio from './components/portifolio/portifolio'
import Testimonies from './components/testimonies/testimonies'
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
      {/* <p>Isso é um teste pro site em modo preview 00:25</p> */}
      <Overview state={data} />
      {/* <Study state={data} /> */}
      <Portifolio state={data} />
      <Testimonies state={data} />
      <Footer state={data} />
    </Fragment>
  )
}