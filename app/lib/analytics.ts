export const GA_MEASUREMENT_ID = 'G-VL0P9P94G5'
export const GA_PRODUCTION_HOST = 'www.miguelsmuller.dev.br'

export function isAnalyticsProductionHost(hostname: string) {
  return hostname === GA_PRODUCTION_HOST
}

type AnalyticsParameters = Record<string, string | number | boolean>

declare global {
  interface Window {
    dataLayer?: unknown[][]
    gtag?: (...arguments_: unknown[]) => void
  }
}

export function prepareGoogleAnalytics() {
  if (typeof window === 'undefined' || !isAnalyticsProductionHost(window.location.hostname)) return false

  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function (...arguments_) {
    window.dataLayer?.push(arguments_)
  }

  return true
}

export function initializeGoogleAnalytics() {
  if (!prepareGoogleAnalytics()) return false

  const gtag = window.gtag
  if (!gtag) return false

  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID)

  return true
}

export function trackAnalyticsEvent(eventName: string, parameters: AnalyticsParameters) {
  if (typeof window === 'undefined' || !isAnalyticsProductionHost(window.location.hostname) || typeof window.gtag !== 'function') return

  window.gtag('event', eventName, parameters)
}
