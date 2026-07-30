import React from 'react'
import type { SiteContent } from '../../../data/site-content'
import styles from '../../home-page.module.css'

export function SpecialtiesSection({ specialties }: { specialties: SiteContent['specialties'] }) {
  return (
    <section className={styles.section} aria-labelledby="especialidades">
      <h2 id="especialidades">Especialidades</h2>
      <div className={styles.specialtyGrid}>
        {specialties.map(group => (
          <div key={group.label}>
            <h3 className={styles.groupTitle}>{group.label}</h3>
            <ul className={styles.dashList}>
              {group.items.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
