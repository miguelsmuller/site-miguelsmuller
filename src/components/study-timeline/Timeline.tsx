import React, { useState } from 'react'

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import styled from 'styled-components'

import IconCap from '../graphics/icon-cap'
import IconPlus from '../graphics/icon-plus'

import theme from 'src/styles/theme'

const Timeline = ({ data }: any) => {
  const length = data.length
  const perPage = 3

  const DivElementGroup = styled.div`
    width: 100%;

    .course_group .vertical-timeline-element-content{
      background: ${theme.colors.lightGray} ;
      color: ${theme.colors.darkBlue} ;
      padding: 1em;
    }

    .course_title {
      font-size: 18px;
      margin: 0px;
      padding: 0px;
      font-weight: ${theme.weight.bold};
    }

    .course_subtitle {
      font-size: 14px;
      margin: 0px;
      padding: 0px;
      font-weight: ${theme.weight.semiBold};
    }

    .course_certification{
      font-size: 12px;
      font-weight: ${theme.weight.bold};
      color: ${theme.colors.red};
    }

    .course_date{
      font-size: 11px;
      font-weight: ${theme.weight.bold};
      color: ${theme.colors.darkBlue};
    }

    .course_skills{
      display: flex;
      list-style: none;
      gap: 10px;
      padding-top: 8px;
    }

    .course_skills > li{
      display: inline-block;
      padding: 6px 8px;
      border-radius: 999px;
      background-color: ${theme.colors.darkBlue};
      color: ${theme.colors.white};
      font-size: 11px;
      font-weight: ${theme.weight.bold};
    }

    .vertical-timeline-element--click .vertical-timeline-element-icon {
      background: ${theme.colors.red};
      color: ${theme.colors.white};
      border-color: ${theme.colors.lightGray};
      cursor: pointer;
      box-shadow: 0 0 0 4px ${theme.colors.darkGray},
        inset 0 2px 0 rgba(0,0,0,.08),
        0 3px 0 4px rgba(0,0,0,.05);
    }

    .vertical-timeline-element--Course .vertical-timeline-element-icon,
    .vertical-timeline-element--Academic .vertical-timeline-element-icon {
      color: ${theme.colors.white};
      border-color: ${theme.colors.lightGray};
      box-shadow: 0 0 0 4px ${theme.colors.darkGray},
        inset 0 2px 0 rgba(0,0,0,.08),
        0 3px 0 4px rgba(0,0,0,.05);
    }

    .vertical-timeline-element--Course .vertical-timeline-element-icon {
      background: ${theme.colors.darkBlue};
    }

    .vertical-timeline-element--Academic .vertical-timeline-element-icon {
      background: ${theme.colors.lightBlue};
    }
  `

  const renderTimelineElement = (item: any, index: number) => {
    return (
      <VerticalTimelineElement
        key={index}
        date={renderDate(item)}
        dateClassName="course_date"
        className={`course_group vertical-timeline-element--${item.studyType}`}
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
      <p className='course_title'>
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
      <p className='course_subtitle'>
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
          className='course_certification'
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
        <ul className='course_skills'>
          {item.theme.map((skill:any, index:number) => (
            <li key={index}>{formatSkillCase(skill)}</li>
          ))}
        </ul>
      )
    )
  }

  const renderDate = (item: any) => {
    console.log(item)
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
    <DivElementGroup>
      <VerticalTimeline lineColor={theme.colors.lightGray}>

        {elements}

        {length <= counter
          ? null
          : <VerticalTimelineElement
            className="vertical-timeline-element--click"
            icon={<IconPlus />}
            iconOnClick={() => {
              loadMoreElements()
              setCounter(counter + perPage)
            }}
          >
          </VerticalTimelineElement>
        }
      </VerticalTimeline>
    </DivElementGroup>
  )
}

export default Timeline
