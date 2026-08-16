import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.18.7'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lastfm.freetls.fastly.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lastfm-img.freetls.fastly.net',
        pathname: '/**',
      }
    ],
  },
}

export default nextConfig
