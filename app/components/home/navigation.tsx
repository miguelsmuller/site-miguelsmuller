import { createPortal } from 'react-dom'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import {
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiFolder,
  FiLayers,
  FiMoon,
  FiSun,
  FiUser,
  FiX
} from 'react-icons/fi'
import type { IconType } from 'react-icons'
import type { SiteContent, SocialLink } from '../../data/site-content'
import styles from '../home-page.module.css'
import { useFocusBoundary } from './dialogs'
import type { SectionId } from './types'
import { socialIcons } from './utils'

export const navigation: Array<{ id: SectionId, label: string, icon: IconType }> = [
  { id: 'apresentacao', label: 'apresentação', icon: FiUser },
  { id: 'especialidades', label: 'especialidades', icon: FiLayers },
  { id: 'experiencia', label: 'experiência', icon: FiBriefcase },
  { id: 'formacao', label: 'formação', icon: FiAward },
  { id: 'artigos', label: 'artigos', icon: FiBookOpen },
  { id: 'projetos', label: 'projetos', icon: FiFolder }
]

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <span className={styles.themePlaceholder}>tema</span>

  const dark = resolvedTheme === 'dark'
  const Icon = dark ? FiMoon : FiSun

  return (
    <button
      type="button"
      className={styles.quietButton}
      aria-label={dark ? 'Usar tema claro' : 'Usar tema escuro'}
      aria-pressed={dark}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
    >
      <Icon aria-hidden="true" />
      <span>{dark ? 'escuro' : 'claro'}</span>
    </button>
  )
}

function SocialLinks({ links }: { links: SocialLink[] }) {
  return (
    <ul className={styles.socialList}>
      {links.map(link => {
        const Icon = socialIcons[link.kind]
        const external = link.href.startsWith('http')
        return (
          <li key={link.kind}>
            <a
              className={styles.quietLink}
              href={link.href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
            >
              <span>{link.label}</span>
              <Icon aria-hidden="true" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export function IndexContent({
  content,
  activeSection,
  onNavigate
}: {
  content: SiteContent
  activeSection: SectionId
  onNavigate?: () => void
}) {
  return (
    <>
      <div className={styles.indexGroup}>
        <p className={styles.eyebrow}>Índice</p>
        <ul className={styles.indexList}>
          {navigation.map(item => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={styles.indexLink}
                  aria-current={activeSection === item.id ? 'location' : undefined}
                  onClick={onNavigate}
                >
                  <span>{item.label}</span>
                  <Icon aria-hidden="true" />
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      <div className={styles.indexGroup}>
        <p className={styles.eyebrow}>Presença online</p>
        <SocialLinks links={content.socialLinks.filter(link => link.kind !== 'email')} />
      </div>

      <div className={styles.preferenceGroup}>
        <p className={styles.eyebrow}>Preferência</p>
        <ThemeToggle />
      </div>
    </>
  )
}

export function MobileDrawer({
  open,
  onClose,
  content,
  activeSection
}: {
  open: boolean
  onClose: () => void
  content: SiteContent
  activeSection: SectionId
}) {
  const panelRef = useFocusBoundary(open, onClose)

  if (!open) return null

  return createPortal(
    <div className={styles.drawerBackdrop} role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <div ref={panelRef} className={styles.drawer} role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        <div className={styles.overlayHeader}>
          <p id="drawer-title" className={styles.overlayLabel}>navegação</p>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            <FiX aria-hidden="true" />
            <span>fechar</span>
          </button>
        </div>
        <nav aria-label="Índice do site">
          <IndexContent content={content} activeSection={activeSection} onNavigate={onClose} />
        </nav>
      </div>
    </div>,
    document.body
  )
}
