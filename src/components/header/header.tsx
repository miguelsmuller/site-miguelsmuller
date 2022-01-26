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

import theme from '../../styles/theme'

export default function Header(refHero: any) {
  const [isHeaderVisible, setHeaderVisible] = useState(false)
  const [isNavigationVisible, setNavigationVisible] = useState(false)

  enum ScrollDirection {
    UP = 'Up',
    DOWN = 'Down'
  }

  useEffect(() => {
    const heroHeight = refHero.refHero.current.clientHeight

    const scrollSpy$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      tap(pageYOffset => {
        if (pageYOffset <= heroHeight) {
          setHeaderVisible(false)
        }
      }),
      filter(pageYOffset => pageYOffset >= heroHeight),
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

    return () => {
      // window.removeEventListener('scroll', () => handleScroll)
    }
  }, [])

  const handleNavigationToggle = () => {
    return setNavigationVisible(!isNavigationVisible)
  }

  return (
    <header className={`root ${isHeaderVisible ? 'visible' : ''}`}>
      <div className="header__container container">
        <a href="/">
          <HeaderLogo />
        </a>

        <button
          className="header__wrap__collapse"
          onClick={handleNavigationToggle}
        >
          <HeaderButton />
        </button>

        <div className={`header__wrap ${isNavigationVisible ? 'visible' : ''}`}>
          <Navigation />
        </div>
      </div>

      <style jsx>{`
        .root {
          padding: 16px 0px;
          background-color: ${theme.colors.lightGray};
          border-bottom: 6px solid ${theme.colors.darkGray};
          transition: all 450ms ease-out;
          top: -100%;
        }
        .root.visible {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 100;
        }

        .header__container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
        }

        .header__wrap__collapse {
          flex-grow: 1;
          border: none;
          cursor: pointer;
          text-align: right;
        }

        .header__wrap {
          padding: ${3 * 8}px 0px ${2 * 8}px;
          display: none;
          flex-direction: row;
          flex-wrap: wrap;
          flex-grow: 1;
          align-items: center;
          justify-content: flex-end;
        }
        .header__wrap.visible {
          display: flex;
        }

        @media (min-width: 1024px) {
          .header__wrap__collapse {
            display: none;
          }

          .header__wrap {
            padding: 0px;
            display: flex;
          }
        }
      `}</style>
    </header>
  )
}
