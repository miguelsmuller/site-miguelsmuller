'use client'

import React from 'react'
import FooterFirst from './footer-first'
import FooterSecond from './footer-second'
import { useDataContext } from '../../context/DataContext'

export default function Footer() {
  const { data } = useDataContext() as { data: any }
  return (
    <footer>
      <FooterFirst />
      <FooterSecond />
    </footer>
  )
}
