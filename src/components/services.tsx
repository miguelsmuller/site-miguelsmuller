import React from 'react'
import styled from 'styled-components'

import Title from './title'
import ServiceContent, { ServiceType } from '../services/mocks/services.items'
import { State } from 'src/pages'

const Container = styled.section`
  padding-top: ${6 * 8}px;
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
  gap: ${8 * 8}px;
  justify-content: center;
  padding: ${4 * 8}px 0px;
`

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 335px;
  text-align: justify;
`

const ServicesList = styled.ul`
  border-radius: 10px;
  overflow: hidden;
  list-style-type: none;
`

const ServicesListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 8px 32px 8px 8px;
  color: ${props => props.theme.colors.white};
  font-weight: ${props => props.theme.weight.bold};

  &.service-0 {
    background-color: ${props => props.theme.colors.darkBlue};
  }
  &.service-1 {
    background-color: ${props => props.theme.colors.red};
  }
  &.service-2 {
    background-color: ${props => props.theme.colors.lightBlue};
  }
  &.service-3 {
    background-color: ${props => props.theme.colors.black};
  }
`

export default function Services() {
  const data: any = State()

  return (
    <Container className="container">
      <Title text="O que eu faço?" />
      <Row>
        <Cell
          dangerouslySetInnerHTML={{ __html: data.pageHome.servicesText }}
        />

        <Cell>
          <ServicesList>
            {data.pageHome.servicesListItems.map((item: any, index: number) => {
              return (
                <ServicesListItem
                  key={'service-' + index}
                  className={'service-' + index}
                >
                  <img
                    alt=""
                    src={'/assets/icon-star.svg'}
                    width="65"
                    height="65"
                  />
                  {item}
                </ServicesListItem>
              )
            })}
          </ServicesList>
        </Cell>
      </Row>
    </Container>
  )
}
