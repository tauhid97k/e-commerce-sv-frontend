/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: 'http://e-commerce-sv-backend.test/:path*',
      },
    ]
  },
}

export default nextConfig
