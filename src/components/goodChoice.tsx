import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

import Title from './title'

import ChoiceMedal from './graphics/choice-icon-medal'
import ChoiceFlask from './graphics/choice-icon-flask'
import ChoiceTarget from './graphics/choice-icon-target'
import ChoiceGraduationCap from './graphics/choice-icon-graduation-cap'
import { State } from 'src/pages'

// Responsável pela seção - Container - Row - Cel
const Container = styled.section`
  padding-top: ${6 * 8}px;
  padding-bottom: ${7 * 8}px;

  @media (min-width: 1280px) {
    padding-bottom: ${16 * 8}px;
  }
`
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: ${4 * 8}px 0px;
  width: 100%;
`
const Cell = styled.div`
  display: flex;
  flex: 1 1 100%;

  @media (min-width: 1024px) {
    :nth-child(1) {
      flex: 1 1 35%;
      padding-right: ${10 * 8}px;
    }
    :nth-child(2) {
      flex: 1 1 65%;
    }
  }
`

// Responsável pela grid de icones
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: ${4 * 8}px 0px;
`

// Responsável pelo icone + texto
const GridItem = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 100%;

  svg {
    flex: 0 0 auto;
  }

  .icon-animation {
    transition: all 300ms ease-in-out;
    transform: rotate(-6deg);
    transform-origin: 50% 50%;
    opacity: 0;
  }

  span {
    padding-left: ${1 * 8}px;
    font-size: 20px;
    font-weight: ${props => props.theme.weight.bold};
    text-transform: uppercase;
  }

  @media (min-width: 640px) {
    flex: 1 1 50%;
  }

  @media (min-width: 1024px) {
    //flex: 1 1 50%;
  }

  &:hover {
    .icon-animation {
      transform: rotate(0);
      opacity: 1;
    }
  }
`

export default function GoodChoice() {
  const data: any = State()

  return (
    <Container className="container">
      <Title text="Por que sou uma boa escolha?" />
      <Row>
        <Cell className="maxWidth">
          <div
            className="Texto"
            dangerouslySetInnerHTML={{ __html: data.pageHome.goodChoiceText }}
          ></div>
        </Cell>

        <Cell>
          <Grid>
            {data.pageHome.goodChoiceItems.map((item: any, index: number) => {
              return (
                <GridItem key={index}>
                  <ChoiceMedal />
                  <span>{item}</span>
                </GridItem>
              )
            })}
          </Grid>
        </Cell>
      </Row>
    </Container>
  )
}
