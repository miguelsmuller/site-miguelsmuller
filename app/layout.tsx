/* eslint-disable camelcase */

import React from 'react'
import { Open_Sans } from 'next/font/google'
import './globals.css'

const openSans = Open_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-opensans'
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className={openSans.className}>
      <body>
        {children}
      </body>
    </html>
  )
}
