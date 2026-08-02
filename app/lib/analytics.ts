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

export function getGoogleAnalyticsInitializationScript() {
  return `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`
}

export function trackAnalyticsEvent(eventName: string, parameters: AnalyticsParameters) {
  if (typeof window === 'undefined' || !isAnalyticsProductionHost(window.location.hostname) || typeof window.gtag !== 'function') return

  window.gtag('event', eventName, parameters)
}
