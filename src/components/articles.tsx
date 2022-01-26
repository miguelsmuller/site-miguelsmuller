import React from 'react'
import styled from 'styled-components'

import Title from './title'

const Container = styled.div`
  padding: ${13 * 8}px 0px ${8 * 8}px;
`

export default function Articles() {
  return (
    <Container className="container">
      <Title text="Referências Externas" />
    </Container>
  )
}
