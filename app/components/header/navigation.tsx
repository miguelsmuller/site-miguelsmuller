'use client'

import React, { Fragment } from 'react'

import styles from './header.module.scss'
import Link from 'next/link'
import { useDataContext } from '../../context/DataContext'

export default function Navigation() {
  const { data } = useDataContext() as { data: any }
  const pageHome = data?.pageHomes?.[0] || {}

  const articles = 'https://articles.miguelsmuller.dev.br/'
  const github = pageHome?.personalUrlGithub || ''
  const linkedin = pageHome?.personalUrlLinkedin || ''
  const curriculo = pageHome?.personalUrlCurriculo.url || ''

  return (
    <Fragment>
      <ul className={`${styles.header__wrap__list}`}>
      <li>
          <Link href={articles}>
            Artigos
          </Link>
        </li>

        <li>
          <Link target="_blank" href={github}>
            Github
          </Link>
        </li>

        <li>
          <Link target="_blank" href={linkedin}>
            Linkedin
          </Link>
        </li>

        <li>
          <Link target="_blank" href={curriculo}>
            Meu Currículo
          </Link>
        </li>
      </ul>
    </Fragment>
  )
}
