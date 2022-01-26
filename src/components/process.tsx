import React from 'react'
import styled from 'styled-components'

import Title from './title'

const Container = styled.section`
  padding-top: ${6 * 8}px;
  padding-bottom: ${7 * 8}px;

  @media (min-width: 1280px) {
    padding-bottom: ${16 * 8}px;
  }
`

const GridOfProcess = styled.div`
  padding-top: ${2 * 8}px;
  padding-bottom: ${2 * 8}px;

  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  .ItemOfGridProcess {
    min-height: 100%;
    flex: 1 1 45%;
  }

  @media (min-width: 1280px) {
    .ItemOfGridProcess {
      flex: 1 1 24%;
    }
  }
`

const ItemProcess = styled.div`
  padding: ${4 * 8}px ${2 * 8}px;
  border-radius: 10px;
  height: 100%;
  color: ${props => props.theme.colors.white};

  &.ItemProcessDarkBlue {
    background-color: ${props => props.theme.colors.darkBlue};
  }
  &.itemProcessRed {
    background-color: ${props => props.theme.colors.red};
  }
  &.itemProcessLightBlue {
    background-color: ${props => props.theme.colors.lightBlue};
  }
  &.itemProcessBlack {
    background-color: ${props => props.theme.colors.black};
  }

  .itemProcessHeader {
    span {
      font-size: 72px;
      line-height: 60px;
      font-weight: ${props => props.theme.weight.extraBold};
    }
    h3 {
      font-size: 22px;
      text-transform: uppercase;
      font-weight: ${props => props.theme.weight.extraBold};
    }
  }
`

export default function Process() {
  return (
    <Container className="container">
      <Title text="Como eu faço?" />
      <GridOfProcess>
        <div className="ItemOfGridProcess">
          <ItemProcess className="ItemProcessDarkBlue">
            <div className="itemProcessHeader">
              <span>01</span>
              <h3>Idealizar</h3>
            </div>
          </ItemProcess>
        </div>

        <div className="ItemOfGridProcess">
          <ItemProcess className="itemProcessRed">
            <div className="itemProcessHeader">
              <span>02</span>
              <h3>Planejar</h3>
            </div>
          </ItemProcess>
        </div>

        <div className="ItemOfGridProcess">
          <ItemProcess className="itemProcessLightBlue">
            <div className="itemProcessHeader">
              <span>03</span>
              <h3>Criar</h3>
            </div>
          </ItemProcess>
        </div>

        <div className="ItemOfGridProcess">
          <ItemProcess className="itemProcessBlack">
            <div className="itemProcessHeader">
              <span>04</span>
              <h3>Acompanhar</h3>
            </div>
          </ItemProcess>
        </div>
      </GridOfProcess>
    </Container>
  )
}
