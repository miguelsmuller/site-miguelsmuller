import React from 'react'
import type { SiteContent } from '../../../data/site-content'
import styles from '../../home-page.module.css'

const defaultExperienceLogo = '/icons/experience/untitle_logo.jpeg'

export function ExperienceSection({ experiences }: { experiences: SiteContent['experiences'] }) {
  return (
    <section className={styles.section} aria-labelledby="experiencia">
      <h2 id="experiencia">Experiência profissional</h2>
      <ol className={styles.timeline}>
        {experiences.map(experience => (
          <li key={`${experience.company}-${experience.period}`} className={styles.timelineItem}>
            <div className={styles.timelineMarker} aria-hidden="true">
              <img
                src={experience.logo || defaultExperienceLogo}
                alt=""
                width={32}
                height={32}
                loading="lazy"
              />
            </div>
            <article>
              <p className={styles.meta}>{experience.period} · {experience.location}</p>
              <h3>{experience.role}</h3>
              <p className={styles.company}>{experience.company}</p>
              <p>{experience.summary}</p>
              <ul className={styles.tagList} aria-label="Tecnologias">
                {experience.stack.map(item => <li key={item}>{item}</li>)}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
