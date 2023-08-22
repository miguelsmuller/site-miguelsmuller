import React from 'react'

import styles from './overview.module.css'

import Title from '../title/title'

import PresentationPhoto from './presentation-photo'

interface OverviewProps {
  state?: Record<string, any>;
}

export default function Overview(props: OverviewProps) {
  const overviewImage: string = props?.state?.pageHome?.overviewImage?.url || ''
  const overviewText: string = props?.state?.pageHome?.overviewText || ''

  return (
    <section className={`${styles.overview__container} container`}>
      <Title text="Quem eu sou?" />

      <div className={`${styles.overview__row}`}>
        <div className={`${styles.overview__wrap_photo}`}>
          <PresentationPhoto coverImage={overviewImage} />
        </div>

        <div className={`${styles.overview__wrap_text}`}
          dangerouslySetInnerHTML={{ __html: overviewText }}
        />
      </div>
    </section>
  )
}
