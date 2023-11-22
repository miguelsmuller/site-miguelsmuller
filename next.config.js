/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
  distDir: 'nextjs',
  env: {
    FIREBASE_PROJECT_ID: 'miguelsmuller-dev'
  }
}
