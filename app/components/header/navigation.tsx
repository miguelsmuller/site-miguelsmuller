import React, { Fragment } from 'react'

import styles from './header.module.scss'
import Link from 'next/link';

interface NavigationProps {
  state?: Record<string, any>;
}

export default function Navigation(props: NavigationProps) {
  const github: string = props?.state?.pageHome?.personalUrlGithub || ''
  const linkedin: string = props?.state?.pageHome?.personalUrlLinkedin || ''
  const curriculo: string = props?.state?.pageHome?.personalUrlCurriculo.url || ''

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
