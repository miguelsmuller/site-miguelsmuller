import React from 'react'
import type { Project, SiteContent } from '../../../data/site-content'
import { trackAnalyticsEvent } from '../../../lib/analytics'
import styles from '../../home-page.module.css'
import { ProgressiveListActions, useProgressiveList } from '../progressive-list'

export function ProjectsSection({
  projects,
  unavailable,
  onSelectProject
}: {
  projects: SiteContent['projects']
  unavailable: boolean
  onSelectProject: (project: Project) => void
}) {
  const projectsList = useProgressiveList(projects.length, 3)
  const visibleProjects = projects.slice(0, projectsList.visibleCount)

  return (
    <section className={styles.section} aria-labelledby="projetos">
      <h2 id="projetos">Projetos</h2>
      {unavailable && <p role="status">Conteúdo temporariamente indisponível.</p>}
      {!unavailable && <ul id="projetos-lista" className={styles.projectList}>
        {visibleProjects.map(project => (
          <li key={project.slug}>
            <article className={styles.projectRow}>
              <div>
                <h3>
                  <button
                    type="button"
                    className={styles.projectTitleButton}
                    onClick={() => onSelectProject(project)}
                  >
                    {project.name}
                  </button>
                </h3>
                {project.stack.length > 0 && <p className={styles.monoText}>{project.stack.join(' · ')}</p>}
              </div>
            </article>
          </li>
        ))}
      </ul>}
      {!unavailable && <ProgressiveListActions
        listId="projetos-lista"
        loading={projectsList.loading}
        hasMore={projectsList.hasMore}
        canCollapse={projectsList.canCollapse}
        onLoadMore={projectsList.loadMore}
        onShowAll={projectsList.showAll}
        onCollapse={projectsList.collapse}
        onAction={action => trackAnalyticsEvent('content_list_action', { content_section: 'projects', content_action: action })}
      />}
    </section>
  )
}
