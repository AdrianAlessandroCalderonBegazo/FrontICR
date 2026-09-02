/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bundle a minimal, self-contained server output — the standard shape
  // for running `node server.js` inside a Docker image.
  output: 'standalone',
}

export default nextConfig
