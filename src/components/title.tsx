import React, { Fragment } from 'react'

import theme from '../styles/theme'

export default function SectionTitle(props: any) {
  return (
    <Fragment>
      <h1 className="root">{props.text}</h1>

      <style jsx>{`
        .root {
          display: flex;
          justify-content: center;
          font-size: 32px;
          position: relative;
          text-transform: uppercase;
          font-weight: ${theme.weight.extraBold};
          padding-bottom: ${3 * 8}px;
          text-align: center;
        }

        .root:after {
          content: '';
          width: 210px;
          height: 6px;
          position: absolute;
          bottom: 15px;
          background-color: ${theme.colors.red};
        }
      `}</style>
    </Fragment>
  )
}
