'use client'

import React from 'react'
import { DataProvider } from 'app/context/DataContext'
import { ThemeProvider } from 'next-themes'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>
  // return (
  //   <>
  //     <DataProvider>{children}</DataProvider>
  //   </>
  // )
}
