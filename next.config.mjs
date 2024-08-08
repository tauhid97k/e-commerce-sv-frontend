/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: 'http://laravel-11-starter.test/:path*',
      },
    ]
  },
}

export default nextConfig
