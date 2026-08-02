import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.18.7'],
  images: {
    remotePatterns: [
      {
        // AWS S3 presigned URLs – update the hostname to match your bucket region
        // e.g. my-bucket.s3.ap-southeast-1.amazonaws.com
        protocol: 'https',
        hostname: '**.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
