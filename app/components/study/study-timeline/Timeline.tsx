'use client'

import React, { useState } from 'react'
import IconPlus from '../../graphics/icon-plus'
import styles from './study-timeline.module.scss'

interface TimeLineProps {
  state?: Record<string, any>;
}

const Timeline = (props: TimeLineProps) => {
  const data = props.state?.study || []
  const length = data.length
  const initialDisplay = 12
  const perPage = 4

  const renderTimelineElement = (item: any, index: number) => {
    return (
      <li key={index}>
        {renderTitle(item)}
        <div className={`${styles.course_info}`}>
        {renderDate(item)}
          {renderSubTitle(item)}
          {renderCertificate(item)}
        </div>
        {renderSkills(item)}
      </li>
    )
  }

  const renderDate = (item: any) => {
    const currentDate = new Date(item.completionDate)
    const formattedDate = currentDate.toLocaleDateString('pt-BR')

    return (
      <p className={`${styles.course_date}`}>
        {formattedDate}
      </p>
    )
  }

  const renderTitle = (item: any) => {
    return (
      <p className={`${styles.course_title}`}>
        {item.title}
      </p>
    )
  }

  const renderSubTitle = (item: any) => {
    let subtitle
    subtitle = item.local
    item.hours && (
      subtitle = subtitle + ' - ' + item.hours + ' hrs'
    )
    return (
      <p className={`${styles.course_organization}`}>
        {subtitle}
      </p>
    )
  }

  const renderCertificate = (item: any) => (
    item.certificateURl && (
      <a
        href={item.certificateURl}
        target="_blank"
        className={`${styles.course_certification}`}
        rel="noreferrer"
      >
        Link do Certificado
      </a>
    )
  )

  const renderSkills = (item: any) => (
    item.theme && (
      <ul className={`${styles.course_skills}`}>
        {item.theme.map((skill:any, index:number) => (
          <li key={index}>{formatSkillCase(skill)}</li>
        ))}
      </ul>
    )
  )

  const formatSkillCase = (skill: string) => {
    const withoutUnderscores = skill.replace(/_/g, ' ')

    const capitalizedWords = withoutUnderscores
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    return capitalizedWords
  }

  const loadMoreElements = () => {
    setElements((oldElements) => [
      ...oldElements,
      ...data.slice(counter, counter + perPage).map((item: any, index: number) =>
        renderTimelineElement(item, index + counter)
      )
    ])
    setCounter(counter + perPage)
  }

  const [counter, setCounter] = useState(initialDisplay)

  const [elements, setElements] = useState(
    [
      data.slice(0, initialDisplay).map((item: any, index: number) => {
        return (renderTimelineElement(item, index))
      })
    ]
  )

  return (
    <div className={`${styles.root}`}>
      <ul className={`${styles.grid}`}>
        {elements}
      </ul>

      {length > counter && (
        <button
          className={`${styles.btn_load_more}`}
          onClick={ () => { loadMoreElements() }}
        >
        <IconPlus />
      </button>
      )}
    </div>
  )
}

export default Timeline
