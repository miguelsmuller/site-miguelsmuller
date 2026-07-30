'use client'

import React, { useEffect, useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import type { SiteContent } from '../data/site-content'
import styles from './home-page.module.css'
import { ContactDialog, ProjectDialog } from './home/dialogs'
import { IndexContent, MobileDrawer, navigation } from './home/navigation'
import { ArticlesSection } from './home/sections/articles-section'
import { EducationSection } from './home/sections/education-section'
import { ExperienceSection } from './home/sections/experience-section'
import { HeroSection } from './home/sections/hero-section'
import { ProjectsSection } from './home/sections/projects-section'
import { SpecialtiesSection } from './home/sections/specialties-section'
import type { ModalState, SectionId } from './home/types'

export default function HomePage({
  content,
  remoteContentAvailable
}: {
  content: SiteContent
  remoteContentAvailable: { education: boolean, projects: boolean }
}) {
  const [activeSection, setActiveSection] = useState<SectionId>('apresentacao')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [modal, setModal] = useState<ModalState>(null)

  useEffect(() => {
    const elements = navigation
      .map(item => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element))

    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

      if (visible[0]?.target.id) setActiveSection(visible[0].target.id as SectionId)
    }, { rootMargin: '-16% 0px -68% 0px', threshold: [0, 0.1] })

    elements.forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const contactOpen = modal?.type === 'contact'
  const selectedProject = modal?.type === 'project' ? modal.project : null

  return (
    <>
      <a className={styles.skipLink} href="#conteudo">pular para o conteúdo</a>

      <div className={styles.pageShell}>
        <button
          type="button"
          className={styles.mobileMenuButton}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(true)}
        >
          <FiMenu aria-hidden="true" />
          <span>índice</span>
        </button>

        <div className={styles.pageLayout}>
          <aside className={styles.desktopSidebar}>
            <nav aria-label="Índice do site">
              <IndexContent content={content} activeSection={activeSection} />
            </nav>
          </aside>

          <div className={styles.contentColumn}>
            <HeroSection profile={content.profile} onContact={() => setModal({ type: 'contact' })} />

            <main id="conteudo">
              <SpecialtiesSection specialties={content.specialties} />
              <ExperienceSection experiences={content.experiences} />
              <EducationSection
                academics={content.academics}
                learning={content.learning}
                unavailable={!remoteContentAvailable.education}
              />
              <ArticlesSection articles={content.articles} />
              <ProjectsSection
                projects={content.projects}
                unavailable={!remoteContentAvailable.projects}
                onSelectProject={project => setModal({ type: 'project', project })}
              />
            </main>

            <footer className={styles.footer}>
              <p>{content.profile.name} — {new Date().getFullYear()}.</p>
              <ul>
                <li><button type="button" onClick={() => setModal({ type: 'contact' })}>contato</button></li>
                <li><a href="/sitemap.xml">sitemap</a></li>
                <li><a href="#apresentacao">topo</a></li>
              </ul>
            </footer>
          </div>
        </div>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} content={content} activeSection={activeSection} />
      <ContactDialog content={content} open={contactOpen} onClose={() => setModal(null)} />

      {selectedProject && <ProjectDialog project={selectedProject} open onClose={() => setModal(null)} />}
    </>
  )
}
