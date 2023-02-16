/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd'],
  output: 'standalone',
  publicRuntimeConfig: {
    API_HOST_URL: process.env.API_HOST_URL,
    HOST_URL: process.env.HOST_URL,
  },
};

module.exports = nextConfig;
