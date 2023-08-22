import React, { Fragment } from 'react'
import Link from 'next/link'
import styles from './Footer.module.scss'

interface FooterSecondProps {
  state?: Record<string, any>;
}

export default function FooterSecond(props: FooterSecondProps) {
  const data = props.state

  const items = [
    {
      href: '#',
      text: 'Política de Privacidade'
    }, {
      href: '#',
      text: 'Termos e Condições'
    }
  ]

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
    <div className={`${styles.footer_second__root}`}>
      <div className={`container ${styles.footer_second__container}`}>
        <ul className={` ${styles.footer_second__navigation}`}>
          {items.map(renderItens)}
        </ul>

        <div className={`${styles.footer_second__copyright}`}>
          <p>Desenvolvido por Miguel Müller.</p>
          <p>© 2022-2022 Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  )
}
