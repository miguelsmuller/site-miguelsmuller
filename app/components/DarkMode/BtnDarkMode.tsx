'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { FaMoon, FaSun } from 'react-icons/fa'
import styles from './DarkMode.module.scss'
import { useDarkMode } from './DarkMode'

const DarkModeButton = () => {
  const { mounted, theme, setTheme } = useDarkMode()

  if (!mounted) {
    return null
  }

  return (
    <button
      className={styles.btn_root}
      onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
    >
      {theme === 'dark' ? <FaMoon /> : <FaSun />}
    </button>
  )
}

export default DarkModeButton
