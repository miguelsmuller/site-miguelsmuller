import Image from 'next/image'
import React from 'react'

import styles from './Footer.module.scss'

interface FooterFirstProps {
  state?: Record<string, any>;
}

export default function FooterFirst(props: FooterFirstProps) {
  const data = props.state
  const personalUrlLinkedin: string = data?.pageHome?.personalUrlLinkedin || ''
  const personalUrlGithub: string = data?.pageHome?.personalUrlGithub || ''
  const personalUrlTwitter: string = data?.pageHome?.personalUrlTwitter || ''
  const personalUrlInstagram: string = data?.pageHome?.personalUrlInstagram || ''
  const personalUrlCurriculo: string = data?.pageHome?.personalUrlCurriculo || ''
  const footerMail: string = data?.pageHome?.footerMail || ''

  return (
    <div className={`${styles.footer_first__root}`}>
      <div className={`${styles.footer_first__container} container`}>
        <div className={`${styles.footer_first__1col}`}>
          <div className={`${styles.component_social}`}>
            <a
              href={personalUrlLinkedin}
              className={`${styles.icon1}`}
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
              href={personalUrlGithub}
              className={`${styles.icon2}`}
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
              href={personalUrlTwitter}
              className={`${styles.icon3}`}
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
              href={personalUrlInstagram}
              className={`${styles.icon4}`}
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
          </div>
        </div>

        <div className={`${styles.footer_first__2col}`}>
          <div className={`${styles.component_navigation}`}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href={personalUrlGithub}>GitHub</a>
            </li>
            <li>
              <a href={personalUrlGithub}>Linkedin</a>
            </li>
            <li>
              <a href={personalUrlCurriculo}>Currículo</a>
            </li>
            <li>
              <a href="/">Mapa do Site</a>
            </li>
          </div>
        </div>

        <div className={`${styles.footer_first__3col}`}>
          <div className={`${styles.component_contacts}`}>
            <div className={`${styles.contactItem}`}>
              <span>
                <img
                  alt=""
                  src={'/assets/icon-localizacao.svg'}
                  width="42"
                  height="55.36"
                />
              </span>
              <div>
                <p>Do: interior do Rio de Janeiro</p>
                <p>Para: qualquer canto do mundo</p>
              </div>
            </div>

            <div className={`${styles.contactItem}`}>
              <span>
                <img
                  alt=""
                  src={'/assets/icon-email.svg'}
                  width="42"
                  height="41.5"
                />
              </span>
              <div>
                {footerMail}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
