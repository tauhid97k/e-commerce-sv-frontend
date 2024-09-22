/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: 'http://laravel-ecommerce-sv.test/:path*',
      },
    ]
  },
}

export default nextConfig
