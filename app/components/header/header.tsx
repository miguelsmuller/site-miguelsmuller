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

import HeaderLogo from '../graphics/header-logo'
import HeaderButton from '../graphics/header-button'
import Navigation from './navigation'
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

  useEffect(() => {
    const headerElement = document.querySelector('#header__root') as HTMLElement
    const { height } = headerElement.getBoundingClientRect()

    const scrollSpy$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      tap(pageYOffset => {
        if (pageYOffset <= height) {
          setHeaderVisible(false)
        }
      }),
      filter(pageYOffset => pageYOffset >= height),
      pairwise(),
      map(
        ([previous, current]): ScrollDirection =>
          current < previous ? ScrollDirection.UP : ScrollDirection.DOWN
      ),
      distinctUntilChanged()
    )

    const scrollUp$ = scrollSpy$.pipe(
      filter(direction => direction === ScrollDirection.UP)
    )
    scrollUp$.subscribe(() => {
      setHeaderVisible(true)
    })

    const scrollDown = scrollSpy$.pipe(
      filter(direction => direction === ScrollDirection.DOWN)
    )
    scrollDown.subscribe(() => {
      setHeaderVisible(false)
    })
    // }

    return () => {
      // window.removeEventListener('scroll', () => handleScroll)
    }
  }, [])

  const handleNavigationToggle = () => {
    return setNavigationVisible(!isNavigationVisible)
  }

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
      </div>
    </header>
  )
}