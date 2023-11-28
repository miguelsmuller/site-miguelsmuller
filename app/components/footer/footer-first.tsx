import React from 'react'
import Link from 'next/link';

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
            <Link 
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
            </Link>

            <Link
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
            </Link>

            <div className="logo">
              <img
                alt=""
                src={'/assets/icon-logo.svg'}
                width="137.1"
                height="38.83"
              />
            </div>

            <Link
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
            </Link>

            <Link
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
            </Link>
          </div>
        </div>

        <div className={`${styles.footer_first__2col}`}>
          <div className={`${styles.component_navigation}`}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href={personalUrlGithub}>GitHub</Link>
            </li>
            <li>
              <Link href={personalUrlGithub}>Linkedin</Link>
            </li>
            <li>
              <Link href={personalUrlCurriculo}>Currículo</Link>
            </li>
            <li>
              <Link href="/">Mapa do Site</Link>
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
