'use client'

import React, { useEffect, useState } from 'react'
import {
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  pairwise,
  tap,
  throttleTime
} from 'rxjs'

import HeaderLogo from './header-logo'
import HeaderButton from './header-button'
import Navigation from './navigation'
import DarkModeButton from '../btnDarkMode/DarkMode'
import styles from './header.module.scss'

interface HeaderProps {
  refElement?: React.RefObject<HTMLDivElement> | null;
  state?: Record<string, any>;
}

export default function Header(props: HeaderProps) {
  const [isHeaderVisible, setHeaderVisible] = useState(false)
  const [isNavigationVisible, setNavigationVisible] = useState(false)

  enum ScrollDirection {
    UP = 'Up',
    DOWN = 'Down'
  }

  const handleScroll = (pageYOffset: number, height: number) => {
    if (pageYOffset <= height) {
      setHeaderVisible(false)
    }
  }

  const handleNavigationToggle = () => setNavigationVisible(!isNavigationVisible)

  useEffect(() => {
    const headerElement = document.querySelector('#header__root') as HTMLElement
    const { height } = headerElement.getBoundingClientRect()

    const scrollSpy$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.scrollY),
      tap(scrollY => handleScroll(scrollY, height)),
      filter(scrollY => scrollY >= height),
      pairwise(),
      map(
        ([previous, current]): ScrollDirection =>
          current < previous ? ScrollDirection.UP : ScrollDirection.DOWN
      ),
      distinctUntilChanged()
    )

    const scrollUp$ = scrollSpy$.pipe(filter(direction => direction === ScrollDirection.UP))
    scrollUp$.subscribe(() => setHeaderVisible(true))

    const scrollDown$ = scrollSpy$.pipe(filter(direction => direction === ScrollDirection.DOWN))
    scrollDown$.subscribe(() => setHeaderVisible(false))

    return () => {
      // Cleanup, if needed
    }
  }, [])

  return (
    <header id="header__root" className={`${styles.header__root} ${isHeaderVisible ? styles.visible : ''}`}>
      <div className={`${styles.header__container} container`}>
        <a href="/">
          <HeaderLogo />
        </a>

        <button
          className={`${styles.header__wrap__collapse}`}
          onClick={handleNavigationToggle}
        >
          <HeaderButton />
        </button>

        <div className={`${styles.header__wrap} ${isNavigationVisible ? styles.visible : ''}`}>
          <Navigation state={props.state} />
        </div>
        <DarkModeButton />
      </div>
    </header>
  )
}
