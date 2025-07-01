/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {},  // empty object instead of true
    },
    images: {
      domains: ["localhost", "your-api-domain.com"],
    },
  };
  
  module.exports = nextConfig;
  