import React, { Fragment } from 'react'

import theme from 'src/styles/theme'
import { State } from 'src/pages'

import Title from './title'
import Timeline from './study-timeline/Timeline'

export default function Study() {
  const data: any = State()

  return (
    <Fragment>
      <div className="root container">
        <Title text="O que eu já estudei?" />
        <div className="row">
          <Timeline data={data.Study} />
        </div>
      </div>

      <style jsx>{`
        .modal-content {
        }

        .modal-overlay {
          z-index: 110;
        }

        .root {
          padding-top: ${12 * 8}px;
          padding-bottom: ${7 * 8}px;
        }

        .row {
          padding-top: ${2 * 8}px;
          padding-bottom: ${2 * 8}px;

          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: stretch;
          width: 100%;
          gap: ${4 * 8}px;
        }

        .cell {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 375px;

          border-radius: 10px;
          padding: 20px;
          background-color: ${theme.colors.lightGray};
          border: 1px solid ${theme.colors.gray};
        }

        .cell-title {
          font-size: 18px;
          font-weight: ${theme.weight.extraBold};
          padding-bottom: ${2 * 8}px;
        }

        .cell-content {
          flex: 1;
        }

        .cell-footer {
          display: block;
          padding-top: ${2 * 8}px;
          font-size: 14px;
        }
        .cell-footer > button,
        .cell-footer > a {
          color: ${theme.colors.red};
          text-decoration: none;
          font-weight: ${theme.weight.semiBold};
          border: none;
          cursor: pointer;
          font-size: 14px;
        }
        .cell-footer > button:hover,
        .cell-footer > a:hover {
          text-decoration: underline;
        }

        @media (min-width: 1280px) {
          .root {
            padding-bottom: ${16 * 8}px;
          }
          .cell:nth-child(even) {
            transform: translateY(${4 * 8}px);
          }
        }
      `}</style>
    </Fragment>
  )
}
