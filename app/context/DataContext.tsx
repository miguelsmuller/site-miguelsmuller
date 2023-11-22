import React, { createContext, useContext, useState, useEffect } from 'react'
import { getAllContentForHome } from '../services/graphcms'

const DataContext = createContext({})

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllContentForHome()
        setData(result)
        console.log(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  )
}

export function useDataContext() {
  return useContext(DataContext)
}
