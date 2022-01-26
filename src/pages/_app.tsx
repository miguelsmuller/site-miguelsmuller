import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'

import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

const TestContext = React.createContext('light')
TestContext.displayName = 'MyDisplayName'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TestContext.Provider value="dark">
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    </TestContext.Provider>
  )
}

export default MyApp
