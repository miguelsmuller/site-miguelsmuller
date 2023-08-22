'use client'

import React, { useState } from 'react'

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

import IconCap from '../../graphics/icon-cap'
import IconPlus from '../../graphics/icon-plus'

import styles from './study-timeline.module.scss'

interface TimeLineProps {
  state?: Record<string, any>;
}

const Timeline = (props: TimeLineProps) => {
  const data = props.state?.Study || []
  const length = data.length
  const perPage = 3

  const renderTimelineElement = (item: any, index: number) => {
    return (
      <VerticalTimelineElement
        visible={true}
        key={index}
        date={renderDate(item)}
        dateClassName={`${styles.course_date}`}
        className={`${`vertical-timeline-element--${item.studyType}`}`}
        icon={<IconCap />}
      >

        {renderTitle(item)}
        {renderSubTitle(item)}
        {renderCertificate(item)}
        {renderSkills(item)}

      </VerticalTimelineElement>
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
      <p className={`${styles.course_subtitle}`}>
        {subtitle}
      </p>
    )
  }

  const renderCertificate = (item: any) => {
    return (
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
  }

  const renderSkills = (item: any) => {
    return (
      item.theme && (
        <ul className={`${styles.course_skills}`}>
          {item.theme.map((skill:any, index:number) => (
            <li key={index}>{formatSkillCase(skill)}</li>
          ))}
        </ul>
      )
    )
  }

  const renderDate = (item: any) => {
    const currentDate = new Date(item.completionDate)
    const formattedDate = currentDate.toLocaleDateString('pt-BR')

    return (
      formattedDate
    )
  }

  const formatSkillCase = (skill: string) => {
    const withoutUnderscores = skill.replace(/_/g, ' ')

    const capitalizedWords = withoutUnderscores
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    return capitalizedWords
  }

  const loadMoreElements = () => {
    const newElements = [
      data.slice(counter, counter + perPage).map((item: any, index: number) => {
        return (renderTimelineElement(item, index + counter))
      })
    ]

    setElements(oldElements => [...oldElements, newElements])
  }

  const [counter, setCounter] = useState(perPage)

  const [elements, setElements] = useState(
    [
      data.slice(0, perPage).map((item: any, index: number) => {
        return (renderTimelineElement(item, index))
      })
    ]
  )

  return (
    <div className={`${styles.root}`}>
      {/* <VerticalTimeline lineColor={theme.colors.lightGray}> */}
      <VerticalTimeline>

        {elements}

        {length <= counter
          ? null
          : <VerticalTimelineElement
            visible={true}
            className={`${'vertical-timeline-element--Click'}`}
            icon={<IconPlus />}
            iconOnClick={() => {
              loadMoreElements()
              setCounter(counter + perPage)
            }}
          >
          </VerticalTimelineElement>
        }
      </VerticalTimeline>
    </div>
  )
}

export default Timeline
