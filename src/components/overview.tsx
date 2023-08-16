import React from 'react'
import styled from 'styled-components'

import Title from './title'

import PresentationPhoto from './graphics/presentation-photo'
import { State } from 'src/pages'

const Container = styled.section`
  padding-top: ${12 * 8}px;
  padding-bottom: ${7 * 8}px;

  @media (min-width: 1280px) {
    padding-bottom: ${16 * 8}px;
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  justify-content: center;
  padding: 32px 0px;
`

const WrapPhoto = styled.div`
  width: 375px;
  display: flex;
  justify-content: center;
`

const WrapText = styled.div`
  text-align: justify;
  flex: 1 1 100%;
  position: relative;
  min-width: 335px;

  &:after {
    content: '';
    display: none;
    width: 500px;
    height: 320px;
    position: absolute;
    right: -210px;
    bottom: -130px;
    z-index: -1;
  }

  @media (min-width: 1024px) {
    flex: 1 1 0%;
  }

  @media (min-width: 1280px) {
    margin: 0px ${24 * 8}px 0px ${3 * 8}px;

    &:after {
      display: block;
      background-image: url(/assets/presentation-background.png);
      background-repeat: no-repeat;
    }
  }
`

export default function Overview() {
  const data: any = State()

  return (
    <Container className="container">
      <Title text="Quem eu sou?" />
      <Row>
        <WrapPhoto>
          <PresentationPhoto />
        </WrapPhoto>

        <WrapText
          dangerouslySetInnerHTML={{ __html: data.pageHome.overviewText }}
        />
      </Row>
    </Container>
  )
}
