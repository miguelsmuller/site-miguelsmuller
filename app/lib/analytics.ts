export const GA_MEASUREMENT_ID = 'G-VL0P9P94G5'
export const GA_PRODUCTION_HOST = 'www.miguelsmuller.dev.br'

export function isAnalyticsProductionHost(hostname: string) {
  return hostname === GA_PRODUCTION_HOST
}
