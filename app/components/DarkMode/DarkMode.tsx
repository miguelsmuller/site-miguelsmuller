'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export const useDarkMode = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Verificar o modo do sistema
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (!theme) {
      setTheme(prefersDarkMode ? 'dark' : 'light')
    }

    // Adicione um listener para detectar mudanças no modo do sistema
    const darkModeListener = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light')
    }

    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    darkModeMediaQuery.addEventListener('change', darkModeListener)

    // Remova o listener quando o componente for desmontado
    return () => {
      darkModeMediaQuery.removeEventListener('change', darkModeListener)
    }
  }, [setTheme])

  return { mounted, theme, setTheme }
}
