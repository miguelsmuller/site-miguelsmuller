import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import { State } from '../../pages/index'

const FooterContainer = styled.div`
  padding-top: ${6 * 8}px;
  padding-bottom: ${4 * 8}px;
`

const FooterInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${6 * 8}px 0px;

  .footerSocial {
    flex: 1 1 50%;
  }

  .footerNavigation {
    flex: 1 1 50%;
    display: flex;
    justify-content: center;
  }

  .footerContacts {
    justify-items: center;
    flex: 1 1 100%;
  }

  @media (min-width: 640px) {
    .footerSocial {
      flex: 1 1 100%;
    }

    .footerNavigation {
      flex: 1 1 45%;
    }

    .footerContacts {
      flex: 1 1 55%;
    }
  }

  @media (min-width: 1024px) {
    .footerSocial {
      flex: 1 1 25%;
    }

    .footerNavigation {
      flex: 1 1 35%;
    }

    .footerContacts {
      flex: 1 1 45%;
    }
  }

  @media (min-width: 1024px) {
    .footerSocial {
      flex: 1 1 25%;
    }

    .footerNavigation {
      flex: 1 1 40%;
    }

    .footerContacts {
      flex: 1 1 35%;
    }
  }
`

// Responsável por componentes especificos do footer
const Social = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 72px 72px 72px;
  grid-template-rows: 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    'icon1 logo logo'
    'icon2 icon3 icon4';
  justify-content: center;
  align-items: center;

  .icon1 {
    grid-area: icon1;
  }
  .icon2 {
    grid-area: icon2;
  }
  .logo {
    grid-area: logo;
  }
  .icon3 {
    grid-area: icon3;
  }
  .icon4 {
    grid-area: icon4;
  }
`

const Navigation = styled.ul`
  list-style-type: none;
  border-left: 4px solid ${props => props.theme.colors.darkBlue};
  padding: ${2 * 8}px 0px ${2 * 8}px ${2 * 8}px;
  display: inline-block;
  flex-direction: column;
  align-items: center;
  font-weight: ${props => props.theme.weight.extraBold};
  font-size: 14px;
  text-transform: uppercase;

  a {
    color: ${props => props.theme.colors.darkBlue};
    text-decoration: none;
  }

  li {
    padding: 4px 0px;
  }
`

const Contacts = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: ${4 * 8}px;
  grid-row-gap: ${2 * 8}px;
  width: 100%;

  p {
    padding-bottom: 0px;
  }

  .contact-item {
    align-items: center;
    display: flex;
    column-gap: 25px;
  }
`

export default function FooterFirst() {
  const data: any = State()

  return (
    <FooterContainer>
      <FooterInner className="container">
        <div className="footerSocial">
          <Social>
            <a
              href={data.pageHome.personalUrlLinkedin}
              className="icon1"
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt=""
                src={'/assets/icon-linkedin.svg'}
                width="62"
                height="62"
              />
            </a>

            <a
              href={data.pageHome.personalUrlGithub}
              className="icon2"
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt=""
                src={'/assets/icon-github.svg'}
                width="62"
                height="62"
              />
            </a>

            <div className="logo">
              <img
                alt=""
                src={'/assets/icon-logo.svg'}
                width="137.1"
                height="38.83"
              />
            </div>

            <a
              href={data.pageHome.personalUrlTwitter}
              className="icon3"
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt=""
                src={'/assets/icon-twitter.svg'}
                width="62"
                height="62"
              />
            </a>

            <a
              href={data.pageHome.personalUrlInstagram}
              className="icon4"
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt=""
                src={'/assets/icon-instagram.svg'}
                width="62"
                height="62"
              />
            </a>
          </Social>
        </div>

        <div className="footerNavigation">
          <Navigation>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href={data.pageHome.personalUrlGithub}>GitHub</a>
            </li>
            <li>
              <a href={data.pageHome.personalUrlLinkedin}>Linkedin</a>
            </li>
            <li>
              <a href={data.pageHome.personalUrlCurriculo}>Currículo</a>
            </li>
            <li>
              <a href="/">Mapa do Site</a>
            </li>
          </Navigation>
        </div>

        <div className="footerContacts">
          <Contacts>
            <div className="contact-item">
              <span>
                <img
                  alt=""
                  src={'/assets/icon-localizacao.svg'}
                  width="42"
                  height="55.36"
                />
              </span>
              <div>
                <p>Rua Prefeito Mozart Cesar Valle, 271</p>
                <p>Centro - Rio Claro - RJ - CEP: 27.460-000</p>
              </div>
            </div>

            <div className="contact-item">
              <span>
                <img
                  alt=""
                  src={'/assets/icon-email.svg'}
                  width="42"
                  height="41.5"
                />
              </span>
              <div>
                {data.pageHome.footerMail}
              </div>
            </div>
          </Contacts>
        </div>
      </FooterInner>
    </FooterContainer>
  )
}
