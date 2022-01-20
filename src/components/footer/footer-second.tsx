import React, { Fragment } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { items } from '../../services/mocks/footer-copyright'

const FooterContainer = styled.div`
  padding: 16px 0px;

  background-color: ${props => props.theme.colors.lightGray};
  border-top: 6px solid ${props => props.theme.colors.darkGray};
  font-weight: ${props => props.theme.weight.bold};

  a {
    color: ${props => props.theme.colors.darkBlue};
    text-decoration: none;
  }

  p {
    padding: 0px;
  }
`

const FooterInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px 0px;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: space-between;
  }
`

const Navigation = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style-type: none;

  li {
    flex: 1 1 100%;
    text-align: center;
  }

  @media (min-width: 1024px) {
    gap: ${3 * 8}px;

    li {
      flex: 1 1 auto;
    }
  }
`

const Copyright = styled.div`
  text-align: center;

  @media (min-width: 768px) {
    text-align: right;
  }
`

export default function FooterSecond() {
  const renderItens = (item: any, index: number) => {
    return (
      <Fragment key={`item-${index}`}>
        <li>
          <Link href={item.href}>{item.text}</Link>
        </li>
      </Fragment>
    )
  }

  return (
    <FooterContainer>
      <FooterInner className="container">
        <Navigation>{items.map(renderItens)}</Navigation>

        <Copyright>
          <p>Desenvolvido por Miguel Müller.</p>
          <p>© 2022-2022 Todos os direitos reservados.</p>
        </Copyright>
      </FooterInner>
    </FooterContainer>
  )
}
