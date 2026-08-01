'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'
import { AnalyticsConsent } from './analytics-consent'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <AnalyticsConsent />
    </ThemeProvider>
  )
}
