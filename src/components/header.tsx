import React, { Fragment } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import HeaderContent, { HeaderType } from '../services/mocks/header.items'
import HeaderLogo from './graphics/header-logo'
import HeaderButton from './graphics/header-button'

// Responsável pela estitilização da Header
const HeaderWrap = styled.header`
  padding: 16px 0px;

  background-color: ${props => props.theme.colors.lightGray};
  border-bottom: 6px solid ${props => props.theme.colors.darkGray};

  a {
    color: ${props => props.theme.colors.darkBlue};
    font-weight: ${props => props.theme.weight.bold};
    text-decoration: none;
  }
`

// Responsável pela organização do elementos no Header
const HeaderInner = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`

// Responsável por agrupar o menu de navegação
const NavWrap = styled.div`
  display: none;
  flex-direction: row;
  flex-wrap: wrap;
  flex-grow: 1;
  align-items: center;
  justify-content: flex-end;

  @media (min-width: 1024px) {
    display: flex;
  }
`

// Itens do Menu (Logo, Collapse e Nav)
const Logo = styled.a`
  cursor: pointer;
`
const Collapse = styled.button`
  flex-grow: 1;
  border: none;
  cursor: pointer;
  text-align: right;

  @media (min-width: 1024px) {
    display: none;
  }
`
const Nav = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: ${3 * 8}px;
  list-style-type: none;
  text-transform: uppercase;
  justify-content: center;

  li:last-child {
    background-color: ${props => props.theme.colors.darkBlue};
    padding: 8px ${2 * 8}px;
    border-radius: 4px;

    a {
      color: ${props => props.theme.colors.white};
    }
  }
`

export default function Header() {
  const content: HeaderType = HeaderContent()

  const itemCallToAction = {
    href: '#',
    text: 'Vamos Conversar'
  }
  const navItens = [...content.itens, itemCallToAction]

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
    <HeaderWrap>
      <HeaderInner className="container">
        <Logo>
        < HeaderLogo />
        </Logo>

        <Collapse>
          <HeaderButton/>
        </Collapse  >


        <NavWrap>
          <Nav>{navItens.map(renderItens)}</Nav>
        </NavWrap>
      </HeaderInner>
    </HeaderWrap>
  )
}
