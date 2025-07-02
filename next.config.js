/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    nodeMiddleware: true,
    serverActions: {},  // keep this as you have it
  },
  images: {
    domains: ["localhost", "your-api-domain.com"],
  },
};

module.exports = nextConfig;
