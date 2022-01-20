import React from 'react'
import styled from 'styled-components'

import Title from './title'

// Responsável pela seção - Container - Row - Cel
const Container = styled.section`
  padding-top: ${6 * 8}px;
  padding-bottom: ${7 * 8}px;

  @media (min-width: 1280px) {
    padding-bottom: ${16 * 8}px;
  }
`

// Responsável pelos Carrosel de depoimentos
const TestimonialsCarousel = styled.div`
  padding: ${3 * 8}px 0px;
`
const Testimony = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .testimony-author,
  .testimony-content {
    flex: 1 1 100%;
    text-align: center;
  }

  .testimony-author {
    padding-bottom: ${3 * 8}px;
    h2 {
      justify-content: center;
      display: flex;
      position: relative;
      padding-bottom: ${1 * 8}px;
    }
    h2:after {
      content: '';
      width: 210px;
      height: 3px;
      position: absolute;
      bottom: 0px;
      background-color: ${props => props.theme.colors.red};
    }
  }

  .testimony-content {
    font-size: 16px;
    font-weight: ${props => props.theme.weight.semiBold};
  }

  @media (min-width: 768px) {
    .testimony-author {
      flex: 1 1 40%;
      padding-right: ${4 * 8}px;
      text-align: right;

      h2 {
        justify-content: flex-end;
      }
    }

    .testimony-content {
      flex: 1 1 60%;
      padding-left: ${4 * 8}px;
      text-align: left;
    }
  }

  @media (min-width: 768px) {
    .testimony-author {
      flex: 1 1 30%;
    }

    .testimony-content {
      line-height: 26px;
      font-size: 18px;
      flex: 1 1 70%;
    }
  }
`

export default function Testimonials() {
  return (
    <Container className="container">
      <Title text="O que falam de mim" />
      <TestimonialsCarousel>
        <Testimony>
          <div className="testimony-author">
            <h2>Alexandre Volney Rizzi</h2>
            <p>
              Presidente - Gestão 2012-2013
              <br />
              SCODB
            </p>
          </div>
          <div className="testimony-content">
            <p>
              Desenvolver o portal com a Devim foi muito fácil e muito
              tranquilo. Desde o primeiro contato, passando pelo orçamento e
              pela aprovação de layout, sempre estiveram à disposição para sanar
              dúvidas e oferecer soluções que se aplicavam ao que estávamos
              buscando. E mesmo após o portal ter sido oficialmente lançado,
              continuaram acompanhando a utilização do mesmo e oferecendo novas
              ferramentas que melhoraram a acessibilidade e a integração com os
              usuários. Estou muito satisfeito com a atenção que recebemos e com
              certeza iremos desenvolver novos trabalhos juntos.
            </p>
          </div>
        </Testimony>
      </TestimonialsCarousel>
    </Container>
  )
}
