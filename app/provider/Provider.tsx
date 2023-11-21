'use client'

import React from 'react'
import { DataProvider } from 'app/context/DataContext'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DataProvider>{children}</DataProvider>
    </>
  )
}
