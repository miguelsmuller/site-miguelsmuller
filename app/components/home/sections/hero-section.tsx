import React from 'react'
import { FiFileText, FiMail } from 'react-icons/fi'
import type { SiteContent } from '../../../data/site-content'
import styles from '../../home-page.module.css'

export function HeroSection({ profile, onContact }: { profile: SiteContent['profile'], onContact: () => void }) {
  return (
    <header id="apresentacao" className={styles.hero}>
      <h1>{profile.name}</h1>
      <p className={styles.role}>{profile.role}</p>
      <p className={styles.statement}>{profile.statement}</p>
      <ul className={styles.heroActions}>
        {profile.resumeUrl && <li>
          <a href={profile.resumeUrl} target="_blank" rel="noreferrer"><FiFileText aria-hidden="true" />currículo</a>
        </li>}
        <li>
          <button type="button" onClick={onContact}><FiMail aria-hidden="true" />contato</button>
        </li>
      </ul>
    </header>
  )
}
