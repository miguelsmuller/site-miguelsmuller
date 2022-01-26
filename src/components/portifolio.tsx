import Link from 'next/link'
import React, { Fragment } from 'react'
import { State } from 'src/pages'
import styled from 'styled-components'

import PortifolioContent, {
  PortifolioType
} from '../services/mocks/portifolio.items'

import Title from './title'

const BottomShadow = styled.section`
  // box-shadow: inset 0px -20px 10px 20px rgb(0 0 0 / 90%);
  width: 100%;
`

const Container = styled.div`
  padding-top: ${6 * 8}px;
  padding-bottom: ${7 * 8}px;

  .text {
    padding: ${3 * 8}px 0px ${2 * 8}px;
    text-align: center;
  }

  @media (min-width: 768px) {
    .text {
      max-width: ${120 * 8}px;
      margin: 0 auto;
    }
  }

  @media (min-width: 1280px) {
    padding-bottom: ${16 * 8}px;
  }
`

const ItensOfPortifolio = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  li {
    padding: ${2 * 8}px;
    flex: 1 1 50%;

    img {
      max-width: 100%;
      object-fit: cover;
      display: block;

      border: 6px solid ${props => props.theme.colors.darkBlue};
      border-radius: 10px;
      overflow: hidden;
    }
  }

  @media (min-width: 768px) {
    li {
      flex: 1 1 25%;
    }
  }
`

export default function Portifolio() {
  const data: any = State()

  const renderItens = (item: any, index: number) => {
    return (
      <Fragment key={`item-${index}`}>
        <li>
          <Link href="">
            <img src={item?.image?.url} alt="" />
          </Link>
        </li>
      </Fragment>
    )
  }

  return (
    <BottomShadow>
      <Container className="container">
        <Title text="O que eu já fiz?" />
        <div
          className="text"
          dangerouslySetInnerHTML={{ __html: data.pageHome.portifolioText }}
        ></div>
        <ItensOfPortifolio>
          {data.portifolios.map(renderItens)}
        </ItensOfPortifolio>
      </Container>
    </BottomShadow>
  )
}
