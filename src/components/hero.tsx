import React from 'react';
import Link from 'next/link';
import styled from 'styled-components'

import HeroLogo from './graphics/hero-logo';
import HeroButton from './graphics/hero-button';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: ${props => props.theme.colors.darkBlue};
  background-image: url("/assets/hero-background.svg");

  border-top: 10px solid ${props => props.theme.colors.red};

  color: ${props => props.theme.colors.white};
`

const Logo = styled.div`
  text-align: center;
  padding: ${10 * 8}px 0px ${5 * 8}px;
`;

const Text = styled.div`
  padding: ${5 * 8}px 0px ${5 * 8}px;
  text-align: center;
`;

const Button = styled.div`
  text-align: center;
  padding: ${11 * 8}px 0px ${8 * 8}px;
`;


const Display = styled.p`
  font-size: 36px;
  font-weight: ${props => props.theme.weight.bold};
  line-height: 36px;
  text-transform: uppercase;
  padding: 0px;
`;
const Lead = styled.p`
  font-size: 24px;
  font-weight: ${props => props.theme.weight.semiBold};
  line-height: 33px;
  opacity: .6;
  padding: 0px;
`;


export default function Hero() {
  return (
    <Container>
      <div className="container">
      <Logo>
        <HeroLogo />
      </Logo>

      <Text>
        <Display>Analista e Desenvolvedor de Sistemas</Display>
        <Lead>Você cria coisas incríveis quando está acompanhado das pessoas certas</Lead>
      </Text>

      <Button>
        <Link href="/">
          <a><HeroButton /></a>
        </Link>
      </Button>
      </div>
    </Container>
  )
}
