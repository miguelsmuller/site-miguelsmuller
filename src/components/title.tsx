import React from 'react';
import styled from 'styled-components'

const Title = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 32px;

  position: relative;
  text-transform: uppercase;
  font-weight: ${props => props.theme.weight.extraBold};
  padding-bottom: ${3 * 8}px;
  text-align: center;

  &:after {
    content: "";
    width: 210px;
    height: 6px;
    position: absolute;
    bottom: 15px;
    background-color: ${props => props.theme.colors.red};
  }
`

type Props = {
  text: string
}

export default function SectionTitle({ text }: Props) {
  return (
    <Title>{text}</Title>
  )
}
