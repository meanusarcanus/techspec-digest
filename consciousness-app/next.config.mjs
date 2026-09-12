/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/consciousness',
  assetPrefix: '/consciousness/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
