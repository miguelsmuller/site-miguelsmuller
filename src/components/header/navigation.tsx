import React, { Fragment } from 'react'
import { State } from 'src/pages'

import theme from '../../styles/theme'

export default function Navigation() {
  const data: any = State()

  return (
    <Fragment>
      <ul className="header__wrap__list">
        <li>
          <a
            target="_blank"
            href={data?.pageHome.personalUrlGithub}
            rel="noreferrer"
          >
            Github
          </a>
        </li>

        <li>
          <a
            target="_blank"
            href={data?.pageHome.personalUrlLinkedin}
            rel="noreferrer"
          >
            Linkedin
          </a>
        </li>

        <li>
          <a
            target="_blank"
            href={data?.pageHome.personalUrlCurriculo}
            rel="noreferrer"
          >
            Meu Currículo
          </a>
        </li>
      </ul>
      <style jsx>{`
        .header__wrap__list {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: ${3 * 8}px;
          list-style-type: none;
          text-transform: uppercase;
          justify-content: center;
        }

        .header__wrap__list > li {
          flex: 1 1 100%;
        }
        .header__wrap__list > li > a {
          color: ${theme.colors.darkBlue};
          font-weight: ${theme.weight.bold};
          text-decoration: none;
        }

        .header__wrap__list > li:last-child {
          background-color: ${theme.colors.darkBlue};
          padding: 8px ${2 * 8}px;
          border-radius: 4px;
        }
        .header__wrap__list > li:last-child > a {
          color: ${theme.colors.white};
        }

        @media (min-width: 640px) {
          .header__wrap__list > li {
            flex: 1 1 45%;
          }
        }

        @media (min-width: 1024px) {
          .header__wrap__list > li {
            flex: 1 1 auto;
          }
        }
      `}</style>
    </Fragment>
  )
}
