'use client'

import React, { createContext, useContext, useState } from 'react'

const DataContext = createContext({})

export function DataProvider({ children, initialData }: { children: React.ReactNode, initialData: any }) {
  const [data] = useState(initialData)

  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  )
}

export function useDataContext() {
  return useContext(DataContext)
}
