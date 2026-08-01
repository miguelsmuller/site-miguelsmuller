'use client'

import Script from 'next/script'
import React, { useEffect, useState } from 'react'
import { GA_MEASUREMENT_ID, isAnalyticsProductionHost } from '../lib/analytics'
import styles from './analytics-consent.module.css'

const consentStorageKey = 'analytics-consent'

type Consent = 'accepted' | 'rejected' | null

export function AnalyticsConsent() {
  const [consent, setConsent] = useState<Consent | undefined>(undefined)

  useEffect(() => {
    const storedConsent = window.localStorage.getItem(consentStorageKey)
    setConsent(storedConsent === 'accepted' || storedConsent === 'rejected' ? storedConsent : null)
  }, [])

  const saveConsent = (value: Exclude<Consent, null>) => {
    window.localStorage.setItem(consentStorageKey, value)
    setConsent(value)
  }

  const shouldLoadAnalytics = consent === 'accepted' &&
    typeof window !== 'undefined' &&
    isAnalyticsProductionHost(window.location.hostname)

  return (
    <>
      {shouldLoadAnalytics && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
          </Script>
        </>
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
