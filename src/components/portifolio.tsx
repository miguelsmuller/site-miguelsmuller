import Link from 'next/link';
import React, { Fragment } from 'react';
import styled from 'styled-components'

import PortifolioContent, { PortifolioType } from '../services/mocks/portifolio.items';

import Title from './title';

const BottomShadow = styled.section`
  // box-shadow: inset 0px -20px 10px 20px rgb(0 0 0 / 90%);
  width: 100%;
`

const Container = styled.div`
  padding-top: ${6 * 8}px;
  padding-bottom: ${7 * 8}px;

  .text{
    padding: ${3 * 8}px 0px ${2 * 8}px;
  }

  @media (min-width: 768px) {
    .text{
      max-width:${120 * 8}px;
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

  li{
    padding: ${2*8}px;
    flex: 1 1 50%;

    img{
      max-width: 100%;
      object-fit: cover;
      display: block;

      border: 6px solid ${props => props.theme.colors.darkBlue};
      border-radius: 10px;
      overflow: hidden;
    }
  }

  @media (min-width: 768px) {
    li{
      flex: 1 1 25%;
    }
  }
`


export default function Portifolio() {
  const content: PortifolioType[] = PortifolioContent()

  const renderItens = (item: PortifolioType, index: number) => {
    return (
      <Fragment key={`item-${index}`}>
        <li>
          <Link href={item.href}>
            <img src={item.image} alt="" />
          </Link>
        </li>
      </Fragment>
    )
  }

  return (
    <BottomShadow>
      <Container className='container'>
        <Title text="O que eu já fiz?" />
        <div className="text">
          <p>Além da experiência e intimidade com o mundo digital, temos envolvimento e cuidado em cada projeto trabalhado. As demandas dos clientes DEVIM são únicas, por isso trabalhamos de forma individual desde a análise das prioridades até o desenvolvimento das estratégias e implementação das ferramentas.</p>

          <p>Os trabalhos já desenvolvidos e implementados são nosso maior orgulho! Se liga nos jobs:</p>
        </div>
        <ItensOfPortifolio>
          {content.map(renderItens)}
        </ItensOfPortifolio>
      </Container>
    </BottomShadow>
  )
}
