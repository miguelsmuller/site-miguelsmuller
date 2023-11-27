'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { FaMoon, FaSun } from 'react-icons/fa'
import styles from './DarkMode.module.scss'

const DarkModeButton = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)

    // Adicione o código para verificar o modo do sistema
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
  }, [theme, setTheme])

  if (!mounted) {
    return null
  }

  return (
    <button
      className={`${styles.btn_root}`}
      onClick={(e) => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}>
        {theme === 'dark' ? <FaMoon /> : <FaSun />}
    </button>
  )
}

export default DarkModeButton
