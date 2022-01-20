import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';

import React from 'react'

const TestContext = React.createContext('light');
TestContext.displayName = 'MyDisplayName';

import GlobalStyle from "../styles/global";
import { lightTheme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <TestContext.Provider value="dark">
      <ThemeProvider theme={lightTheme}>
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    </TestContext.Provider>
  )
}

export default MyApp
