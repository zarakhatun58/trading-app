/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  devIndicators:false,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
