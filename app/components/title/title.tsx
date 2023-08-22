import React, { Fragment } from 'react'

import styles from './title.module.css'

export default function SectionTitle(props: any) {
  return (
    <Fragment>
      <h1 className={`${styles.title}`}>{props.text}</h1>
    </Fragment>
  )
}
