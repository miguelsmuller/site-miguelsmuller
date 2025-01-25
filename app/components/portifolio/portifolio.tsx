import React, { Fragment } from 'react'

import Title from '../title/title'
import styles from './Portifolio.module.scss'
import Link from 'next/link'

interface PortifolioProps {
  state?: Record<string, any>;
}

export default function Portifolio(props: PortifolioProps) {
  const data = props.state
  const portifolio = data?.portifolios || []
  const portifolioText: string = props?.state?.pageHomes?.portifolioText || ''

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
