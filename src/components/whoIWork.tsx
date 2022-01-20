import React from 'react';
import styled from 'styled-components'

import Title from './title';


const Container = styled.section`
  padding: ${13 * 8}px 0px ${8 * 8}px;
`;

const GridOfProcess = styled.div`
  display: flex;
  flex-wrap: wrap;

  .GridOfProcessItem{
    padding: ${2*8}px 0px;
    min-height: 100%;
    flex: 1 1 100%;
  }

  @media (min-width: 640px) {
    .GridOfProcessItem{
      padding: ${2*8}px;
      flex: 1 1 50%;
    }
  }

  @media (min-width: 1280px) {
    .GridOfProcessItem{
      flex: 1 1 25%;
    }
  }
`

const ItemProcess = styled.div`
  padding: ${4*8}px ${2*8}px;
  border-radius: 10px;
  height: 100%;
  color: ${props => props.theme.colors.white};

  &.ItemProcessDarkBlue{
    background-color: ${props => props.theme.colors.darkBlue};
  }
  &.itemProcessRed{
    background-color: ${props => props.theme.colors.red};
  }
  &.itemProcessLightBlue{
    background-color: ${props => props.theme.colors.lightBlue};
  }
  &.itemProcessBlack{
    background-color: ${props => props.theme.colors.black};
  }

  .itemProcessHeader{
    padding-bottom: ${3*8}px;
    span{
      font-size:72px;
      line-height: 60px;
      font-weight: ${props => props.theme.weight.extraBold};
    }
    h3{
      font-size:22px;
      text-transform: uppercase;
      font-weight: ${props => props.theme.weight.extraBold};
    }
  }
`


export default function Process() {
  return (
    <Container className='container'>
      <Title text="Como é o processo?" />
      <GridOfProcess>
        <div className="GridOfProcessItem">
          <ItemProcess className='ItemProcessDarkBlue'>
            <div className='itemProcessHeader'>
              <span>01</span>
              <h3>Idealizar</h3>
            </div>
            <div className="itemProcessContent">
              <p>Você identifica uma necessidade na sua empresa e logo muitas ideias surgem? Novos planos e metas pipocam na sua cabeça? Idealizar aonde você quer chegar é o pontapé inicial de todo o processo de desenvolvimento.</p>

              <p>A DEVIM oferece o suporte necessário nesse momento. Definimos metas e, a partir dos nossos serviços, você pode obter melhores resultados para o seu negócio online.</p>
            </div>
          </ItemProcess>
        </div>

        <div className="GridOfProcessItem">
          <ItemProcess className='itemProcessRed'>
          <div className='itemProcessHeader'>
              <span>02</span>
              <h3>Planejar</h3>
            </div>
            <div className="itemProcessContent">
              <p>Uma boa estratégia é a chave para o sucesso do negócio. Conhecer a estrutura da empresa, planejar ações coerentes e definir metas realísticas permite colher bons resultados ao final do processo.</p>

              <p>Nessa fase são feitos estudos minuciosos sobre as necessidades e objetivos do seu projeto sempre buscando o retorno esperado e a satisfação do público alvo.</p>
            </div>
          </ItemProcess>
        </div>

        <div className="GridOfProcessItem">
          <ItemProcess className='itemProcessLightBlue'>
          <div className='itemProcessHeader'>
              <span>03</span>
              <h3>Criar</h3>
            </div>
            <div className="itemProcessContent">
              <p>É preocupação constante da DEVIM gerar um produto final com a alma do seu negócio. Encaramos a criação de um site como a pintura de um quadro: são únicos e personalizados.</p>

              <p>É aqui que o negócio toma a forma do mundo digital. É a hora de traduzir todo o planejamento anterior e os dados obtidos em um sistema elegante e de alta performance.</p>
            </div>
          </ItemProcess>
        </div>

        <div className="GridOfProcessItem">
          <ItemProcess className='itemProcessBlack'>
          <div className='itemProcessHeader'>
              <span>04</span>
              <h3>Acompanhar</h3>
            </div>
            <div className="itemProcessContent">
              <p>Você identifica uma necessidade na sua empresa e logo muitas ideias surgem? Novos planos e metas pipocam na sua cabeça? Idealizar aonde você quer chegar é o pontapé inicial de todo o processo de desenvolvimento.</p>

              <p>A DEVIM oferece o suporte necessário nesse momento. Definimos metas e, a partir dos nossos serviços, você pode obter melhores resultados para o seu negócio online.</p>
            </div>
          </ItemProcess>
        </div>
      </GridOfProcess>
    </Container>
  )
}
