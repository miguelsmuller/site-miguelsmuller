import React from 'react'
import FooterFirst from './footer-first'
import FooterSecond from './footer-second'

interface FooterProps {
  state?: Record<string, any>;
}

export default function Footer(props: FooterProps) {
  const data = props.state
  return (
    <footer>
      <FooterFirst state={data} />
      <FooterSecond state={data} />
    </footer>
  )
}
