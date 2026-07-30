import { createPortal } from 'react-dom'
import React, { useEffect, useRef } from 'react'
import { FiX } from 'react-icons/fi'
import type { Project, SiteContent } from '../../data/site-content'
import styles from '../home-page.module.css'
import { createDialogTitleId, socialIcons } from './utils'

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',')

export function useFocusBoundary(open: boolean, onClose: () => void) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeHandler = useRef(onClose)

  closeHandler.current = onClose

  useEffect(() => {
    if (!open) return

    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    const panel = panelRef.current

    document.body.style.overflow = 'hidden'

    const focusFirst = window.requestAnimationFrame(() => {
      const firstFocusable = panel?.querySelector<HTMLElement>(focusableSelector)
      firstFocusable?.focus()
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeHandler.current()
        return
      }

      if (event.key !== 'Tab' || !panel) return

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector))
        .filter(element => !element.hasAttribute('disabled') && element.tabIndex !== -1)

      if (focusable.length === 0) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(focusFirst)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      trigger?.focus()
    }
  }, [open])

  return panelRef
}

function OverlayDialog({
  open,
  onClose,
  label,
  title,
  children
}: {
  open: boolean
  onClose: () => void
  label: string
  title: string
  children: React.ReactNode
}) {
  const panelRef = useFocusBoundary(open, onClose)

  if (!open) return null
  const titleId = createDialogTitleId(title)

  return createPortal(
    <div className={styles.modalBackdrop} role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <div ref={panelRef} className={styles.modal} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className={styles.overlayHeader}>
          <div>
            <p className={styles.overlayLabel}>{label}</p>
            <h2 id={titleId} className={styles.modalTitle}>{title}</h2>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            <FiX aria-hidden="true" />
            <span>fechar</span>
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>,
    document.body
  )
}

export function ContactDialog({ content, open, onClose }: { content: SiteContent, open: boolean, onClose: () => void }) {
  return (
    <OverlayDialog open={open} onClose={onClose} label="contato" title="Falar comigo">
      <p className={styles.modalIntro}>Aberto a conversas sobre sistemas, produtos digitais e oportunidades profissionais.</p>
      <dl className={styles.contactAvailability}>
        <div>
          <dt>localização</dt>
          <dd>{content.profile.location}</dd>
        </div>
        <div>
          <dt>disponibilidade</dt>
          <dd>{content.profile.availability}</dd>
        </div>
      </dl>
      <dl className={styles.contactList}>
        {content.socialLinks.map(link => {
          const Icon = socialIcons[link.kind]
          const external = link.href.startsWith('http')
          const value = link.kind === 'resume' ? 'Acessar aqui' : link.href.replace('mailto:', '')
          return (
            <div key={link.kind} className={styles.contactRow}>
              <dt><Icon aria-hidden="true" />{link.label}</dt>
              <dd>
                <a href={link.href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
                  {value}
                </a>
              </dd>
            </div>
          )
        })}
      </dl>
    </OverlayDialog>
  )
}

export function ProjectDialog({ project, open, onClose }: { project: Project, open: boolean, onClose: () => void }) {
  return (
    <OverlayDialog open={open} onClose={onClose} label="projeto" title={project.name}>
      <dl className={styles.projectContent}>
        {project.content.map(item => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>
              {typeof item.value === 'string'
                ? <p>{item.value}</p>
                : <ul>{item.value.map(value => <li key={value}>{value}</li>)}</ul>}
            </dd>
          </div>
        ))}
      </dl>

      {project.links.length > 0 && (
        <ul className={styles.modalLinks}>
          {project.links.map(link => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
            </li>
          ))}
        </ul>
      )}
    </OverlayDialog>
  )
}
