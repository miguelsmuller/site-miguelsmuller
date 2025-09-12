'use client'

import React, { Fragment } from 'react'

import styles from './study.module.scss'

import Title from '../title/title'
import Timeline from './study-timeline/Timeline'
import { useDataContext } from '../../context/DataContext'

export default function Study() {
  const { data } = useDataContext() as { data: any }
  const hasStudy = data?.study && data.study.length > 0
  return (
    <Fragment>
      <div className={`${styles.root} container`}>
        <Title text="O que eu já estudei?" />
        <div className="row">
          {hasStudy && <Timeline />}
        </div>
      </div>
    </Fragment>
  )
}
