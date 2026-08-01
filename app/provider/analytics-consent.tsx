'use client'

import Script from 'next/script'
import React, { useEffect, useRef, useState } from 'react'
import { GA_MEASUREMENT_ID, initializeGoogleAnalytics } from '../lib/analytics'
import styles from './analytics-consent.module.css'

const consentStorageKey = 'analytics-consent'

type Consent = 'accepted' | 'rejected' | null

export function AnalyticsConsent() {
  const [consent, setConsent] = useState<Consent | undefined>(undefined)
  const [shouldLoadAnalytics, setShouldLoadAnalytics] = useState(false)
  const analyticsInitialized = useRef(false)

  useEffect(() => {
    const storedConsent = window.localStorage.getItem(consentStorageKey)
    setConsent(storedConsent === 'accepted' || storedConsent === 'rejected' ? storedConsent : null)
  }, [])

  const saveConsent = (value: Exclude<Consent, null>) => {
    window.localStorage.setItem(consentStorageKey, value)
    setConsent(value)
  }

  useEffect(() => {
    if (consent !== 'accepted' || analyticsInitialized.current) return

    analyticsInitialized.current = initializeGoogleAnalytics()
    setShouldLoadAnalytics(analyticsInitialized.current)
  }, [consent])

  return (
    <>
      {shouldLoadAnalytics && (
        <Script id="google-analytics" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      )}

      {consent === null && (
        <section className={styles.banner} aria-label="Uso de Analytics">
          <h2 className={styles.title}>Uso de Analytics</h2>
          <p className={styles.description}>
            Posso usar o Google Analytics para entender, de forma agregada, como o site é utilizado?
          </p>
          <div className={styles.actions}>
            <button type="button" className={styles.accept} onClick={() => saveConsent('accepted')}>
              aceitar Analytics
            </button>
            <button type="button" onClick={() => saveConsent('rejected')}>
              recusar
            </button>
          </div>
        </section>
      )}
    </>
  )
}
