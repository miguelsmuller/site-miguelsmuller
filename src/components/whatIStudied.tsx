import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import slugify from 'slugify'

import StudyContent, { StudyType } from '../services/mocks/study.items'

import Title from './title'

const Container = styled.section`
  padding-top: ${6 * 8}px;
  padding-bottom: ${7 * 8}px;

  @media (min-width: 1280px) {
    padding-bottom: ${16 * 8}px
  }
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
  gap: ${4 * 8}px;
`

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 375px;

  border-radius: 10px;
  padding: 20px;
  background-color: ${props => props.theme.colors.lightGray};
  border: 1px solid ${props => props.theme.colors.gray};

  @media (min-width: 1280px) {
    :nth-child(even) {
      transform: translateY(${4 * 8}px);
    }
  }
`

const CellTitle = styled.h2`
  font-size: 18px;
  font-weight: ${props => props.theme.weight.extraBold};
  padding-bottom: ${2 * 8}px;
`

const CellContent = styled.div`
  flex: 1;

  dl {
    padding-bottom: ${3 * 8}px;
  }

  dt {
    font-weight: ${props => props.theme.weight.bold};
  }

  dd {
    font-weight: ${props => props.theme.weight.semiBold};
    font-size: 14px;
  }
`

const CellFooter = styled.div`
  display: block;
  padding-top: ${2 * 8}px;
  font-size: 14px;

  a {
    color: ${props => props.theme.colors.red};
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`

export default function Studied() {
  const content: StudyType[] = StudyContent()

  const renderStudyItem = (item: any, index: number) => {
    return (
      <dl
        key={slugify(item.name)}
        className={slugify(item.name, { lower: true })}
      >
        <dt>{item.name}</dt>
        <dd>{item.local}</dd>
      </dl>
    )
  }

  return (
    <Container className="container">
      <Title text="O que eu já estudei?" />
      <Row>
        {content.map((item: StudyType, index: number) => {
          return (
            <Cell
              key={slugify(item.studyGroupName)}
              className={
                slugify(item.studyGroupName, { lower: true }) + ' shadow'
              }
            >
              <CellTitle>{item.studyGroupName}</CellTitle>
              <CellContent>{item.studies.map(renderStudyItem)}</CellContent>
              <CellFooter>
                <Link href="#">{item.studyGroupReadMore}</Link>
              </CellFooter>
            </Cell>
          )
        })}
      </Row>
    </Container>
  )
}
