// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.dummyjson.com'],
  },
   eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
