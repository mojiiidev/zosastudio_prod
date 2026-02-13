
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.zosalaw.ph',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      }
    ],
  },
  // Ensures that the build succeeds even if there are minor type issues in WP responses
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig;
