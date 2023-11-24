import React, { Fragment } from 'react'

import styles from './study.module.scss'

import Title from '../title/title'
import Timeline from './study-timeline/Timeline'

interface StudyProps {
  state?: Record<string, any>;
}

export default function Study(props: StudyProps) {
  return (
    <Fragment>
      <div className={`${styles.root} container`}>
        <Title text="O que eu já estudei?" />
        <div className="row">
          <Timeline state={props.state} />
        </div>
      </div>
    </Fragment>
  )
}
