/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  distDir: 'nextjs',
  env: {
    FIREBASE_PROJECT_ID: 'miguelsmuller-dev'
  },
  experimental: {
    sprFlushToDisk: false
  }
}
