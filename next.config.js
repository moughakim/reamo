const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.mapbox.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.tiles.mapbox.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig; 