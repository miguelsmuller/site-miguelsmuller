import React, { useState } from 'react'
import { FiAward, FiBookOpen } from 'react-icons/fi'
import type { SiteContent } from '../../../data/site-content'
import { trackAnalyticsEvent } from '../../../lib/analytics'
import styles from '../../home-page.module.css'
import { ProgressiveListActions, useProgressiveList } from '../progressive-list'
import type { LearningFilter } from '../types'

export function EducationSection({
  academics,
  learning,
  unavailable
}: Pick<SiteContent, 'academics' | 'learning'> & { unavailable: boolean }) {
  const [learningFilter, setLearningFilter] = useState<LearningFilter>('all')
  const filteredLearning = learning.filter(item => learningFilter === 'all' || item.type === learningFilter)
  const learningList = useProgressiveList(filteredLearning.length, 3)
  const visibleLearning = filteredLearning.slice(0, learningList.visibleCount)

  const changeLearningFilter = (filter: LearningFilter) => {
    learningList.reset()
    setLearningFilter(filter)
    trackAnalyticsEvent('learning_filter', { learning_filter: filter })
  }

  return (
    <section className={styles.section} aria-labelledby="formacao">
      <h2 id="formacao">Formação</h2>

      {unavailable && <p role="status">Conteúdo temporariamente indisponível.</p>}

      {!unavailable && <section className={styles.educationGroup} aria-labelledby="formacao-academica">
        <h3 id="formacao-academica" className={`${styles.groupTitle} ${styles.academicTitle}`}>Formação acadêmica</h3>
        <ul className={styles.educationList}>
          {academics.map(item => (
            <li key={item.title}>
              <h4>{item.title}</h4>
              <p className={styles.meta}>{item.institution}{item.period ? ` — ${item.period}` : ''}</p>
              {item.description && <p>{item.description}</p>}
            </li>
          ))}
        </ul>
      </section>}

      {!unavailable && <section className={styles.educationGroup} aria-labelledby="certificacoes-cursos">
        <h3
          id="certificacoes-cursos"
          className={`${styles.groupTitle} ${styles.certificationTitle}`}
        >
          Certificações e cursos
        </h3>
        <div className={styles.filters} role="group" aria-label="Filtrar certificações e cursos">
          {([
            ['all', 'todos'],
            ['certification', 'certificações'],
            ['course', 'cursos']
          ] as Array<[LearningFilter, string]>).map(([value, label], index) => (
            <span key={value}>
              {index > 0 && <span aria-hidden="true">/</span>}
              <button
                type="button"
                aria-pressed={learningFilter === value}
                onClick={() => changeLearningFilter(value)}
              >
                {label}
              </button>
            </span>
          ))}
        </div>
        <ul id="certificacoes-cursos-lista" className={styles.learningList}>
          {visibleLearning.map(item => {
            const Icon = item.type === 'certification' ? FiAward : FiBookOpen
            const metadata = [item.provider, item.year].filter(Boolean).join(' — ')
            return (
              <li key={`${item.type}-${item.title}`} data-type={item.type}>
                <Icon aria-hidden="true" />
                <div>
                  <h4>{item.title}</h4>
                  {(metadata || item.certificateUrl) && (
                    <p className={styles.meta}>
                      {metadata}
                      {item.certificateUrl && (
                        <>
                          {metadata && ' — '}
                          <a
                            className={styles.learningCertificateLink}
                            href={item.certificateUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Ver certificado <span aria-hidden="true">↗</span>
                          </a>
                        </>
                      )}
                    </p>
                  )}
                  {item.description && <p>{item.description}</p>}
                </div>
              </li>
            )
          })}
        </ul>
        <ProgressiveListActions
          listId="certificacoes-cursos-lista"
          loading={learningList.loading}
          hasMore={learningList.hasMore}
          canCollapse={learningList.canCollapse}
          onLoadMore={learningList.loadMore}
          onShowAll={learningList.showAll}
          onCollapse={learningList.collapse}
          onAction={action => trackAnalyticsEvent('content_list_action', { content_section: 'learning', content_action: action })}
        />
      </section>}
    </section>
  )
}
