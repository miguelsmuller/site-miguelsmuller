import React, { Fragment } from 'react'
import Modal from 'react-modal'

import slugify from 'slugify'

import Title from './title'
import theme from 'src/styles/theme'
import { State } from 'src/pages'
import StudyModal from './study-modal/study-modal'

Modal.setAppElement('#__next')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 200
  }
}

export default function Study() {
  const data: any = State()

  const [modalIsOpen, setIsOpen] = React.useState(false)

  function handleOpenModal() {
    setIsOpen(true)
  }
  function handleCloseModal() {
    setIsOpen(false)
  }

  const renderStudyItem = (item: any, _index: number) => {
    return (
      <Fragment key={slugify(item.title)}>
        <dl className={slugify(item.title, { lower: true })}>
          <dt>{item.title}</dt>
          <dd>{item.local}</dd>
        </dl>
        <style jsx>{`
          dl {
            padding-bottom: ${3 * 8}px;
          }

          dt {
            font-weight: ${theme.weight.bold};
          }

          dd {
            font-weight: ${theme.weight.semiBold};
            font-size: 14px;
          }
        `}</style>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <div className="root container">
        <Title text="O que eu já estudei?" />
        <div className="row">
          <div className="cell">
            <h2 className="cell-title">Acadêmica</h2>
            <div className="cell-content">
              {data.Academic?.map(renderStudyItem)}
            </div>
            <div className="cell-footer">
              <a href={data.pageHome.personalUrlLattes} target="_blank" rel="noreferrer">Ver o Lattes »</a>
            </div>
          </div>

          <div className="cell">
            <h2 className="cell-title">Certificações</h2>
            <div className="cell-content">
              {data.Certification?.map(renderStudyItem)}
            </div>
            <div className="cell-footer">
              <button onClick={handleOpenModal}>
                Ver todas as certificações »
              </button>
            </div>
          </div>

          <div className="cell">
            <h2 className="cell-title">Cursos</h2>
            <div className="cell-content">
              {data.Course?.map(renderStudyItem)}
            </div>
            <div className="cell-footer">
              <button onClick={handleOpenModal}>Ver todos os cursos »</button>
            </div>
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <StudyModal></StudyModal>
        </Modal>
      </div>
      <style jsx>{`
        .modal-content {
        }

        .modal-overlay {
          z-index: 110;
        }

        .root {
          padding-top: ${6 * 8}px;
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
