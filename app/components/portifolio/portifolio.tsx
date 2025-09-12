'use client'

import React, { Fragment } from 'react'

import Title from '../title/title'
import styles from './Portifolio.module.scss'
import Link from 'next/link'
import { useDataContext } from '../../context/DataContext'

export default function Portifolio() {
  const { data } = useDataContext() as { data: any }
  const portifolio = data?.portifolios || []
  const portifolioText: string = data?.pageHomes?.[0]?.portifolioText || ''

  const renderItens = (item: any, index: number) => {
    return (
      <Fragment key={`item-${index}`}>
        <li>
          <Link target="_blank" href={item?.projectUrl || '#'} rel="noreferrer">
            <img src={item?.image?.url} alt="" />
          </Link>
        </li>
      </Fragment>
    )
  }

  return (
  <div className={`${styles.portifolio__root}`}>
      <div className={`${styles.portifolio__inner} container`}>
        <Title text="O que eu já fiz?" />
        <div
          className={`${styles.portifolio__text}`}
          dangerouslySetInnerHTML={{ __html: portifolioText }}
        ></div>
        <div className={`${styles.portifolio__item}`}>
          {portifolio.map(renderItens)}
        </div>
      </div>
    </div>
  )
}
