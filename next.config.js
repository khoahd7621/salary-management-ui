/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'covarom.s3.ap-northeast-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  serverRuntimeConfig: {
    API_HOST_URL: process.env.API_HOST_URL,
    HOST_URL: process.env.HOST_URL,
  },
};

module.exports = nextConfig;
