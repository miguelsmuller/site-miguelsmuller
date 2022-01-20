import React from 'react'
import styled from 'styled-components'

import Title from './title'

import PresentationContent, {
  PresentationType
} from '../services/mocks/presentation.items'

import PresentationPhoto from './graphics/presentation-photo'

const Container = styled.section`
  padding-top: ${14 * 8}px;
  padding-bottom: ${7 * 8}px;

  @media (min-width: 1280px) {
    padding-bottom: ${16 * 8}px
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  justify-content: center;
`

const WrapPhoto = styled.div`
  width: 375px;
  display: flex;
  justify-content: center;
`

const WrapText = styled.div`
  flex: 1;
  position: relative;
  min-width: 335px;

  &:after {
    content: '';
    display: none;
    width: 500px;
    height: 320px;
    position: absolute;
    right: -260px;
    bottom: -120px;
    z-index: -1;
  }

  @media (min-width: 1280px) {
    margin: 0px ${40 * 8}px 0px ${8 * 8}px;

    &:after {
      display: block;
      background-image: url(/assets/presentation-background.png);
      background-repeat: no-repeat;
    }
  }
`

export default function Presentation() {
  const content: PresentationType = PresentationContent()

  return (
    <Container className="container">
      <Title text="Quem eu sou?" />
      <Row>
        <WrapPhoto>
          <PresentationPhoto />
        </WrapPhoto>

        <WrapText dangerouslySetInnerHTML={{ __html: content.text }} />
      </Row>
    </Container>
  )
}
