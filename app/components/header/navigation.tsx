import React, { Fragment } from 'react'

import styles from './header.module.scss'
import Link from 'next/link'

interface NavigationProps {
  state?: Record<string, any>;
}

export default function Navigation(props: NavigationProps) {
  const pageHome = props?.state?.pageHomes?.[0] || {}

  const github: string = pageHome?.personalUrlGithub || ''
  const linkedin: string = pageHome?.personalUrlLinkedin || ''
  const curriculo: string = pageHome?.personalUrlCurriculo.url || ''

  return (
    <Fragment>
      <ul className={`${styles.header__wrap__list}`}>
        <li>
          <Link
            target="_blank"
            href={github}
            rel="noreferrer"
          >
            Github
          </Link>
        </li>

        <li>
          <Link
            target="_blank"
            href={linkedin}
            rel="noreferrer"
          >
            Linkedin
          </Link>
        </li>

        <li>
          <Link
            target="_blank"
            href={curriculo}
            rel="noreferrer"
          >
            Meu Currículo
          </Link>
        </li>
      </ul>
    </Fragment>
  )
}
